import { createContext, useContext, useState, useEffect } from 'react';

const HistorialContext = createContext();

export function HistorialProvider({ children }) {
  const [eventos, setEventos] = useState(() => {
    const guardado = localStorage.getItem('historial');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('historial', JSON.stringify(eventos));
  }, [eventos]);

  function agregarEvento(mensaje) {
    const nuevo = {
      id: `${Date.now()}-${Math.random()}`,
      mensaje,
      hora: new Date().toLocaleTimeString('es-CO'),
    };
    setEventos((prev) => [nuevo, ...prev]);
  }

  function limpiarHistorial() {
    setEventos([]);
  }

  return (
    <HistorialContext.Provider value={{ eventos, agregarEvento, limpiarHistorial }}>
      {children}
    </HistorialContext.Provider>
  );
}

export function useHistorial() {
  return useContext(HistorialContext);
}