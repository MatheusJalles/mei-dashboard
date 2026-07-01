import { useLancamentos } from '../context/LancamentosContext'
import { formatarMoeda } from '../utils/formatters'
import { LABEL_CATEGORIA, COR_CATEGORIA } from '../utils/categorias'

export default function GraficoCategorias() {
  const { getDadosPorCategoria } = useLancamentos()
  const dados = getDadosPorCategoria()

  if (dados.length === 0) {
    return (
      <div className="card">
        <p className="text-primary font-semibold text-sm mb-1">Gastos por categoria</p>
        <p className="text-muted text-xs mb-4">Distribuição das despesas</p>
        <div className="flex items-center justify-center h-24 text-muted text-xs">
          Nenhuma despesa registrada
        </div>
      </div>
    )
  }

  const top5 = dados.slice(0, 5)

  return (
    <div className="card">
      <p className="text-primary font-semibold text-sm mb-1">Gastos por categoria</p>
      <p className="text-muted text-xs mb-4">Distribuição das despesas</p>

      <div className="flex flex-col gap-3">
        {top5.map((d, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COR_CATEGORIA[d.categoria] }}
                />
                <p className="text-primary text-xs font-medium">
                  {LABEL_CATEGORIA[d.categoria]}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-muted text-xs">{d.percentual.toFixed(0)}%</p>
                <p className="text-primary text-xs font-semibold">{formatarMoeda(d.total)}</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${d.percentual}%`,
                  backgroundColor: COR_CATEGORIA[d.categoria]
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}