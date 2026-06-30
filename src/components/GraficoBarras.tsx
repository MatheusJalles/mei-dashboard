import { useLancamentos } from '../context/LancamentosContext'
import type { DadosMes } from '../types'
import { formatarMoeda } from '../utils/formatters'

function Barras({ dados }: { dados: DadosMes[] }) {
  if (dados.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-600 text-sm">
        Nenhum dado disponível ainda
      </div>
    )
  }

  const maxValor = Math.max(
    ...dados.map(d => d.receitas),
    ...dados.map(d => d.despesas),
    1
  )

  return (
    <div>
      <div className="flex items-end justify-around gap-2 h-32">
        {dados.map((d, i) => {
          const hReceita = Math.max((d.receitas / maxValor) * 100, d.receitas > 0 ? 4 : 0)
          const hDespesa = Math.max((d.despesas / maxValor) * 100, d.despesas > 0 ? 4 : 0)

          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 group relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs hidden group-hover:block z-10 whitespace-nowrap">
                <p className="text-green-400">+ {formatarMoeda(d.receitas)}</p>
                <p className="text-red-400">- {formatarMoeda(d.despesas)}</p>
              </div>

              <div className="flex items-end gap-1 h-24">
                <div
                  className="w-5 rounded-t-md bg-green-400 transition-all"
                  style={{ height: `${hReceita}%` }}
                />
                <div
                  className="w-5 rounded-t-md bg-red-400 transition-all"
                  style={{ height: `${hDespesa}%` }}
                />
              </div>
              <span className="text-gray-500 text-xs">{d.label}</span>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-green-400" />
          <span className="text-gray-400 text-xs">Receitas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span className="text-gray-400 text-xs">Despesas</span>
        </div>
      </div>
    </div>
  )
}

export default function GraficoBarras() {
  const { getDadosPorMes } = useLancamentos()
  const dados = getDadosPorMes()

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <p className="text-white font-semibold text-sm mb-6">Receitas vs Despesas</p>
      <Barras dados={dados} />
    </div>
  )
}