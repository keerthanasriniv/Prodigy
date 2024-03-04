import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TemperatureConverter from './temp'; // Assuming TemperatureConverter component is in a separate file

function App() {
  return (
    <div >
    <Router>
    <Routes>
      <Route path="/" element={<TemperatureConverter/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
