import { useState } from "react";
const ADMIN_ACCESS_KEY = "BibiMaravilhosa";
import { 
  Lock, 
  Unlock, 
  ShieldAlert, 
  Table as TableIcon, 
} from 'lucide-react';

export const AdminLoginGate = ({ onLoginSuccess }) => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === ADMIN_ACCESS_KEY) {
      onLoginSuccess();
    } else {
      setError(true);
      setPass("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 animate-in fade-in zoom-in duration-300">
      <div className="bg-zinc-900 border-2 border-yellow-400 p-8 rounded-none shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
        <div className="flex justify-center mb-6 text-yellow-400">
          <Lock size={32} className={error ? 'text-red-500 animate-bounce' : ''} />
        </div>
        <h2 className="text-center text-xl font-black mb-8 text-white uppercase tracking-tighter">Acesso à Base de Dados</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`w-full bg-black border-2 ${error ? 'border-red-500' : 'border-zinc-800 focus:border-yellow-400'} py-4 px-6 outline-none text-center font-mono tracking-[0.5em] text-white`}
            placeholder="••••••••"
          />
          <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-none transition-all">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
};