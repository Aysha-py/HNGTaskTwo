import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import MovieDetails from './Pages/MovieDetails';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="movies/:id" element={<MovieDetails />} />
        </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
