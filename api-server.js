// Simple Express API for articles
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let articles = [
  { id: 1, title: 'Sample Article 1', content: 'This is a sample article.', journalistId: 101, categoryId: 201 },
  { id: 2, title: 'Sample Article 2', content: 'Another sample article.', journalistId: 102, categoryId: 202 }
];

// Get all articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// Create a new article
app.post('/api/articles', (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  const newArticle = {
    id: articles.length ? articles[articles.length - 1].id + 1 : 1,
    title,
    content,
    journalistId,
    categoryId
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// Delete an article
app.delete('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  articles = articles.filter(article => article.id !== id);
  res.status(204).end();
});

// Update an article
app.put('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, content, journalistId, categoryId } = req.body;
  const idx = articles.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  articles[idx] = { id, title, content, journalistId, categoryId };
  res.json(articles[idx]);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
