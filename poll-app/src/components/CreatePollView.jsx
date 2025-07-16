import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const CreatePollView = ({ onCreatePoll, onCancel, loading }) => {
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    options: ['', '']
  });

  const addOption = () => {
    setNewPoll({
      ...newPoll,
      options: [...newPoll.options, '']
    });
  };

  const removeOption = (index) => {
    if (newPoll.options.length > 2) {
      setNewPoll({
        ...newPoll,
        options: newPoll.options.filter((_, i) => i !== index)
      });
    }
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({ ...newPoll, options: updatedOptions });
  };

  const handleSubmit = async () => {
    const success = await onCreatePoll(newPoll);
    if (success) {
      setNewPoll({ title: '', description: '', options: ['', ''] });
      onCancel();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Poll</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Poll Title</label>
          <input
            type="text"
            value={newPoll.title}
            onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your poll question"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={newPoll.description}
            onChange={(e) => setNewPoll({ ...newPoll, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Add more details about your poll"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
          {newPoll.options.map((option, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Option ${index + 1}`}
              />
              {newPoll.options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          
          <button
            onClick={addOption}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Plus size={16} />
            Add Option
          </button>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Poll'}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePollView;