import { useState } from 'react'
import { Download, TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react'
import { useLancamentos } from '../context/LancamentosContext'
import { formatarMoeda, formatarData } from '../utils/formatters'
import { exportarRelatorioPDF } from '../utils/exportarPDF'

type Periodo = 'mes' | 'trimestre' | 'ano'

export default function Relatorios() {
  const { lancamentos, perfil, getDadosPorMes } = useLancamentos()
  const [periodo, setPeriodo] = useState<Periodo>('mes')

  const hoje = new Date()

  const lancamentosFiltrados = lancamentos.filter(l => {
    const data = new Date(l.data)
    if (periodo === 'mes') {
      return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear()
    }
    if (periodo === 'trimestre') {
      const trimAtual = Math.floor(hoje.getMonth() / 3)
      const trimData = Math.floor(data.getMonth() / 3)
      return trimData === trimAtual && data.getFullYear() === hoje.getFullYear()
    }
    return data.getFullYear() === hoje.getFullYear()
  })

  const receitasPeriodo = lancamentosFiltrados
    .filter(l => l.tipo === 'receita')
    .reduce((acc, l) => acc + l.valor, 0)

  const despesasPeriodo = lancamentosFiltrados
    .filter(l => l.tipo === 'despesa')
    .reduce((acc, l) => acc + l.valor, 0)

  const issPeriodo = receitasPeriodo * 0.05
  const lucroPeriodo = receitasPeriodo - despesasPeriodo - issPeriodo

  const dadosMes = getDadosPorMes()
  const maxValor = Math.max(...dadosMes.map(d => d.receitas), ...dadosMes.map(d => d.despesas), 1)

  const periodos: { id: Periodo; label: string }[] = [
    { id: 'mes', label: 'Este mês' },
    { id: 'trimestre', label: 'Trimestre' },
    { id: 'ano', label: 'Este ano' },
  ]

  const cards = [
    { label: 'Receitas', valor: receitasPeriodo, Icon: TrendingUp, cor: '#10B981' },
    { label: 'Despesas', valor: despesasPeriodo, Icon: TrendingDown, cor: '#EF4444' },
    { label: 'ISS (5%)', valor: issPeriodo, Icon: DollarSign, cor: '#F59E0B' },
    { label: 'Lucro líquido', valor: lucroPeriodo, Icon: BarChart2, cor: lucroPeriodo >= 0 ? '#10B981' : '#EF4444' },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {periodos.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriodo(p.id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={periodo === p.id
                ? { backgroundColor: '#10B981', color: 'white' }
                : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => exportarRelatorioPDF(lancamentosFiltrados, perfil, receitasPeriodo, despesasPeriodo, issPeriodo, lucroPeriodo)}
          className="flex items-center gap-2 text-white text-sm px-4 py-2 rounded-xl transition-all font-medium"
          style={{ backgroundColor: '#10B981' }}
        >
          <Download size={14} />
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, i) => {
          const Icon = card.Icon
          return (
            <div key={i} className="card">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${card.cor}15` }}>
                <Icon size={16} style={{ color: card.cor }} />
              </div>
              <p className="text-muted text-xs mb-1">{card.label}</p>
              <p className="font-bold text-base" style={{ color: card.cor }}>
                {formatarMoeda(card.valor)}
              </p>
            </div>
          )
        })}
      </div>

      <div className="card">
        <p className="text-primary font-semibold text-sm mb-1">Evolução mensal</p>
        <p className="text-muted text-xs mb-4">Receitas vs despesas por mês</p>

        {dadosMes.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted text-xs">
            Nenhum dado disponível
          </div>
        ) : (
          <div>
            <div className="flex items-end justify-around gap-2 h-32">
              {dadosMes.map((d, i) => {
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
        )}
      </div>

      <div className="card">
        <p className="text-primary font-semibold text-sm mb-1">
          Lançamentos do período
          <span className="ml-2 text-xs text-muted font-normal">{lancamentosFiltrados.length} registros</span>
        </p>
        <p className="text-muted text-xs mb-4">Todos os lançamentos no período selecionado</p>

        {lancamentosFiltrados.length === 0 ? (
          <p className="text-muted text-sm text-center py-6">Nenhum lançamento neste período</p>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-4 pb-2 border-b border-theme mb-1">
              <p className="text-muted text-xs font-medium">Descrição</p>
              <p className="text-muted text-xs font-medium">Data</p>
              <p className="text-muted text-xs font-medium">Tipo</p>
              <p className="text-muted text-xs font-medium text-right">Valor</p>
            </div>
            {lancamentosFiltrados.map(l => (
              <div key={l.id} className="grid grid-cols-4 gap-4 py-2.5 border-b border-theme hover:bg-gray-500/5 rounded-lg px-1 transition-colors">
                <p className="text-primary text-xs truncate">{l.descricao}</p>
                <p className="text-muted text-xs">{formatarData(l.data)}</p>
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-full w-fit"
                  style={{
                    backgroundColor: l.tipo === 'receita' ? '#10B98120' : '#EF444420',
                    color: l.tipo === 'receita' ? '#10B981' : '#EF4444'
                  }}>
                  {l.tipo}
                </span>
                <p className="text-xs font-bold text-right" style={{ color: l.tipo === 'receita' ? '#10B981' : '#EF4444' }}>
                  {l.tipo === 'receita' ? '+' : '-'}{formatarMoeda(l.valor)}
                </p>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-4 pt-3 mt-1 border-t border-theme">
              <p className="text-primary text-xs font-bold col-span-3">Total do período</p>
              <p className="text-xs font-bold text-right" style={{ color: lucroPeriodo >= 0 ? '#10B981' : '#EF4444' }}>
                {formatarMoeda(lucroPeriodo)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}