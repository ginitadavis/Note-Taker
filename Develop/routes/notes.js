const notes = require('express').Router();
const uuid = require('uuid');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/:id', (req, res) => {
    const varId = req.params.title;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.title === varId);
        return result.length > 0
          ? res.json(result)
          : res.json('That title does not exist');
      });
  });

  // DELETE Route for a specific tip
notes.delete('/:id', (req, res) => {
    const varId = req.params.id;

  console.log("ID selected by the user " + varId);

    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the title provided in the URL
        const result = json.filter((notes) => notes.id !== varId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Note ${id} has been deleted 🗑️`);
      });
  });

  // POST Route for a new UX/UI note
notes.post('/', (req, res) => {

    let id = uuid.v4();
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTitle = {
        id,
        title,
        text,
      };

      console.log('new title ' + newTitle.id, newTitle.title, newTitle.text);
  
      readAndAppend(newTitle, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

  module.exports = notes;

  /*
  
  [
    {
        "id":"1",
        "title":"Test Title",
        "text":"Test text"
    }
]

  */