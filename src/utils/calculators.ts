
import {
  INSS_FAIXAS,
  IRRF_FAIXAS,
  ALIQUOTA_FGTS,
  MULTA_FGTS,
  DEDUCAO_POR_DEPENDENTE,
  ADICIONAL_FERIAS,
  AVISO_PREVIO,
  TIPO_DEMISSAO,
  HORAS_TRABALHADAS_MES,
  ADICIONAL_HORA_EXTRA
} from "./constants";

/**
 * Calculates INSS contribution based on gross salary
 * @param salarioBruto Gross salary amount
 * @returns INSS contribution value
 */
export const calcularINSS = (salarioBruto: number): number => {
  let inss = 0;
  let salarioRestante = salarioBruto;
  let faixaAnterior = 0;

  for (const faixa of INSS_FAIXAS) {
    if (salarioBruto > faixaAnterior) {
      const baseCalculo = Math.min(salarioBruto, faixa.teto) - faixaAnterior;
      inss += baseCalculo * faixa.aliquota;
      faixaAnterior = faixa.teto;
    }
  }

  return parseFloat(inss.toFixed(2));
};

/**
 * Calculates Income Tax (IRRF) based on salary after INSS deduction
 * @param salarioBruto Gross salary amount
 * @param descontoINSS INSS contribution already calculated
 * @param dependentes Number of dependents
 * @returns Income tax value
 */
export const calcularIRRF = (salarioBruto: number, descontoINSS: number, dependentes: number): number => {
  // Base calculation: gross salary - INSS - dependents deduction
  const baseCalculo = salarioBruto - descontoINSS - (dependentes * DEDUCAO_POR_DEPENDENTE);
  
  // Find applicable tax bracket
  const faixa = IRRF_FAIXAS.find(f => baseCalculo <= f.teto) || IRRF_FAIXAS[IRRF_FAIXAS.length - 1];
  
  // Calculate IRRF
  const irrf = (baseCalculo * faixa.aliquota) - faixa.deducao;
  
  // IRRF can't be negative
  return irrf > 0 ? parseFloat(irrf.toFixed(2)) : 0;
};

/**
 * Calculates FGTS monthly deposit
 * @param salarioBruto Gross salary amount
 * @returns FGTS deposit amount
 */
export const calcularFGTS = (salarioBruto: number): number => {
  return parseFloat((salarioBruto * ALIQUOTA_FGTS).toFixed(2));
};

/**
 * Calculates FGTS termination fine (40%)
 * @param saldoFGTS FGTS balance accumulated
 * @returns FGTS fine amount
 */
export const calcularMultaFGTS = (saldoFGTS: number): number => {
  return parseFloat((saldoFGTS * MULTA_FGTS).toFixed(2));
};

/**
 * Calculate vacation amount including the constitutional bonus (1/3)
 * @param salarioBruto Monthly gross salary
 * @param diasFerias Number of vacation days (default: 30)
 * @param vendasFerias Number of days sold (optional)
 * @returns Object with vacation details and amounts
 */
export const calcularFerias = (
  salarioBruto: number,
  diasFerias: number = 30,
  vendasFerias: number = 0
): { valorFerias: number; adicionalFerias: number; totalFerias: number } => {
  const valorFerias = (salarioBruto / 30) * diasFerias;
  const valorVendaFerias = vendasFerias > 0 ? (salarioBruto / 30) * vendasFerias : 0;
  const adicionalFerias = (valorFerias + valorVendaFerias) * ADICIONAL_FERIAS;
  const totalFerias = valorFerias + adicionalFerias + valorVendaFerias;

  return {
    valorFerias: parseFloat(valorFerias.toFixed(2)),
    adicionalFerias: parseFloat(adicionalFerias.toFixed(2)),
    totalFerias: parseFloat(totalFerias.toFixed(2))
  };
};

/**
 * Calculates proportional 13th salary
 * @param salarioBruto Monthly gross salary
 * @param mesesTrabalhados Number of months worked in the year
 * @returns 13th salary amount
 */
export const calcularDecimoTerceiro = (
  salarioBruto: number,
  mesesTrabalhados: number
): { valorDecimoTerceiro: number } => {
  // Calculate how many twelfths the employee is entitled to (rounded up for 15+ days)
  const dozeavos = Math.min(12, mesesTrabalhados);
  const valorDecimoTerceiro = (salarioBruto / 12) * dozeavos;

  return {
    valorDecimoTerceiro: parseFloat(valorDecimoTerceiro.toFixed(2))
  };
};

/**
 * Calculates overtime pay
 * @param salarioBruto Monthly gross salary
 * @param horasExtras Number of overtime hours
 * @param percentualAdicional Overtime percentage (default: 50%)
 * @returns Overtime pay amount
 */
export const calcularHorasExtras = (
  salarioBruto: number,
  horasExtras: number,
  percentualAdicional: number = ADICIONAL_HORA_EXTRA.normal
): number => {
  const valorHoraNormal = salarioBruto / HORAS_TRABALHADAS_MES;
  const valorHoraExtra = valorHoraNormal * (1 + percentualAdicional);
  return parseFloat((valorHoraExtra * horasExtras).toFixed(2));
};

/**
 * Calculates night shift additional pay
 * @param salarioBruto Monthly gross salary
 * @param horasNoturnas Number of night hours worked
 * @param percentualAdicional Night shift premium percentage (default: 20%)
 * @returns Night shift additional pay
 */
