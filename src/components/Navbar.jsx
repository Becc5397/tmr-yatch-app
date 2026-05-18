import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <span className="text-white font-bold tracking-tight">TMR Yacht</span>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 text-sm font-medium' : 'text-gray-400 text-sm hover:text-white'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/historial"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 text-sm font-medium' : 'text-gray-400 text-sm hover:text-white'
            }
          >
            Historial
          </NavLink>
          <NavLink
            to="/configuracion"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 text-sm font-medium' : 'text-gray-400 text-sm hover:text-white'
            }
          >
            Configuración
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;