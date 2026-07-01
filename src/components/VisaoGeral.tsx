import { TrendingUp, TrendingDown } from 'lucide-react'
import { useLancamentos } from '../context/LancamentosContext'
import { formatarMoeda } from '../utils/formatters'
import SaldoCard from './SaldoCard'
import GraficoBarras from './GraficoBarras'
import GraficoCategorias from './GraficoCategorias'
import ObrigacoesMEI from './ObrigacoesMEI'
import LinksMEI from './LinksMEI'
import LancamentoItem from './LancamentoItem'

export default function VisaoGeral({ onNovoLancamento }: { onNovoLancamento: () => void }) {
  const { perfil, totalReceitas, totalDespesas, lancamentos } = useLancamentos()
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  const recentes = lancamentos.slice(0, 5)

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-muted text-sm">{saudacao}{perfil.nome ? `, ${perfil.nome.split(' ')[0]}` : ''}!</p>
            <p className="text-primary text-2xl font-bold mt-0.5">{formatarMoeda(totalReceitas - totalDespesas)}</p>
            <p className="text-muted text-xs mt-0.5">Saldo geral do período</p>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <TrendingUp size={12} style={{ color: '#10B981' }} />
                <p className="text-xs font-medium" style={{ color: '#10B981' }}>Receita mensal</p>
              </div>
              <p className="font-bold text-sm" style={{ color: '#10B981' }}>+ {formatarMoeda(totalReceitas)}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <TrendingDown size={12} style={{ color: '#EF4444' }} />
                <p className="text-xs font-medium" style={{ color: '#EF4444' }}>Despesa mensal</p>
              </div>
              <p className="font-bold text-sm" style={{ color: '#EF4444' }}>- {formatarMoeda(totalDespesas)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <SaldoCard />
          <GraficoBarras />
          <GraficoCategorias />
        </div>

        <div className="flex flex-col gap-4">
          <ObrigacoesMEI />
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-primary font-semibold text-sm">Últimos lançamentos</p>
              <p className="text-muted text-xs">{lancamentos.length} total</p>
            </div>
            {recentes.length === 0 ? (
              <p className="text-muted text-xs text-center py-4">Nenhum lançamento ainda</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {recentes.map(l => (
                  <LancamentoItem key={l.id} lancamento={l} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <LinksMEI />
    </div>
  )
}