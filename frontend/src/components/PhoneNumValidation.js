import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumValidation = ({ setFieldValue, fieldName }) => {
  const [isValid, setIsValid] = useState(true);

  const validatePhoneNumber = (phoneNumber) => {
    const trimmedNumber = phoneNumber.trim(); // Trim extra spaces
    const phoneNumberPattern = /^(?:\+977)?(98|97)\d{11}$/;
    return phoneNumberPattern.test(trimmedNumber);
  };
  

  const handleChange = (value) => {
    console.log(value)
    const isValidNumber = validatePhoneNumber(value);
    setIsValid(isValidNumber);
    setFieldValue(fieldName, value);
  };

  return (
    <div>
      <label>
        <PhoneInput
          onlyCountries={["np"]}
          country={"np"}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
      </label>
      {!isValid && (
        <p style={{ color: "red" }}>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumValidation;
