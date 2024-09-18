import React from 'react'

const Rent = () => {
  return (
    <div>
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">Rent</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Rent */}
            <div>
              <label className="block mb-2 font-medium text-[#9747FF]">
                Monthly Rent<span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="number"
                name="monthlyRent"
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
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Rent