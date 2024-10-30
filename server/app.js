import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const notes = [];

app.post('/api/notes', (req, res) => {
  notes.push(req.body);
  res.status(201).json('hello world')
})

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === parseInt(id));

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    return res.status(204).send(); 
  }

  res.status(404).json({ message: 'Nota no encontrada' });
});

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === parseInt(id));

  if (noteIndex !== -1) {
    notes[noteIndex] = { ...notes[noteIndex], ...req.body }; 
    return res.status(200).json(notes[noteIndex]);
  }

  res.status(404).json({ message: 'Nota no encontrada' });
});

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find(note => note.id === parseInt(id));

  if (note) {
    return res.status(200).json(note);
  }

  res.status(404).json({ message: 'Nota no encontrada' });
});

app.get('/api/notes/search', (req, res) => {
  const { query } = req.query;
  const results = notes.filter(note => 
    note.title.includes(query) || note.content.includes(query) || note.category.includes(query)
  );
  res.status(200).json(results);
});

app.listen(3000, () => {
  console.log('server listen on port', 3000)
});