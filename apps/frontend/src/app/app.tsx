import React, { useState, useEffect } from 'react';
import { ITodo } from '../interfaces/ITodo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_BASE_URL}/api/todos`)
      .then((response) => response.json())
      .then(setTodos)
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  function addTodo() {
    fetch(`http://${import.meta.env.VITE_BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodoTitle }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
      })
      .catch((error) => console.error('Error adding todo:', error));
  }

  function updateTodoTitle(id: number, title: string) {
    fetch(`http://${import.meta.env.VITE_BASE_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      })
      .catch((error) => console.error('Error updating todo:', error));
  }

  function deleteTodo(id: number) {
    fetch(`http://${import.meta.env.VITE_BASE_URL}/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  }

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="New todo title"
      />
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default App;
