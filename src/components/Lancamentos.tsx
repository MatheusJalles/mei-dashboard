import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { useLancamentos } from '../context/LancamentosContext'
import LancamentoItem from './LancamentoItem'
import type { TipoLancamento } from '../types'

export default function Lancamentos({ onNovo }: { onNovo: () => void }) {
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
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar lançamento..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
        <div className="flex gap-2">
          {(['todos', 'receita', 'despesa'] as const).map(tipo => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize
                ${filtroTipo === tipo
                  ? tipo === 'receita' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : tipo === 'despesa' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-gray-700 text-white border border-gray-600'
                  : 'bg-gray-900 text-gray-400 border border-gray-700 hover:bg-gray-800'}`}
            >
              {tipo === 'todos' ? 'Todos' : tipo === 'receita' ? 'Receitas' : 'Despesas'}
            </button>
          ))}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-10 flex flex-col items-center gap-3">
          <p className="text-white font-semibold">Nenhum lançamento encontrado</p>
          <p className="text-gray-500 text-sm text-center">
            {busca || filtroTipo !== 'todos' ? 'Tente ajustar os filtros' : 'Clique em "Novo lançamento" para começar'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-xs">
            {filtrados.length} registro{filtrados.length !== 1 ? 's' : ''}
            {busca || filtroTipo !== 'todos' ? ' encontrado' + (filtrados.length !== 1 ? 's' : '') : ''}
          </p>
          {filtrados.map(l => (
            <LancamentoItem key={l.id} lancamento={l} />
          ))}
        </div>
      )}
    </div>
  )
}