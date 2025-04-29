
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalaryForm, { SalaryData } from './SalaryForm';
import FeriasCalculator from './FeriasCalculator';
import DecimoTerceiroCalculator from './DecimoTerceiroCalculator';
import HoraExtraCalculator from './HoraExtraCalculator';
import RescisaoCalculator from './RescisaoCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { calcularINSS, calcularIRRF, calcularFGTS } from '@/utils/calculators';

const Calculator: React.FC = () => {
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("salary");
  const [mensalResult, setMensalResult] = useState<any>(null);

  const handleSalarySubmit = (data: SalaryData) => {
    setSalaryData(data);

    // Calculate monthly deductions
    const inss = calcularINSS(data.salarioBruto);
    const irrf = calcularIRRF(data.salarioBruto, inss, data.dependentes);
    const fgts = calcularFGTS(data.salarioBruto);
    const salarioLiquido = data.salarioBruto - inss - irrf;

    setMensalResult({
      inss,
      irrf,
      fgts,
      salarioLiquido
    });
  };

  const calculateMensalValues = () => {
    if (!salaryData) return;
    
    // Re-calculate monthly deductions
    const inss = calcularINSS(salaryData.salarioBruto);
    const irrf = calcularIRRF(salaryData.salarioBruto, inss, salaryData.dependentes);
    const fgts = calcularFGTS(salaryData.salarioBruto);
    const salarioLiquido = salaryData.salarioBruto - inss - irrf;

    setMensalResult({
      inss,
      irrf,
      fgts,
      salarioLiquido
    });
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="salary">Informações Básicas</TabsTrigger>
          <TabsTrigger value="ferias" disabled={!salaryData}>Férias</TabsTrigger>
          <TabsTrigger value="decimoTerceiro" disabled={!salaryData}>13º Salário</TabsTrigger>
          <TabsTrigger value="horaExtra" disabled={!salaryData}>Horas Extras</TabsTrigger>
          <TabsTrigger value="rescisao" disabled={!salaryData}>Rescisão</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="salary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Dados do Trabalhador</h2>
                <SalaryForm onSalarySubmit={handleSalarySubmit} />
              </div>
              
              {mensalResult && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Valores Mensais</h2>
                  <Card className="calculator-card">
                    <CardContent className="pt-6">
                      <div className="result-card">
                        <div className="result-item">
                          <span>Salário Bruto:</span>
                          <span>R$ {salaryData?.salarioBruto.toFixed(2)}</span>
                        </div>
                        <div className="result-item">
                          <span>Desconto INSS:</span>
                          <span>R$ {mensalResult.inss.toFixed(2)}</span>
                        </div>
                        <div className="result-item">
                          <span>Desconto IRRF:</span>
                          <span>R$ {mensalResult.irrf.toFixed(2)}</span>
                        </div>
                        <div className="result-item">
                          <span>FGTS (depósito do empregador):</span>
                          <span>R$ {mensalResult.fgts.toFixed(2)}</span>
                        </div>
                        <div className="result-item font-bold">
                          <span>Salário Líquido:</span>
                          <span>R$ {mensalResult.salarioLiquido.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button 
                          onClick={calculateMensalValues} 
                          variant="outline" 
                          className="w-full"
                        >
                          Recalcular
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ferias">
            {salaryData && (
              <FeriasCalculator 
                salarioBruto={salaryData.salarioBruto} 
                dependentes={salaryData.dependentes} 
              />
            )}
          </TabsContent>

          <TabsContent value="decimoTerceiro">
            {salaryData && (
              <DecimoTerceiroCalculator 
                salarioBruto={salaryData.salarioBruto} 
                dependentes={salaryData.dependentes}
                dataAdmissao={salaryData.dataAdmissao}
              />
            )}
          </TabsContent>

          <TabsContent value="horaExtra">
            {salaryData && (
              <HoraExtraCalculator 
                salarioBruto={salaryData.salarioBruto}
                jornadaSemanal={salaryData.jornadaSemanal}
              />
            )}
          </TabsContent>

          <TabsContent value="rescisao">
            {salaryData && (
              <RescisaoCalculator 
                salarioBruto={salaryData.salarioBruto}
                dataAdmissao={salaryData.dataAdmissao}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Calculator;
