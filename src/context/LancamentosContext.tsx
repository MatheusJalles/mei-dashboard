import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Lancamento, DadosMes, DadosCategoria, Perfil, CategoriaLancamento } from '../types'

interface LancamentosContextData {
  lancamentos: Lancamento[]
  perfil: Perfil
  adicionarLancamento: (l: Omit<Lancamento, 'id'>) => void
  editarLancamento: (id: string, l: Omit<Lancamento, 'id'>) => void
  excluirLancamento: (id: string) => void
  salvarPerfil: (p: Perfil) => void
  totalReceitas: number
  totalDespesas: number
  lucroLiquido: number
  totalISS: number
  getDadosPorMes: () => DadosMes[]
  getDadosPorCategoria: () => DadosCategoria[]
}

const LancamentosContext = createContext({} as LancamentosContextData)

const PERFIL_PADRAO: Perfil = { nome: '', email: '', cnpj: '', ramo: '', cidade: '' }

export function LancamentosProvider({ children }: { children: ReactNode }) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>(() => {
    try {
      const salvo = localStorage.getItem('caixinha:lancamentos')
      return salvo ? JSON.parse(salvo) : []
    } catch { return [] }
  })

  const [perfil, setPerfil] = useState<Perfil>(() => {
    try {
      const salvo = localStorage.getItem('caixinha:perfil')
      return salvo ? JSON.parse(salvo) : PERFIL_PADRAO
    } catch { return PERFIL_PADRAO }
  })

  useEffect(() => {
    localStorage.setItem('caixinha:lancamentos', JSON.stringify(lancamentos))
  }, [lancamentos])

  useEffect(() => {
    localStorage.setItem('caixinha:perfil', JSON.stringify(perfil))
  }, [perfil])

  const totalReceitas = lancamentos
    .filter(l => l.tipo === 'receita')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalDespesas = lancamentos
    .filter(l => l.tipo === 'despesa')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalISS = totalReceitas * 0.05
  const lucroLiquido = totalReceitas - totalDespesas - totalISS

  function adicionarLancamento(l: Omit<Lancamento, 'id'>) {
    const novo: Lancamento = { ...l, id: Math.random().toString(36).substring(2, 9) }
    setLancamentos(prev => [novo, ...prev])
  }

  function editarLancamento(id: string, l: Omit<Lancamento, 'id'>) {
    setLancamentos(prev => prev.map(item => item.id === id ? { ...l, id } : item))
  }

  function excluirLancamento(id: string) {
    setLancamentos(prev => prev.filter(item => item.id !== id))
  }

  function salvarPerfil(p: Perfil) { setPerfil(p) }

  function getDadosPorMes(): DadosMes[] {
    const meses: Record<string, DadosMes> = {}
    lancamentos.forEach(l => {
      const partes = l.data.split('-')
      const label = `${partes[1]}/${partes[0].slice(2)}`
      if (!meses[label]) meses[label] = { label, receitas: 0, despesas: 0 }
      if (l.tipo === 'receita') meses[label].receitas += l.valor
      else meses[label].despesas += l.valor
    })
    return Object.values(meses).slice(-6)
  }

  function getDadosPorCategoria(): DadosCategoria[] {
    const totais: Partial<Record<CategoriaLancamento, number>> = {}
    const despesas = lancamentos.filter(l => l.tipo === 'despesa')
    const totalGeral = despesas.reduce((acc, l) => acc + l.valor, 0)

    despesas.forEach(l => {
      const cat = l.categoria || 'outros'
      totais[cat] = (totais[cat] || 0) + l.valor
    })

    return Object.entries(totais)
      .map(([categoria, total]) => ({
        categoria: categoria as CategoriaLancamento,
        total: total || 0,
        percentual: totalGeral > 0 ? ((total || 0) / totalGeral) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total)
  }

  return (
    <LancamentosContext.Provider value={{
      lancamentos, perfil,
      adicionarLancamento, editarLancamento, excluirLancamento, salvarPerfil,
      totalReceitas, totalDespesas, lucroLiquido, totalISS,
      getDadosPorMes, getDadosPorCategoria,
    }}>
      {children}
    </LancamentosContext.Provider>
  )
}

export function useLancamentos() {
  return useContext(LancamentosContext)
}