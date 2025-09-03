/**
 * PaperGenerator Component - Main paper generation interface
 * Integrates file upload, form submission, and real-time monitoring
 */
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import AgentMonitor from './AgentMonitor';
import apiService from '../services/api';

const PaperGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: '',
    draft_content: '',
    format_schema: null,
    user_requirements: {
      paper_type: 'conference',
      format_style: 'ieee',
      target_length: 'standard',
      include_citations: true,
      citation_style: 'ieee',
      sections_required: ['abstract', 'introduction', 'methodology', 'results', 'conclusion'],
      additional_notes: ''
    }
  });

  const [uploadedDraft, setUploadedDraft] = useState(null);
  const [uploadedFormat, setUploadedFormat] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [executionId, setExecutionId] = useState(null);
  const [error, setError] = useState(null);
  const [generatedPaper, setGeneratedPaper] = useState(null);

  const steps = [
    { id: 1, name: 'Topic & Requirements', description: 'Define your research topic and requirements' },
    { id: 2, name: 'Upload Files', description: 'Upload draft content and format templates (optional)' },
    { id: 3, name: 'Generate Paper', description: 'Start the autonomous generation process' },
    { id: 4, name: 'Monitor & Download', description: 'Monitor progress and download results' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, values) => {
    setFormData(prev => ({
      ...prev,
      user_requirements: {
        ...prev.user_requirements,
        [field]: values
      }
    }));
  };

  const handleDraftUpload = (response) => {
    setUploadedDraft(response);
    setFormData(prev => ({
      ...prev,
      draft_content: response.content_preview || response.file_path
    }));
  };

  const handleFormatUpload = (response) => {
    setUploadedFormat(response);
    setFormData(prev => ({
      ...prev,
      format_schema: response.format_schema
    }));
  };

  const handleUploadError = (error) => {
    setError(error.message || 'Upload failed');
    setTimeout(() => setError(null), 5000);
  };

  const validateForm = () => {
    if (!formData.topic.trim()) {
      throw new Error('Research topic is required');
    }
    if (formData.topic.trim().length < 10) {
      throw new Error('Research topic must be at least 10 characters long');
    }
    return true;
  };

  const generatePaper = async () => {
    try {
      setError(null);
      validateForm();
      setProcessing(true);

      const request = {
        topic: formData.topic.trim(),
        draft_content: formData.draft_content || null,
        format_schema: formData.format_schema || null,
        user_requirements: formData.user_requirements
      };

      const response = await apiService.generatePaper(request);
      setExecutionId(response.execution_id);
      setCurrentStep(4);

    } catch (error) {
      setError(error.message || 'Failed to start paper generation');
      setProcessing(false);
    }
  };

  const handleGenerationComplete = (result) => {
    setProcessing(false);
    setGeneratedPaper(result);
  };

  const handleGenerationError = (error) => {
    setProcessing(false);
    setError(error.message || 'Paper generation failed');
  };

  const downloadPaper = async (format = 'docx') => {
    try {
      const blob = await apiService.downloadPaper(executionId, format);
      const filename = `research_paper_${executionId}.${format}`;
      apiService.downloadBlob(blob, filename);
    } catch (error) {
      setError(`Download failed: ${error.message}`);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      topic: '',
      draft_content: '',
      format_schema: null,
      user_requirements: {
        paper_type: 'conference',
        format_style: 'ieee',
        target_length: 'standard',
        include_citations: true,
        citation_style: 'ieee',
        sections_required: ['abstract', 'introduction', 'methodology', 'results', 'conclusion'],
        additional_notes: ''
      }
    });
    setUploadedDraft(null);
    setUploadedFormat(null);
    setProcessing(false);
    setExecutionId(null);
    setError(null);
    setGeneratedPaper(null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Research Topic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Topic *
              </label>
              <textarea
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="Enter your research topic or question. Be specific about what you want to investigate..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Example: "Impact of machine learning algorithms on cybersecurity threat detection in IoT networks"
              </p>
            </div>

            {/* Paper Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Type
                </label>
                <select
                  value={formData.user_requirements.paper_type}
                  onChange={(e) => handleInputChange('user_requirements.paper_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="conference">Conference Paper</option>
                  <option value="journal">Journal Article</option>
                  <option value="workshop">Workshop Paper</option>
                  <option value="thesis">Thesis Chapter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format Style
                </label>
                <select
                  value={formData.user_requirements.format_style}
                  onChange={(e) => handleInputChange('user_requirements.format_style', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ieee">IEEE</option>
                  <option value="acm">ACM</option>
                  <option value="apa">APA</option>
                  <option value="mla">MLA</option>
                </select>
              </div>
            </div>

            {/* Target Length */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Length
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['short', 'standard', 'extended'].map(length => (
                  <label key={length} className="flex items-center">
                    <input
                      type="radio"
                      name="target_length"
                      value={length}
                      checked={formData.user_requirements.target_length === length}
                      onChange={(e) => handleInputChange('user_requirements.target_length', e.target.value)}
                      className="mr-2"
                    />
                    <span className="capitalize text-sm text-gray-700">{length}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Required Sections */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Sections
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['abstract', 'introduction', 'literature_review', 'methodology', 'results', 'discussion', 'conclusion', 'future_work'].map(section => (
                  <label key={section} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.user_requirements.sections_required.includes(section)}
                      onChange={(e) => {
                        const current = formData.user_requirements.sections_required;
                        const updated = e.target.checked
                          ? [...current, section]
                          : current.filter(s => s !== section);
                        handleArrayChange('sections_required', updated);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {section.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                value={formData.user_requirements.additional_notes}
                onChange={(e) => handleInputChange('user_requirements.additional_notes', e.target.value)}
                placeholder="Any specific requirements, guidelines, or notes for the paper generation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <FileUpload
              type="draft"
              onUploadSuccess={handleDraftUpload}
              onUploadError={handleUploadError}
            />
            
            <FileUpload
              type="format"
              onUploadSuccess={handleFormatUpload}
              onUploadError={handleUploadError}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Optional Uploads</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    These uploads are optional. You can proceed without them and the AI will generate content from scratch based on your topic and requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Generation Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Topic:</span>
                  <p className="mt-1 text-sm text-gray-900">{formData.topic}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Paper Type:</span>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {formData.user_requirements.paper_type}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Format:</span>
                    <p className="mt-1 text-sm text-gray-900 uppercase">
                      {formData.user_requirements.format_style}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Required Sections:</span>
                  <p className="mt-1 text-sm text-gray-900">
                    {formData.user_requirements.sections_required.map(s => s.replace('_', ' ')).join(', ')}
                  </p>
                </div>

                {uploadedDraft && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Draft Content:</span>
                    <p className="mt-1 text-sm text-gray-900">
                      ✅ {uploadedDraft.filename} uploaded
                    </p>
                  </div>
                )}

                {uploadedFormat && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Format Template:</span>
                    <p className="mt-1 text-sm text-gray-900">
                      ✅ {uploadedFormat.filename} uploaded
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Ready to Generate</h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    The generation process may take several minutes. You'll be able to monitor the progress in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {executionId && (
              <AgentMonitor
                executionId={executionId}
                onComplete={handleGenerationComplete}
                onError={handleGenerationError}
              />
            )}

            {generatedPaper && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Paper Generated Successfully!</h3>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Your research paper has been generated and is ready for download in multiple formats.
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => downloadPaper('docx')}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Download DOCX
                    </button>
                    <button
                      onClick={() => downloadPaper('pdf')}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => downloadPaper('tex')}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
                    >
                      Download LaTeX
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Research Paper Generator</h1>
        <p className="mt-2 text-lg text-gray-600">
          Autonomous AI-powered research paper generation system
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="bg-white shadow rounded-lg p-6">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => (
              <li key={step.id} className="flex-1">
                <div className={`flex items-center ${index !== steps.length - 1 ? 'pb-4' : ''}`}>
                  <div className="flex items-center">
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      <span className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.id}
                      </span>
                    </div>
                    <div className="ml-4 min-w-0 flex-1">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index !== steps.length - 1 && (
                    <div className={`hidden sm:block w-5 h-0.5 ml-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <div className="bg-white shadow rounded-lg p-6">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1 || processing}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex space-x-3">
          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={processing || (currentStep === 1 && !formData.topic.trim())}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button
              onClick={generatePaper}
              disabled={processing || !formData.topic.trim()}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Starting Generation...' : 'Generate Paper'}
            </button>
          )}

          {currentStep === 4 && generatedPaper && (
            <button
              onClick={resetForm}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Generate Another Paper
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperGenerator;
