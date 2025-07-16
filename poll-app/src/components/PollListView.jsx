import React from 'react';
import { Plus, Users, Vote, BarChart3, Share2 } from 'lucide-react';

const PollListView = ({ polls, onCreatePoll, onVote, onResults, onShare }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Polls</h2>
        <button
          onClick={onCreatePoll}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} />
          Create Poll
        </button>
      </div>
      
      <div className="grid gap-4">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{poll.title}</h3>
            {poll.description && (
              <p className="text-gray-600 mb-4">{poll.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Users size={14} />
                {poll.totalVotes} votes
              </span>
              <span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onVote(poll.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Vote size={16} />
                Vote
              </button>
              <button
                onClick={() => onResults(poll.id)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <BarChart3 size={16} />
                Results
              </button>
              <button
                onClick={() => onShare(poll.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        ))}
        
        {polls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No polls yet. Create your first poll!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollListView;