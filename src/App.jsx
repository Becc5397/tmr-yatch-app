import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Historial from './pages/Historial';
import Configuracion from './pages/Configuracion';
import { HistorialProvider } from './context/HistorialContext';

function App() {
  return (
    <HistorialProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </BrowserRouter>
    </HistorialProvider>
  );
}

export default App;