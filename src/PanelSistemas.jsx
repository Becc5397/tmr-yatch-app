import { useState, useEffect } from 'react';
import { useHistorial } from './context/HistorialContext';
import { useConfig } from './context/ConfigContext';

function Sistema({ nombre, valor, unidad, min, max, onChange }) {
  const porcentaje = Math.round(((valor - min) / (max - min)) * 100);
  const color = porcentaje > 50 ? 'text-green-400' : porcentaje > 25 ? 'text-yellow-400' : 'text-red-400';
  const barra = porcentaje > 50 ? 'bg-green-400' : porcentaje > 25 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">{nombre}</span>
        <span className={`text-2xl font-bold ${color}`}>{valor} <span className="text-sm">{unidad}</span></span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
        <div className={`h-2 rounded-full transition-all duration-300 ${barra}`} style={{ width: `${porcentaje}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}

function PanelSistemas() {
  const [voltaje, setVoltaje] = useState(12);
  const [temperatura, setTemperatura] = useState(80);
  const [rpm, setRpm] = useState(1800);
  const [alertas, setAlertas] = useState([]);
  const { agregarEvento } = useHistorial();
  const { config } = useConfig();

  useEffect(() => {
  const nuevasAlertas = [];

  if (voltaje < config.voltajeMinimo) nuevasAlertas.push('⚠ Voltaje bajo — revisar banco de baterías');
  if (temperatura > config.temperaturaMaxima) nuevasAlertas.push('🌡 Temperatura crítica — verificar sistema de enfriamiento');
  if (rpm > config.rpmMaximo) nuevasAlertas.push('⚙ RPM fuera de rango — reducir carga del motor');

  setAlertas((prev) => {
    nuevasAlertas.forEach((alerta) => {
      if (!prev.includes(alerta)) {
        setTimeout(() => agregarEvento(alerta), 0);
      }
    });
    return nuevasAlertas;
  });
}, [voltaje, temperatura, rpm, config]);

  return (
  <div className="flex flex-col gap-4">
    {alertas.length > 0 && (
      <div className="bg-yellow-900 border border-yellow-600 rounded-xl p-4">
        <p className="text-yellow-400 text-sm font-semibold mb-2">Alertas activas</p>
        {alertas.map((a, i) => (
          <p key={i} className="text-yellow-300 text-sm">{a}</p>
        ))}
      </div>
    )}
    <Sistema nombre="Banco de Baterías" valor={voltaje} unidad="V" min={0} max={15} onChange={setVoltaje} />
    <Sistema nombre="Temperatura Motor" valor={temperatura} unidad="°C" min={60} max={110} onChange={setTemperatura} />
    <Sistema nombre="RPM Motor" valor={rpm} unidad="rpm" min={0} max={3200} onChange={setRpm} />
  </div>
);
};

export default PanelSistemas;