"use client";

import { useState } from "react";

export default function Home() {
  const unitOptions = ["Hydropack S", "Hydropack", "Hydropack X"];
  const installationOptions = [
    "Machine Only Purchase",
    "Connection to Tank Only",
    "Plumbing into House Needed",
  ];

  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0]);
  const [selectedInstallation, setSelectedInstallation] = useState(
    installationOptions[0]
  );

  const machineOnlyData = {
    "Hydropack S": {
      total: 10966,
      unitCost: 9999,
      shipping: 967,
      financing: [
        { term: "10-year", price: 133 },
        { term: "15-year", price: 105 },
        { term: "20-year", price: 92 },
      ],
    },
    Hydropack: {
      total: 19234,
      unitCost: 17499,
      shipping: 1735,
      financing: [
        { term: "10-year", price: 233 },
        { term: "15-year", price: 184 },
        { term: "20-year", price: 161 },
      ],
    },
    "Hydropack X": {
      total: 32592,
      unitCost: 29999,
      shipping: 2593,
      financing: [
        { term: "10-year", price: 396 },
        { term: "15-year", price: 312 },
        { term: "20-year", price: 273 },
      ],
    },
  };

  const connectionToTankData = {
    "Hydropack S": {
      total: 22966,
      unitCost: 9999,
      shipping: 967.39,
      install: 12000,
      financing: [
        { term: "10-year", price: 279 },
        { term: "15-year", price: 220 },
        { term: "20-year", price: 192 },
      ],
    },
    Hydropack: {
      total: 32984,
      unitCost: 17499,
      shipping: 1735,
      install: 13750,
      financing: [
        { term: "10-year", price: 400 },
        { term: "15-year", price: 315 },
        { term: "20-year", price: 276 },
      ],
    },
    "Hydropack X": {
      total: 50092,
      unitCost: 29999,
      shipping: 2593,
      install: 17500,
      financing: [
        { term: "10-year", price: 608 },
        { term: "15-year", price: 479 },
        { term: "20-year", price: 419 },
      ],
    },
  };

  return (
    <div className="page">
      <h1 className="title">Installation Cost Calculator</h1>

      <div className="dropdowns">
        <div className="dropdown">
          <label>Unit of Interest</label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label>Installation Support Needed</label>
          <select
            value={selectedInstallation}
            onChange={(e) => setSelectedInstallation(e.target.value)}
          >
            {installationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedInstallation === "Machine Only Purchase" && (
        <div className="purchase-container">
          <p className="note">
            Note: Price estimate inclusive exclusively of Hydropack and unit
            delivery. This will not include a forklift and means of getting unit
            on the concrete pad, as this will be the responsibility of the
            customer's general contractor.
          </p>
          <div className="table">
            <div className="option">
              <h3 className="option-title">Option One: Out of Pocket</h3>
              <p className="total">
                Total: $
                {machineOnlyData[selectedUnit].total.toLocaleString()}
              </p>
              <div className="line-items">
                <p>
                  Cost of unit: $
                  {machineOnlyData[selectedUnit].unitCost.toLocaleString()}
                </p>
                <p>
                  Shipping & handling: $
                  {machineOnlyData[selectedUnit].shipping.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="option">
              <h3 className="option-title">
                Option Two: Financing Monthly Payment Plans
              </h3>
              <div className="payment-plans">
                {machineOnlyData[selectedUnit].financing.map(
                  (plan, index) => (
                    <div key={index} className="plan">
                      {plan.term}: ${plan.price}/month
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedInstallation === "Connection to Tank Only" && (
        <div className="purchase-container">
          <p className="note">
            Note: Price estimate inclusive exclusively of Hydropack and unit
            delivery. This will not include a forklift and means of getting unit
            onto concrete pad, as this will be the responsibility of the
            customer's general contractor.
          </p>
          <div className="table">
            <div className="option">
              <h3 className="option-title">Option One: Out of Pocket</h3>
              <p className="total">
                Total: $
                {connectionToTankData[selectedUnit].total.toLocaleString()}
              </p>
              <div className="line-items">
                <p>
                  Cost of unit: $
                  {connectionToTankData[selectedUnit].unitCost.toLocaleString()}
                </p>
                <p>
                  Shipping & handling: $
                  {connectionToTankData[selectedUnit].shipping.toLocaleString()}
                </p>
                <p>
                  Installation: $
                  {connectionToTankData[selectedUnit].install.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="option">
              <h3 className="option-title">
                Option Two: Financing Monthly Payment Plans
              </h3>
              <div className="payment-plans">
                {connectionToTankData[selectedUnit].financing.map(
                  (plan, index) => (
                    <div key={index} className="plan">
                      {plan.term}: ${plan.price}/month
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedInstallation === "Plumbing into House Needed" && (
        <div className="message-container">
          <p className="message-text">
            Reach out immediately to{" "}
            <code className="code">#D2D-closing-support</code> for ops team to
            support in creating an on-demand quote. Orlando will support an
            installation estimate and Khalid will be on call to procure
            additional installation needs (e.g., tank, RPZ, etc.) accordingly.
          </p>
        </div>
      )}

      <style>{`
        .page {
          min-height: 100vh;
          background: #f3f4f6;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 24px;
        }
        .dropdowns {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }
        .dropdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          font-weight: 500;
          color: #374151;
        }
        select {
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }
        .purchase-container {
          max-width: 768px;
          margin: 0 auto;
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }
        .note {
          font-size: 0.9rem;
          color: #374151;
        }
        .table {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .option {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .option-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #111827;
        }
        .total {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }
        .line-items {
          font-size: 0.9rem;
          color: #374151;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .payment-plans {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .plan {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          padding: 6px;
          font-size: 0.9rem;
          color: #111827;
        }
        .message-container {
          max-width: 768px;
          margin: 0 auto;
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .message-text {
          font-size: 0.9rem;
          color: #374151;
        }
        .code {
          background: #f3f4f6;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
