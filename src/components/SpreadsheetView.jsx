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
        .map((o, index) => ({
          'Nº': index + 1,
          'Modelo': o.modelo || 'N/A',
          'Nome do Aluno': o.nome,
          'Telemóvel': o.telefone,
          'Data': o.createdAt?.toDate ? o.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(o.createdAt).toLocaleDateString('pt-BR'),
          'Tamanho': o.tamanho
        }));

      if (dadosPagina.length > 0) {
        const ws = XLSX.utils.json_to_sheet(dadosPagina);
        ws['!cols'] = [{ wch: 5 }, { wch: 20 }, { wch: 40 }, { wch: 15 }, { wch: 20 }, { wch: 10 }];
        XLSX.utils.book_append_sheet(wb, ws, `Tam ${tamanho}`);
      }
    });

    XLSX.writeFile(wb, `Lista_Uniformes_Informatica_${new Date().getFullYear()}.xlsx`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-zinc-900 border-2 border-zinc-800 overflow-hidden shadow-2xl">
        <div className="flex bg-black border-b-2 border-zinc-800 p-1 overflow-x-auto no-print">
          {['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EXG'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-none px-6 py-4 text-[10px] font-black transition-all border-b-4 ${
                activeTab === t ? 'border-yellow-400 text-yellow-400 bg-zinc-900' : 'border-transparent text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-black">
              <tr className="border-b-2 border-zinc-800">
                <th className="p-5 text-[10px] font-black text-yellow-400 uppercase tracking-widest">Index</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Modelo</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estudante</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.length > 0 ? (
                filtered.map((order, idx) => (
                  <tr key={order.id} className="group hover:bg-yellow-400/5 transition-colors">
                    <td className="p-5 font-mono text-[10px] text-zinc-600">[{String(idx + 1).padStart(3, '0')}]</td>
                    <td className="p-5 font-bold text-yellow-400 text-[10px] uppercase italic">{order.modelo}</td>
                    <td className="p-5 font-bold text-white uppercase text-xs">{order.nome}</td>
                    <td className="p-5 text-right font-mono text-[10px] text-zinc-500">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center opacity-20">
                    <Database className="mx-auto mb-4" size={48} />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white">Nenhum dado encontrado</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-black p-5 border-t-2 border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div> DB_SYNC_OK</span>
            <span>Total: {filtered.length}</span>
          </div>
          <button onClick={onLogout} className="hover:text-yellow-400 transition-colors flex items-center gap-1 no-print font-black">
            <Lock size={10} /> BLOQUEAR
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 no-print">
        <button 
          onClick={gerarPlanilha}
          disabled={!isXLSXReady}
          className="text-[10px] font-black text-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 px-8 py-4 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
        >
          {isXLSXReady ? <><FileSpreadsheet size={18} /> Exportar Excel</> : <><Loader2 size={18} className="animate-spin" /> Carregando Engine...</>}
        </button>
      </div>
    </div>
  );
};