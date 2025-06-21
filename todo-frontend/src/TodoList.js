import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:3000/api/v1/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (title.trim()) {
      await axios.post('http://localhost:3000/api/v1/todos', {
        todo: { title, completed: false }
      });
      setTitle("");
      fetchTodos();
    }
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`http://localhost:3000/api/v1/todos/${id}`, {
      todo: { completed: !completed }
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>TODO List</h1>
      <input
        type="text"
        value={title}
        placeholder="Enter task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
