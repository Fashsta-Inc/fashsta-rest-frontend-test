import axios from "axios";

import { useEffect, useState } from "react";

import "./App.css";

import UsersList from "./UsersList"


function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await axios.post(
      "https://fashsta-rest-test.herokuapp.com/users",
      {
        email,
        name,
      }
    );

    setMessage(result.data.message);
  }

  useEffect(() => {
    axios
      .get("https://fashsta-rest-test.herokuapp.com/users", { name, email })
      .then((result) => {
        setUsers([...result.data]);
      });

    return () => {
      setTimeout(() => setMessage(""), 1000);
    };
  }, [message, email, name]);

  return (
    <div className="asdadsfasd">
      <h1>Welcome to fashsta</h1>
      <div style={{width: "70%", margin:"auto", height:"40px", textAlign: "center"}}>
      <h4 style={{width: "70%", color:"green", margin:"auto"}}>{message}</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          id="userName"
          name="name"
          type="text"
          placeholder="enter name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          id="userEmail"
          name="email"
          type="email"
          placeholder="enter email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button id="update" type="submit">Signup</button>
      </form>

      <h3 style={{width: '100%'}}>Users List</h3>
      {users.map((user, i) => (
        <div
          id="users"
          key={user.email + i}
        >
          <div 
          style={{
            width:'100%',
          }}>
            <UsersList 
              name={user.name}
              email={user.email}
              user={user}
              refresh={handleSubmit}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
