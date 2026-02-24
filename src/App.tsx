import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import "./App.css";

// Main App component with routing configuration
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes here as needed */}
            <Route path="*" element={<Home />} /> {/* Redirect unknown routes to Home */}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
