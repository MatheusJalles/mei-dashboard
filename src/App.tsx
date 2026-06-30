import { useState } from 'react'
import { LancamentosProvider, useLancamentos } from './context/LancamentosContext'
import Header from './components/Header'
import SaldoCard from './components/SaldoCard'
import GraficoBarras from './components/GraficoBarras'
import LancamentoItem from './components/LancamentoItem'
import NovoLancamento from './components/NovoLancamento'
import ObrigacoesMEI from './components/ObrigacoesMEI'
import LinksMEI from './components/LinksMEI'

function Dashboard() {
  const { lancamentos } = useLancamentos()
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4 pb-24">
        <SaldoCard />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GraficoBarras />
          <ObrigacoesMEI />
        </div>

        <LinksMEI />

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">
              Lançamentos
              {lancamentos.length > 0 && (
                <span className="ml-2 text-xs text-gray-500 font-normal">
                  {lancamentos.length} registro{lancamentos.length !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>

          {lancamentos.length === 0 ? (
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-10 flex flex-col items-center gap-3">
              <span className="text-5xl">💰</span>
              <p className="text-white font-semibold">Nenhum lançamento ainda</p>
              <p className="text-gray-500 text-sm text-center">
                Clique em "Novo lançamento" para começar a controlar seu financeiro
              </p>
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

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-950 to-transparent">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setModalAberto(true)}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25"
          >
            + Novo lançamento
          </button>
        </div>
      </div>

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