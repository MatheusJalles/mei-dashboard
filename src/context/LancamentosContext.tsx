import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lancamento, DadosMes } from '../types'

interface LancamentosContextData {
  lancamentos: Lancamento[]
  adicionarLancamento: (l: Omit<Lancamento, 'id'>) => void
  totalReceitas: number
  totalDespesas: number
  lucroLiquido: number
  totalISS: number
  getDadosPorMes: () => DadosMes[]
}

const LancamentosContext = createContext({} as LancamentosContextData)

export function LancamentosProvider({ children }: { children: ReactNode }) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])

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

  function getDadosPorMes(): DadosMes[] {
    const meses: Record<string, DadosMes> = {}

    lancamentos.forEach(l => {
      const [ano, mes] = l.data.split('-')
      const label = `${mes}/${ano.slice(2)}`
      if (!meses[label]) meses[label] = { label, receitas: 0, despesas: 0 }
      if (l.tipo === 'receita') meses[label].receitas += l.valor
      else meses[label].despesas += l.valor
    })

    return Object.values(meses).slice(-6)
  }

  return (
    <LancamentosContext.Provider value={{
      lancamentos,
      adicionarLancamento,
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