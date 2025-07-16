const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON } = require('./utilities/fileUtils');
const DATA_FILE = 'polls.json'

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());




// Helper function to calculate total votes for a poll
const calculateTotalVotes = (poll) => {
    return poll.options.reduce((total, option) => total + option.votes, 0);
};

// Routes

// GET /api/polls - Get all polls
app.get('/api/polls', (req, res) => {

    const polls = readJSON(DATA_FILE);

    const pollsWithTotals = polls.map(poll => ({
        ...poll,
        totalVotes: calculateTotalVotes(poll)
    }));
    res.json(pollsWithTotals);
});

// GET /api/polls/:id - Get specific poll with results
app.get('/api/polls/:id', (req, res) => {

    const polls = readJSON(DATA_FILE);
    const poll = polls.find(p => p.id == req.params.id);

    if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
    }

    const pollWithTotal = {
        ...poll,
        totalVotes: calculateTotalVotes(poll)
    };

    res.json(pollWithTotal);
});

// POST /api/polls - Create new poll
app.post('/api/polls', (req, res) => {
    const { title, description, options } = req.body;

    // Validation
    if (!title || !options || options.length < 2) {
        return res.status(400).json({
            error: 'Title and at least 2 options are required'
        });
    }

    const polls = readJSON(DATA_FILE);
    const newId = polls.length+1
    const newPoll = {
        id: newId,
        title,
        description: description || '',
        options: options.map(text => ({
            text,
            votes: 0
        })),
        createdAt: new Date().toISOString(),
        totalVotes: 0
    };

    polls.push(newPoll);
    writeJSON(DATA_FILE, polls);

    res.status(201).json(newPoll);
});

// POST /api/polls/:id/vote - Vote on a poll
app.post('/api/polls/:id/vote', (req, res) => {
    const { optionIndex } = req.body;

    const polls = readJSON(DATA_FILE);
    const poll = polls.find(p => p.id == parseInt(req.params.id));

    if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
    }

    if (optionIndex == null || optionIndex == undefined || optionIndex < 0 || optionIndex >= poll.options.length) {
        return res.status(400).json({ error: 'Invalid option index' });
    }

    console.log(optionIndex);
    

    // Increment vote count 
    poll.options[parseInt(optionIndex)].votes++;

    const pollWithTotal = {
        ...poll,
        totalVotes: calculateTotalVotes(poll)
    };

    writeJSON(DATA_FILE, polls);

    res.json(pollWithTotal);
});

// DELETE /api/polls/:id - Delete a poll
app.delete('/api/polls/:id', (req, res) => {

    const polls = readJSON(DATA_FILE);
    const pollIndex = polls.findIndex(p => p.id == req.params.id);

    if (pollIndex === -1) {
        return res.status(404).json({ error: 'Poll not found' });
    }

    polls.splice(pollIndex, 1);
    writeJSON(DATA_FILE, polls);
    res.json({ message: 'Poll deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Poll API server running on -  http://localhost:${PORT}`);
});



module.exports = app;