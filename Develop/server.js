
// configure an express file
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

 const savedNotes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);


app.use(express.static('public'));

// Get route for retrieving the notes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// get '/notes' -> html page for notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// //get 'api/notes' -> return json about all your notes


// app.get('api/notes', (req, res) => 
//     res.json(savedNotes)
// );


// post 'api/notes' -> update your db(json file)


// app.post('api/notes', (req, res) => {

//     console.info(`${req.method} request received to add a note`);

//     const {noteTitle, note} = req.body;

//     if (noteTitle && note) {
//         const newNote = {
//             noteTitle,
//             note,
//         };

//         const response = {
//             status: 'success',
//             body: newNote,
//         };

//         console.log(response);
//         res.status(500).json('Error in creating a note');
//     }
// });

/*
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))
);
*/


app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// start the server (listen)
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)