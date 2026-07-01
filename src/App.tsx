import { useState } from 'react'
import { LancamentosProvider } from './context/LancamentosContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import VisaoGeral from './components/VisaoGeral'
import Lancamentos from './components/Lancamentos'
import Relatorios from './components/Relatorios'
import NovoLancamento from './components/NovoLancamento'

type Aba = 'visao-geral' | 'lancamentos' | 'relatorios'

function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('visao-geral')
  const [modalAberto, setModalAberto] = useState(false)

  function renderAba() {
  switch (abaAtiva) {
    case 'visao-geral': return <VisaoGeral />
    case 'lancamentos': return <Lancamentos />
    case 'relatorios': return <Relatorios />
  }
}

  return (
    <div className="min-h-screen bg-primary">
      <Header abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} />

      <main className="max-w-6xl mx-auto px-4 py-5 pb-24">
        {renderAba()}
      </main>

      {abaAtiva !== 'relatorios' && (
        <div className="fixed bottom-0 left-0 right-0 p-4"
          style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setModalAberto(true)}
              className="w-full py-3 rounded-2xl text-white font-semibold text-sm transition-all shadow-lg"
              style={{ backgroundColor: '#10B981' }}
            >
              + Novo lançamento
            </button>
          </div>
        </div>
      )}

      {modalAberto && <NovoLancamento onClose={() => setModalAberto(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LancamentosProvider>
        <Dashboard />
      </LancamentosProvider>
    </ThemeProvider>
  )
}