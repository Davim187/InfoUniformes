import { 
  Cpu, 
  Table as TableIcon,

} from 'lucide-react';

export const InfoSection = ({ totalOrders }) => (
  <div className="lg:col-span-2 space-y-8 no-print">
    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
      <Cpu className="text-cyan-500 mb-6" size={40} />
      <h3 className="text-xl font-bold mb-4">Protocolo Turma 2025</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        Inicia o teu registo para a encomenda da blusa oficial do curso de informática. 
        Todos os dados são encriptados e armazenados em tempo real na nossa base de dados.
      </p>
      <div className="mt-8 pt-8 border-t border-slate-800 flex items-center gap-4">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800"></div>)}
        </div>
        <span className="text-xs text-slate-500 font-mono">+ {totalOrders} colegas inscritos</span>
      </div>
    </div>
  </div>
);