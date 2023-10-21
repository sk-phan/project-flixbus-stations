import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.digitransit.fi/timetables/v1/hsl', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Authorization': '8bb8bdaa0fff47d5a5a3a2702c50c596', // Replace with your actual access token if needed
            'digitransit-subscription-key': '8bb8bdaa0fff47d5a5a3a2702c50c596', // Replace with your API key
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
