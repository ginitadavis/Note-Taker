
// configure an express file
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

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

//Routes for "get" /api/notes "post" /api/notes and "delete" /api/notes/:id are in routes / notes.js

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// start the server (listen)
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)