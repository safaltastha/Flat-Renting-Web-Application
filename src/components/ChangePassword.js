import React, { useState } from 'react';

const ChangePaasword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords don't match.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    // Here you would typically send the data to your backend
    // For example:
    // axios.post('/api/change-password', { currentPassword, newPassword })
    //   .then(response => {
    //     setSuccessMessage('Password changed successfully.');
    //   })
    //   .catch(error => {
    //     setErrorMessage('Failed to change password.');
    //   });

    // For demonstration purposes, let's assume the password change is successful
    setSuccessMessage('Password changed successfully.');
    // Clear form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-md mx-auto  p-5 border border-gray-300 rounded-lg shadow-lg my-16 ">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePaasword;
