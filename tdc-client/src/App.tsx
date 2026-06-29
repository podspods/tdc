import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { Layout } from "./components/Layout/Layout";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import Invoice from "./pages/Invoice";
import ToDoList from "./pages/ToDoList";
import Setting from "./pages/Setting";
import Correspondance from "./pages/Correspondance";
import Model from "./pages/Model";
import PartAndLabor from "./pages/PartAndLabor";
import Garage from "./pages/Garage";
import Cost from "./pages/Cost";
import Vehicle from "./pages/Vehicle";
import Brand from "./pages/Brand";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
            },
          }}
        />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todoList" element={<ToDoList />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/admin/garage" element={<Garage />} />
              <Route path="/owner" element={<Owner />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/model" element={<Model />} />
              <Route path="/correspondance" element={<Correspondance />} />
              <Route path="/cost" element={<Cost />} />
              <Route path="/partAndLabor" element={<PartAndLabor />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}
