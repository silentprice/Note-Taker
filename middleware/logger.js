const express = require('express');
const app = express();

// Middleware function to log request information
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Use the logger middleware for all requests
app.use(logger);

// Route handler for GET requests to the root path
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});



exports.logger = logger;