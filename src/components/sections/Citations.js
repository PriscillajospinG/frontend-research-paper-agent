import React from 'react';

const Citations = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Citations
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your citation library and generate bibliographies.
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Citation Generator</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">DOI or URL</label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter DOI or paper URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Citation Style</label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>IEEE</option>
              <option>APA</option>
              <option>MLA</option>
              <option>Chicago</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Generate Citation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Citations;
