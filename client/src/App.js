import React from 'react';
import './App.css';
import DashboardHeader from './DashboardLayout/DashboardHeader';
import WeatherModule from './Modules/Weather/WeatherModule';
import NewsModule from './Modules/News/NewsModule';
import PurifierModule from './Modules/Purifier/PurifierModule';
import DashboardContent from './DashboardLayout/DashboardContent';
import SpotifyModule from './Modules/Spotify/SpotifyModule';
import PlugModule from './Modules/Plug/PlugModule';

const API_URL = "http://localhost:3005";

function App() {
  return (
    <div className="App">
      <DashboardHeader name="Unity Dashboard" />
      <DashboardContent>
        <WeatherModule url={API_URL} />
        <NewsModule url={API_URL} />
        <PurifierModule url={API_URL} />
        <PlugModule url={API_URL} />
        <SpotifyModule url={API_URL} />
      </DashboardContent>
    </div>
  );
}

export default App;
