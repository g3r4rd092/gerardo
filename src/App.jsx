import { Routes, Route } from "react-router-dom";
import AppPPM from "./AppPPM";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Inicio from "./pages/Inicio";
import RegistroUsuarios from './pages/RegistroUsuarios';
import AltaProyecto from './pages/AltaProyecto';
import ModificaUsuarios from './pages/ModificaUsuarios';
import GanttDashboard from './pages/GanttDashboard';
import AltaActividad from './pages/AltaActividad';
import Riesgos from './pages/Riesgos';
import AltaRiesgo from './pages/AltaRiesgo';
import ControlImpactos from "./pages/ControlImpactos";
import CatalogoRiesgos from "./pages/CatalogoRiesgos";

function App() {
  return (
    <Routes>

      <Route path="/" element={<AppPPM />} />

      <Route
        path="/inicio"
        element={
          <ProtectedRoutes>
            <Inicio />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/registro-usuarios"
        element={
          <ProtectedRoutes>
            <RegistroUsuarios />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/alta-proyecto"
        element={
          <ProtectedRoutes>
            <AltaProyecto />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/modifica-usuarios"
        element={
          <ProtectedRoutes>
            <ModificaUsuarios />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/gantt-dashboard"
        element={
          <ProtectedRoutes>
            <GanttDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/alta-actividad"
        element={
          <ProtectedRoutes>
            <AltaActividad />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/registro-EstadoRiesgos"
        element={
          <ProtectedRoutes>
            <Riesgos />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/alta-riesgos"
        element={
          <ProtectedRoutes>
            <AltaRiesgo />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/registro-impactos"
        element={
          <ProtectedRoutes>
            <ControlImpactos />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/catalogo-riesgos"
        element={
          <ProtectedRoutes>
            <CatalogoRiesgos />
          </ProtectedRoutes>
        }
      />

    </Routes>
  );
}

export default App;