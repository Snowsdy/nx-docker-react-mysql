import { Router } from 'express';
import { ITodo } from './types/todo.types';

const router = Router();

// Create a new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  const db = req.app.get('db');

  db.query('INSERT INTO todos (title) VALUES (?)', [title], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const newTodo: ITodo = { id: results.insertId, title };
      res.status(201).json(newTodo);
    }
  });
});

// Get all todos
router.get('/', (req, res) => {
  const db = req.app.get('db');

  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get a single todo by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const db = req.app.get('db');

  db.query('SELECT * FROM todos WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a todo by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const db = req.app.get('db');

  db.query('UPDATE todos SET title = ? WHERE id = ?', [title, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ id, title });
    }
  });
});

// Delete a todo by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const db = req.app.get('db');

  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

export default router;
