import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumValidation = ({ setFieldValue, fieldName }) => {
  const [isValid, setIsValid] = useState(true);

  // Validate phone number
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^(98|97)\d{8}$/; 
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleChange = (value) => {
    setFieldValue(fieldName, value);
    console.log(value);

    // Validate phone number when it changes
    setIsValid(validatePhoneNumber(value));
  };

  return (
    <div>
      <label>
        <PhoneInput
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
