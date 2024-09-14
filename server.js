const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: Date.now(),
        title: req.body.title,
        text: req.body.text,
    };

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save note' });
            }
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete note' });
            }
            res.json({ message: 'Note deleted' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});