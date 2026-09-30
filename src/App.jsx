import { Routes, Route } from "react-router-dom";
import AppPPM from "./AppPPM";
import Inicio from "./pages/Inicio";
import RegistroUsuarios from './pages/RegistroUsuarios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppPPM />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/registro-usuarios" element={<RegistroUsuarios />} />
    </Routes>
  );
}

export default App;