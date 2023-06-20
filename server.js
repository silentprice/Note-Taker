const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const api = require('./routes/notes');

const port = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public')); 


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.listen(port, () => {
  console.log(`Server listening on port ${port} 🚀`);
});