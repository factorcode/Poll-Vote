import React from 'react';
import { Share2, BarChart3 } from 'lucide-react';

const ResultsView = ({ poll, onBack, onShare, onRefresh }) => {
  if (!poll) return null;

  const totalVotes = poll.totalVotes || 0;
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500 hover:text-blue-600"
      >
        ← Back to polls
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{poll.title}</h2>
      {poll.description && (
        <p className="text-gray-600 mb-6">{poll.description}</p>
      )}
      
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700">
          Total Votes: {totalVotes}
        </p>
      </div>
      
      <div className="space-y-4">
        {poll.options.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes * 100).toFixed(1) : 0;
          
          return (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">{option.text}</span>
                <span className="text-sm text-gray-600">
                  {option.votes} votes ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t flex gap-2">
        <button
          onClick={() => onShare(poll.id)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Share2 size={16} />
          Share Poll
        </button>
        <button
          onClick={() => onRefresh(poll.id)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <BarChart3 size={16} />
          Refresh Results
        </button>
      </div>
    </div>
  );
};

export default ResultsView;