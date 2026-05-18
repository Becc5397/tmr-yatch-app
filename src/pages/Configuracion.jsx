import { useState } from 'react';
import { useConfig } from '../context/ConfigContext';

function CampoConfig({ label, descripcion, valor, min, max, unidad, onChange }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-white">{label}</p>
        <span className="text-blue-400 font-bold">{valor} <span className="text-xs text-gray-400">{unidad}</span></span>
      </div>
      <p className="text-gray-500 text-xs mb-3">{descripcion}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{min} {unidad}</span>
        <span>{max} {unidad}</span>
      </div>
    </div>
  );
}

function Configuracion() {
  const { config, actualizarConfig } = useConfig();
  const [local, setLocal] = useState(config);
  const [guardado, setGuardado] = useState(false);

  function handleGuardar() {
    actualizarConfig(local);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  }

  function handleReset() {
    const porDefecto = {
      voltajeMinimo: 12,
      temperaturaMaxima: 95,
      rpmMaximo: 2800,
    };
    setLocal(porDefecto);
    actualizarConfig(porDefecto);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Configuración</h2>
          <p className="text-gray-400 text-sm">Umbrales de alerta del sistema</p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <CampoConfig
            label="Voltaje mínimo"
            descripcion="Alerta cuando el voltaje baje de este valor"
            valor={local.voltajeMinimo}
            min={10}
            max={15}
            unidad="V"
            onChange={(v) => setLocal({ ...local, voltajeMinimo: v })}
          />
          <CampoConfig
            label="Temperatura máxima"
            descripcion="Alerta cuando la temperatura supere este valor"
            valor={local.temperaturaMaxima}
            min={80}
            max={110}
            unidad="°C"
            onChange={(v) => setLocal({ ...local, temperaturaMaxima: v })}
          />
          <CampoConfig
            label="RPM máximo"
            descripcion="Alerta cuando las RPM superen este valor"
            valor={local.rpmMaximo}
            min={1500}
            max={3200}
            unidad="rpm"
            onChange={(v) => setLocal({ ...local, rpmMaximo: v })}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGuardar}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            {guardado ? '✓ Guardado' : 'Guardar cambios'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 text-sm transition-colors"
          >
            Restaurar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;