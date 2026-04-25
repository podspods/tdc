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
import Vehicle from "./pages/Vehicle";
import Task from "./pages/Task";

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
              <Route path="/owner" element={<Owner />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/task" element={<Task />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}
