// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyListing from './pages/PropertyListing';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/properties" element={<PropertyListing />} />
                {/* <Route path="/properties/:id" element={<PropertyDetails />} /> */}
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
