import { useState } from 'react'
import type { Lancamento } from '../types'
import { formatarMoeda, formatarData } from '../utils/formatters'
import { useLancamentos } from '../context/LancamentosContext'
import NovoLancamento from './NovoLancamento'

interface Props {
  lancamento: Lancamento
}

export default function LancamentoItem({ lancamento: l }: Props) {
  const { excluirLancamento } = useLancamentos()
  const [editando, setEditando] = useState(false)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)
  const isReceita = l.tipo === 'receita'

  if (editando) {
    return <NovoLancamento onClose={() => setEditando(false)} lancamentoParaEditar={l} />
  }

  return (
    <>
      <div className="bg-gray-900 border border-gray-700 hover:border-gray-600 rounded-xl p-4 flex items-center gap-4 transition-all group">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0
          ${isReceita ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isReceita ? '↑' : '↓'}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{l.descricao}</p>
          <p className="text-gray-500 text-xs mt-0.5">
            {formatarData(l.data)}
            {l.pagamento ? ` · ${l.pagamento}` : ''}
            {l.cliente ? ` · ${l.cliente}` : ''}
          </p>
        </div>

        <p className={`text-sm font-bold flex-shrink-0 ${isReceita ? 'text-emerald-400' : 'text-red-400'}`}>
          {isReceita ? '+' : '−'}{formatarMoeda(l.valor)}
        </p>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditando(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all text-xs"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => setConfirmandoExclusao(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all text-xs"
            title="Excluir"
          >
            🗑️
          </button>
        </div>
      </div>

      {confirmandoExclusao && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm">
            <p className="text-white font-bold text-lg mb-2">Excluir lançamento?</p>
            <p className="text-gray-400 text-sm mb-6">
              "{l.descricao}" será removido permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmandoExclusao(false)}
                className="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => excluirLancamento(l.id)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-medium transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}