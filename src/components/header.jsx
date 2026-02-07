import { 
  Database, 
  Terminal, 
  Table as TableIcon,
  LayoutDashboard,
} from 'lucide-react';

export const Header = ({ view, setView }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 no-print">
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs tracking-tighter uppercase font-bold">
        <Terminal size={14} strokeWidth={3} />
        <span>SGE // Sistema de Gestão de Encomendas</span>
      </div>
      <h1 className="text-4xl font-black tracking-tight text-white italic uppercase">
        UNIFORME <span className="text-yellow-400 underline decoration-4 underline-offset-8">INFO</span>
      </h1>
    </div>

    {/* Menu de Navegação: Fundo preto, borda amarela */}
    <div className="flex bg-black border-2 border-yellow-400 p-1 rounded-none shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]">
      <button 
        onClick={() => setView('form')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-none transition-all text-sm font-black uppercase ${
          view === 'form' 
            ? 'bg-yellow-400 text-black' 
            : 'text-yellow-400 hover:bg-yellow-400/10'
        }`}
      >
        <LayoutDashboard size={18} strokeWidth={3} /> Formulário
      </button>
      
      <button 
        onClick={() => setView('admin')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-none transition-all text-sm font-black uppercase ${
          view === 'admin' 
            ? 'bg-yellow-400 text-black' 
            : 'text-yellow-400 hover:bg-yellow-400/10'
        }`}
      >
        <Database size={18} strokeWidth={3} /> Planilha
      </button>
    </div>
  </header>
);