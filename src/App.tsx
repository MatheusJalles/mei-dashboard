import { useState } from 'react'
import { LancamentosProvider, useLancamentos } from './context/LancamentosContext'
import Header from './components/Header'
import SaldoCard from './components/SaldoCard'
import GraficoBarras from './components/GraficoBarras'
import LancamentoItem from './components/LancamentoItem'
import type { TipoLancamento } from './types'
import { } from './utils/formatters'

function NovoLancamento({ onClose }: { onClose: () => void }) {
  const { adicionarLancamento } = useLancamentos()
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState<TipoLancamento>('receita')
  const [data, setData] = useState(new Date().toISOString().split('T')[0])
  const [cliente, setCliente] = useState('')
  const [pagamento, setPagamento] = useState('')

  function handleSubmit() {
    if (!descricao || !valor || !data) return

    adicionarLancamento({
      descricao,
      valor: parseFloat(valor),
      tipo,
      data,
      cliente: cliente || undefined,
      pagamento: pagamento || undefined,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">Novo Lançamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTipo('receita')}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all
              ${tipo === 'receita'
                ? 'bg-green-400 text-gray-950'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            Receita
          </button>
          <button
            onClick={() => setTipo('despesa')}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all
              ${tipo === 'despesa'
                ? 'bg-red-400 text-gray-950'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            Despesa
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Descrição *"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
          />
          <input
            type="number"
            placeholder="Valor *"
            value={valor}
            onChange={e => setValor(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
          />
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Cliente (opcional)"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Forma de pagamento (opcional)"
            value={pagamento}
            onChange={e => setPagamento(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!descricao || !valor || !data}
          className="w-full mt-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold text-sm transition-all"
        >
          Salvar lançamento
        </button>
      </div>
    </div>
  )
}

function Dashboard() {
  const { lancamentos } = useLancamentos()
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">
        <SaldoCard />

        <GraficoBarras />

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">Últimas movimentações</p>
          </div>

          {lancamentos.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 flex flex-col items-center gap-2">
              <span className="text-4xl">📋</span>
              <p className="text-gray-400 text-sm">Nenhum lançamento ainda</p>
              <p className="text-gray-600 text-xs">Clique em "Novo lançamento" para começar</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {lancamentos.map(l => (
                <LancamentoItem key={l.id} lancamento={l} />
              ))}
            </div>
          )}
        </div>
      </main>

      <button
        onClick={() => setModalAberto(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-all text-sm"
      >
        + Novo lançamento
      </button>

      {modalAberto && <NovoLancamento onClose={() => setModalAberto(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <LancamentosProvider>
      <Dashboard />
    </LancamentosProvider>
  )
}