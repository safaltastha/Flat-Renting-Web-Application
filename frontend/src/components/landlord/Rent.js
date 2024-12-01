import React, { useState } from "react";

const Rent = ({ onChange }) => {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [advancedRent, setAdvancedRent] = useState("");

  const handleMonthlyRentChange = (e) => {
    const value = e.target.value;
    // Ensure that the input is a valid number or empty
    if (value === "" || !isNaN(value)) {
      setMonthlyRent(value);
      onChange("monthlyRent", value); // Pass data up
    }
  };

  const handleAdvancedRentChange = (e) => {
    const value = e.target.value;
    // Ensure that the input is a valid number or empty
    if (value === "" || !isNaN(value)) {
      setAdvancedRent(value);
      onChange("advancedRent", value); // Pass data up
    }
  };

  return (
    <div>
      <div className="px-4">
        <h2 className="text-lg font-medium mb-4">Rent</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Monthly Rent */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Monthly Rent
              <span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="number"
              name="monthlyRent"
              value={monthlyRent} // Set input value from state
              onChange={handleMonthlyRentChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Advanced Rent */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Advanced Rent
            </label>
            <input
              type="number"
              name="advancedRent"
              value={advancedRent} // Set input value from state
              onChange={handleAdvancedRentChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
