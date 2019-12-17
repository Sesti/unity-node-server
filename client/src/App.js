import React from 'react';
import './App.css';
import WeatherModule from './Weather/WeatherModule';
import NewsModule from './NewsModule';
import PurifierModule from './PurifierModule';

const API_URL = "http://localhost:3005";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Unity dashboard</h1>  
      </header>
      <main className="App-body">  
        <WeatherModule size="App-widget-small"/>
        <NewsModule />
        <PurifierModule />
      </main>
    </div>
  );
}

export default App;