export const calcularAdicionalNoturno = (
  salarioBruto: number,
  horasNoturnas: number,
  percentualAdicional: number = 0.2
): number => {
  const valorHoraNormal = salarioBruto / HORAS_TRABALHADAS_MES;
  const valorAdicional = valorHoraNormal * percentualAdicional * horasNoturnas;
  return parseFloat(valorAdicional.toFixed(2));
};

/**
 * Calculates termination notice period days
 * @param anosTrabalho Years of service in the company
 * @returns Number of notice period days
 */
export const calcularDiasAvisoPrevio = (anosTrabalho: number): number => {
  const diasAdicionais = Math.min(
    (Math.floor(anosTrabalho) * AVISO_PREVIO.adicional_por_ano),
    AVISO_PREVIO.max_dias - AVISO_PREVIO.base_dias
  );
  return AVISO_PREVIO.base_dias + diasAdicionais;
};

/**
 * Calculates remaining salary for the month of termination
 * @param salarioBruto Monthly gross salary
 * @param diasTrabalhados Days worked in the month of termination
 * @returns Remaining salary amount
 */
export const calcularSaldoSalario = (
  salarioBruto: number,
  diasTrabalhados: number
): number => {
  return parseFloat(((salarioBruto / 30) * diasTrabalhados).toFixed(2));
};

/**
 * Calculates termination notice amount
 * @param salarioBruto Monthly gross salary
 * @param anosTrabalho Years of service in the company
 * @param tipoDemissao Type of termination
 * @returns Notice period payment (if applicable)
 */
export const calcularAvisoPrevioIndenizado = (
  salarioBruto: number,
  anosTrabalho: number,
  tipoDemissao: string
): number => {
  // Only applies to termination without cause by the employer
  if (tipoDemissao !== TIPO_DEMISSAO.SEM_JUSTA_CAUSA) {
    return 0;
  }
  
  const diasAvisoPrevio = calcularDiasAvisoPrevio(anosTrabalho);
  return parseFloat(((salarioBruto / 30) * diasAvisoPrevio).toFixed(2));
};

/**
 * Calculate complete termination amount
 * @param salarioBruto Monthly gross salary
 * @param dataAdmissao Admission date
 * @param dataDemissao Termination date
 * @param tipoDemissao Type of termination
 * @param saldoFGTS FGTS balance accumulated
 * @returns Object with all termination values
 */
export const calcularRescisao = (
  salarioBruto: number,
  dataAdmissao: Date,
  dataDemissao: Date,
  tipoDemissao: string,
  saldoFGTS: number
): Record<string, number> => {
  // Calculate time of service
  const tempoServico = dataDemissao.getTime() - dataAdmissao.getTime();
  const diasTrabalho = Math.floor(tempoServico / (1000 * 60 * 60 * 24));
  const anosTrabalho = diasTrabalho / 365;
  
  // Calculate days worked in the month of termination
  const diasTrabalhados = dataDemissao.getDate();
  
  // Calculate months worked in the current year for 13th salary
  const mesAtualDemissao = dataDemissao.getMonth();
  const mesesTrabalhadosAnoAtual = mesAtualDemissao + (diasTrabalhados > 15 ? 1 : 0);
  
  // Calculate remaining salary
  const saldoSalario = calcularSaldoSalario(salarioBruto, diasTrabalhados);
  
  // Calculate 13th salary proportional
  const { valorDecimoTerceiro } = calcularDecimoTerceiro(salarioBruto, mesesTrabalhadosAnoAtual);
  
  // Calculate vacation benefits
  let diasFerias = 0;
  let valorFerias = 0;
  let adicionalFerias = 0;
  
  if (diasTrabalho >= 365) {
    // Calculate proportion of vacation time earned
    const meseDesdeUltimasFerias = Math.floor(diasTrabalho % 365) / 30;
    diasFerias = Math.min(30, meseDesdeUltimasFerias * 2.5); // 2.5 days per month
    
    const feriasProp = calcularFerias(salarioBruto, diasFerias);
    valorFerias = feriasProp.valorFerias;
    adicionalFerias = feriasProp.adicionalFerias;
  }
  
  // Calculate notice period
  const avisoPrevioIndenizado = calcularAvisoPrevioIndenizado(salarioBruto, anosTrabalho, tipoDemissao);
  
  // Calculate FGTS fine
  let multaFGTS = 0;
  if (tipoDemissao === TIPO_DEMISSAO.SEM_JUSTA_CAUSA) {
    multaFGTS = calcularMultaFGTS(saldoFGTS);
  } else if (tipoDemissao === TIPO_DEMISSAO.ACORDO) {
    multaFGTS = calcularMultaFGTS(saldoFGTS) / 2; // For agreements, the fine is 20% (half of 40%)
  }
  
  // Calculating total values
  const totalBruto = saldoSalario + valorDecimoTerceiro + valorFerias + adicionalFerias + avisoPrevioIndenizado;
  
  // Calculate deductions (INSS, IRRF)
  const inss = calcularINSS(totalBruto);
  const irrf = calcularIRRF(totalBruto, inss, 0); // Assuming 0 dependents
  
  const totalLiquido = totalBruto - inss - irrf;
  
  return {
    saldoSalario,
    valorDecimoTerceiro,
    valorFerias,
    adicionalFerias,
    avisoPrevioIndenizado,
    multaFGTS,
    inss,
    irrf,
    totalBruto,
    totalLiquido
  };
};
