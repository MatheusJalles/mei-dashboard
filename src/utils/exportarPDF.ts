import jsPDF from 'jspdf'
import type { Lancamento, Perfil } from '../types'

function formatarMoeda(valor: number): string {
  return 'R$ ' + Math.abs(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function exportarRelatorioPDF(
  lancamentos: Lancamento[],
  perfil: Perfil,
  totalReceitas: number,
  totalDespesas: number,
  totalISS: number,
  lucroLiquido: number,
) {
  const doc = new jsPDF()
  const hoje = new Date().toLocaleDateString('pt-BR')

  // Cabeçalho
  doc.setFontSize(18)
  doc.setTextColor(30, 30, 30)
  doc.text('MEI Dashboard — Relatório Financeiro', 14, 20)

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Gerado em: ${hoje}`, 14, 28)

  if (perfil.nome) doc.text(`MEI: ${perfil.nome}`, 14, 34)
  if (perfil.cnpj) doc.text(`CNPJ: ${perfil.cnpj}`, 14, 40)
  if (perfil.ramo) doc.text(`Ramo: ${perfil.ramo}`, 14, 46)

  // Resumo
  doc.setFontSize(13)
  doc.setTextColor(30, 30, 30)
  doc.text('Resumo do período', 14, 60)

  doc.setFontSize(10)
  doc.setTextColor(60, 60, 60)
  doc.text(`Receitas:      ${formatarMoeda(totalReceitas)}`, 14, 70)
  doc.text(`Despesas:      ${formatarMoeda(totalDespesas)}`, 14, 78)
  doc.text(`ISS (5%):      ${formatarMoeda(totalISS)}`, 14, 86)

  doc.setFontSize(12)
  doc.setTextColor(lucroLiquido >= 0 ? 34 : 220, lucroLiquido >= 0 ? 197 : 38, lucroLiquido >= 0 ? 94 : 38)
  doc.text(`Lucro líquido: ${formatarMoeda(lucroLiquido)}`, 14, 96)

  // Lançamentos
  doc.setFontSize(13)
  doc.setTextColor(30, 30, 30)
  doc.text('Lançamentos', 14, 112)

  let y = 122
  doc.setFontSize(9)

  lancamentos.forEach(l => {
    if (y > 270) {
      doc.addPage()
      y = 20
    }

    const isReceita = l.tipo === 'receita'
    doc.setTextColor(isReceita ? 34 : 220, isReceita ? 197 : 38, isReceita ? 94 : 38)
    doc.text(`${isReceita ? '+' : '-'} ${formatarMoeda(l.valor)}`, 14, y)

    doc.setTextColor(60, 60, 60)
    doc.text(l.descricao, 50, y)
    doc.text(l.data.split('-').reverse().join('/'), 160, y)

    y += 8
  })

  doc.save(`relatorio-mei-${hoje.replace(/\//g, '-')}.pdf`)
}