import { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(() => {
    const guardado = localStorage.getItem('config');
    return guardado ? JSON.parse(guardado) : {
      voltajeMinimo: 12,
      temperaturaMaxima: 95,
      rpmMaximo: 2800,
    };
  });

  function actualizarConfig(nuevaConfig) {
    const actualizada = { ...config, ...nuevaConfig };
    setConfig(actualizada);
    localStorage.setItem('config', JSON.stringify(actualizada));
  }

  return (
    <ConfigContext.Provider value={{ config, actualizarConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}