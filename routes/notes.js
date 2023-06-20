const route = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Middleware to parse incoming JSON data

// Route handler for GET requests to retrieve all notes
route.get("/notes", (req, res) => {
  // Read data from the JSON file
  const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
  const notes = JSON.parse(data);

  // Send the notes data as a response
  res.json(notes);
});

// Route handler for POST requests to create a new note
route.post("/notes", (req, res) => {
  // Read data from the JSON file
  const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
  const notes = JSON.parse(data);

  // Add the new note to the array of notes
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  notes.push(newNote);

  // Write the updated notes data back to the JSON file
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes)
  );

  // Send a success response
  res.json({ message: "Note created successfully" });
});

route.delete("/notes/:id", (req, res) => {
  // Read the existing notes from the db.json file
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    try {
      // Parse the notes data from JSON
      const notes = JSON.parse(data);

      // Find the index of the note to delete
      const noteToDelete = req.params.id;
      const updatedNotes = notes.filter((note) => note.id !== noteToDelete);

      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(updatedNotes),
        "utf8",
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Server error");
          }

          // Send a success response
          return res.status(200).send("Note deleted");
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  });
});

module.exports = route;
