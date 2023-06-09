const express = require('express');
const app = express();
const { logger } = require('./middleware/logger');
const api = require('./routes/index.js');

const port = process.env.PORT || 3001;

// Import custom middleware, "logger"
app.use(logger);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});