
// INSS 2023 Table (may need updates)
export const INSS_FAIXAS = [
  { teto: 1320.00, aliquota: 0.075 }, // 7,5%
  { teto: 2571.29, aliquota: 0.09 },  // 9%
  { teto: 3856.94, aliquota: 0.12 },  // 12%
  { teto: 7507.49, aliquota: 0.14 },  // 14%
];

// IRRF 2023 Table (may need updates)
export const IRRF_FAIXAS = [
  { teto: 2112.00, aliquota: 0.00, deducao: 0.00 },      // Isento
  { teto: 2826.65, aliquota: 0.075, deducao: 158.40 },   // 7,5%
  { teto: 3751.05, aliquota: 0.15, deducao: 370.40 },    // 15%
  { teto: 4664.68, aliquota: 0.225, deducao: 651.73 },   // 22,5%
  { teto: Infinity, aliquota: 0.275, deducao: 884.96 },  // 27,5%
];

// Dependents deduction for IRRF
export const DEDUCAO_POR_DEPENDENTE = 189.59;

// FGTS rate
export const ALIQUOTA_FGTS = 0.08;

// FGTS termination fine rate (40%)
export const MULTA_FGTS = 0.40;

// Types of work contracts
export const TIPOS_CONTRATO = [
  "CLT (Padrão)",
  "Temporário",
  "Intermitente",
  "Aprendiz",
  "Estágio"
];

// Night work hours definition
export const HORARIO_NOTURNO = {
  inicio: 22, // 10 PM
  fim: 5,     // 5 AM
  adicional: 0.20, // 20%
  reducao: 52.5/60 // Night hour = 52min30s
};

// Overtime percentages
export const ADICIONAL_HORA_EXTRA = {
  normal: 0.50, // 50%
  domingos_feriados: 1.00, // 100%
  noturna: 0.50 + 0.20, // 50% overtime + 20% night work
};

// Vacation bonus (1/3)
export const ADICIONAL_FERIAS = 1/3;

// Allowable deductions for lack of notice (employee)
export const DESCONTO_AVISO_PREVIO = {
  max_dias: 30,
  proporcao: 30 // 1 day's salary for each day of notice
};

// Prior notice (employer) - depends on years of service
export const AVISO_PREVIO = {
  base_dias: 30,
  adicional_por_ano: 3, // 3 more days for each year worked
  max_dias: 90 // Maximum of 90 days
};

export const TIPO_DEMISSAO = {
  SEM_JUSTA_CAUSA: "Demissão sem justa causa",
  COM_JUSTA_CAUSA: "Demissão com justa causa",
  PEDIDO_DEMISSAO: "Pedido de demissão",
  CULPA_RECIPROCA: "Culpa recíproca",
  ACORDO: "Acordo entre as partes",
  FALECIMENTO: "Falecimento"
};

// Social security ceiling value
export const TETO_INSS = 7507.49;

// Standard working hours per month
export const HORAS_TRABALHADAS_MES = 220;
