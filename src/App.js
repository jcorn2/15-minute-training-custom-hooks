import React from 'react';
import useChromeStorage from './useChromeStorage';
import './App.css';

function App() {
  const { myName } = useChromeStorage('myName');

  return (
    <div className="App">
      <p>Hi my name is {myName}</p>
    </div>
  );
}

export default App;
