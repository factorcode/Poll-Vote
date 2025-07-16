import React from 'react';
import { Share2 } from 'lucide-react';

const VoteView = ({ poll, onVote, onBack, onShare }) => {
  if (!poll) return null;

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
      
      <div className="space-y-3">
        {poll.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onVote(poll.id, index)}
            className="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {option.text}
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <button
          onClick={() => onShare(poll.id)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Share2 size={16} />
          Share Poll
        </button>
      </div>
    </div>
  );
};

export default VoteView;