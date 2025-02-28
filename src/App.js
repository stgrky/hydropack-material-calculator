import React, { useState } from 'react';

const NewAquariaPricingWithOptions = () => {
  // Updated systems data
  const systems = [
    {
      name: 'Hydropixel',
      systemPrice: 3499,
      installPrice: 0,
      // No shippingPrice, no extras needed
      indoorPlugAndPlay: true,
    },
    {
      name: 'Hydropack S',
      systemPrice: 9999,
      installPrice: 12000,
      shippingPrice: 967.39,
    },
    {
      name: 'Hydropack',
      systemPrice: 17499,
      installPrice: 13750,
      shippingPrice: 1734.77,
    },
    {
      name: 'Hydropack X',
      systemPrice: 29999,
      installPrice: 17500,
      shippingPrice: 2593.47,
    },
  ];

  // State for which system is selected
  const [selectedSystem, setSelectedSystem] = useState(null);

  // Water tank dropdown logic
  const [tankOption, setTankOption] = useState({ label: '', low: 0, high: 0 });
  const tankOptions = [
    { label: '550 Gallon Water Tank', low: 550, high: 1500 },
    { label: '750 Gallon Water Tank', low: 700, high: 2000 },
    { label: '1100 Gallon Water Tank', low: 1200, high: 2200 },
    { label: 'No Water Tank', low: 0, high: 0 },
  ];

  // RPZ checkbox logic
  const [rpzChecked, setRpzChecked] = useState(false);
  const rpzCost = { low: 3900, high: 4800 };

  // Calculate total based on selected system, tank, and RPZ
  const calculateTotal = () => {
    if (!selectedSystem) return null;

    // If it's Hydropixel (indoorPlugAndPlay), it's just $3,499. 
    if (selectedSystem.indoorPlugAndPlay) {
      return {
        low: selectedSystem.systemPrice,
        high: selectedSystem.systemPrice,
      };
    }

    // Otherwise, combine system, install, shipping, tank, and RPZ
    const baseSystem =
      selectedSystem.systemPrice +
      selectedSystem.installPrice +
      (selectedSystem.shippingPrice || 0);

    const tankLow = tankOption.low || 0;
    const tankHigh = tankOption.high || 0;
    const rpzLow = rpzChecked ? rpzCost.low : 0;
    const rpzHigh = rpzChecked ? rpzCost.high : 0;

    return {
      low: baseSystem + tankLow + rpzLow,
      high: baseSystem + tankHigh + rpzHigh,
    };
  };

  const total = calculateTotal();

  return (
    <div className="aquaria-pricing-container">
      <h1>Aquaria System Pricing</h1>

      {/* Clickable Grid of Systems */}
      <div className="systems-container">
        {systems.map((sys, idx) => {
          const isSelected = selectedSystem && selectedSystem.name === sys.name;

          // If Hydropixel, just display the single price
          if (sys.indoorPlugAndPlay) {
            return (
              <div
                key={idx}
                className={`system-section ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedSystem(sys)}
              >
                <h2>{sys.name}</h2>
                <p>
                  <strong>Price:</strong> ${sys.systemPrice.toLocaleString()}
                </p>
              </div>
            );
          }

          // Otherwise, display system, install, shipping, base total
          const baseSystemTotal =
            sys.systemPrice + sys.installPrice + (sys.shippingPrice || 0);

          return (
            <div
              key={idx}
              className={`system-section ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedSystem(sys)}
            >
              <h2>{sys.name}</h2>
              <p>
                <strong>System:</strong> ${sys.systemPrice.toLocaleString()}
              </p>
              <p>
                <strong>Install:</strong> ${sys.installPrice.toLocaleString()}
              </p>
              <p>
                <strong>Shipping &amp; Handling:</strong> $
                {sys.shippingPrice?.toLocaleString() ?? '0.00'}
              </p>
              <p>
                <strong>Base Total:</strong> ${baseSystemTotal.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Hide tank & disclaimers if Hydropixel is selected */}
      {selectedSystem && selectedSystem.indoorPlugAndPlay ? null : (
        <>
          {/* Tank Option and RPZ Checkbox */}
          <div className="dropdown-container">
            <label>Select Water Tank Option:</label>
            <select
              onChange={(e) => {
                const selected = tankOptions.find(
                  (option) => option.high === Number(e.target.value)
                );
                setTankOption(selected || { label: '', low: 0, high: 0 });
              }}
            >
              <option value="0">-- Select an option --</option>
              {tankOptions.map((option, index) => (
                <option key={index} value={option.high}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="checkbox-item">
            <input
              type="checkbox"
              id="rpz"
              checked={rpzChecked}
              onChange={() => setRpzChecked((prev) => !prev)}
            />
            <label htmlFor="rpz">RPZ</label>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer">
            <p>
              <strong>Please note:</strong> The installation price is for 15 to 20 feet
              away from your external main electric panel ONLY. If the installation
              site desired is farther than the distance mentioned above, the installation
              cost may vary. If the agreed location for installation by the homeowner
              requires clearing or proper leveling for proper installation, the cost
              may vary for installation.
            </p>
            <p>This Standard Installation Price includes:</p>
            <ul>
              <li>Concrete pad for Aquaria system and recommended water storage tank.</li>
              <li>
                Electrical connection from Aquaria system to home main external electric
                panel (includes trenching up to 20 ft).
              </li>
              <li>
                Plumbing connection from Aquaria system to water storage tank for
                proper dispensing.
              </li>
              <li>Winterization of all plumbing lines.</li>
              <li>One release valve at the bottom of the water storage tank.</li>
              <li>Activation to Wi-Fi (credentials required).</li>
              <li>One weatherproof external outlet for a possible external water pump.</li>
            </ul>
            <p>
              Any further plumbing from the water storage tank to the main water line
              requires a site evaluation and compliance with permits/municipal
              requirements.
            </p>
          </div>
        </>
      )}

      {/* Display the total if a system is selected */}
      {selectedSystem && (
        <div className="total-container">
          {total && total.low === total.high ? (
            <h2>Total: ${total.low.toLocaleString()}</h2>
          ) : total ? (
            <h2>
              Total: ${total.low.toLocaleString()} - $
              {total.high.toLocaleString()}
            </h2>
          ) : null}
        </div>
      )}

      <style>{`
        .aquaria-pricing-container {
          font-family: Arial, sans-serif;
          margin: 0 auto;
          max-width: 900px;
          padding: 10px;
        }
        
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 10px;
          font-size: 18px;
        }
        
        /* Systems in a grid for compact display */
        .systems-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .system-section {
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 14px;
          line-height: 1.3;
          transition: box-shadow 0.3s;
          cursor: pointer;
        }
        
        .system-section.selected {
          border-color: #61dafb;
          box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.3);
        }
        
        .system-section:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }
        
        .system-section h2 {
          margin: 0 0 4px;
          font-size: 15px;
        }
        
        .system-section p {
          margin: 4px 0;
        }
        
        .dropdown-container {
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .dropdown-container label {
          font-weight: bold;
          display: block;
          margin-bottom: 3px;
        }
        
        .dropdown-container select {
          width: 100%;
          padding: 6px;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 14px;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .checkbox-item label {
          font-weight: bold;
        }
        
        .disclaimer {
          background-color: #fff8e1;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ffd600;
          margin-bottom: 10px;
          font-size: 13px;
          line-height: 1.3;
        }
        
        .disclaimer strong {
          color: #e65100;
        }
        
        .disclaimer ul {
          list-style-type: disc;
          margin: 5px 0 5px 20px;
        }
        
        .disclaimer li {
          margin-bottom: 3px;
        }
        
        .total-container {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          background: #61dafb;
          color: white;
          padding: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default NewAquariaPricingWithOptions;
