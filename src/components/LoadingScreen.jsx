import { 
  Loader2,
} from 'lucide-react';

export const LoadingScreen = () => (
  /* Fundo Preto Total */
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center gap-6">
      {/* Loader: Amarelo com traço mais espesso */}
      <div className="relative">
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" strokeWidth={3} />
        {/* Efeito de brilho estático opcional ao redor do loader */}
        <div className="absolute inset-0 w-12 h-12 bg-yellow-400/20 blur-xl rounded-full animate-pulse"></div>
      </div>
      
      {/* Texto: Amarelo, Negrito e Espaçado */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-yellow-400 font-mono text-sm font-black tracking-[0.3em] animate-pulse uppercase">
          BOOTING_SYSTEM...
        </p>
        {/* Barra de progresso estética (apenas visual) */}
        <div className="w-32 h-1 bg-yellow-400/20 mt-2 overflow-hidden">
          <div className="w-1/2 h-full bg-yellow-400 animate-[loading_1.5s_infinite_ease-in-out]"></div>
        </div>
      </div>
    </div>
  </div>
);
