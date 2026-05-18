import { useClimaMarino } from '../hooks/useClimaMarino';

function DireccionViento({ grados }) {
  const direcciones = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const index = Math.round(grados / 45) % 8;
  return <span>{direcciones[index]} {grados}°</span>;
}

function ClimaMarino() {
  const { clima, cargando, error } = useClimaMarino();

  if (cargando) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-4 animate-pulse">
            <div className="h-3 bg-gray-700 rounded mb-3 w-2/3" />
            <div className="h-6 bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl border border-red-800 p-4">
        <p className="text-red-400 text-sm">⚠ {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">Temperatura</p>
        <p className="text-white text-2xl font-bold">{clima.temperatura}<span className="text-sm text-gray-400 ml-1">°C</span></p>
        <p className="text-gray-600 text-xs mt-1">Cartagena</p>
      </div>
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">Viento</p>
        <p className="text-white text-2xl font-bold">{clima.viento}<span className="text-sm text-gray-400 ml-1">km/h</span></p>
        <p className="text-gray-600 text-xs mt-1">Superficie</p>
      </div>
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">Dirección</p>
        <p className="text-white text-2xl font-bold"><DireccionViento grados={clima.direccion} /></p>
        <p className="text-gray-600 text-xs mt-1">Viento</p>
      </div>
    </div>
  );
}

export default ClimaMarino;