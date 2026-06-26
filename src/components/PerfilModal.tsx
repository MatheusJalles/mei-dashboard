import { useState } from 'react'
import { useLancamentos } from '../context/LancamentosContext'
import type { Perfil } from '../types'

export default function PerfilModal({ onClose }: { onClose: () => void }) {
  const { perfil, salvarPerfil } = useLancamentos()
  const [form, setForm] = useState<Perfil>({ ...perfil })

  function handleChange(campo: keyof Perfil, valor: string) {
    setForm(prev => ({ ...prev, [campo]: valor }))
  }

  function handleSalvar() {
    salvarPerfil(form)
    onClose()
  }

  const campos: { campo: keyof Perfil; label: string; placeholder: string }[] = [
    { campo: 'nome', label: 'Nome', placeholder: 'Seu nome completo' },
    { campo: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
    { campo: 'cnpj', label: 'CNPJ', placeholder: '00.000.000/0001-00' },
    { campo: 'ramo', label: 'Ramo de atividade', placeholder: 'Ex: Design Gráfico' },
    { campo: 'cidade', label: 'Cidade', placeholder: 'Ex: Belo Horizonte, MG' },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">Meu Perfil</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <div className="flex flex-col gap-3">
          {campos.map(({ campo, label, placeholder }) => (
            <div key={campo}>
              <label className="text-gray-400 text-xs mb-1 block">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={form[campo]}
                onChange={e => handleChange(campo, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSalvar}
          className="w-full mt-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all"
        >
          Salvar perfil
        </button>
      </div>
    </div>
  )
}