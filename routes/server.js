const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { logger } = require('../middleware/logger');
const api = require('../routes/index.js');

const port = process.env.PORT || 3001;

// Import custom middleware, "logger"
app.use(logger);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public')); 


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(port, () => {
  console.log(`Server listening on port ${port} 🚀`);
});