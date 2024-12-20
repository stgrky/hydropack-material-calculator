import React, { useState } from 'react';

const Calculator = () => {
  const [padOption, setPadOption] = useState(0);
  const [tankOption, setTankOption] = useState(0);
  const [extras, setExtras] = useState({
    plumbingElectric: false,
    externalPump: false,
    rpz: false,
  });

  const padOptions = [
    { label: 'Hydropack S Concrete Pad with water Tank', value: 3000 },
    { label: 'Hydropack S Concrete Pad - No water Tank site', value: 1800 },
    { label: 'Hydropack Concrete Pad with water Tank site', value: 3500 },
    { label: 'Hydropack Concrete Pad - No water Tank site', value: 2500 },
    { label: 'Hydropack X concrete pad with water Tank site', value: 5500 },
    { label: 'Hydropack X concrete pad - No water Tank', value: 3800 },
  ];

  const tankOptions = [
    { label: '550 Gallon Water Tank', value: 1250 },
    { label: '750 Gallon Water Tank', value: 1650 },
    { label: '1100 Gallon Water Tank', value: 1875 },
    { label: 'No water tank', value: 0 },
  ];

  const extraOptions = [
    { label: 'Plumbing and Electric - 15ft', value: 3000, key: 'plumbingElectric' },
    { label: 'External Pump', value: 3600, key: 'externalPump' },
    { label: 'RPZ', value: 3800, key: 'rpz' },
  ];

  const handleExtraChange = (key) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [key]: !prevExtras[key],
    }));
  };

  const calculateTotal = () => {
    const extrasTotal = extraOptions.reduce((sum, extra) => (
      extras[extra.key] ? sum + extra.value : sum
    ), 0);

    return padOption + tankOption + extrasTotal;
  };

  return (
    <div className="calculator-container">
      <h1>Concrete Pad Installation Calculator</h1>

      <div className="dropdown">
        <label htmlFor="padOptions">Select Concrete Pad Option:</label>
        <select
          id="padOptions"
          onChange={(e) => setPadOption(Number(e.target.value))}
        >
          <option value="0">-- Select an option --</option>
          {padOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label} - ${option.value.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="tankOptions">Select Water Tank Option:</label>
        <select
          id="tankOptions"
          onChange={(e) => setTankOption(Number(e.target.value))}
        >
          <option value="0">-- Select an option --</option>
          {tankOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label} - ${option.value.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="checkboxes">
        <p>Optional Extras:</p>
        {extraOptions.map((extra) => (
          <div key={extra.key}>
            <input
              type="checkbox"
              id={extra.key}
              checked={extras[extra.key]}
              onChange={() => handleExtraChange(extra.key)}
            />
            <label htmlFor={extra.key}>{extra.label} - ${extra.value.toLocaleString()}</label>
          </div>
        ))}
      </div>

      <div className="total">
        <h2>Total: ${calculateTotal().toLocaleString()}</h2>
      </div>

      <style jsx>{`
        .calculator-container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
        }

        .dropdown, .checkboxes, .total {
          margin-bottom: 20px;
        }

        select, input[type="checkbox"] {
          margin-right: 10px;
        }

        label {
          margin-right: 10px;
        }

        .total h2 {
          text-align: center;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Calculator;
