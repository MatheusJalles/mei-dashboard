import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type Tema = 'dark' | 'light'

interface ThemeContextData {
  tema: Tema
  toggleTema: () => void
}

const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(() => {
    try {
      return (localStorage.getItem('caixinha:tema') as Tema) || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    localStorage.setItem('caixinha:tema', tema)
    document.documentElement.classList.toggle('dark', tema === 'dark')
    document.documentElement.classList.toggle('light', tema === 'light')
  }, [tema])

  function toggleTema() {
    setTema(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTema() {
  return useContext(ThemeContext)
}