import React, { useState,useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Test = () => {
  const [availableStart, setAvailableStart] = useState(null);
  const [availableEnd, setAvailableEnd] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const availabilityData = {
      vehicleId: 1, // Replace with actual vehicle ID
      availableStart: availableStart.toISOString(),
      availableEnd: availableEnd.toISOString(),
    };

    // API call to store availability data
    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(availabilityData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("Available Start:", availableStart);
    console.log("Available End:", availableEnd);
  }, [availableStart, availableEnd]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <DateTimePicker
          label="Available Start"
          value={availableStart}
          onChange={(newValue) => setAvailableStart(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Available End"
          value={availableEnd}
          onChange={(newValue) => setAvailableEnd(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </form>
      console.log(availableStart); console.log(availableEnd)
    </LocalizationProvider>
  );
};

export default Test;
