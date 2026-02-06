import { 
  Loader2,
} from 'lucide-react';

export const LoadingScreen = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
      <p className="text-cyan-500 font-mono text-xs tracking-widest animate-pulse">BOOTING_SYSTEM...</p>
    </div>
  </div>
);