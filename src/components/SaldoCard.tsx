import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { formatarMoeda } from '../utils/formatters'
import { useLancamentos } from '../context/LancamentosContext'

export default function SaldoCard() {
  const { totalReceitas, totalDespesas, totalISS, lucroLiquido } = useLancamentos()
  const percentualMEI = Math.min((totalReceitas / 81000) * 100, 100)
  const alertaLimite = totalReceitas > 72900

  return (
    <div className="card">
      <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
        Lucro líquido — mês atual
      </p>
      <p className="text-3xl font-bold mb-4" style={{ color: lucroLiquido >= 0 ? '#10B981' : '#EF4444' }}>
        {formatarMoeda(lucroLiquido)}
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#10B98115' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={11} style={{ color: '#10B981' }} />
            <p className="text-xs font-medium" style={{ color: '#10B981' }}>Receitas</p>
          </div>
          <p className="font-bold text-xs" style={{ color: '#10B981' }}>+ {formatarMoeda(totalReceitas)}</p>
        </div>
        <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#EF444415' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingDown size={11} style={{ color: '#EF4444' }} />
            <p className="text-xs font-medium" style={{ color: '#EF4444' }}>Despesas</p>
          </div>
          <p className="font-bold text-xs" style={{ color: '#EF4444' }}>− {formatarMoeda(totalDespesas)}</p>
        </div>
        <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#F59E0B15' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <p className="text-xs font-medium" style={{ color: '#F59E0B' }}>ISS 5%</p>
          </div>
          <p className="font-bold text-xs" style={{ color: '#F59E0B' }}>− {formatarMoeda(totalISS)}</p>
        </div>
      </div>

      <div className="border-t border-theme pt-3">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-xs text-muted">Limite anual MEI</p>
          <p className="text-xs font-medium" style={{ color: alertaLimite ? '#EF4444' : 'var(--text-muted)' }}>
            {formatarMoeda(totalReceitas)} / R$ 81.000 ({percentualMEI.toFixed(1)}%)
          </p>
        </div>
        <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${percentualMEI}%`,
              backgroundColor: alertaLimite ? '#EF4444' : '#10B981'
            }}
          />
        </div>
        {alertaLimite && (
          <div className="flex items-center gap-1 mt-2">
            <AlertCircle size={12} style={{ color: '#EF4444' }} />
            <p className="text-xs" style={{ color: '#EF4444' }}>Próximo do limite anual MEI</p>
          </div>
        )}
      </div>
    </div>
  )
}