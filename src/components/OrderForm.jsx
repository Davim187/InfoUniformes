import {
  User,
  Phone,
  Shirt,
  CheckCircle2,
  Table as TableIcon,
  Loader2,
  ExternalLink,
} from "lucide-react";

export const OrderForm = ({
  formData,
  setFormData,
  onSubmit,
  submitting,
  success,
}) => {
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = "(" + value.slice(0, 2);
      if (value.length > 2) {
        formattedValue += ") " + value.slice(2, 7);
        if (value.length > 7) {
          formattedValue += "-" + value.slice(7);
        }
      }
    }
    setFormData({ ...formData, telefone: formattedValue });
  };
  return (
    <div className="lg:col-span-3">
      <form
        onSubmit={onSubmit}
        className="bg-white/3 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl space-y-8"
      >
        <div className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
              Nome Completo
            </label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors"
                size={20}
              />
              <input
                required
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-cyan-500/40 outline-none transition-all placeholder:text-slate-700 font-medium"
                placeholder="Ex: Alan Turing da Silva"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
              Telefone / Contacto
            </label>
            <div className="relative group">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors"
                size={20}
              />
              <input
                required
                type="tel"
                value={formData.telefone}
                onChange={handlePhoneChange}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-cyan-500/40 outline-none transition-all placeholder:text-slate-700 font-mono"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          {/* Tamanho */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block text-center">
              Tamanho da Blusa
            </label>
            <div className="grid grid-cols-3 gap-4">
              {["P", "M", "G"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, tamanho: t })}
                  className={`relative group overflow-hidden py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.tamanho === t
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                  }`}
                >
                  <Shirt
                    size={24}
                    className={formData.tamanho === t ? "animate-bounce" : ""}
                  />
                  <span className="font-black text-xl">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          disabled={submitting}
          className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl shadow-cyan-900/20 transition-all flex items-center justify-center gap-3 active:scale-95 group"
        >
          {submitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              CONFIRMAR REGISTO <ExternalLink size={18} />
            </>
          )}
        </button>

        {success && (
          <div className="flex items-center justify-center gap-3 text-emerald-400 font-bold bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 animate-in fade-in zoom-in duration-300 text-sm">
            <CheckCircle2 size={20} />
            Dados sincronizados com sucesso!
          </div>
        )}
      </form>
    </div>
  );
};
