import { 
  Database, 
  Table as TableIcon,
  Printer,
  FileSpreadsheet,
  Lock,
  Loader2
} from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

export const SpreadsheetView = ({ orders, activeTab, setActiveTab, userId, onLogout }) => {
  const [isXLSXReady, setIsXLSXReady] = useState(false);

  useEffect(() => {
    if (window.XLSX) { setIsXLSXReady(true); return; }
    const script = document.createElement('script');
    script.src = "https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js";
    script.async = true;
    script.onload = () => setIsXLSXReady(true);
    document.head.appendChild(script);
  }, []);

  const filtered = useMemo(() => orders.filter(o => o.tamanho === activeTab), [orders, activeTab]);

  const gerarPlanilha = () => {
    if (!window.XLSX) return;
    const XLSX = window.XLSX;
    const wb = XLSX.utils.book_new();

    ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EXG'].forEach(tamanho => {
      const dadosPagina = orders
        .filter(o => o.tamanho === tamanho)
        .map((o, index) => {
          let dataStr = "S/ Data";
          try {
            if (o.createdAt?.toDate) dataStr = o.createdAt.toDate().toLocaleDateString('pt-BR');
            else if (o.createdAt) dataStr = new Date(o.createdAt).toLocaleDateString('pt-BR');
          } catch(e) {}

          return {
            'Nº': index + 1,
            'Modelos Selecionados': Array.isArray(o.modelos) ? o.modelos.join(', ') : (o.modelo || 'N/A'),
            'Nome do Aluno': o.nome,
            'Telemóvel': o.telefone,
            'Data': dataStr,
            'Tamanho': o.tamanho
          };
        });

      if (dadosPagina.length > 0) {
        const ws = XLSX.utils.json_to_sheet(dadosPagina);
        ws['!cols'] = [{ wch: 5 }, { wch: 35 }, { wch: 40 }, { wch: 15 }, { wch: 20 }, { wch: 10 }];
        XLSX.utils.book_append_sheet(wb, ws, `Tam ${tamanho}`);
      }
    });

    XLSX.writeFile(wb, `Lista_Uniformes_TI_Final_${new Date().getFullYear()}.xlsx`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-zinc-900 border-2 border-zinc-800 overflow-hidden shadow-2xl">
        <div className="flex bg-black border-b-2 border-zinc-800 p-1 overflow-x-auto no-print scrollbar-hide">
          {['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EXG'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-none px-6 py-4 text-[10px] font-black transition-all border-b-4 ${
                activeTab === t ? 'border-yellow-400 text-yellow-400 bg-zinc-900' : 'border-transparent text-zinc-600 hover:text-zinc-400'
              }`}
            >
              TABELA_{t}
            </button>
          ))}
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-black">
              <tr className="border-b-2 border-zinc-800">
                <th className="p-5 text-[10px] font-black text-yellow-400 uppercase tracking-widest">Index</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Modelos</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estudante</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.length > 0 ? (
                filtered.map((order, idx) => (
                  <tr key={order.id} className="group hover:bg-yellow-400/5 transition-colors">
                    <td className="p-5 font-mono text-[10px] text-zinc-600">[{String(idx + 1).padStart(3, '0')}]</td>
                    <td className="p-5">
                       <div className="flex flex-wrap gap-1">
                          {(Array.isArray(order.modelos) ? order.modelos : [order.modelo]).map((m, i) => (
                            <span key={i} className="text-[8px] bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 font-bold uppercase border border-yellow-400/20">{m}</span>
                          ))}
                       </div>
                    </td>
                    <td className="p-5 font-bold text-white uppercase text-xs tracking-tight">{order.nome}</td>
                    <td className="p-5 text-right font-mono text-[10px] text-zinc-500">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center opacity-20">
                    <Database className="mx-auto mb-4" size={48} />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white italic">Nenhum registo nesta partição</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-black p-5 border-t-2 border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div> DATA_FLOW: OK</span>
            <span>COUNT: {filtered.length}</span>
          </div>
          <button onClick={onLogout} className="hover:text-yellow-400 transition-colors flex items-center gap-1 no-print font-black">
            <Lock size={10} /> LOCK_SYSTEM
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 no-print">
        <button 
          onClick={gerarPlanilha}
          disabled={!isXLSXReady}
          className="text-[10px] font-black text-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 px-8 py-4 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
        >
          {isXLSXReady ? <><FileSpreadsheet size={18} /> Gerar Excel Completo</> : <><Loader2 size={16} className="animate-spin" /> Aguardando SheetJS...</>}
        </button>
      </div>
    </div>
  );
};