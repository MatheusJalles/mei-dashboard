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

export function getObrigacoesMEI(): import('../types').ObrigacaoMEI[] {
  const hoje = new Date()
  const mes = hoje.getMonth()
  const ano = hoje.getFullYear()
  const diaAtual = hoje.getDate()

  const vencimentoDAS = new Date(ano, mes, 20)
  const diasParaDAS = Math.ceil((vencimentoDAS.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

  return [
    {
      titulo: 'DAS Mensal',
      descricao: 'Guia de pagamento mensal do Simples Nacional',
      vencimento: diasParaDAS > 0 ? `Todo dia 20 — faltam ${diasParaDAS} dias` : 'Todo dia 20 — vence hoje ou já venceu',
      tipo: 'mensal',
      urgente: diaAtual >= 15,
    },
    {
      titulo: 'DASN-SIMEI',
      descricao: 'Declaração anual de faturamento',
      vencimento: `Até 31 de maio de ${ano + 1}`,
      tipo: 'anual',
      urgente: mes === 4,
    },
    {
      titulo: 'Relatório Mensal',
      descricao: 'Registro das receitas brutas do mês anterior',
      vencimento: 'Todo dia 30 do mês seguinte',
      tipo: 'mensal',
      urgente: diaAtual >= 25,
    },
  ]
}

export function getLinksMEI(): import('../types').LinkMEI[] {
  return [
    {
      titulo: 'Emitir DAS',
      descricao: 'Guia mensal do Simples',
      url: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/pagamento-mensal-das-e-parcelamento',
      icone: '💳',
    },
    {
      titulo: 'DASN-SIMEI',
      descricao: 'Declaração anual',
      url: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/declaracao-anual-dasn-simei',
      icone: '📋',
    },
    {
      titulo: 'Consultar CNPJ',
      descricao: 'Situação cadastral',
      url: 'https://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao.asp',
      icone: '🔍',
    },
    {
      titulo: 'CCMEI',
      descricao: 'Certificado da empresa',
      url: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/ccmei',
      icone: '📜',
    },
    {
      titulo: 'Nota Fiscal',
      descricao: 'Emissão de NFS-e',
      url: 'https://www.nfse.gov.br',
      icone: '🧾',
    },
    {
      titulo: 'Portal MEI',
      descricao: 'Acesso completo gov.br',
      url: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor',
      icone: '🏛️',
    },
  ]
}