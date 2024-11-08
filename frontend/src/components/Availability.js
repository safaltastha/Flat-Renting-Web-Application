import React from 'react'
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

const Availability = ({ formData, handleDateChange, errors }) => {
  return (
    <div>
        {/* Availability Section */}
        <div className=" ">
              <h2 className="text-lg font-medium mb-2 ">Availability</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Available Start Field */}
                <div className="flex flex-col">
                  <label className="block mb-2 font-medium text-[#9747FF]">
                    Available Start
                    <span className="text-red-600 ml-1 text-[20px]">*</span>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={formData.availableStart}
                      onChange={(value) => handleDateChange('availableStart', value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          error={Boolean(errors.availableStart)}
                          helperText={errors.availableStart}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>

                {/* Available End Field */}
                <div className="flex flex-col">
                  <label className="block mb-2 font-medium text-[#9747FF]">
                    Available End
                    <span className="text-red-600 ml-1 text-[20px]">*</span>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={formData.availableEnd}
                      onChange={(value) => handleDateChange('availableEnd', value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          error={Boolean(errors.availableEnd)}
                          helperText={errors.availableEnd}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Availability