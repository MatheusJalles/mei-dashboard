export type TipoLancamento = 'receita' | 'despesa'

export interface Lancamento {
  id: string
  descricao: string
  valor: number
  tipo: TipoLancamento
  data: string
  pagamento?: string
  cliente?: string
}

export interface DadosMes {
  label: string
  receitas: number
  despesas: number
}

export interface Perfil {
  nome: string
  email: string
  cnpj: string
  ramo: string
  cidade: string
}