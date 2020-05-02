import React from 'react';
import useFetch from './useFetch';
import './App.css';

function App() {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading data</p>
      </div>
    );
  }

  return (
    <div className="App">
      {
        data.map((user) => (
          <div key={user.id} className="user">
            <span>{user.name}</span>
            <span>{user.username}</span>
            <span>{user.email}</span>
          </div>
        ))
      }
    </div>
  );
}

export default App;
