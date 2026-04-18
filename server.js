const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let accounts = JSON.parse(fs.readFileSync('./data/accounts.json'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/accounts', (req, res) => {
    res.status(200).json({ accounts });
});

app.listen(8000, '0.0.0.0', () => {
    console.log('Server listening on port 8000');
});