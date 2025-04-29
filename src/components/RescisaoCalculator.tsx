
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calcularRescisao } from '@/utils/calculators';
import { TIPO_DEMISSAO } from '@/utils/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RescisaoCalculatorProps {
  salarioBruto: number;
  dataAdmissao: string;
}

const RescisaoCalculator: React.FC<RescisaoCalculatorProps> = ({ 
  salarioBruto, 
  dataAdmissao 
}) => {
  const [dataDemissao, setDataDemissao] = useState<string>('');
  const [tipoDemissao, setTipoDemissao] = useState<string>(TIPO_DEMISSAO.SEM_JUSTA_CAUSA);
  const [saldoFGTS, setSaldoFGTS] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!dataAdmissao || !dataDemissao) return;
    
    const rescisao = calcularRescisao(
      salarioBruto,
      new Date(dataAdmissao),
      new Date(dataDemissao),
      tipoDemissao,
      saldoFGTS
    );
    
    setResult(rescisao);
  };

  const tiposDemissao = Object.values(TIPO_DEMISSAO);

  return (
    <Card className="calculator-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cálculo de Rescisão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="form-group">
            <Label htmlFor="dataDemissao" className="form-label">Data de Demissão</Label>
            <Input
              id="dataDemissao"
              type="date"
              value={dataDemissao}
              onChange={(e) => setDataDemissao(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="tipoDemissao" className="form-label">Tipo de Demissão</Label>
            <Select 
              value={tipoDemissao} 
              onValueChange={setTipoDemissao}
            >
              <SelectTrigger id="tipoDemissao" className="form-select">
                <SelectValue placeholder="Selecione o tipo de demissão" />
              </SelectTrigger>
              <SelectContent>
                {tiposDemissao.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="form-group">
            <Label htmlFor="saldoFGTS" className="form-label">Saldo FGTS Acumulado (R$)</Label>
            <Input
              id="saldoFGTS"
              type="number"
              step="0.01"
              min="0"
              value={saldoFGTS}
              onChange={(e) => setSaldoFGTS(parseFloat(e.target.value) || 0)}
              className="form-input"
            />
          </div>

          <Button onClick={handleCalculate} className="w-full">Calcular Rescisão</Button>

          {result && (
            <div className="mt-6 result-card">
              <h3 className="font-semibold text-lg mb-2">Resultado do Cálculo:</h3>
              
              <div className="result-item">
                <span>Saldo de Salário:</span>
                <span>R$ {result.saldoSalario.toFixed(2)}</span>
              </div>
              
              <div className="result-item">
                <span>13º Salário Proporcional:</span>
                <span>R$ {result.valorDecimoTerceiro.toFixed(2)}</span>
              </div>
              
              <div className="result-item">
                <span>Férias Proporcionais:</span>
                <span>R$ {result.valorFerias.toFixed(2)}</span>
              </div>
              
              <div className="result-item">
                <span>Adicional de 1/3 de Férias:</span>
                <span>R$ {result.adicionalFerias.toFixed(2)}</span>
              </div>
              
              {result.avisoPrevioIndenizado > 0 && (
                <div className="result-item">
                  <span>Aviso Prévio Indenizado:</span>
                  <span>R$ {result.avisoPrevioIndenizado.toFixed(2)}</span>
                </div>
              )}
              
              {result.multaFGTS > 0 && (
                <div className="result-item">
                  <span>Multa do FGTS:</span>
                  <span>R$ {result.multaFGTS.toFixed(2)}</span>
                </div>
              )}
              
              <div className="result-item">
                <span>Subtotal (Bruto):</span>
                <span>R$ {result.totalBruto.toFixed(2)}</span>
              </div>
              
              <div className="result-item">
                <span>Desconto INSS:</span>
                <span>R$ {result.inss.toFixed(2)}</span>
              </div>
              
              <div className="result-item">
                <span>Desconto IRRF:</span>
                <span>R$ {result.irrf.toFixed(2)}</span>
              </div>
              
              <div className="result-item font-bold">
                <span>Total Líquido:</span>
                <span>R$ {result.totalLiquido.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RescisaoCalculator;
