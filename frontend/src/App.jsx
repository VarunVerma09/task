import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing1 from "./pages/Landing1";
import Landing2 from "./pages/Landing2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing1 />} />
        <Route path="/2" element={<Landing2 />} />
      </Routes>
    </BrowserRouter>
  );
}