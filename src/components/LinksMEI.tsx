import { getLinksMEI } from '../utils/formatters'

export default function LinksMEI() {
  const links = getLinksMEI()

  function abrirLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
      <p className="text-white font-semibold text-sm mb-1">🔗 Links úteis MEI</p>
      <p className="text-gray-500 text-xs mb-4">
        Acesso rapido aos servicos do governo
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {links.map((link, i) => (
          <div
            key={i}
            onClick={() => abrirLink(link.url)}
            className="flex flex-col items-center gap-2 p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/40 rounded-xl transition-all group cursor-pointer"
          >
            <span className="text-2xl">{link.icone}</span>
            <div className="text-center">
              <p className="text-white text-xs font-semibold group-hover:text-emerald-400 transition-colors">
                {link.titulo}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {link.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}