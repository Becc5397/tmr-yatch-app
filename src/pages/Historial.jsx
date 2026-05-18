import { useHistorial } from '../context/HistorialContext';

function Historial() {
  const { eventos, limpiarHistorial } = useHistorial();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Historial</h2>
          {eventos.length > 0 && (
            <button
              onClick={limpiarHistorial}
              className="text-xs text-red-400 border border-red-800 rounded-lg px-3 py-1 hover:bg-red-900 transition-colors"
            >
              Limpiar todo
            </button>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-6">Registro de eventos del sistema</p>

        {eventos.length === 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <p className="text-gray-500 text-sm text-center">Sin eventos registrados aún</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex justify-between items-center">
                <p className="text-sm text-yellow-300">{evento.mensaje}</p>
                <span className="text-xs text-gray-500 ml-4 shrink-0">{evento.hora}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Historial;