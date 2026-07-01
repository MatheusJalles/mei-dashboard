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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {periodos.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriodo(p.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${periodo === p.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gray-900 text-gray-400 border border-gray-700 hover:bg-gray-800'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => exportarRelatorioPDF(lancamentosFiltrados, perfil, receitasPeriodo, despesasPeriodo, issPeriodo, lucroPeriodo)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2 rounded-xl transition-all font-medium"
        >
          <Download size={14} />
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Receitas', valor: receitasPeriodo, icon: TrendingUp, cor: 'emerald' },
          { label: 'Despesas', valor: despesasPeriodo, icon: TrendingDown, cor: 'red' },
          { label: 'ISS (5%)', valor: issPeriodo, icon: DollarSign, cor: 'amber' },
          { label: 'Lucro líquido', valor: lucroPeriodo, icon: BarChart2, cor: lucroPeriodo >= 0 ? 'emerald' : 'red' },
        ].map((item, i) => {
          const Icon = item.icon
          const cor = item.cor
          return (
            <div key={i} className={`bg-gray-900 border rounded-2xl p-4
              ${cor === 'emerald' ? 'border-emerald-500/20' : cor === 'red' ? 'border-red-500/20' : 'border-amber-500/20'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3
                ${cor === 'emerald' ? 'bg-emerald-500/10' : cor === 'red' ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                <Icon size={16} className={
                  cor === 'emerald' ? 'text-emerald-400' : cor === 'red' ? 'text-red-400' : 'text-amber-400'
                } />
              </div>
              <p className="text-gray-400 text-xs mb-1">{item.label}</p>
              <p className={`font-bold text-base
                ${cor === 'emerald' ? 'text-emerald-400' : cor === 'red' ? 'text-red-400' : 'text-amber-400'}`}>
                {formatarMoeda(item.valor)}
              </p>
            </div>
          )
        })}
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <p className="text-white font-semibold text-sm mb-6">Evolução mensal</p>
        {dadosMes.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-600 text-sm">
            Nenhum dado disponível
          </div>
        ) : (
          <div>
            <div className="flex items-end justify-around gap-2 h-32">
              {dadosMes.map((d, i) => {
                const hReceita = Math.max((d.receitas / maxValor) * 100, d.receitas > 0 ? 4 : 0)
                const hDespesa = Math.max((d.despesas / maxValor) * 100, d.despesas > 0 ? 4 : 0)
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs hidden group-hover:block z-10 whitespace-nowrap">
                      <p className="text-emerald-400">+ {formatarMoeda(d.receitas)}</p>
                      <p className="text-red-400">- {formatarMoeda(d.despesas)}</p>
                    </div>
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-5 rounded-t-md bg-emerald-400 transition-all" style={{ height: `${hReceita}%` }} />
                      <div className="w-5 rounded-t-md bg-red-400 transition-all" style={{ height: `${hDespesa}%` }} />
                    </div>
                    <span className="text-gray-500 text-xs">{d.label}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                <span className="text-gray-400 text-xs">Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-400" />
                <span className="text-gray-400 text-xs">Despesas</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <p className="text-white font-semibold text-sm mb-4">
          Lançamentos do período
          <span className="ml-2 text-xs text-gray-500 font-normal">{lancamentosFiltrados.length} registros</span>
        </p>

        {lancamentosFiltrados.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">Nenhum lançamento neste período</p>
        ) : (
          <div className="flex flex-col gap-0">
            <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-800 mb-2">
              <p className="text-gray-500 text-xs font-medium">Descrição</p>
              <p className="text-gray-500 text-xs font-medium">Data</p>
              <p className="text-gray-500 text-xs font-medium">Tipo</p>
              <p className="text-gray-500 text-xs font-medium text-right">Valor</p>
            </div>
            {lancamentosFiltrados.map(l => (
              <div key={l.id} className="grid grid-cols-4 gap-4 py-2.5 border-b border-gray-800/50 hover:bg-gray-800/30 rounded-lg px-1 transition-colors">
                <p className="text-white text-xs truncate">{l.descricao}</p>
                <p className="text-gray-400 text-xs">{formatarData(l.data)}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit
                  ${l.tipo === 'receita' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {l.tipo}
                </span>
                <p className={`text-xs font-bold text-right ${l.tipo === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {l.tipo === 'receita' ? '+' : '-'}{formatarMoeda(l.valor)}
                </p>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-4 pt-3 mt-1">
              <p className="text-white text-xs font-bold col-span-3">Total do período</p>
              <p className={`text-xs font-bold text-right ${lucroPeriodo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatarMoeda(lucroPeriodo)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}