
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { calcularHorasExtras, calcularAdicionalNoturno } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADICIONAL_HORA_EXTRA } from '@/utils/constants';

interface HoraExtraCalculatorProps {
  salarioBruto: number;
  jornadaSemanal: number;
}

const HoraExtraCalculator: React.FC<HoraExtraCalculatorProps> = ({ 
  salarioBruto, 
  jornadaSemanal
}) => {
  const [horasExtras, setHorasExtras] = useState<number>(0);
  const [horasExtrasDomingoFeriado, setHorasExtrasDomingoFeriado] = useState<number>(0);
  const [horasNoturnas, setHorasNoturnas] = useState<number>(0);
  const [incluirNoturno, setIncluirNoturno] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    // Calculate regular overtime (50%)
    const valorHorasExtras = calcularHorasExtras(
      salarioBruto, 
      horasExtras, 
      ADICIONAL_HORA_EXTRA.normal
    );
    
    // Calculate Sunday/holiday overtime (100%)
    const valorHorasExtrasDomingoFeriado = calcularHorasExtras(
      salarioBruto, 
      horasExtrasDomingoFeriado, 
      ADICIONAL_HORA_EXTRA.domingos_feriados
    );
    
    // Calculate night shift additional pay (if applicable)
    const valorAdicionalNoturno = incluirNoturno 
      ? calcularAdicionalNoturno(salarioBruto, horasNoturnas)
      : 0;
    
    // Calculate total
    const totalHorasExtras = valorHorasExtras + valorHorasExtrasDomingoFeriado + valorAdicionalNoturno;
    
    setResult({
      valorHorasExtras,
      valorHorasExtrasDomingoFeriado,
      valorAdicionalNoturno,
      totalHorasExtras: parseFloat(totalHorasExtras.toFixed(2)),
    });
  };

  return (
    <Card className="calculator-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cálculo de Horas Extras</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="form-group">
            <Label htmlFor="horasExtras" className="form-label">Horas Extras (50%)</Label>
            <Input
              id="horasExtras"
              type="number"
              min="0"
              step="0.5"
              value={horasExtras}
              onChange={(e) => setHorasExtras(parseFloat(e.target.value) || 0)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label htmlFor="horasExtrasDomingoFeriado" className="form-label">
              Horas Extras em Domingos/Feriados (100%)
            </Label>
            <Input
              id="horasExtrasDomingoFeriado"
              type="number"
              min="0"
              step="0.5"
              value={horasExtrasDomingoFeriado}
              onChange={(e) => setHorasExtrasDomingoFeriado(parseFloat(e.target.value) || 0)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={incluirNoturno} 
                onCheckedChange={setIncluirNoturno} 
                id="incluirNoturno" 
              />
              <Label htmlFor="incluirNoturno">Incluir Adicional Noturno</Label>
            </div>
          </div>

          {incluirNoturno && (
            <div className="form-group">
              <Label htmlFor="horasNoturnas" className="form-label">Horas Noturnas Trabalhadas</Label>
              <Input
                id="horasNoturnas"
                type="number"
                min="0"
                step="0.5"
                value={horasNoturnas}
                onChange={(e) => setHorasNoturnas(parseFloat(e.target.value) || 0)}
                className="form-input"
              />
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full">Calcular Horas Extras</Button>

          {result && (
            <div className="mt-6 result-card">
              <h3 className="font-semibold text-lg mb-2">Resultado do Cálculo:</h3>
              
              {horasExtras > 0 && (
                <div className="result-item">
                  <span>Valor Horas Extras (50%):</span>
                  <span>R$ {result.valorHorasExtras.toFixed(2)}</span>
                </div>
              )}
              
              {horasExtrasDomingoFeriado > 0 && (
                <div className="result-item">
                  <span>Valor Horas Extras Dom/Feriado (100%):</span>
                  <span>R$ {result.valorHorasExtrasDomingoFeriado.toFixed(2)}</span>
                </div>
              )}
              
              {incluirNoturno && horasNoturnas > 0 && (
                <div className="result-item">
                  <span>Adicional Noturno:</span>
                  <span>R$ {result.valorAdicionalNoturno.toFixed(2)}</span>
                </div>
              )}
              
              <div className="result-item font-bold">
                <span>Total a Receber:</span>
                <span>R$ {result.totalHorasExtras.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HoraExtraCalculator;
