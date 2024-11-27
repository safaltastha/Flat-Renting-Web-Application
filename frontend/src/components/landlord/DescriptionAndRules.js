import React, { useState } from "react";

const DescriptionAndRules = ({ onChange }) => {
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");

  const handleDescriptionChange = (e) => {
    const capitalizedDescription = e.target.value; // Assuming you want to keep it simple for now
    setDescription(capitalizedDescription);
    onChange("description", capitalizedDescription); // Pass data up
  };

  const handleRulesChange = (e) => {
    const capitalizedRules = e.target.value; // Assuming you want to keep it simple for now
    setRules(capitalizedRules);
    onChange("rules", capitalizedRules); // Pass data up
  };

  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">
          Property Description and Rules
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Description{" "}
              <span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <textarea
              name="description"
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              rows="6"
            ></textarea>
          </div>

          {/* House Rules */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              House Rules
            </label>
            <textarea
              name="rules"
              onChange={handleRulesChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              rows="6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndRules;
