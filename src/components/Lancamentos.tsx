import { useState } from 'react'
import { Search } from 'lucide-react'
import { useLancamentos } from '../context/LancamentosContext'
import LancamentoItem from './LancamentoItem'
import type { TipoLancamento } from '../types'

export default function Lancamentos() {
  const { lancamentos } = useLancamentos()
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<TipoLancamento | 'todos'>('todos')

  const filtrados = lancamentos.filter(l => {
    const buscaOk = l.descricao.toLowerCase().includes(busca.toLowerCase())
    const tipoOk = filtroTipo === 'todos' || l.tipo === filtroTipo
    return buscaOk && tipoOk
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 relative min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Buscar lançamento..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm text-primary placeholder-muted focus:outline-none focus:border-emerald-400 transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          />
        </div>
        <div className="flex gap-2">
          {(['todos', 'receita', 'despesa'] as const).map(tipo => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={filtroTipo === tipo
                ? tipo === 'receita'
                  ? { backgroundColor: '#10B98120', color: '#10B981', border: '1px solid #10B98150' }
                  : tipo === 'despesa'
                    ? { backgroundColor: '#EF444420', color: '#EF4444', border: '1px solid #EF444450' }
                    : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
                : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            >
              {tipo === 'todos' ? 'Todos' : tipo === 'receita' ? 'Receitas' : 'Despesas'}
            </button>
          ))}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 py-10">
          <p className="text-primary font-semibold text-sm">Nenhum lançamento encontrado</p>
          <p className="text-muted text-xs text-center">
            {busca || filtroTipo !== 'todos'
              ? 'Tente ajustar os filtros'
              : 'Clique em "Novo lançamento" para começar'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-muted text-xs">
            {filtrados.length} registro{filtrados.length !== 1 ? 's' : ''}
          </p>
          {filtrados.map(l => (
            <LancamentoItem key={l.id} lancamento={l} />
          ))}
        </div>
      )}
    </div>
  )
}