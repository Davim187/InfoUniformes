import { useState } from "react";
const ADMIN_ACCESS_KEY = "BibiMaravilhosa";
import { 
  Lock, 
  Unlock, 
  ShieldAlert, 
  Table as TableIcon, 
} from 'lucide-react';

export const AdminLoginGate = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_ACCESS_KEY) {
      onLoginSuccess();
    } else {
      setIsError(true);
      setPassword("");
      setTimeout(() => setIsError(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 animate-in fade-in zoom-in duration-300">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full border ${isError ? 'border-rose-500 text-rose-500 animate-bounce' : 'border-cyan-500/30 text-cyan-500'}`}>
            <Lock size={32} />
          </div>
        </div>
        
        <h2 className="text-center text-xl font-bold text-white mb-2 italic">ACESSO RESTRITO</h2>
        <p className="text-center text-slate-500 text-[10px] font-mono mb-8 uppercase tracking-[0.2em]">
          Security_Level: Administrator
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-tighter">Chave de Encriptação</label>
            <input 
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-slate-950 border ${isError ? 'border-rose-500' : 'border-slate-800'} rounded-2xl py-4 px-6 focus:ring-2 focus:ring-cyan-500/40 outline-none transition-all text-center font-mono tracking-[0.5em] text-white`}
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-900/20 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Unlock size={18} /> DESBLOQUEAR SISTEMA
          </button>
        </form>

        {isError && (
          <div className="mt-4 flex items-center justify-center gap-2 text-rose-500 text-[10px] font-mono uppercase animate-pulse">
            <ShieldAlert size={14} /> Acesso Negado: Credenciais Inválidas
          </div>
        )}
      </div>
    </div>
  );
};