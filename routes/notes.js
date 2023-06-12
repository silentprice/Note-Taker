const notes = require('express').Router();


// Middleware to parse incoming JSON data
app.use(express.json());

// Route handler for GET requests to retrieve all notes
app.get('/api/notes', (req, res) => {
  // Read data from the JSON file
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
  const notes = JSON.parse(data);

  // Send the notes data as a response
  res.json(notes);
});

// Route handler for POST requests to create a new note
app.post('/api/notes', (req, res) => {
  // Read data from the JSON file
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
  const notes = JSON.parse(data);

  // Add the new note to the array of notes
  const newNote = req.body;
  notes.push(newNote);

  // Write the updated notes data back to the JSON file
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));

  // Send a success response
  res.json({ message: 'Note created successfully' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = notes;