import {
  User,
  Phone,
  Shirt,
  CheckCircle2,
  Table as TableIcon,
  Loader2,
  ExternalLink,
  Cpu,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { useState } from "react";


const ModelSelector = ({ selected, onSelect }) => {
  const modelos = [
    { id: 'm1', label: 'Águia Black', img: 'src/assets/WhatsApp Image 2026-02-06 at 21.40.05 (1).jpeg', desc: 'Preta com Águia Dourada' },
    { id: 'm4', label: 'Águia White', img: 'src/assets/WhatsApp Image 2026-02-06 at 21.40.05 (2).jpeg', desc: 'Branca com Águia Dourada' },
    { id: 'm2', label: 'Infor Graffiti White', img: 'src/assets/WhatsApp Image 2026-02-06 at 21.40.05.jpeg', desc: 'Preta Estilo Graffiti' },
    { id: 'm5', label: 'Infor Graffiti Black', img: 'src/assets/WhatsApp Image 2026-02-06 at 21.40.04 (1).jpeg', desc: 'Branca com Águia Dourada' }
  ];

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest ml-1">Selecione o Modelo</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {modelos.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.label)}
            className={`border-2 p-2 transition-all group ${
              selected === m.label ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-800 bg-black'
            }`}
          >
            <div className="aspect-square bg-zinc-900 mb-2 overflow-hidden">
              
              <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-zinc-600 group-hover:text-yellow-400 transition-colors">
                <img src={m.img} alt="" />
              </div>
            </div>
            <div className={`text-[10px] font-black uppercase ${selected === m.label ? 'text-yellow-400' : 'text-zinc-500'}`}>
              {m.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


  const MEDIDAS = [
  { tam: 'PP', alt: 64, larg: 45 },
  { tam: 'P', alt: 70, larg: 49 },
  { tam: 'M', alt: 71, larg: 51 },
  { tam: 'G', alt: 74, larg: 57 },
  { tam: 'GG', alt: 77, larg: 58 },
  { tam: 'XG', alt: 80, larg: 62 },
  { tam: 'XGG', alt: 85, larg: 76 },
  { tam: 'EXG', alt: 88, larg: 79 },
];

const SizeChart = () => (
  <div className="bg-black border-2 border-zinc-800 overflow-hidden mb-6">
    <div className="bg-yellow-400 p-2 text-black text-[10px] font-black uppercase flex items-center gap-2">
      <Info size={14} /> Guia de Tamanhos (cm)
    </div>
    <table className="w-full text-[10px] font-mono">
      <thead>
        <tr className="border-b border-zinc-800 text-zinc-500">
          <th className="p-2 text-left">TAMANHO</th>
          <th className="p-2 text-center">(A) ALTURA</th>
          <th className="p-2 text-center">(B) LARGURA</th>
        </tr>
      </thead>
      <tbody className="text-zinc-300">
        {MEDIDAS.map((m) => (
          <tr key={m.tam} className="border-b border-zinc-900 hover:bg-white/5">
            <td className="p-2 font-bold text-yellow-400">{m.tam}</td>
            <td className="p-2 text-center">{m.alt}</td>
            <td className="p-2 text-center">{m.larg}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const OrderForm = ({ formData, setFormData, onSubmit, submitting, success, totalOrders }) => {
  const [showChart, setShowChart] = useState(false);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = "(" + value.slice(0, 2);
      if (value.length > 2) {
        formattedValue += ") " + value.slice(2, 7);
        if (value.length > 7) formattedValue += "-" + value.slice(7);
      }
    }
    setFormData({ ...formData, telefone: formattedValue });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-12 items-start">
      <div className="lg:col-span-2 space-y-6 no-print">
        <div className="bg-zinc-900 border-l-4 border-yellow-400 p-8">
          <Cpu className="text-yellow-400 mb-6" size={40} />
          <h3 className="text-xl font-black mb-4 text-white uppercase">Informações</h3>
          <p className="text-zinc-400 text-sm mb-6">Selecione o modelo desejado e confira as medidas na tabela antes de confirmar o pedido.</p>
          
          <button 
            type="button"
            onClick={() => setShowChart(!showChart)}
            className="w-full flex items-center justify-between p-3 bg-black border border-zinc-800 text-yellow-400 text-xs font-bold uppercase hover:border-yellow-400 transition-all"
          >
            Ver Tabela de Medidas {showChart ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {showChart && <div className="mt-4 animate-in slide-in-from-top-2 duration-300"><SizeChart /></div>}
        </div>
        
        <div className="p-4 bg-black border border-zinc-800 flex items-center justify-between text-yellow-400/40 text-[10px] font-mono uppercase">
          <span>Logs: connection_active</span>
          <span>Registos: {totalOrders}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="lg:col-span-3 bg-zinc-900 border-2 border-zinc-800 p-8 space-y-8 shadow-2xl">
        <div className="space-y-6">
          <ModelSelector 
            selected={formData.modelo} 
            onSelect={(m) => setFormData({...formData, modelo: m})} 
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest ml-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
              <input 
                required
                type="text" 
                value={formData.nome}
                onChange={e => setFormData({...formData, nome: e.target.value})}
                className="w-full bg-black border-2 border-zinc-800 py-4 pl-12 pr-4 focus:border-yellow-400 outline-none text-white font-bold transition-all"
                placeholder="Ex: Alan Turing"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest ml-1">Telemóvel</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                <input 
                  required
                  type="tel" 
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  className="w-full bg-black border-2 border-zinc-800 py-4 pl-12 pr-4 focus:border-yellow-400 outline-none text-white font-mono"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest ml-1 text-center block">Tamanho</label>
              <select 
                value={formData.tamanho}
                onChange={(e) => setFormData({...formData, tamanho: e.target.value})}
                className="w-full bg-black border-2 border-zinc-800 py-4 px-4 focus:border-yellow-400 outline-none text-white font-black"
              >
                {MEDIDAS.map(m => <option key={m.tam} value={m.tam}>{m.tam}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button 
          disabled={submitting}
          className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-black py-5 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-3 active:translate-y-1 active:shadow-none"
        >
          {submitting ? <Loader2 className="animate-spin" /> : <>SUBMETER REGISTO <ExternalLink size={18} /></>}
        </button>

        {success && (
          <div className="flex items-center justify-center gap-3 text-black font-black bg-yellow-400 p-4 animate-in zoom-in duration-300 text-xs uppercase">
            <CheckCircle2 size={20} /> Dados Sincronizados
          </div>
        )}
      </form>
    </div>
  );
};