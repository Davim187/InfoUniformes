import React, { useState } from "react";
import {
  User,
  Phone,
  Shirt,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Cpu,
  ChevronDown,
  ChevronUp,
  Info,
  Check,
  Plus,
  Trash2,
  Hash,
  Maximize2,
  ShoppingBag
} from "lucide-react";

// --- CONFIGURAÇÕES TÉCNICAS E DADOS ---

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

const MODELOS_DISPONIVEIS = [
  { id: 'm1', label: 'Águia Black', img: 'https://github.com/Davim187/InfoUniformes/blob/41c2c00911ae40381addd303793411835b2dd32e/src/assets/WhatsApp%20Image%202026-02-06%20at%2021.40.05%20(1).jpeg?raw=true' },
  { id: 'm4', label: 'Águia White', img: 'https://github.com/Davim187/InfoUniformes/blob/41c2c00911ae40381addd303793411835b2dd32e/src/assets/WhatsApp%20Image%202026-02-06%20at%2021.40.05%20(2).jpeg?raw=true' },
  { id: 'm2', label: 'Infor Graffiti White', img: 'https://github.com/Davim187/InfoUniformes/blob/41c2c00911ae40381addd303793411835b2dd32e/src/assets/WhatsApp%20Image%202026-02-06%20at%2021.40.05.jpeg?raw=true' },
  { id: 'm5', label: 'Infor Graffiti Black', img: 'https://github.com/Davim187/InfoUniformes/blob/41c2c00911ae40381addd303793411835b2dd32e/src/assets/WhatsApp%20Image%202026-02-06%20at%2021.40.04%20(1).jpeg?raw=true' }
];

// --- COMPONENTES ATÓMICOS ---

