import { 
  Database, 
  Table as TableIcon,
  Printer,
  FileSpreadsheet,
  Lock,
  Loader2
} from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
const MEDIDAS = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EXG'];

export const SpreadsheetView = ({ orders, onLogout }) => {
  const [activeTab, setActiveTab] = useState('M');
  const [isXLSXReady, setIsXLSXReady] = useState(false);

  useEffect(() => {
    if (window.XLSX) { setIsXLSXReady(true); return; }
    const script = document.createElement('script');
    script.src = "https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js";
    script.async = true;
    script.onload = () => setIsXLSXReady(true);
    document.head.appendChild(script);
  }, []);

  // "Achatamos" as encomendas para que cada camisa seja uma linha na tabela
  const flattenedItems = useMemo(() => {
    return orders.flatMap(order => 
      order.items.map(item => ({
        ...item,
        customerName: order.nome,
        customerPhone: order.telefone,
        orderDate: order.createdAt
      }))
    );
  }, [orders]);
  console.log("Itens achatados para planilha:", flattenedItems);
  const filteredItems = useMemo(() => 
    flattenedItems.filter(item => item.tamanho === activeTab), 
    [flattenedItems, activeTab]
  );
  
  const gerarPlanilha = () => {
    if (!window.XLSX) return;
    const XLSX = window.XLSX;
    const wb = XLSX.utils.book_new();

    MEDIDAS.forEach(tamanho => {
      const itemsPorTamanho = flattenedItems
        .filter(item => item.tamanho === tamanho)
        .map((item, index) => ({
          'Nº': index + 1,
          'Modelo': item.label,
          'Nome do Aluno': item.customerName,
          'Telemóvel': item.customerPhone,
          'Data do Pedido': item.orderDate.toDate().toLocaleDateString('pt-BR'),
          'Tamanho': item.tamanho
        }));
      if (itemsPorTamanho.length > 0) {
        const ws = XLSX.utils.json_to_sheet(itemsPorTamanho);
        ws['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 35 }, { wch: 15 }, { wch: 15 }, { wch: 10 }];
        XLSX.utils.book_append_sheet(wb, ws, `Tam ${tamanho}`);
      }
    });

    XLSX.writeFile(wb, `Lista_Uniformes_Individual_${new Date().getFullYear()}.xlsx`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-zinc-900 border-2 border-zinc-800 overflow-hidden shadow-2xl">
        <div className="flex bg-black border-b-2 border-zinc-800 p-1 overflow-x-auto no-print scrollbar-hide">
          {MEDIDAS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-none px-6 py-4 text-[10px] font-black transition-all border-b-4 ${
                activeTab === t ? 'border-yellow-400 text-yellow-400 bg-zinc-800' : 'border-transparent text-zinc-600 hover:text-zinc-400'
              }`}
            >
              TABELA_{t}
            </button>
          ))}
        </div>

        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
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
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <tr key={item.instanceId} className="group hover:bg-yellow-400/5 transition-colors">
                    <td className="p-5 font-mono text-[10px] text-zinc-600">[{String(idx + 1).padStart(3, '0')}]</td>
                    <td className="p-5">
                       <span className="text-[9px] bg-yellow-400/10 text-yellow-400 px-2 py-1 font-bold uppercase border border-yellow-400/20">
                         {item.label}
                       </span>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white uppercase text-xs tracking-tight">{item.customerName}</div>
                      <div className="text-[9px] text-zinc-600 font-mono">{item.customerPhone}</div>
                    </td>
                    <td className="p-5 text-right font-mono text-[10px] text-zinc-500">
                      {item.orderDate.toDate().toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center opacity-20">
                    <Database className="mx-auto mb-4" size={48} />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white italic">Nenhuma unidade de tamanho {activeTab} registada</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-black p-5 border-t-2 border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div> DATA_FLOW: OK</span>
            <span>TOTAL ITEMS: {flattenedItems.length}</span>
          </div>
          <button onClick={onLogout} className="hover:text-yellow-400 transition-colors flex items-center gap-1 no-print font-black">
            <Lock size={10} /> LOCK_SYSTEM
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 no-print">
        <button 
          onClick={gerarPlanilha}
          disabled={!isXLSXReady || flattenedItems.length === 0}
          className="text-[10px] font-black text-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 px-8 py-4 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
        >
          {isXLSXReady ? <><FileSpreadsheet size={18} /> Exportar Excel (.xlsx)</> : <><Loader2 size={16} className="animate-spin" /> Carregando SheetJS...</>}
        </button>
      </div>
    </div>
  );
};