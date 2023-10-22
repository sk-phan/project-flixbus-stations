import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MapView from './views/MapView';

const App = () => {

  return (
    <div className="App">
      <NavBar/>
      <MapView/>
    </div>
  );
}

export default App;
