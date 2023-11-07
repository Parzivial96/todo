import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
 const [todos, setTodos] = useState([]);
 const [inputText, setInputText] = useState('');

 const handleChange = (e) => {
    setInputText(e.target.value);
 };

 const addTodo = (e) => {
    e.preventDefault();
    if (inputText === '') {
      alert('Please enter a task');
      return;
    }
    const newTodo = { id: Date.now(), text: inputText };
    setTodos([...todos, newTodo]);
    setInputText('');
 };

 const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
 };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://ctssso.onrender.com/home');
      const data = response.data;

      // Set the cookie
      Cookies.set('ssoToken', JSON.stringify(data), { expires: 7 });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

 return (
    <div className="App">
      <a href="https://ctssso.onrender.com/login?target=http://localhost:3000">Login</a>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter a task"
          value={inputText}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
 );
}

export default App;