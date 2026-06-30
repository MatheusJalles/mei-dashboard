import { formatarMoeda } from '../utils/formatters'
import { useLancamentos } from '../context/LancamentosContext'

export default function SaldoCard() {
  const { totalReceitas, totalDespesas, totalISS, lucroLiquido } = useLancamentos()

  const percentualMEI = Math.min((totalReceitas / 81000) * 100, 100)
  const alertaLimite = totalReceitas > 72900

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6">
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
        Lucro líquido — mês atual
      </p>
      <p className={`text-5xl font-bold mb-6 tracking-tight ${lucroLiquido >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {formatarMoeda(lucroLiquido)}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
          <p className="text-emerald-400 text-xs font-medium mb-1">Receitas</p>
          <p className="text-emerald-300 font-bold text-sm">+ {formatarMoeda(totalReceitas)}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <p className="text-red-400 text-xs font-medium mb-1">Despesas</p>
          <p className="text-red-300 font-bold text-sm">− {formatarMoeda(totalDespesas)}</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
          <p className="text-amber-400 text-xs font-medium mb-1">ISS (5%)</p>
          <p className="text-amber-300 font-bold text-sm">− {formatarMoeda(totalISS)}</p>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-400 text-xs">Limite anual MEI</p>
          <p className={`text-xs font-semibold ${alertaLimite ? 'text-red-400' : 'text-gray-400'}`}>
            {formatarMoeda(totalReceitas)} / R$ 81.000,00 ({percentualMEI.toFixed(1)}%)
          </p>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${alertaLimite ? 'bg-red-400' : 'bg-emerald-400'}`}
            style={{ width: `${percentualMEI}%` }}
          />
        </div>
        {alertaLimite && (
          <p className="text-red-400 text-xs mt-2">⚠️ Atenção: você está próximo do limite anual MEI</p>
        )}
      </div>
    </div>
  )
}