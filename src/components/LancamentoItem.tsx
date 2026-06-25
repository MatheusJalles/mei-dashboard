import type { Lancamento } from '../types'
import { formatarMoeda, formatarData } from '../utils/formatters'

interface Props {
  lancamento: Lancamento
}

export default function LancamentoItem({ lancamento: l }: Props) {
  const isReceita = l.tipo === 'receita'

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
        ${isReceita ? 'bg-green-400/10' : 'bg-red-400/10'}`}>
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

      <p className={`text-sm font-bold ${isReceita ? 'text-green-400' : 'text-red-400'}`}>
        {isReceita ? '+' : '−'}{formatarMoeda(l.valor)}
      </p>
    </div>
  )
}