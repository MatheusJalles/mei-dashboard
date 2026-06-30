import { useState } from 'react'
import { useLancamentos } from '../context/LancamentosContext'
import PerfilModal from './PerfilModal'
import { exportarRelatorioPDF } from '../utils/exportarPDF'
import Logo from './Logo'

export default function Header() {
  const [perfilAberto, setPerfilAberto] = useState(false)
  const { perfil, lancamentos, totalReceitas, totalDespesas, totalISS, lucroLiquido } = useLancamentos()

  function handleExportarPDF() {
    exportarRelatorioPDF(lancamentos, perfil, totalReceitas, totalDespesas, totalISS, lucroLiquido)
  }

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <h1 className="text-white text-lg font-bold leading-tight">Caixinha MEI</h1>
              <p className="text-emerald-400 text-xs font-medium">Seu financeiro simples, do jeito MEI</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportarPDF}
              className="hidden sm:flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-3 py-2 rounded-xl transition-all border border-gray-700"
            >
              <span>📄</span>
              <span>Exportar PDF</span>
            </button>

            <button
              onClick={() => setPerfilAberto(true)}
              className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/20 transition-all"
            >
              <span className="text-emerald-400 text-sm font-bold">
                {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : '👤'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {perfilAberto && <PerfilModal onClose={() => setPerfilAberto(false)} />}
    </>
  )
}