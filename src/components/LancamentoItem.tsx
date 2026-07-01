import { useState } from 'react'
import { Pencil, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import type { Lancamento } from '../types'
import { formatarMoeda, formatarData } from '../utils/formatters'
import { LABEL_CATEGORIA, COR_CATEGORIA } from '../utils/categorias'
import { useLancamentos } from '../context/LancamentosContext'
import NovoLancamento from './NovoLancamento'

export default function LancamentoItem({ lancamento: l }: { lancamento: Lancamento }) {
  const { excluirLancamento } = useLancamentos()
  const [editando, setEditando] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const isReceita = l.tipo === 'receita'
  const cor = isReceita ? '#10B981' : '#EF4444'

  if (editando) return <NovoLancamento onClose={() => setEditando(false)} lancamentoParaEditar={l} />

  return (
    <>
      <div className="flex items-center gap-3 p-3 rounded-xl border border-theme hover:border-emerald-500/30 transition-all group"
        style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${cor}15` }}>
          {isReceita
            ? <ArrowUpCircle size={16} style={{ color: cor }} />
            : <ArrowDownCircle size={16} style={{ color: cor }} />}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-primary text-sm font-medium truncate">{l.descricao}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-muted text-xs">{formatarData(l.data)}</p>
            {l.categoria && (
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${COR_CATEGORIA[l.categoria]}20`,
                  color: COR_CATEGORIA[l.categoria]
                }}>
                {LABEL_CATEGORIA[l.categoria]}
              </span>
            )}
            {l.pagamento && <p className="text-muted text-xs">· {l.pagamento}</p>}
          </div>
        </div>

        <p className="text-sm font-bold flex-shrink-0" style={{ color: cor }}>
          {isReceita ? '+' : '−'}{formatarMoeda(l.valor)}
        </p>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditando(true)}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all text-muted hover:text-primary border border-theme"
            style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Pencil size={12} />
          </button>
          <button onClick={() => setConfirmando(true)}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all text-muted hover:text-red-400 border border-theme"
            style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {confirmando && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-sm">
            <p className="text-primary font-bold text-base mb-1">Excluir lançamento?</p>
            <p className="text-muted text-sm mb-5">"{l.descricao}" será removido permanentemente.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmando(false)}
                className="flex-1 py-2 rounded-xl text-sm font-medium border border-theme text-secondary hover:text-primary transition-all"
                style={{ backgroundColor: 'var(--bg-primary)' }}>
                Cancelar
              </button>
              <button onClick={() => excluirLancamento(l.id)}
                className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition-all"
                style={{ backgroundColor: '#EF4444' }}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}