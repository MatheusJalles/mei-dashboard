import { Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import { getObrigacoesMEI } from '../utils/formatters'

export default function ObrigacoesMEI() {
  const obrigacoes = getObrigacoesMEI()

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={15} style={{ color: '#10B981' }} />
        <p className="text-primary font-semibold text-sm">Obrigações do mês</p>
      </div>
      <div className="flex flex-col gap-2.5">
        {obrigacoes.map((o, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl border border-theme"
            style={{ backgroundColor: o.urgente ? '#F59E0B08' : 'var(--bg-primary)' }}>
            {o.urgente
              ? <AlertCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
              : <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-primary text-xs font-semibold">{o.titulo}</p>
                <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: o.tipo === 'mensal' ? '#10B98120' : '#3B82F620',
                    color: o.tipo === 'mensal' ? '#10B981' : '#3B82F6'
                  }}>
                  {o.tipo}
                </span>
              </div>
              <p className="text-xs text-muted">{o.vencimento}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}