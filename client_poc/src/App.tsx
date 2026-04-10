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
import OwnersPage from "./pages/OwnersPage";
import OwnerAdminPage from "./pages/OwnerAdminPage";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceAdminPage from "./pages/InvoiceAdminPage";
import LaborEdit from "./components/LaborEdit";
import RateConfigTester from "./pages/test/RateConfigTester";
import TestPdf from "./pages/test/TestPdf";
import RegistrationAdminPage from "./pages/Registration";

// Main App component with routing configuration
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test/pdf" element={<TestPdf />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkDatabase" element={<CheckDatabase />} />
            <Route path="/testApi" element={<TestApi />} />
            {/* Add more routes here as needed */}
            <Route path="/models" element={<MotorcycleModelList />} />
            <Route path="/admin/models" element={<MotorcycleModelAdmin />} />
            <Route path="/registrations" element={<RegistrationPage />} />
            <Route path="/admin/registrations" element={<RegistrationAdminPage />} />
            <Route path="/owners" element={<OwnersPage />} />
            <Route path="/admin/owners" element={<OwnerAdminPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/admin/invoices" element={<InvoiceAdminPage />} />
            <Route path="/admin/labor" element={<LaborEdit />} />
            <Route path="/test/rate-config" element={<RateConfigTester />} />
            <Route path="*" element={<Home />} /> {/* Redirect unknown routes to Home */}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
