import React from 'react';

const Templates = () => {
  const templates = [
    {
      name: 'IEEE Conference Paper',
      description: 'Standard IEEE conference paper template with proper formatting',
      pages: '6-8 pages',
      type: 'Conference',
      popular: true
    },
    {
      name: 'IEEE Journal Article',
      description: 'Full-length IEEE journal article template',
      pages: '10-15 pages',
      type: 'Journal',
      popular: true
    },
    {
      name: 'IEEE Letter',
      description: 'Short communication IEEE letter template',
      pages: '3-4 pages',
      type: 'Letter',
      popular: false
    },
    {
      name: 'IEEE Survey Paper',
      description: 'Comprehensive survey paper template',
      pages: '15-25 pages',
      type: 'Survey',
      popular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            IEEE Templates
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose from our collection of IEEE-compliant paper templates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  {template.popular && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Popular
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">{template.description}</p>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>{template.pages}</span>
                <span>{template.type}</span>
              </div>
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
