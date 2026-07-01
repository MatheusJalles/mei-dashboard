export type TipoLancamento = 'receita' | 'despesa'

export type CategoriaLancamento =
  | 'alimentacao'
  | 'transporte'
  | 'servicos'
  | 'saude'
  | 'educacao'
  | 'moradia'
  | 'lazer'
  | 'salario'
  | 'freelance'
  | 'vendas'
  | 'outros'

export interface Lancamento {
  id: string
  descricao: string
  valor: number
  tipo: TipoLancamento
  data: string
  categoria: CategoriaLancamento
  pagamento?: string
  cliente?: string
}

export interface DadosMes {
  label: string
  receitas: number
  despesas: number
}

export interface DadosCategoria {
  categoria: CategoriaLancamento
  total: number
  percentual: number
}

export interface Perfil {
  nome: string
  email: string
  cnpj: string
  ramo: string
  cidade: string
}

export interface LinkMEI {
  titulo: string
  descricao: string
  url: string
  icone: string
}

export interface ObrigacaoMEI {
  titulo: string
  descricao: string
  vencimento: string
  tipo: 'mensal' | 'anual'
  urgente: boolean
}