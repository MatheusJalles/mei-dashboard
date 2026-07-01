import type { CategoriaLancamento } from '../types'

export const CATEGORIAS_RECEITA: CategoriaLancamento[] = [
  'salario', 'freelance', 'vendas', 'outros'
]

export const CATEGORIAS_DESPESA: CategoriaLancamento[] = [
  'alimentacao', 'transporte', 'servicos', 'saude',
  'educacao', 'moradia', 'lazer', 'outros'
]

export const LABEL_CATEGORIA: Record<CategoriaLancamento, string> = {
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  servicos: 'Serviços',
  saude: 'Saúde',
  educacao: 'Educação',
  moradia: 'Moradia',
  lazer: 'Lazer',
  salario: 'Salário',
  freelance: 'Freelance',
  vendas: 'Vendas',
  outros: 'Outros',
}

export const COR_CATEGORIA: Record<CategoriaLancamento, string> = {
  alimentacao: '#F97316',
  transporte: '#3B82F6',
  servicos: '#8B5CF6',
  saude: '#EF4444',
  educacao: '#06B6D4',
  moradia: '#F59E0B',
  lazer: '#EC4899',
  salario: '#10B981',
  freelance: '#34D399',
  vendas: '#6EE7B7',
  outros: '#6B7280',
}