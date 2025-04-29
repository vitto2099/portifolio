
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calcularFerias, calcularINSS, calcularIRRF } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeriasCalculatorProps {
  salarioBruto: number;
  dependentes: number;
}

const FeriasCalculator: React.FC<FeriasCalculatorProps> = ({ salarioBruto, dependentes }) => {
  const [diasFerias, setDiasFerias] = useState<number>(30);
  const [diasVendidos, setDiasVendidos] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const ferias = calcularFerias(salarioBruto, diasFerias, diasVendidos);
    
    // Calculate deductions
    const totalBruto = ferias.totalFerias;
    const inss = calcularINSS(totalBruto);
    const irrf = calcularIRRF(totalBruto, inss, dependentes);
    const totalLiquido = totalBruto - inss - irrf;
    
    setResult({
      ...ferias,
      inss,
      irrf,
      totalLiquido: parseFloat(totalLiquido.toFixed(2))
    });
  };

  return (
    <Card className="calculator-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cálculo de Férias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="form-group">
            <Label htmlFor="diasFerias" className="form-label">Dias de Férias (padrão: 30)</Label>
            <Input
              id="diasFerias"
              type="number"
              min="0"
              max="30"
              value={diasFerias}
              onChange={(e) => setDiasFerias(parseInt(e.target.value) || 0)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label htmlFor="diasVendidos" className="form-label">Dias Vendidos (abono)</Label>
            <Input
              id="diasVendidos"
              type="number"
              min="0"
              max="10"
              value={diasVendidos}
              onChange={(e) => setDiasVendidos(parseInt(e.target.value) || 0)}
              className="form-input"
            />
          </div>

          <Button onClick={handleCalculate} className="w-full">Calcular Férias</Button>

          {result && (
            <div className="mt-6 result-card">
              <h3 className="font-semibold text-lg mb-2">Resultado do Cálculo:</h3>
              
              <div className="result-item">
                <span>Valor das Férias:</span>
                <span>R$ {result.valorFerias.toFixed(2)}</span>
              </div>
              
              {diasVendidos > 0 && (
                <div className="result-item">
                  <span>Valor Abono Pecuniário:</span>
                  <span>R$ {((salarioBruto / 30) * diasVendidos).toFixed(2)}</span>
                </div>
              )}
              
              <div className="result-item">
                <span>Adicional de 1/3:</span>
                <span>R$ {result.adicionalFerias.toFixed(2)}</span>
              </div>
              
              <div className="result-item">
                <span>Subtotal (Bruto):</span>
                <span>R$ {result.totalFerias.toFixed(2)}</span>
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

export default FeriasCalculator;
