import { 
  Cpu, 
  Table as TableIcon,
  ChevronDown 
} from 'lucide-react';
import { useState } from 'react';

export const InfoSection = () => {
  const [showChart, setShowChart] = useState(false);
  return (
    <div className="bg-zinc-900 border-l-4 border-yellow-400 p-6 md:p-8 no-print h-full">
      <Cpu className="text-yellow-400 mb-6" size={32} />
      <h3 className="text-lg font-black mb-3 text-white uppercase tracking-tight">Consola de Pedido</h3>
      <p className="text-zinc-400 text-xs mb-6 leading-relaxed font-medium">
        Clique nos modelos para adicionar à sua lista. Cada clique gera uma nova entrada onde pode definir o <span className="text-yellow-400">tamanho individual</span>.
      </p>
      
      <button 
        type="button" 
        onClick={() => setShowChart(!showChart)} 
        className="w-full flex items-center justify-between p-3 bg-black border border-zinc-800 text-yellow-400 text-[10px] font-black uppercase hover:border-yellow-400 transition-all"
      >
        Consultar Tabela Técnica {showChart ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      
      {showChart && (
        <div className="mt-4 animate-in fade-in duration-300">
          <div className="bg-black border-2 border-zinc-800 overflow-hidden select-none">
            <table className="w-full text-[10px] font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-600">
                  <th className="p-2 text-left">TAM</th>
                  <th className="p-2 text-center">ALTURA</th>
                  <th className="p-2 text-center">LARGURA</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                {TABELA_MEDIDAS_INFO.map((m) => (
                  <tr key={m.tam+m.index} className="border-b border-zinc-900 hover:bg-yellow-400/5">
                    <td className="p-2 font-bold text-yellow-400">{m.tam}</td>
                    <td className="p-2 text-center">{m.alt}</td>
                    <td className="p-2 text-center">{m.larg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};