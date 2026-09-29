import { Routes, Route } from "react-router-dom";
import AppPPM from "./AppPPM";
import Inicio from "./pages/Inicio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppPPM />} />
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
  );
}

export default App;