import { formatarMoeda } from '../utils/formatters'
import { useLancamentos } from '../context/LancamentosContext'

export default function SaldoCard() {
  const { totalReceitas, totalDespesas, totalISS, lucroLiquido } = useLancamentos()

  const percentualMEI = Math.min((totalReceitas / 81000) * 100, 100)
  const alertaLimite = totalReceitas > 72900

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <p className="text-gray-400 text-sm mb-1">Lucro líquido — mês atual</p>
      <p className={`text-4xl font-bold mb-6 ${lucroLiquido >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {formatarMoeda(lucroLiquido)}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-green-400 text-xs mb-1">Receitas</p>
          <p className="text-green-400 font-semibold text-sm">+ {formatarMoeda(totalReceitas)}</p>
        </div>
        <div className="text-center">
          <p className="text-red-400 text-xs mb-1">Despesas</p>
          <p className="text-red-400 font-semibold text-sm">− {formatarMoeda(totalDespesas)}</p>
        </div>
        <div className="text-center">
          <p className="text-yellow-400 text-xs mb-1">ISS (5%)</p>
          <p className="text-yellow-400 font-semibold text-sm">− {formatarMoeda(totalISS)}</p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4">
        <p className="text-gray-400 text-xs mb-2">
          Limite MEI: {formatarMoeda(totalReceitas)} de R$ 81.000,00 ({percentualMEI.toFixed(1)}%)
        </p>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all ${alertaLimite ? 'bg-red-400' : 'bg-blue-400'}`}
            style={{ width: `${percentualMEI}%` }}
          />
        </div>
      </div>
    </div>
  )
}