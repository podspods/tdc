import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { Layout } from "./components/Layout/Layout";
import { InvoiceHeaderPage } from "./pages/InvoiceHeaderPage";

export default function App() {
  return (
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
            <Route path="/" element={<InvoiceHeaderPage />} />
            <Route path="/invoice-headers" element={<InvoiceHeaderPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
