const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Mount universal core middle tiers
app.use(cors()); 
app.use(express.json()); 

// Working Runtime Mock Database Store
const submissionsDatabase = [];

// Handle incoming application POST payloads
app.post('/api/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Backend validation security line
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All properties must contain populated string input structures." });
    }

    // Wrap structured JSON parameters
    const incomingRecord = {
        id: Date.now(),
        name,
        email,
        message,
        timestamp: new Date()
    };
    
    submissionsDatabase.push(incomingRecord);
    console.log("📥 New form transmission safely retained inside back-end server space:", incomingRecord);

    // Return strict confirmation status
    res.status(200).json({ message: "Form Submitted Successfully" });
});

app.listen(PORT, () => {
    console.log(`🚀 Full Stack Express system successfully active on port address: http://localhost:${PORT}`);
});