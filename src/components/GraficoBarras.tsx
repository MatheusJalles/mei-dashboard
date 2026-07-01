import { useLancamentos } from '../context/LancamentosContext'
import { formatarMoeda } from '../utils/formatters'
import type { DadosMes } from '../types'

function Barras({ dados }: { dados: DadosMes[] }) {
  if (dados.length === 0) {
    return (
      <div className="flex items-center justify-center h-28 text-xs text-muted">
        Nenhum dado disponível ainda
      </div>
    )
  }

  const maxValor = Math.max(...dados.map(d => d.receitas), ...dados.map(d => d.despesas), 1)

  return (
    <div>
      <div className="flex items-end justify-around gap-2 h-28">
        {dados.map((d, i) => {
          const hReceita = Math.max((d.receitas / maxValor) * 100, d.receitas > 0 ? 4 : 0)
          const hDespesa = Math.max((d.despesas / maxValor) * 100, d.despesas > 0 ? 4 : 0)
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1 group relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 rounded-xl px-2.5 py-1.5 text-xs hidden group-hover:block z-10 whitespace-nowrap border border-theme"
                style={{ backgroundColor: 'var(--bg-primary)' }}>
                <p style={{ color: '#10B981' }}>+ {formatarMoeda(d.receitas)}</p>
                <p style={{ color: '#EF4444' }}>- {formatarMoeda(d.despesas)}</p>
              </div>
              <div className="flex items-end gap-0.5 h-24">
                <div className="w-4 rounded-t-sm transition-all" style={{ height: `${hReceita}%`, backgroundColor: '#10B981' }} />
                <div className="w-4 rounded-t-sm transition-all" style={{ height: `${hDespesa}%`, backgroundColor: '#EF4444' }} />
              </div>
              <span className="text-xs text-muted">{d.label}</span>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-theme">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#10B981' }} />
          <span className="text-xs text-muted">Receitas</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#EF4444' }} />
          <span className="text-xs text-muted">Despesas</span>
        </div>
      </div>
    </div>
  )
}

export default function GraficoBarras() {
  const { getDadosPorMes } = useLancamentos()
  return (
    <div className="card">
      <p className="text-primary font-semibold text-sm mb-1">Receitas vs Despesas</p>
      <p className="text-muted text-xs mb-4">Evolução mensal</p>
      <Barras dados={getDadosPorMes()} />
    </div>
  )
}