// src/api/propertyApi.js
export const fetchProperties = async () => {
  const response = await fetch("http://localhost:3001/properties"); // Adjust the URL to your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
};
