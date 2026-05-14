"use strict"
const path = require('path')
const app = require(path.join(__dirname, 'app.js'))
app.listen(8000, '0.0.0.0', () => {
    console.log('Server listening on port 8000');
});
app.use((req, res) => {
    res.status(404).send('The page you are looking for does not exist.')
})