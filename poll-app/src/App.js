import React, { useState, useEffect } from 'react';
import { usePolls } from './hooks/usePolls';
import CreatePollView from './components/CreatePollView';
import PollListView from './components/PollListView';
import VoteView from './components/VoteView';
import ResultsView from './components/ResultsView';

const App = () => {
  const [currentView, setCurrentView] = useState('list');
  const pollsHook = usePolls();

  useEffect(() => {
    pollsHook.fetchPolls();
    
    // Check if there's a poll ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('poll');
    if (pollId) {
      pollsHook.fetchPoll(pollId);
      setCurrentView('results');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Poll & Vote</h1>
          <p className="text-gray-600">Create polls, gather opinions, see live results</p>
        </header>
        
        {currentView === 'list' && (
          <PollListView 
            polls={pollsHook.polls}
            onCreatePoll={() => setCurrentView('create')}
            onVote={(pollId) => {
              pollsHook.fetchPoll(pollId);
              setCurrentView('vote');
            }}
            onResults={(pollId) => {
              pollsHook.fetchPoll(pollId);
              setCurrentView('results');
            }}
            onShare={pollsHook.sharePoll}
          />
        )}
        
        {currentView === 'create' && (
          <CreatePollView 
            onCreatePoll={pollsHook.createPoll}
            onCancel={() => setCurrentView('list')}
            loading={pollsHook.loading}
          />
        )}
        
        {currentView === 'vote' && (
          <VoteView 
            poll={pollsHook.currentPoll}
            onVote={pollsHook.vote}
            onBack={() => setCurrentView('list')}
            onShare={pollsHook.sharePoll}
          />
        )}
        
        {currentView === 'results' && (
          <ResultsView 
            poll={pollsHook.currentPoll}
            onBack={() => setCurrentView('list')}
            onShare={pollsHook.sharePoll}
            onRefresh={pollsHook.fetchPoll}
          />
        )}
      </div>
    </div>
  );
};

export default App;