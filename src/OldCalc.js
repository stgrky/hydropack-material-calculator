import React, { useState } from "react";

const Calculator = () => {
  const [unitOption, setUnitOption] = useState(0);
  const [padOption, setPadOption] = useState({ low: 0, high: 0 });
  const [tankOption, setTankOption] = useState({ low: 0, high: 0 });
  const [extras, setExtras] = useState({
    plumbingElectric: false,
    externalPump: false,
    rpz: false,
  });

  const unitOptions = [
    { label: "Hydropack S", value: 9999 },
    { label: "Hydropack", value: 17499 },
    { label: "Hydropack X", value: 29999 },
  ];

  const padOptions = [
    { id: "noPad", label: "No Concrete Pad", low: 0, high: 0 },
    {
      id: "pad1",
      label: "Hydropack S, machine and tank",
      low: 2200,
      high: 3000,
    },
    {
      id: "pad2",
      label: "Hydropack S, machine only",
      low: 1000,
      high: 1800,
    },
    {
      id: "pad3",
      label: "Hydropack, machine and tank",
      low: 2700,
      high: 3500,
    },
    {
      id: "pad4",
      label: "Hydropack, machine only",
      low: 1700,
      high: 2500,
    },
    {
      id: "pad5",
      label: "Hydropack X, machine and tank",
      low: 4700,
      high: 5500,
    },
    {
      id: "pad6",
      label: "Hydropack X, machine only",
      low: 3000,
      high: 3800,
    },
  ];

  const tankOptions = [
    { label: "550 Gallon Water Tank", low: 550, high: 1500 },
    { label: "750 Gallon Water Tank", low: 700, high: 2000 },
    { label: "1100 Gallon Water Tank", low: 1200, high: 2200 },
    { label: "No Water Tank", low: 0, high: 0 },
  ];

  const extraOptions = [
    {
      label: "Plumbing and Electric (15ft)",
      low: 1200,
      high: 4000,
      key: "plumbingElectric",
    },
    {
      label: "External Pump",
      low: 2500,
      high: 4500,
      key: "externalPump",
    },
    { label: "RPZ", low: 3900, high: 4800, key: "rpz" },
  ];

  const handleExtraChange = (key) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [key]: !prevExtras[key],
    }));
  };

  const calculateTotal = () => {
    const extrasTotal = extraOptions.reduce(
      (sum, extra) => ({
        low: sum.low + (extras[extra.key] ? extra.low : 0),
        high: sum.high + (extras[extra.key] ? extra.high : 0),
      }),
      { low: 0, high: 0 }
    );

    return {
      low: unitOption + padOption.low + tankOption.low + extrasTotal.low,
      high: unitOption + padOption.high + tankOption.high + extrasTotal.high,
    };
  };

  const total = calculateTotal();

  // Build an itemized breakdown for selected options
  const breakdownItems = [];

  // Unit
  if (unitOption !== 0) {
    const selectedUnit = unitOptions.find(
      (option) => option.value === unitOption
    );
    if (selectedUnit) {
      breakdownItems.push({
        label: `Unit: ${selectedUnit.label}`,
        cost: `$${selectedUnit.value.toLocaleString()}`,
      });
    }
  }

  // Concrete Pad - only add if a pad is selected and it's not "No Concrete Pad"
  if (padOption.label && padOption.label !== "No Concrete Pad") {
    breakdownItems.push({
      label: `Concrete Pad: ${padOption.label}`,
      cost: `$${padOption.low.toLocaleString()} - $${padOption.high.toLocaleString()}`,
    });
  }

  // Water Tank - only display if a water tank is selected and it's not "No Water Tank"
  if (tankOption.label && tankOption.label !== "No Water Tank") {
    breakdownItems.push({
      label: `Water Tank: ${tankOption.label}`,
      cost: `$${tankOption.low.toLocaleString()} - $${tankOption.high.toLocaleString()}`,
    });
  }

  // Optional Extras
  extraOptions.forEach((extra) => {
    if (extras[extra.key]) {
      breakdownItems.push({
        label: extra.label,
        cost: `$${extra.low.toLocaleString()} - $${extra.high.toLocaleString()}`,
      });
    }
  });

  // Determine display for total
  const onlyUnitSelected =
    unitOption !== 0 &&
    !padOption.label &&
    !tankOption.label &&
    !extras.plumbingElectric &&
    !extras.externalPump &&
    !extras.rpz;

  let displayTotal = "";
  if (total.low === 0 && total.high === 0) {
    displayTotal = "$0";
  } else if (onlyUnitSelected) {
    displayTotal = `$${unitOption.toLocaleString()}`;
  } else {
    displayTotal = `$${total.low.toLocaleString()} - $${total.high.toLocaleString()}`;
  }

  return (
    <div className="wrapper">
      <div className="calculator-container">
        <h1>Aquaria Contractor Installation Calculator</h1>

        <div className="dropdown-container">
          <label>Select Unit:</label>
          <select onChange={(e) => setUnitOption(Number(e.target.value))}>
            <option value="0">-- Select an option --</option>
            {unitOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          <label>Select Concrete Pad Option:</label>
          <select
            onChange={(e) => {
              if (e.target.value === "") {
                setPadOption({ low: 0, high: 0 });
              } else {
                const selected = padOptions.find(
                  (option) => option.id === e.target.value
                );
                setPadOption(selected || { low: 0, high: 0 });
              }
            }}
          >
            <option value="">-- Select an option --</option>
            {padOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          <label>Select Water Tank Option:</label>
          <select
            onChange={(e) => {
              const selected = tankOptions.find(
                (option) => option.high === Number(e.target.value)
              );
              setTankOption(selected || { low: 0, high: 0 });
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

        <div className="checkboxes">
          <p>Optional Extras:</p>
          {extraOptions.map((extra) => (
            <div className="checkbox-item" key={extra.key}>
              <input
                type="checkbox"
                id={extra.key}
                checked={extras[extra.key]}
                onChange={() => handleExtraChange(extra.key)}
              />
              <label htmlFor={extra.key}>{extra.label}</label>
            </div>
          ))}
        </div>

        {/* Itemized List */}
        <div className="itemized-list">
          <h3>Itemized Breakdown</h3>
          {breakdownItems.length > 0 ? (
            <ul>
              {breakdownItems.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.label}:</strong> {item.cost}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items selected.</p>
          )}
        </div>

        <div className="total">
          <h2>Total: {displayTotal}</h2>
        </div>
      </div>
      <style>{`
        /* Wrapper to center the calculator on mobile/tablet */
        .wrapper {
          width: 100%;
        }
        @media (max-width: 1024px) {
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
        }
        .calculator-container {
          font-family: Arial, sans-serif;
          background: white;
          max-width: 500px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          margin: 0 auto;
        }
        h1 {
          text-align: center;
          color: #333;
        }
        .dropdown-container, .checkboxes {
          margin-bottom: 15px;
        }
        label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }
        select {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 16px;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .itemized-list {
          height: 220px;
          overflow-y: auto;
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 20px;
          background-color: #f9f9f9;
        }
        .itemized-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .itemized-list li {
          margin-bottom: 5px;
        }
        .total {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          background: #61dafb;
          color: white;
          padding: 10px;
          border-radius: 5px;
        }
        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .calculator-container {
            padding: 15px;
            margin: 10px;
          }
          h1 {
            font-size: 1.5em;
          }
          select {
            font-size: 14px;
            padding: 8px;
          }
          .checkbox-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .total {
            font-size: 18px;
            padding: 8px;
          }
          .itemized-list {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;


// import React, { useState } from 'react';

// const NewAquariaPricingWithOptions = () => {
//   // Updated systems data
//   const systems = [
//     {
//       name: 'Hydropixel',
//       systemPrice: 3499,
//       installPrice: 0,
//       // No shippingPrice, no extras needed
//       indoorPlugAndPlay: true,
//     },
//     {
//       name: 'Hydropack S',
//       systemPrice: 9999,
//       installPrice: 12000,
//       shippingPrice: 967.39,
//     },
//     {
//       name: 'Hydropack',
//       systemPrice: 17499,
//       installPrice: 13750,
//       shippingPrice: 1734.77,
//     },
//     {
//       name: 'Hydropack X',
//       systemPrice: 29999,
//       installPrice: 17500,
//       shippingPrice: 2593.47,
//     },
//   ];

//   // State for which system is selected
//   const [selectedSystem, setSelectedSystem] = useState(null);

//   // Water tank dropdown logic
//   const [tankOption, setTankOption] = useState({ label: '', low: 0, high: 0 });
//   const tankOptions = [
//     { label: '550 Gallon Water Tank', low: 550, high: 1500 },
//     { label: '750 Gallon Water Tank', low: 700, high: 2000 },
//     { label: '1100 Gallon Water Tank', low: 1200, high: 2200 },
//     { label: 'No Water Tank', low: 0, high: 0 },
//   ];

//   // RPZ checkbox logic
//   const [rpzChecked, setRpzChecked] = useState(false);
//   const rpzCost = { low: 3900, high: 4800 };

//   // Calculate total based on selected system, tank, and RPZ
//   const calculateTotal = () => {
//     if (!selectedSystem) return null;

//     // If it's Hydropixel (indoorPlugAndPlay), it's just $3,499. 
//     if (selectedSystem.indoorPlugAndPlay) {
//       return {
//         low: selectedSystem.systemPrice,
//         high: selectedSystem.systemPrice,
//       };
//     }

//     // Otherwise, combine system, install, shipping, tank, and RPZ
//     const baseSystem =
//       selectedSystem.systemPrice +
//       selectedSystem.installPrice +
//       (selectedSystem.shippingPrice || 0);

//     const tankLow = tankOption.low || 0;
//     const tankHigh = tankOption.high || 0;
//     const rpzLow = rpzChecked ? rpzCost.low : 0;
//     const rpzHigh = rpzChecked ? rpzCost.high : 0;

//     return {
//       low: baseSystem + tankLow + rpzLow,
//       high: baseSystem + tankHigh + rpzHigh,
//     };
//   };

//   const total = calculateTotal();

//   return (
//     <div className="aquaria-pricing-container">
//       <h1>Aquaria System Pricing</h1>

//       {/* Clickable Grid of Systems */}
//       <div className="systems-container">
//         {systems.map((sys, idx) => {
//           const isSelected = selectedSystem && selectedSystem.name === sys.name;

//           // If Hydropixel, just display the single price
//           if (sys.indoorPlugAndPlay) {
//             return (
//               <div
//                 key={idx}
//                 className={`system-section ${isSelected ? 'selected' : ''}`}
//                 onClick={() => setSelectedSystem(sys)}
//               >
//                 <h2>{sys.name}</h2>
//                 <p>
//                   <strong>Price:</strong> ${sys.systemPrice.toLocaleString()}
//                 </p>
//               </div>
//             );
//           }

//           // Otherwise, display system, install, shipping, base total
//           const baseSystemTotal =
//             sys.systemPrice + sys.installPrice + (sys.shippingPrice || 0);

//           return (
//             <div
//               key={idx}
//               className={`system-section ${isSelected ? 'selected' : ''}`}
//               onClick={() => setSelectedSystem(sys)}
//             >
//               <h2>{sys.name}</h2>
//               <p>
//                 <strong>System:</strong> ${sys.systemPrice.toLocaleString()}
//               </p>
//               <p>
//                 <strong>Install:</strong> ${sys.installPrice.toLocaleString()}
//               </p>
//               <p>
//                 <strong>Shipping &amp; Handling:</strong> $
//                 {sys.shippingPrice?.toLocaleString() ?? '0.00'}
//               </p>
//               <p>
//                 <strong>Base Total:</strong> ${baseSystemTotal.toLocaleString()}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Hide tank & disclaimers if Hydropixel is selected */}
//       {selectedSystem && selectedSystem.indoorPlugAndPlay ? null : (
//         <>
//           {/* Tank Option and RPZ Checkbox */}
//           <div className="dropdown-container">
//             <label>Select Water Tank Option:</label>
//             <select
//               onChange={(e) => {
//                 const selected = tankOptions.find(
//                   (option) => option.high === Number(e.target.value)
//                 );
//                 setTankOption(selected || { label: '', low: 0, high: 0 });
//               }}
//             >
//               <option value="0">-- Select an option --</option>
//               {tankOptions.map((option, index) => (
//                 <option key={index} value={option.high}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="checkbox-item">
//             <input
//               type="checkbox"
//               id="rpz"
//               checked={rpzChecked}
//               onChange={() => setRpzChecked((prev) => !prev)}
//             />
//             <label htmlFor="rpz">RPZ</label>
//           </div>

//           {/* Disclaimer */}
//           <div className="disclaimer">
//             <p>
//               <strong>Please note:</strong> The installation price is for 15 to 20 feet
//               away from your external main electric panel ONLY. If the installation
//               site desired is farther than the distance mentioned above, the installation
//               cost may vary. If the agreed location for installation by the homeowner
//               requires clearing or proper leveling for proper installation, the cost
//               may vary for installation.
//             </p>
//             <p>This Standard Installation Price includes:</p>
//             <ul>
//               <li>Concrete pad for Aquaria system and recommended water storage tank.</li>
//               <li>
//                 Electrical connection from Aquaria system to home main external electric
//                 panel (includes trenching up to 20 ft).
//               </li>
//               <li>
//                 Plumbing connection from Aquaria system to water storage tank for
//                 proper dispensing.
//               </li>
//               <li>Winterization of all plumbing lines.</li>
//               <li>One release valve at the bottom of the water storage tank.</li>
//               <li>Activation to Wi-Fi (credentials required).</li>
//               <li>One weatherproof external outlet for a possible external water pump.</li>
//             </ul>
//             <p>
//               Any further plumbing from the water storage tank to the main water line
//               requires a site evaluation and compliance with permits/municipal
//               requirements.
//             </p>
//           </div>
//         </>
//       )}

//       {/* Display the total if a system is selected */}
//       {selectedSystem && (
//         <div className="total-container">
//           {total && total.low === total.high ? (
//             <h2>Total: ${total.low.toLocaleString()}</h2>
//           ) : total ? (
//             <h2>
//               Total: ${total.low.toLocaleString()} - $
//               {total.high.toLocaleString()}
//             </h2>
//           ) : null}
//         </div>
//       )}

//       <style>{`
//         .aquaria-pricing-container {
//           font-family: Arial, sans-serif;
//           margin: 0 auto;
//           max-width: 900px;
//           padding: 10px;
//         }
        
//         h1 {
//           text-align: center;
//           color: #333;
//           margin-bottom: 10px;
//           font-size: 18px;
//         }
        
//         /* Systems in a grid for compact display */
//         .systems-container {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//           gap: 10px;
//           margin-bottom: 10px;
//         }
        
//         .system-section {
//           background-color: #f9f9f9;
//           padding: 10px;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//           line-height: 1.3;
//           transition: box-shadow 0.3s;
//           cursor: pointer;
//         }
        
//         .system-section.selected {
//           border-color: #61dafb;
//           box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.3);
//         }
        
//         .system-section:hover {
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
//         }
        
//         .system-section h2 {
//           margin: 0 0 4px;
//           font-size: 15px;
//         }
        
//         .system-section p {
//           margin: 4px 0;
//         }
        
//         .dropdown-container {
//           margin-bottom: 10px;
//           font-size: 14px;
//         }
        
//         .dropdown-container label {
//           font-weight: bold;
//           display: block;
//           margin-bottom: 3px;
//         }
        
//         .dropdown-container select {
//           width: 100%;
//           padding: 6px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//         }
        
//         .checkbox-item {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           margin-bottom: 10px;
//           font-size: 14px;
//         }
        
//         .checkbox-item label {
//           font-weight: bold;
//         }
        
//         .disclaimer {
//           background-color: #fff8e1;
//           padding: 8px;
//           border-radius: 5px;
//           border: 1px solid #ffd600;
//           margin-bottom: 10px;
//           font-size: 13px;
//           line-height: 1.3;
//         }
        
//         .disclaimer strong {
//           color: #e65100;
//         }
        
//         .disclaimer ul {
//           list-style-type: disc;
//           margin: 5px 0 5px 20px;
//         }
        
//         .disclaimer li {
//           margin-bottom: 3px;
//         }
        
//         .total-container {
//           text-align: center;
//           font-size: 16px;
//           font-weight: bold;
//           background: #61dafb;
//           color: white;
//           padding: 8px;
//           border-radius: 4px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NewAquariaPricingWithOptions;

