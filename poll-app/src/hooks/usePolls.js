import { useState, useEffect } from 'react';
import { pollsApi } from '../services/api';

export const usePolls = () => {
  const [polls, setPolls] = useState([]);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPolls = async () => {
    try {
      const data = await pollsApi.fetchPolls();
      setPolls(data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  const fetchPoll = async (pollId) => {
    try {
      const data = await pollsApi.fetchPoll(pollId);
      setCurrentPoll(data);
    } catch (error) {
      console.error('Error fetching poll:', error);
    }
  };

  const createPoll = async (pollData) => {
    if (!pollData.title || pollData.options.filter(opt => opt.trim()).length < 2) {
      alert('Please provide a title and at least 2 options');
      return false;
    }

    setLoading(true);
    try {
      const poll = await pollsApi.createPoll({
        title: pollData.title,
        description: pollData.description,
        options: pollData.options.filter(opt => opt.trim())
      });
      
      setPolls([...polls, poll]);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error creating poll:', error);
      setLoading(false);
      return false;
    }
  };

  const vote = async (pollId, optionIndex) => {
    try {
      await pollsApi.vote(pollId, optionIndex);
      await fetchPoll(pollId);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const sharePoll = (pollId) => {
    const url = `${window.location.origin}?poll=${pollId}`;
    navigator.clipboard.writeText(url);
    alert('Poll link copied to clipboard!');
  };

  return {
    polls,
    currentPoll,
    loading,
    fetchPolls,
    fetchPoll,
    createPoll,
    vote,
    sharePoll
  };
};