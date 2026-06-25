import { useLancamentos } from '../context/LancamentosContext'
import type { DadosMes } from '../types'

function Barras({ dados }: { dados: DadosMes[] }) {
  if (dados.length === 0) {
    return (
      <div className="flex items-center justify-center h-24 text-gray-600 text-sm">
        Nenhum dado disponível ainda
      </div>
    )
  }

  const maxValor = Math.max(...dados.map(d => d.receitas), ...dados.map(d => d.despesas), 1)
  const ALTURA_MAX = 80

  return (
    <div>
      <div className="flex items-end justify-around h-24 gap-2">
        {dados.map((d, i) => {
          const hReceita = Math.max((d.receitas / maxValor) * ALTURA_MAX, d.receitas > 0 ? 4 : 0)
          const hDespesa = Math.max((d.despesas / maxValor) * ALTURA_MAX, d.despesas > 0 ? 4 : 0)

          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex items-end gap-1">
                <div className="w-3 rounded-sm bg-green-400" style={{ height: hReceita }} />
                <div className="w-3 rounded-sm bg-red-400" style={{ height: hDespesa }} />
              </div>
              <span className="text-gray-500 text-xs">{d.label}</span>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-gray-400 text-xs">Receitas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
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
      <p className="text-white font-semibold text-sm mb-4">Receitas vs Despesas</p>
      <Barras dados={dados} />
    </div>
  )
}