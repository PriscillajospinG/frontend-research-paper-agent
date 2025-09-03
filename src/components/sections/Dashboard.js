import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

const Dashboard = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkSystemHealth();
  }, []);

  const checkSystemHealth = async () => {
    try {
      setLoading(true);
      const health = await apiService.healthCheck();
      setHealthStatus(health);
      setError(null);
    } catch (err) {
      setError('Failed to connect to backend service');
      console.error('Health check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isHealthy) => {
    return isHealthy ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (isHealthy) => {
    return isHealthy ? (
      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) : (
      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Research Paper Agent system overview and status monitoring.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={checkSystemHealth}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Refresh Status'}
          </button>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall System Status */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                ) : error ? (
                  getStatusIcon(false)
                ) : (
                  getStatusIcon(healthStatus?.status === 'healthy')
                )}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    System Status
                  </dt>
                  <dd className={`text-lg font-medium ${
                    loading ? 'text-gray-400' : 
                    error ? 'text-red-600' : 
                    getStatusColor(healthStatus?.status === 'healthy')
                  }`}>
                    {loading ? 'Checking...' : 
                     error ? 'Offline' : 
                     healthStatus?.status === 'healthy' ? 'Online' : 'Unknown'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Backend Services */}
        {healthStatus?.services && Object.entries(healthStatus.services).map(([service, status]) => (
          <div key={service} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getStatusIcon(status)}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {service.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </dt>
                    <dd className={`text-lg font-medium ${getStatusColor(status)}`}>
                      {status ? 'Active' : 'Inactive'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Overview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Research Paper Agent Features
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Autonomous AI-powered research paper generation system capabilities
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Multi-Agent System */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Multi-Agent System</h4>
                <p className="text-sm text-gray-500">
                  Specialized AI agents for draft refinement, web research, content writing, and format enforcement.
                </p>
              </div>
            </div>

            {/* Real-time Monitoring */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Real-time Monitoring</h4>
                <p className="text-sm text-gray-500">
                  Live WebSocket updates showing agent progress and processing status.
                </p>
              </div>
            </div>

            {/* IEEE Compliance */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-500 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">IEEE Format Compliance</h4>
                <p className="text-sm text-gray-500">
                  Automatic formatting to IEEE conference and journal standards.
                </p>
              </div>
            </div>

            {/* File Upload Support */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-yellow-500 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">File Upload Support</h4>
                <p className="text-sm text-gray-500">
                  Upload draft documents (PDF, DOCX) and format templates for enhanced generation.
                </p>
              </div>
            </div>

            {/* Multiple Export Formats */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-red-500 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Multiple Export Formats</h4>
                <p className="text-sm text-gray-500">
                  Download generated papers in DOCX, PDF, and LaTeX formats.
                </p>
              </div>
            </div>

            {/* Web Research */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Autonomous Web Research</h4>
                <p className="text-sm text-gray-500">
                  AI agents automatically search and incorporate relevant academic sources and citations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quick Start Guide
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started with generating your research paper in a few simple steps
          </p>
        </div>
        <div className="px-6 py-4">
          <ol className="list-decimal list-inside space-y-3">
            <li className="text-sm text-gray-700">
              <strong>Define Your Research Topic:</strong> Navigate to "Generate Paper" and provide a clear, specific research topic or question.
            </li>
            <li className="text-sm text-gray-700">
              <strong>Upload Supporting Materials (Optional):</strong> Upload existing draft content or format templates to guide the generation process.
            </li>
            <li className="text-sm text-gray-700">
              <strong>Configure Requirements:</strong> Set paper type, format style, required sections, and any additional requirements.
            </li>
            <li className="text-sm text-gray-700">
              <strong>Start Generation:</strong> Click "Generate Paper" to begin the autonomous agent workflow with real-time monitoring.
            </li>
            <li className="text-sm text-gray-700">
              <strong>Download Results:</strong> Once complete, download your paper in DOCX, PDF, or LaTeX format.
            </li>
          </ol>
        </div>
      </div>

      {/* System Information */}
      {healthStatus && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              System Information
            </h3>
          </div>
          <div className="px-6 py-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">System Status</dt>
                <dd className={`mt-1 text-sm ${getStatusColor(healthStatus.status === 'healthy')}`}>
                  {healthStatus.status === 'healthy' ? 'Healthy' : 'Unhealthy'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {healthStatus.timestamp ? new Date(healthStatus.timestamp).toLocaleString() : 'Unknown'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Backend API</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Research Paper Agent API v1.0.0
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Frontend Version</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Research Paper Agent Frontend v1.0.0
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
              <p className="mt-1 text-sm text-red-700">
                {error}. Please check that the backend service is running and try refreshing the status.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
