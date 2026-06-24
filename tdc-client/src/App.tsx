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
import Invoice from "./pages/Invoice";
import { GarageManager } from "./components/garage/GarageManager";
import ToDoList from "./pages/ToDoList";
import Setting from "./pages/Setting";
// import { TaskManager } from "./components/task/TaskManager";
import { CostManager } from "./components/cost/CostManager";
import Correspondance from "./pages/Correspondance";
import Model from "./pages/Model";
import PartAndLabor from "./pages/PartAndLabor";

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
              <Route path="/todoList" element={<ToDoList />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/admin/garage" element={<GarageManager />} />
              <Route path="/model" element={<Model />} />
              <Route path="/" element={<Home />} />
              <Route path="/owner" element={<Owner />} />
              <Route path="/vehicle" element={<Vehicle />} />
              {/* <Route path="/task" element={<TaskManager />} /> */}
              <Route path="/cost" element={<CostManager />} />
              {/* <Route path="/spare-parts" element={<SparePart />} /> */}
              <Route path="/correspondance" element={<Correspondance />} />
              <Route path="/partAndLabor" element={<PartAndLabor />} />
              <Route path="/setting" element={<Setting />} />
              {/* <Route path="/test" element={<Test />} /> */}
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}
