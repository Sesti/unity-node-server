import React from 'react';
import './App.css';
import WeatherModule from './WeatherModule';
import NewsModule from './NewsModule';
import PurifierModule from './PurifierModule';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Unity dashboard</h1>  
      </header>
      <main className="App-body">  
        <WeatherModule />
        <NewsModule />
        <PurifierModule />
      </main>
    </div>
  );
}

export default App;
