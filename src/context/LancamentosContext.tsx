import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Lancamento, DadosMes, Perfil } from '../types'

interface LancamentosContextData {
  lancamentos: Lancamento[]
  perfil: Perfil
  adicionarLancamento: (l: Omit<Lancamento, 'id'>) => void
  salvarPerfil: (p: Perfil) => void
  totalReceitas: number
  totalDespesas: number
  lucroLiquido: number
  totalISS: number
  getDadosPorMes: () => DadosMes[]
}

const LancamentosContext = createContext({} as LancamentosContextData)

const PERFIL_PADRAO: Perfil = {
  nome: '',
  email: '',
  cnpj: '',
  ramo: '',
  cidade: '',
}

export function LancamentosProvider({ children }: { children: ReactNode }) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>(() => {
    try {
      const salvo = localStorage.getItem('mei:lancamentos')
      return salvo ? JSON.parse(salvo) : []
    } catch {
      return []
    }
  })

  const [perfil, setPerfil] = useState<Perfil>(() => {
    try {
      const salvo = localStorage.getItem('mei:perfil')
      return salvo ? JSON.parse(salvo) : PERFIL_PADRAO
    } catch {
      return PERFIL_PADRAO
    }
  })

  useEffect(() => {
    localStorage.setItem('mei:lancamentos', JSON.stringify(lancamentos))
  }, [lancamentos])

  useEffect(() => {
    localStorage.setItem('mei:perfil', JSON.stringify(perfil))
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

  function salvarPerfil(p: Perfil) {
    setPerfil(p)
  }

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

  return (
    <LancamentosContext.Provider value={{
      lancamentos,
      perfil,
      adicionarLancamento,
      salvarPerfil,
      totalReceitas,
      totalDespesas,
      lucroLiquido,
      totalISS,
      getDadosPorMes,
    }}>
      {children}
    </LancamentosContext.Provider>
  )
}

export function useLancamentos() {
  return useContext(LancamentosContext)
}