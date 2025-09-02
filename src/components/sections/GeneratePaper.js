import React, { useState } from 'react';

const GeneratePaper = () => {
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    keywords: '',
    abstract: '',
    sections: [],
    citations: '',
    format: 'ieee'
  });

  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setGenerating(false);
      alert('Paper generated successfully!');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Generate IEEE Paper
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Let our AI assistant help you create a comprehensive research paper.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow rounded-lg p-6">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {[1, 2, 3, 4].map((stepNumber, index) => (
              <li key={stepNumber} className={`${index !== 3 ? 'flex-1' : ''}`}>
                <div className={`flex items-center ${index !== 3 ? 'relative' : ''}`}>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <span className={`text-sm font-medium ${
                      step >= stepNumber ? 'text-white' : 'text-gray-500'
                    }`}>
                      {stepNumber}
                    </span>
                  </div>
                  {index !== 3 && (
                    <div className={`absolute top-4 w-full h-0.5 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stepNumber === 1 && 'Basic Info'}
                    {stepNumber === 2 && 'Content'}
                    {stepNumber === 3 && 'Review'}
                    {stepNumber === 4 && 'Generate'}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Form Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Content Details'}
            {step === 3 && 'Review & Settings'}
            {step === 4 && 'Generate Paper'}
          </h3>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Paper Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your paper title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Research Topic</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a topic</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="ml">Machine Learning</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="iot">Internet of Things</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="quantum">Quantum Computing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="machine learning, neural networks, deep learning"
                />
                <p className="mt-2 text-sm text-gray-500">Separate keywords with commas</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Abstract / Summary</label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide a brief overview of your research..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Required Sections</label>
                <div className="mt-2 space-y-2">
                  {['Introduction', 'Literature Review', 'Methodology', 'Results', 'Discussion', 'Conclusion'].map((section) => (
                    <label key={section} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-700">{section}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Citations</label>
                <select
                  name="citations"
                  value={formData.citations}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="10">10-15 citations</option>
                  <option value="20">20-25 citations</option>
                  <option value="30">30+ citations</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Review your information</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Please review all the information before generating your paper. This process may take several minutes.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">Paper Details</h4>
                <dl className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Title:</dt>
                    <dd className="text-sm text-gray-900">{formData.title || 'Not specified'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Topic:</dt>
                    <dd className="text-sm text-gray-900">{formData.topic || 'Not specified'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Keywords:</dt>
                    <dd className="text-sm text-gray-900">{formData.keywords || 'Not specified'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Citations:</dt>
                    <dd className="text-sm text-gray-900">{formData.citations || '10-15'} citations</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6">
              {generating ? (
                <div>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-lg font-medium text-gray-900">Generating your paper...</p>
                  <p className="text-sm text-gray-500">This may take a few minutes. Please don't close this page.</p>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-gray-900">Ready to Generate!</p>
                  <p className="text-sm text-gray-500">Click the button below to start the generation process.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="px-6 py-3 bg-gray-50 flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1 || generating}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate Paper'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePaper;
