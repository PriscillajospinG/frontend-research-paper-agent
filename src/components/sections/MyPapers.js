import React from 'react';

const MyPapers = () => {
  const papers = [
    {
      title: 'Machine Learning Applications in Healthcare Diagnostics',
      status: 'Published',
      date: '2024-08-15',
      journal: 'IEEE Transactions on Biomedical Engineering',
      citations: 12,
      downloads: 234
    },
    {
      title: 'Quantum Computing Algorithms for Optimization Problems',
      status: 'In Review',
      date: '2024-07-22',
      journal: 'IEEE Quantum Engineering',
      citations: 0,
      downloads: 45
    },
    {
      title: 'Deep Learning for Computer Vision Applications',
      status: 'Draft',
      date: '2024-06-10',
      journal: 'Not submitted',
      citations: 0,
      downloads: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Papers
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your research papers and publications.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          New Paper
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {papers.map((paper, index) => (
            <li key={index}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-blue-600 truncate cursor-pointer hover:text-blue-500">
                      {paper.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{paper.journal}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{paper.date}</span>
                      <span className="mx-2">•</span>
                      <span>{paper.citations} citations</span>
                      <span className="mx-2">•</span>
                      <span>{paper.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      paper.status === 'Published' ? 'bg-green-100 text-green-800' :
                      paper.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {paper.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPapers;
