/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import mysql from 'mysql2';
import todoRouter from './todo.controller';
import cors from 'cors';

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'todo_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database.');
  }
});

app.set('db', db);

// Routes
app.use('/api/todos', todoRouter);

const port = process.env.BACKEND_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
