export function formatarMoeda(valor: number): string {
  return 'R$ ' + Math.abs(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatarData(data: string): string {
  if (!data) return ''
  const partes = data.split('-')
  return `${partes[2]}/${partes[1]}`
}

export function gerarId(): string {
  return Math.random().toString(36).substring(2, 9)
}