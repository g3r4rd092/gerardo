import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import App from './App.jsx'
import AppPPM from './AppPPM.jsx'
import './css/estilos.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppPPM />
  </StrictMode>,
)
