// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyListing from './pages/PropertyListing';
import RegistrationForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/properties" element={<PropertyListing />} />
                { <Route path="/register" element={<RegistrationForm/>} /> }
                { <Route path="/login" element={<LoginForm/>} /> }
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
