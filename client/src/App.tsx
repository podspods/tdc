import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import "./App.css";
import CheckDatabase from "./pages/CheckDatabase/CheckDatabase";
import TestApi from "./pages/TestApi/TestApi";
import MotorcycleModelList from "./components/MotorcycleModelList";
import MotorcycleModelAdmin from "./components/MotorcycleModelAdmin";
import RegistrationPage from "./pages/Registration/Registration";
import RegistrationAdminPage from "./client/src/pages/Registration/Registration";

// Main App component with routing configuration
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkDatabase" element={<CheckDatabase />} />
            <Route path="/testApi" element={<TestApi />} />
            {/* Add more routes here as needed */}
            <Route path="/models" element={<MotorcycleModelList />} />
            <Route path="/admin/models" element={<MotorcycleModelAdmin />} />
            <Route path="/registrations" element={<RegistrationPage />} />
            <Route path="/admin/registrations" element={<RegistrationAdminPage />} />
            <Route path="*" element={<Home />} /> {/* Redirect unknown routes to Home */}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
