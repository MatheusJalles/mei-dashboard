import { ExternalLink } from 'lucide-react'
import { getLinksMEI } from '../utils/formatters'

export default function LinksMEI() {
  const links = getLinksMEI()

  function abrirLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-1">
        <ExternalLink size={15} style={{ color: '#10B981' }} />
        <p className="text-primary font-semibold text-sm">Links úteis MEI</p>
      </div>
      <p className="text-muted text-xs mb-4">Acesso rápido aos serviços do governo</p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {links.map((link, i) => (
          <div
            key={i}
            onClick={() => abrirLink(link.url)}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-theme cursor-pointer transition-all hover:border-emerald-500/40 group"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <span className="text-xl">{link.icone}</span>
            <p className="text-primary text-xs font-medium text-center group-hover:text-emerald-400 transition-colors leading-tight">
              {link.titulo}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}