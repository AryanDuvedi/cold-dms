const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

// Serve the static files from the 'front-end' folder
app.use(express.static(path.join(__dirname, '../front-end')));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to validate Twitter Auth Token
app.post('/validateToken', (req, res) => {
    const { authToken } = req.body;

    // Simulate validation (replace with real validation logic)
    if (authToken === 'YOUR_VALID_TOKEN_HERE') {
        return res.json({ success: true, message: 'Auth Token validated successfully' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid Auth Token' });
    }
});

// Route to handle sending DMs
app.post('/sendDMs', (req, res) => {
    const { mode, dmsPerDay } = req.body;

    // Simulate DM sending (replace with real DM logic)
    res.json({ success: true, message: `DMs sent successfully in ${mode} mode: ${dmsPerDay} DMs per day` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
