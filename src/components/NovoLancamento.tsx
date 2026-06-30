import { useState } from 'react'
import { useLancamentos } from '../context/LancamentosContext'
import type { TipoLancamento, Lancamento } from '../types'

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
  const [cliente, setCliente] = useState(lancamentoParaEditar?.cliente ?? '')
  const [pagamento, setPagamento] = useState(lancamentoParaEditar?.pagamento ?? '')
  const [erros, setErros] = useState<Erros>({})

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
      descricao,
      valor: parseFloat(valor),
      tipo,
      data,
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
    `w-full bg-gray-800 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none transition-colors
    ${erro ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-emerald-400'}`

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-bold text-lg">
              {editando ? 'Editar lançamento' : 'Novo lançamento'}
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {editando ? 'Corrija os dados abaixo' : 'Registre uma receita ou despesa'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xl">✕</button>
        </div>

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTipo('receita')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${tipo === 'receita'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            ↑ Receita
          </button>
          <button
            onClick={() => setTipo('despesa')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${tipo === 'despesa'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            ↓ Despesa
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              placeholder="Descrição *"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className={inputClass(erros.descricao)}
            />
            {erros.descricao && <p className="text-red-400 text-xs mt-1 ml-1">{erros.descricao}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Valor *"
              value={valor}
              onChange={e => setValor(e.target.value)}
              className={inputClass(erros.valor)}
            />
            {erros.valor && <p className="text-red-400 text-xs mt-1 ml-1">{erros.valor}</p>}
          </div>

          <div>
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              className={inputClass(erros.data)}
            />
            {erros.data && <p className="text-red-400 text-xs mt-1 ml-1">{erros.data}</p>}
          </div>

          <input
            type="text"
            placeholder="Cliente (opcional)"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            className={inputClass()}
          />

          <input
            type="text"
            placeholder="Forma de pagamento (opcional)"
            value={pagamento}
            onChange={e => setPagamento(e.target.value)}
            className={inputClass()}
          />
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm transition-all shadow-lg
            ${tipo === 'receita'
              ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'
              : 'bg-red-500 hover:bg-red-400 shadow-red-500/20'}`}
        >
          {editando ? 'Salvar alterações' : `Registrar ${tipo}`}
        </button>
      </div>
    </div>
  )
}