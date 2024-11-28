import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LandlordDashboard from '../components/dashboard/LandlordDashboard';
import TenantDashboard from '../components/dashboard/TenantDashboard';
import VehicleDashboard from '../components/dashboard/VehicleDashboard';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role);
    } else {
      // Redirect to home or login page if user is not available
      navigate('/');
    }
  }, [navigate]);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {role === 'landlord' && <LandlordDashboard />}
      {role === 'tenant' && <TenantDashboard />}
      {role === 'vehicle supplier' && <VehicleDashboard />}
    </div>
  );
};

export default Dashboard;
