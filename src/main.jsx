import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SelectedDataPage from "./Pages/SelectedDataPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/selectedData" element={<SelectedDataPage />} />
    </Routes>
  </BrowserRouter>
);
