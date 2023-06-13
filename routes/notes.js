const route = require('express').Router();

// Middleware to parse incoming JSON data

// Route handler for GET requests to retrieve all notes
route.get('/notes', (req, res) => {
  // Read data from the JSON file
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
  const notes = JSON.parse(data);

  // Send the notes data as a response
  res.json(notes);
});

// Route handler for POST requests to create a new note
route.post('/notes', (req, res) => {
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

route.delete("/notes/:id", (req, res) => {
  // Read the existing notes from the db.json file
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    try {
      // Parse the notes data from JSON
      const notes = JSON.parse(data);

      // Find the index of the note to delete
      const noteIndex = notes.findIndex(note => note.id === req.params.id);

      if (noteIndex === -1) {
        // If the note doesn't exist, send a 404 Not Found response
        return res.status(404).send('Note not found');
      }

      // Remove the note from the notes array
      notes.splice(noteIndex, 1);

      // Write the updated notes to the db.json file
      fs.writeFile('db.json', JSON.stringify(notes), 'utf8', err => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        // Send a success response
        return res.status(200).send('Note deleted');
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  });
})

module.exports = route;