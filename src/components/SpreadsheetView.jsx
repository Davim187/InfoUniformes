import { 
  Database, 
  Table as TableIcon,
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { useMemo } from 'react';
import * as XLSX from 'xlsx';

export const SpreadsheetView = ({ orders, activeTab, setActiveTab, userId }) => {
  const filtered = useMemo(() => orders.filter(o => o.tamanho === activeTab), [orders, activeTab]);

    const gerarPlanilha = () => {
    const wb = XLSX.utils.book_new();

    ['P', 'M', 'G'].forEach(tamanho => {
      const dadosPagina = orders
        .filter(o => o.tamanho === tamanho)
        .map((o, index) => ({
          'Nº': index + 1,
          'Nome do Aluno': o.nome,
          'Telemóvel': o.telefone,
          'Data de Registo': o.createdAt.toDate().toLocaleDateString('pt-BR'),
          'Tamanho': o.tamanho
        }));

      const ws = XLSX.utils.json_to_sheet(dadosPagina);

      const wscols = [
        { wch: 5 },
        { wch: 40 },
        { wch: 15 },
        { wch: 20 },
        { wch: 10 },
      ];
      ws['!cols'] = wscols;

      XLSX.utils.book_append_sheet(wb, ws, `Tamanho ${tamanho}`);
    });

    XLSX.writeFile(wb, `Lista_Uniformes_Informatica_${new Date().getFullYear()}.xlsx`);
  };  

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="flex bg-slate-950/80 border-b border-slate-800 p-1 no-print">
          {['P', 'M', 'G'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 flex items-center justify-center gap-3 py-4 text-sm font-bold tracking-widest transition-all border-b-2 ${
                activeTab === t ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <TableIcon size={16} /> PÁGINA_{t}.db
            </button>
          ))}
        </div>

        <div className="max-h-125 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-slate-900 shadow-sm">
              <tr className="border-b border-slate-800">
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Index</th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Estudante</th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Contacto</th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.length > 0 ? (
                filtered.map((order, idx) => (
                  <tr key={order.id} className="group hover:bg-white/2 transition-colors">
                    <td className="p-5 font-mono text-xs text-slate-600">[{String(idx + 1).padStart(3, '0')}]</td>
                    <td className="p-5 font-bold text-slate-200 uppercase tracking-tight">{order.nome}</td>
                    <td className="p-5 font-mono text-sm text-cyan-500/70">{order.telefone}</td>
                    <td className="p-5 text-right font-bold text-[10px] text-slate-400">
                      { order.createdAt.toDate().toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center space-y-4 opacity-30">
                    <Database className="mx-auto" size={48} />
                    <p className="font-mono text-xs uppercase tracking-widest">No data available for partition {activeTab}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Tabela */}
        <div className="bg-slate-950 p-5 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> SYS_ACTIVE</span>
            <span>ROWS_COUNT: {filtered.length}</span>
          </div>
          <span>SESSION_ID: {userId?.substring(0, 12)}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 no-print">
        <button 
          onClick={gerarPlanilha}
          className="text-[10px] font-bold text-white hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 border border-emerald-500/30 px-8 py-3 rounded-full uppercase tracking-widest bg-emerald-500/10 shadow-lg shadow-emerald-900/10"
        >
          <FileSpreadsheet size={16} /> Descarregar Excel (.xlsx)
        </button>
      </div>
    </div>
  );
};