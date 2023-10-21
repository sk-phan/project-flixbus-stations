import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MapView from './views/MapView';
import MapP from './components/MapP';

const App = () => {

  return (
    <div className="App">
      {/* <MapP/> */}
      <NavBar/>
      <MapView/>
    </div>
  );
}

export default App;
