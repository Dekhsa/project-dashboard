// Project Dashboard - Main Entry Point
console.log('Welcome to Project Dashboard!');

// Basic server setup
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Project Dashboard is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Project Dashboard server running on http://localhost:${PORT}`);
});
