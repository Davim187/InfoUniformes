import { 
  Database, 
  Terminal, 
  Table as TableIcon,
  LayoutDashboard,
} from 'lucide-react';


export const Header = ({ view, setView }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 no-print">
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs tracking-tighter uppercase">
        <Terminal size={14} />
        <span>SGE // Sistema de Gestão de Encomendas</span>
      </div>
      <h1 className="text-4xl font-black tracking-tight text-white italic">
        UNIFORME <span className="text-cyan-500 underline decoration-2 underline-offset-8">INFO</span>
      </h1>
    </div>

    <div className="flex bg-slate-900/80 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-2xl">
      <button 
        onClick={() => setView('form')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-bold ${view === 'form' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:text-white'}`}
      >
        <LayoutDashboard size={18} /> Formulário
      </button>
      <button 
        onClick={() => setView('admin')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-bold ${view === 'admin' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:text-white'}`}
      >
        <Database size={18} /> Planilha
      </button>
    </div>
  </header>
);