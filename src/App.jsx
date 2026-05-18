import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Historial from './pages/Historial';
import Configuracion from './pages/Configuracion';
import { HistorialProvider } from './context/HistorialContext';
import { ConfigProvider } from './context/ConfigContext';

function App() {
  return (
    <ConfigProvider>
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
    </ConfigProvider>
  );
}

export default App;