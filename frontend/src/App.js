import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyListing from './pages/PropertyListing';
import RegistrationForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import BookNowForm from './pages/BookNowForm';
import './index.css';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/properties" element={<PropertyListing />} />
                { <Route path="/register" element={<RegistrationForm/>} /> }
                
                { <Route path="/login" element={<LoginForm/>} /> }
                { <Route path="/booknow" element={<BookNowForm/>} /> }
                { <Route path="/contactus" element={<ContactUs/>} /> }
                { <Route path="/aboutus" element={<AboutUs/>} /> }
                 {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
