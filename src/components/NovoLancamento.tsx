import { useState } from 'react'
import { X, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import { useLancamentos } from '../context/LancamentosContext'
import type { TipoLancamento, CategoriaLancamento, Lancamento } from '../types'
import { CATEGORIAS_RECEITA, CATEGORIAS_DESPESA, LABEL_CATEGORIA } from '../utils/categorias'

interface Erros {
  descricao?: string
  valor?: string
  data?: string
}

interface Props {
  onClose: () => void
  lancamentoParaEditar?: Lancamento
}

export default function NovoLancamento({ onClose, lancamentoParaEditar }: Props) {
  const { adicionarLancamento, editarLancamento } = useLancamentos()
  const editando = !!lancamentoParaEditar

  const [descricao, setDescricao] = useState(lancamentoParaEditar?.descricao ?? '')
  const [valor, setValor] = useState(lancamentoParaEditar?.valor?.toString() ?? '')
  const [tipo, setTipo] = useState<TipoLancamento>(lancamentoParaEditar?.tipo ?? 'receita')
  const [data, setData] = useState(lancamentoParaEditar?.data ?? new Date().toISOString().split('T')[0])
  const [categoria, setCategoria] = useState<CategoriaLancamento>(lancamentoParaEditar?.categoria ?? 'outros')
  const [cliente, setCliente] = useState(lancamentoParaEditar?.cliente ?? '')
  const [pagamento, setPagamento] = useState(lancamentoParaEditar?.pagamento ?? '')
  const [erros, setErros] = useState<Erros>({})

  const categorias = tipo === 'receita' ? CATEGORIAS_RECEITA : CATEGORIAS_DESPESA

  function validar(): boolean {
    const novosErros: Erros = {}
    if (!descricao.trim()) novosErros.descricao = 'Descrição obrigatória'
    else if (descricao.length > 100) novosErros.descricao = 'Máximo 100 caracteres'
    if (!valor) novosErros.valor = 'Valor obrigatório'
    else if (isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) novosErros.valor = 'Valor deve ser maior que zero'
    if (!data) novosErros.data = 'Data obrigatória'
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  function handleSubmit() {
    if (!validar()) return
    const dados = {
      descricao, valor: parseFloat(valor), tipo, data, categoria,
      cliente: cliente || undefined,
      pagamento: pagamento || undefined,
    }
    if (editando && lancamentoParaEditar) {
      editarLancamento(lancamentoParaEditar.id, dados)
    } else {
      adicionarLancamento(dados)
    }
    onClose()
  }

  const inputClass = (erro?: string) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm text-primary placeholder-muted focus:outline-none transition-colors ${erro ? 'border-red-400' : 'border-theme focus:border-emerald-400'}`

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="card w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-primary font-bold text-base">
              {editando ? 'Editar lançamento' : 'Novo lançamento'}
            </h2>
            <p className="text-muted text-xs mt-0.5">
              {editando ? 'Corrija os dados abaixo' : 'Registre uma receita ou despesa'}
            </p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTipo('receita')}
            className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
            style={tipo === 'receita'
              ? { backgroundColor: '#10B981', color: 'white' }
              : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            <ArrowUpCircle size={14} />
            Receita
          </button>
          <button
            onClick={() => setTipo('despesa')}
            className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
            style={tipo === 'despesa'
              ? { backgroundColor: '#EF4444', color: 'white' }
              : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            <ArrowDownCircle size={14} />
            Despesa
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <div>
            <input type="text" placeholder="Descrição *" value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className={inputClass(erros.descricao)}
              style={{ backgroundColor: 'var(--bg-primary)' }} />
            {erros.descricao && <p className="text-red-400 text-xs mt-1">{erros.descricao}</p>}
          </div>

          <div>
            <input type="number" placeholder="Valor *" value={valor}
              onChange={e => setValor(e.target.value)}
              className={inputClass(erros.valor)}
              style={{ backgroundColor: 'var(--bg-primary)' }} />
            {erros.valor && <p className="text-red-400 text-xs mt-1">{erros.valor}</p>}
          </div>

          <div>
            <input type="date" value={data}
              onChange={e => setData(e.target.value)}
              className={inputClass(erros.data)}
              style={{ backgroundColor: 'var(--bg-primary)' }} />
            {erros.data && <p className="text-red-400 text-xs mt-1">{erros.data}</p>}
          </div>

          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value as CategoriaLancamento)}
            className="w-full border border-theme rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-emerald-400 transition-colors"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{LABEL_CATEGORIA[cat]}</option>
            ))}
          </select>

          <input type="text" placeholder="Cliente (opcional)" value={cliente}
            onChange={e => setCliente(e.target.value)}
            className={inputClass()}
            style={{ backgroundColor: 'var(--bg-primary)' }} />

          <input type="text" placeholder="Forma de pagamento (opcional)" value={pagamento}
            onChange={e => setPagamento(e.target.value)}
            className={inputClass()}
            style={{ backgroundColor: 'var(--bg-primary)' }} />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all"
          style={{ backgroundColor: tipo === 'receita' ? '#10B981' : '#EF4444' }}
        >
          {editando ? 'Salvar alterações' : `Registrar ${tipo}`}
        </button>
      </div>
    </div>
  )
}