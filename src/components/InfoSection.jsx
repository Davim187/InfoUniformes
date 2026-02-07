import { 
  Cpu, 
  Table as TableIcon,
} from 'lucide-react';

export const InfoSection = ({ totalOrders }) => (
  <div className="lg:col-span-2 space-y-8 no-print">
    Container: Fundo preto, borda amarela grossa, sem arredondamento
    <div className="bg-black border-2 border-yellow-400 p-8 rounded-none relative overflow-hidden group shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
      
      {/* Detalhe visual de fundo (Glow amarelo sutil) */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all"></div>
      
      {/* Ícone e Título: Amarelo e Branco */}
      <Cpu className="text-yellow-400 mb-6" size={40} strokeWidth={2.5} />
      <h3 className="text-2xl font-black mb-4 uppercase text-white tracking-tighter">
        Protocolo <span className="text-yellow-400">Turma 2026</span>
      </h3>
      
      <p className="text-white/80 leading-relaxed text-sm font-medium">
        Inicia o teu registo para a encomenda da blusa oficial do curso de informática. 
        Todos os dados são encriptados e armazenados em tempo real na nossa base de dados.
      </p>

      {/* Divisor e Footer: Bordas brancas e texto amarelo */}
      <div className="mt-8 pt-8 border-t-2 border-yellow-400/30 flex items-center gap-4">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div 
              key={i} 
              className="w-8 h-8 rounded-none border-2 border-black bg-yellow-400"
            ></div>
          ))}
        </div>
        <span className="text-xs text-yellow-400 font-black font-mono uppercase tracking-widest">
          // {totalOrders} colegas inscritos
        </span>
      </div>
    </div>
  </div>
);