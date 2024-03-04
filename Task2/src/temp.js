import React, { useState } from 'react';
import './temp.css';

function TemperatureConverter() {
  const [temperature, setTemperature] = useState('');
  const [originalUnit, setOriginalUnit] = useState('celsius');
  const [convertedTemperatures, setConvertedTemperatures] = useState({
    celsius: '',
    fahrenheit: '',
    kelvin: ''
  });

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleUnitChange = (e) => {
    setOriginalUnit(e.target.value);
  };

  const convertTemperature = () => {
    if (temperature !== '') {
      let celsiusTemp, fahrenheitTemp, kelvinTemp;

      switch (originalUnit) {
        case 'celsius':
          celsiusTemp = parseFloat(temperature);
          fahrenheitTemp = (celsiusTemp * 9/5) + 32;
          kelvinTemp = celsiusTemp + 273.15;
          break;
        case 'fahrenheit':
          fahrenheitTemp = parseFloat(temperature);
          celsiusTemp = (fahrenheitTemp - 32) * 5/9;
          kelvinTemp = (fahrenheitTemp - 32) * 5/9 + 273.15;
          break;
        case 'kelvin':
          kelvinTemp = parseFloat(temperature);
          celsiusTemp = kelvinTemp - 273.15;
          fahrenheitTemp = (kelvinTemp - 273.15) * 9/5 + 32;
          break;
        default:
          break;
      }

      setConvertedTemperatures({
        celsius: celsiusTemp.toFixed(2),
        fahrenheit: fahrenheitTemp.toFixed(2),
        kelvin: kelvinTemp.toFixed(2)
      });
    }
  };

  return (
    <div className="TemperatureConverter">
      <h2 className="title">Temperature Converter</h2>
      <div className="input-container">
        <label>
          <b>Enter Temperature:</b>
          <br></br>
          <br/>
          <input className="temperature-input" type="number" value={temperature} onChange={handleTemperatureChange} />
        </label>
      </div>
      <div className="input-container">
        <label>
          <b>Select Unit:</b>
          <br></br>
          <br/>
          <select className="unit-select" value={originalUnit} onChange={handleUnitChange}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </label>
      </div>
      <br/>
      <button className="convert-button" onClick={convertTemperature}>Convert</button>
      <div className="converted-temperatures">
        <h3>Converted Temperatures:</h3>
        <p><strong>Celsius: </strong><span className="temperature2">{convertedTemperatures.celsius}</span></p>
        <p><strong>Fahrenheit: </strong><span className="temperature2">{convertedTemperatures.fahrenheit}</span></p>
        <p><strong>Kelvin: </strong><span className="temperature2">{convertedTemperatures.kelvin}</span></p>
      </div>
    </div>
  );
}

export default TemperatureConverter;
