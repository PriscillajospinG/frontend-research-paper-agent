/**
 * API Service - Complete backend integration for Research Paper Agent
 * Matches the FastAPI backend endpoints exactly
 */
import axios from 'axios';

// Configure base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.detail || 'Bad request');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw error;
  }
);

/**
 * API Service Class
 */
class ApiService {
  /**
   * Health check endpoint
   */
  async healthCheck() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  /**
   * Upload draft document
   * @param {File} file - The draft file to upload
   * @returns {Promise<Object>} Upload response with file details
   */
  async uploadDraft(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload-draft', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      return response.data;
    } catch (error) {
      console.error('Draft upload failed:', error);
      throw error;
    }
  }

  /**
   * Upload format template
   * @param {File} file - The format template file to upload
   * @returns {Promise<Object>} Upload response with format schema
   */
  async uploadFormat(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload-format', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Format upload failed:', error);
      throw error;
    }
  }

  /**
   * Generate research paper
   * @param {Object} paperRequest - Paper generation request
   * @param {string} paperRequest.topic - Research topic
   * @param {string} [paperRequest.draft_content] - Optional draft content
   * @param {Object} [paperRequest.format_schema] - Optional format schema
   * @param {Object} [paperRequest.user_requirements] - Additional requirements
   * @returns {Promise<Object>} Generation response with execution ID
   */
  async generatePaper(paperRequest) {
    try {
      const response = await api.post('/generate-paper', paperRequest);
      return response.data;
    } catch (error) {
      console.error('Paper generation failed:', error);
      throw error;
    }
  }

  /**
   * Get processing status
   * @param {string} executionId - Execution ID from paper generation
   * @returns {Promise<Object>} Status information
   */
  async getStatus(executionId) {
    try {
      const response = await api.get(`/status/${executionId}`);
      return response.data;
    } catch (error) {
      console.error('Status check failed:', error);
      throw error;
    }
  }

  /**
   * Download generated paper
   * @param {string} executionId - Execution ID
   * @param {string} [format='docx'] - File format (docx, pdf, tex)
   * @returns {Promise<Blob>} File blob for download
   */
  async downloadPaper(executionId, format = 'docx') {
    try {
      const response = await api.get(`/download/${executionId}`, {
        params: { format },
        responseType: 'blob',
      });

      return response.data;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  /**
   * Create WebSocket connection for real-time status updates
   * @param {string} executionId - Execution ID
   * @param {Function} onMessage - Message handler callback
   * @param {Function} [onError] - Error handler callback
   * @param {Function} [onClose] - Close handler callback
   * @returns {WebSocket} WebSocket instance
   */
  connectWebSocket(executionId, onMessage, onError, onClose) {
    const wsUrl = API_BASE_URL.replace(/^http/, 'ws') + `/ws/status/${executionId}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log(`WebSocket connected for execution: ${executionId}`);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
        if (onError) onError(error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket closed for execution: ${executionId}`, event);
      if (onClose) onClose(event);
    };

    return ws;
  }

  /**
   * Download file from blob with filename
   * @param {Blob} blob - File blob
   * @param {string} filename - Download filename
   */
  downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  healthCheck,
  uploadDraft,
  uploadFormat,
  generatePaper,
  getStatus,
  downloadPaper,
  connectWebSocket,
  downloadBlob,
} = apiService;
