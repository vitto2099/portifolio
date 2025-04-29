
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calcularDecimoTerceiro, calcularINSS, calcularIRRF } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DecimoTerceiroCalculatorProps {
  salarioBruto: number;
  dependentes: number;
  dataAdmissao: string;
}

const DecimoTerceiroCalculator: React.FC<DecimoTerceiroCalculatorProps> = ({ 
  salarioBruto, 
  dependentes,
  dataAdmissao 
}) => {
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(12);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const decimoTerceiro = calcularDecimoTerceiro(salarioBruto, mesesTrabalhados);
    
    // Calculate deductions
    const totalBruto = decimoTerceiro.valorDecimoTerceiro;
    const inss = calcularINSS(totalBruto);
    const irrf = calcularIRRF(totalBruto, inss, dependentes);
    const totalLiquido = totalBruto - inss - irrf;
    
    setResult({
      ...decimoTerceiro,
      inss,
      irrf,
      totalLiquido: parseFloat(totalLiquido.toFixed(2)),
      primeiraParcela: parseFloat((totalBruto / 2).toFixed(2)),
      segundaParcela: parseFloat((totalLiquido - (totalBruto / 2)).toFixed(2))
    });
  };

  // Automatically calculate months worked based on admission date
  React.useEffect(() => {
    if (dataAdmissao) {
      const admissionDate = new Date(dataAdmissao);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      
      // If admitted this year
      if (admissionDate.getFullYear() === currentYear) {
        let months = currentDate.getMonth() - admissionDate.getMonth() + 1;
        if (currentDate.getDate() < admissionDate.getDate()) {
          months -= 1;
        }
        setMesesTrabalhados(Math.max(0, months));
      } else {
        // If admitted in previous years, calculate months in current year
        setMesesTrabalhados(currentDate.getMonth() + 1);
      }
    }
  }, [dataAdmissao]);

  return (
    <Card className="calculator-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cálculo do 13º Salário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="form-group">
            <Label htmlFor="mesesTrabalhados" className="form-label">Meses Trabalhados no Ano</Label>
            <Input
              id="mesesTrabalhados"
              type="number"
              min="1"
              max="12"
              value={mesesTrabalhados}
              onChange={(e) => setMesesTrabalhados(parseInt(e.target.value) || 0)}
              className="form-input"
            />
          </div>

          <Button onClick={handleCalculate} className="w-full">Calcular 13º Salário</Button>

          {result && (
            <div className="mt-6 result-card">
              <h3 className="font-semibold text-lg mb-2">Resultado do Cálculo:</h3>
              
              <div className="result-item">
                <span>Valor Bruto (13º proporcional):</span>
                <span>R$ {result.valorDecimoTerceiro.toFixed(2)}</span>
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

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Parcelas:</h4>
                
                <div className="result-item">
                  <span>1ª Parcela (Nov):</span>
                  <span>R$ {result.primeiraParcela.toFixed(2)}</span>
                </div>
                
                <div className="result-item">
                  <span>2ª Parcela (Dez):</span>
                  <span>R$ {result.segundaParcela.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DecimoTerceiroCalculator;
