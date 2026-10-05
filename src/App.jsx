import { Routes, Route } from "react-router-dom";
import AppPPM from "./AppPPM";
import Inicio from "./pages/Inicio";
import RegistroUsuarios from './pages/RegistroUsuarios';
import AltaProyecto from './pages/AltaProyecto';
import ModificaUsuarios from './pages/ModificaUsuarios';
import GanttDashboard from './pages/GanttDashboard';
import AltaActividad from './pages/AltaActividad';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppPPM />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/registro-usuarios" element={<RegistroUsuarios />} />
      <Route path="/alta-proyecto" element={<AltaProyecto />} />
      <Route path="/modifica-usuarios" element={<ModificaUsuarios />} />
      <Route path="/gantt-dashboard" element={<GanttDashboard />} />  
      <Route path="/alta-actividad" element={<AltaActividad />} />    
    </Routes>
  );
}

export default App;