const SizeChart = () => (
  <div className="bg-black border-2 border-zinc-800 overflow-hidden mb-6 select-none">
    <div className="bg-yellow-400 p-2 text-black text-[10px] font-black uppercase flex items-center gap-2">
      <Info size={14} /> Tabela de Referência (cm)
    </div>
    <table className="w-full text-[10px] font-mono">
      <thead>
        <tr className="border-b border-zinc-800 text-zinc-600">
          <th className="p-2 text-left">TAM</th>
          <th className="p-2 text-center">ALTURA</th>
          <th className="p-2 text-center">LARGURA</th>
        </tr>
      </thead>
      <tbody className="text-zinc-400">
        {MEDIDAS.map((m) => (
          <tr key={m.tam} className="border-b border-zinc-900 hover:bg-yellow-400/5 transition-colors">
            <td className="p-2 font-bold text-yellow-400">{m.tam}</td>
            <td className="p-2 text-center">{m.alt}</td>
            <td className="p-2 text-center">{m.larg}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ModelCard = ({ modelo, onAdd,selected }) => (
  <div 
    onClick={() => onAdd(modelo)}
 className={`flex flex-col border-2 ${selected ? "border-yellow-400" : "border-zinc-800"} bg-black transition-all duration-300 hover:border-yellow-400 group cursor-pointer active:scale-95`}
  >
    <div className="p-3 flex flex-col items-center gap-3">
      <div className="aspect-square w-full bg-zinc-900 overflow-hidden border border-zinc-800 relative">
        <img 
          src={modelo.img} 
          alt={modelo.label} 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors flex items-center justify-center">
            <Plus size={32} className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
        </div>
      </div>
      <div className="text-[10px] font-black uppercase tracking-tight text-center text-zinc-500 group-hover:text-yellow-400 transition-colors">
        {modelo.label}
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL DO FORMULÁRIO ---

export const OrderForm = ({formData, setFormData, onSubmit, submitting, success, totalOrders}) => {
  // const [formData, setFormData] = useState({
  //   nome: "",
  //   telefone: "",
  //   tamanhoDefault: "M",
  //   items: [] // Estrutura: [{ instanceId, id, label, tamanho }]
  // });
  // const [submitting, setSubmitting] = useState(false);
  // const [success, setSuccess] = useState(false);
  const items = formData?.items || [];
  const [showChart, setShowChart] = useState(false);
  const selectedModelIds = new Set(items.map(item => item.id));


  // Formatação de Telemóvel
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    let formatted = "";
    if (value.length > 0) {
      formatted = "(" + value.slice(0, 2);
      if (value.length > 2) {
        formatted += ") " + value.slice(2, 7);
        if (value.length > 7) formatted += "-" + value.slice(7);
      }
    }
    setFormData(prev => ({ ...prev, telefone: formatted }));
  };

  // Lógica de Adicionar Item (Instância única)
  const addItem = (modelo) => {
    const newItem = {
      instanceId: `${modelo.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      id: modelo.id,
      label: modelo.label,
      tamanho: formData.tamanhoDefault
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (instanceId) => {
    setFormData(prev => ({
      ...prev,
     items: (prev.items || []).filter(item => item.instanceId !== instanceId)
    }));
  };

  const updateItemSize = (instanceId, newSize) => {
    setFormData(prev => ({
      ...prev,
      items: (prev.items || []).map(item => 
        item.instanceId === instanceId ? { ...item, tamanho: newSize } : item
      )
    }));
  };


  return (
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      {/* Painel de Suporte */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-zinc-900 border-l-4 border-yellow-400 p-6 md:p-8">
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
          
          {showChart && <div className="mt-4 animate-in fade-in duration-300"><SizeChart /></div>}
        </div>

        <div className="p-3 bg-zinc-950 border border-zinc-900 flex items-center justify-between text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Node_Active
          </span>
          <span>Build_2024.Individual</span>
        </div>
      </div>

      {/* Formulário Principal */}
      <form onSubmit={onSubmit} className="lg:col-span-3 bg-zinc-900 border-2 border-zinc-800 p-5 md:p-10 space-y-10 shadow-2xl overflow-hidden relative">
        <Shirt className="absolute -top-12 -right-12 text-white opacity-[0.02] pointer-events-none" size={240} />

        <div className="space-y-8 relative z-10">
          {/* Seletor de Modelos */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Modelos Disponíveis</label>
              <span className="text-[8px] font-mono text-zinc-600 uppercase">Clique para Adicionar</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {MODELOS_DISPONIVEIS.map((m) => (
                <ModelCard 
                  key={m.id}
                  modelo={m}
                  onAdd={addItem}
                  selected={selectedModelIds.has(m.id)}
                />
              ))}
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="grid gap-6 pt-6 border-t border-zinc-800/60">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest ml-1">Identificação</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
                <input 
                  required
                  type="text" 
                  value={formData.nome}
                  onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full bg-black border-2 border-zinc-800 py-4 pl-12 pr-4 focus:border-yellow-400 outline-none text-white font-bold transition-all placeholder:text-zinc-800 uppercase"
                  placeholder="NOME COMPLETO"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest ml-1">Contato</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
                  <input 
                    required
                    type="tel" 
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    className="w-122 bg-black border-2 border-zinc-800 py-4 pl-12 pr-4 focus:border-yellow-400 outline-none text-white font-mono"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo da Requisição (O Carrinho) */}
        <div className="space-y-6">
          <div className="p-4 bg-black/40 border border-zinc-800 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-500 font-bold text-[9px] uppercase tracking-widest">
                <ShoppingBag size={12} /> Resumo da Requisição ({items.length })
              </div>
              {items.length > 0 && (
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, items: [] }))}
                  className="text-[8px] text-red-500 font-black uppercase hover:underline"
                >
                  Limpar Tudo
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {items.length === 0 ? (
                <div className="py-8 text-center border border-dashed border-zinc-800 text-zinc-700 text-[10px] uppercase font-bold tracking-tighter">
                  Nenhum modelo selecionado
                </div>
              ) : (
                items.map((item, index) => (
                  <div 
                    key={item.instanceId} 
                    className="flex items-center justify-between bg-zinc-900/50 p-3 border-l-2 border-yellow-400 group animate-in slide-in-from-right-2 duration-300"
                  >
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-zinc-600">ITEM #{index + 1}</span>
                      <span className="text-[10px] font-black text-white uppercase">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Seletor de Tamanho Individual */}
                      <div className="relative flex items-center bg-black border border-zinc-800 px-2 h-8">
                        <span className="text-[7px] text-zinc-600 uppercase font-mono mr-2">Tamanho:</span>
                        <select 
                          value={item.tamanho}
                          onChange={(e) => updateItemSize(item.instanceId, e.target.value)}
                          className="bg-transparent text-yellow-400 font-black text-[10px] focus:outline-none cursor-pointer uppercase pr-2"
                        >
                          {MEDIDAS.map(m => <option key={m.tam} value={m.tam} className="bg-zinc-900">{m.tam}</option>)}
                        </select>
                      </div>

                      {/* Botão de Remover */}
                      <button 
                        type="button"
                        onClick={() => removeItem(item.instanceId)}
                        className="text-zinc-700 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <button 
              disabled={submitting || items.length === 0}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-20 disabled:grayscale text-black font-black py-5 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-3 active:translate-y-1 active:shadow-none"
            >
              {submitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>ENVIAR ORDEM DE PRODUÇÃO <ExternalLink size={18} /></>
              )}
            </button>

            {success && (
              <div className="flex items-center justify-center gap-3 text-black font-black bg-green-500 p-4 animate-in zoom-in duration-300 text-[10px] uppercase tracking-widest">
                <CheckCircle2 size={18} /> Transmissão Concluída
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};


