import { getObrigacoesMEI } from '../utils/formatters'

export default function ObrigacoesMEI() {
  const obrigacoes = getObrigacoesMEI()

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
      <p className="text-white font-semibold text-sm mb-4">📅 Obrigações do mês</p>
      <div className="flex flex-col gap-3">
        {obrigacoes.map((o, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all
              ${o.urgente
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-gray-800 border-gray-700'}`}
          >
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${o.urgente ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white text-sm font-medium">{o.titulo}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${o.tipo === 'mensal'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-blue-500/20 text-blue-400'}`}>
                  {o.tipo}
                </span>
              </div>
              <p className="text-gray-400 text-xs">{o.descricao}</p>
              <p className={`text-xs mt-1 font-medium ${o.urgente ? 'text-amber-400' : 'text-gray-500'}`}>
                {o.vencimento}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}