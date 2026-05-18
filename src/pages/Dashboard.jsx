import PanelSistemas from '../PanelSistemas';
import ClimaMarino from '../components/ClimaMarino';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">TMR Yacht</h1>
          <p className="text-gray-400 text-sm">Panel de monitoreo de sistemas</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Condiciones marinas</p>
          <ClimaMarino />
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Sistemas del barco</p>
          <PanelSistemas />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;