import React,{useState} from 'react'

const DescriptionAndRules = ({ capitalizeWords }) => {
  const [description, setDescription] = useState('');

  const handleDescription = (e) => {
    const capitalizedDescription = capitalizeWords(e.target.value);
    setDescription(capitalizedDescription);
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
                Description
              </label>
              <textarea
                name="description"
                onChange={handleDescription}
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
                onChange={handleDescription}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                rows="6"
              ></textarea>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DescriptionAndRules