import { useState } from 'react'
import { useLancamentos } from '../context/LancamentosContext'
import PerfilModal from './PerfilModal'
import { exportarRelatorioPDF } from '../utils/exportarPDF'

export default function Header() {
  const [perfilAberto, setPerfilAberto] = useState(false)
  const { perfil, lancamentos, totalReceitas, totalDespesas, totalISS, lucroLiquido } = useLancamentos()

  function handleExportarPDF() {
    exportarRelatorioPDF(lancamentos, perfil, totalReceitas, totalDespesas, totalISS, lucroLiquido)
  }

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">MEI Dashboard</h1>
            <p className="text-gray-400 text-sm">
              {perfil.nome ? `Olá, ${perfil.nome}` : 'Controle financeiro do microempreendedor'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportarPDF}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-3 py-2 rounded-xl transition-all border border-gray-700"
            >
              📄 Exportar PDF
            </button>
            <button
              onClick={() => setPerfilAberto(true)}
              className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:border-blue-400 transition-all"
            >
              <span className="text-lg">
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