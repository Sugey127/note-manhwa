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

  res.status(404).json({ message: 'Nota no encontrada 1' });
});

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === parseInt(id));

  if (noteIndex !== -1) {
    notes[noteIndex] = { ...notes[noteIndex], ...req.body }; 
    return res.status(200).json(notes[noteIndex]);
  }

  res.status(404).json({ message: 'Nota no encontrada 2' });
});

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find(note => note.id === parseInt(id));

  if (note) {
    return res.status(200).json(note);
  }

  res.status(404).json({ message: 'Nota no encontrada 3 HDBDDFBVF' });
});

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Consulta no proporcionada' });
  }
  const results = notes.filter(note => 
    note.title.toLowerCase().includes(query.toLowerCase()) || 
    note.content.toLowerCase().includes(query.toLowerCase()) || 
    note.category.toLowerCase().includes(query.toLowerCase())
  );
  if (results.length === 0) {
    return res.status(404).json({ message: 'No hay coincidencias' });
  }
  res.status(200).json(results);
});


app.get('/api/filter', (req, res) => {
  const category = req.query.category;
  const results = notes.filter(note => 
  note.category.includes(category)
);
  if (results.length === 0) {
    return res.status(200).json({ message: 'No hay coincidencias' });
  }
  res.status(200).json(results);
});

app.listen(3000, () => {
  console.log('server listen on port', 3000)
});