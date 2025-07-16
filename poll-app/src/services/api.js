const API_BASE = 'http://localhost:3001/api';

export const pollsApi = {
  // Fetch all polls
  fetchPolls: async () => {
    try {
      const response = await fetch(`${API_BASE}/polls`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching polls:', error);
      throw error;
    }
  },

  // Fetch specific poll with results
  fetchPoll: async (pollId) => {
    try {
      const response = await fetch(`${API_BASE}/polls/${pollId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching poll:', error);
      throw error;
    }
  },

  // Create new poll
  createPoll: async (pollData) => {
    try {
      const response = await fetch(`${API_BASE}/polls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pollData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  },

  // Vote on poll
  vote: async (pollId, optionIndex) => {
    try {
      await fetch(`${API_BASE}/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex })
      });
    } catch (error) {
      console.error('Error voting:', error);
      throw error;
    }
  }
};