import axios from 'axios';

import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await axios.post('https://fashsta-rest-test.herokuapp.com/users', {
      email,
      name,
    });

    setMessage(result.data.message);
  }

  useEffect(() => {
    axios.get('https://fashsta-rest-test.herokuapp.com/users', { email, name }).then((result) => {
      setUsers(result.data);
    });

    return () => {
      setTimeout(() => setMessage(''), 1000);
    };
  }, [message, email, name]);

  return (
    <div className="asdadsfasd">
      <h1>Welcome to fashsta</h1>
      <h4>{message}</h4>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          name="email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button type="submit">Signup</button>
      </form>

      <h3>Users List</h3>
      {users.map((user, i) => (
        <div
          key={user.email + i}
          style={{
            border: '1px solid white',
            background: 'rgba(59, 100, 150, 0.5)',
            width: 150,
            height: 150,
            margin: 10,
          }}
        >
          <div>{user.email}</div>
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
