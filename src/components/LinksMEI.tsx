import { CreditCard, FileText, Search, Award, Receipt, Building2 } from 'lucide-react'
import { getLinksMEI } from '../utils/formatters'
import { useState } from 'react'

const ICONES = [CreditCard, FileText, Search, Award, Receipt, Building2]
const CORES_HOVER = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4']

export default function LinksMEI() {
  const links = getLinksMEI()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  function abrirLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-1">
        <Building2 size={15} style={{ color: '#10B981' }} />
        <p className="text-primary font-semibold text-sm">Links úteis MEI</p>
      </div>
      <p className="text-muted text-xs mb-4">Acesso rápido aos serviços do governo</p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {links.map((link, i) => {
          const Icone = ICONES[i]
          const isHovered = hoveredIndex === i
          const cor = CORES_HOVER[i]

          return (
            <div
              key={i}
              onClick={() => abrirLink(link.url)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: isHovered ? `${cor}12` : 'var(--bg-primary)',
                borderColor: isHovered ? `${cor}50` : 'var(--border)',
              }}
            >
              <Icone
                size={20}
                style={{
                  color: isHovered ? cor : 'var(--text-muted)',
                  transition: 'color 0.2s',
                }}
              />
              <p
                className="text-xs font-medium text-center leading-tight transition-colors duration-200"
                style={{ color: isHovered ? cor : 'var(--text-primary)' }}
              >
                {link.titulo}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}