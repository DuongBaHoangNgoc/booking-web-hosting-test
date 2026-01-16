import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.jsx";
import DatVe from "@/pages/DatVe.jsx";
import TraCuu from "@/pages/TraCuu.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/datve" element={<DatVe />} />
      <Route path="/tracuu" element={<TraCuu />} />
    </Routes>
  );
};
