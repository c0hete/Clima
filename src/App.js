import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/index.js';
import Home from './components/home/index.js';
import Details from './components/details/index.js';
import Weather from './components/weather/index.js';
import Error from './components/error/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="*" element={<Error />} /> {/* Página de error para rutas no encontradas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
