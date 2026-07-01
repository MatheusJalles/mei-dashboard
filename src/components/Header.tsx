import { useState } from 'react'
import { FileText, User, Bell, Sun, Moon } from 'lucide-react'
import { useLancamentos } from '../context/LancamentosContext'
import { useTema } from '../context/ThemeContext'
import PerfilModal from './PerfilModal'
import { exportarRelatorioPDF } from '../utils/exportarPDF'
import Logo from './Logo'

type Aba = 'visao-geral' | 'lancamentos' | 'relatorios'

interface Props {
  abaAtiva: Aba
  onMudarAba: (aba: Aba) => void
}

const abas: { id: Aba; label: string }[] = [
  { id: 'visao-geral', label: 'Visão Geral' },
  { id: 'lancamentos', label: 'Lançamentos' },
  { id: 'relatorios', label: 'Relatórios' },
]

export default function Header({ abaAtiva, onMudarAba }: Props) {
  const [perfilAberto, setPerfilAberto] = useState(false)
  const { perfil, lancamentos, totalReceitas, totalDespesas, totalISS, lucroLiquido } = useLancamentos()
  const { tema, toggleTema } = useTema()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-theme"
        style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <div>
                <h1 className="text-primary text-sm font-bold leading-tight">Caixinha MEI</h1>
                <p className="text-xs" style={{ color: '#10B981' }}>Seu financeiro simples, do jeito MEI</p>
              </div>
            </div>

            <nav className="hidden sm:flex items-center gap-1">
              {abas.map(aba => (
                <button
                  key={aba.id}
                  onClick={() => onMudarAba(aba.id)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all
                    ${abaAtiva === aba.id
                      ? 'text-white'
                      : 'text-secondary hover:text-primary'}`}
                  style={abaAtiva === aba.id ? { backgroundColor: '#10B981' } : {}}
                >
                  {aba.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTema}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-all border border-theme"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                title={tema === 'dark' ? 'Modo claro' : 'Modo escuro'}
              >
                {tema === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <button
                onClick={() => exportarRelatorioPDF(lancamentos, perfil, totalReceitas, totalDespesas, totalISS, lucroLiquido)}
                className="hidden sm:flex items-center gap-1.5 text-secondary hover:text-primary text-xs px-3 py-1.5 rounded-xl transition-all border border-theme"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <FileText size={13} />
                <span>PDF</span>
              </button>

              <button className="w-8 h-8 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-all border border-theme"
                style={{ backgroundColor: 'var(--bg-primary)' }}>
                <Bell size={15} />
              </button>

              <button
                onClick={() => setPerfilAberto(true)}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all border"
                style={{ backgroundColor: '#10B98120', borderColor: '#10B98150' }}
              >
                {perfil.nome
                  ? <span className="text-sm font-bold" style={{ color: '#10B981' }}>{perfil.nome.charAt(0).toUpperCase()}</span>
                  : <User size={15} style={{ color: '#10B981' }} />}
              </button>
            </div>
          </div>

          <div className="flex sm:hidden gap-1 pb-2">
            {abas.map(aba => (
              <button
                key={aba.id}
                onClick={() => onMudarAba(aba.id)}
                className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={abaAtiva === aba.id
                  ? { backgroundColor: '#10B981', color: 'white' }
                  : { color: 'var(--text-secondary)' }}
              >
                {aba.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {perfilAberto && <PerfilModal onClose={() => setPerfilAberto(false)} />}
    </>
  )
}