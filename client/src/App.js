import React from 'react';
import './App.css';
import DashboardHeader from './DashboardLayout/DashboardHeader';
import WeatherModule from './Weather/WeatherModule';
import NewsModule from './NewsModule';
import PurifierModule from './PurifierModule';

const API_URL = "http://localhost:3005";

function App() {
  return (
    <div className="App">
      <DashboardHeader name="Unity Dashboard" />      
      <main className="App-body">  
        <WeatherModule size="App-widget-small"/>
        <NewsModule />
        <PurifierModule />
      </main>
    </div>
  );
}

export default App;
