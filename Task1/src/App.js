import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sudoku from './sudoku'; // Assuming TemperatureConverter component is in a separate file

function App() {
  return (
    <div >
    <Router>
    <Routes>
      <Route path="/" element={<Sudoku/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
