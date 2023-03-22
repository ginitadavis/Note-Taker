const notes = require('express').Router();

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // res.sendFile(path.join(__dirname, '../public/index.html'))
});

// GET Route for a specific note
notes.get('/:title', (req, res) => {
    const varTitle = req.params.title;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.title === varTitle);
        return result.length > 0
          ? res.json(result)
          : res.json('That title does not exist');
      });
  });

  // DELETE Route for a specific tip
notes.delete('/:title', (req, res) => {
    const varTitle = req.params.title;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the title provided in the URL
        const result = json.filter((notes) => notes.title !== varTitle);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Note ${title} has been deleted 🗑️`);
      });
  });

  // POST Route for a new UX/UI note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTitle = {
        title,
        text,
      };
  
      readAndAppend(newTitle, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

  module.exports = notes;