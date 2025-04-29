
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TIPOS_CONTRATO } from '@/utils/constants';

interface SalaryFormProps {
  onSalarySubmit: (data: SalaryData) => void;
}

export interface SalaryData {
  salarioBruto: number;
  dataAdmissao: string;
  dependentes: number;
  tipoContrato: string;
  jornadaSemanal: number;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ onSalarySubmit }) => {
  const [formData, setFormData] = useState<SalaryData>({
    salarioBruto: 0,
    dataAdmissao: '',
    dependentes: 0,
    tipoContrato: 'CLT (Padrão)',
    jornadaSemanal: 44,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salarioBruto' || name === 'dependentes' || name === 'jornadaSemanal' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSalarySubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <Label htmlFor="salarioBruto" className="form-label">Salário Bruto (R$)</Label>
        <Input
          id="salarioBruto"
          name="salarioBruto"
          type="number"
          step="0.01"
          min="0"
          placeholder="Ex: 2000.00"
          value={formData.salarioBruto || ''}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <Label htmlFor="dataAdmissao" className="form-label">Data de Admissão</Label>
        <Input
          id="dataAdmissao"
          name="dataAdmissao"
          type="date"
          value={formData.dataAdmissao}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <Label htmlFor="dependentes" className="form-label">Número de Dependentes</Label>
        <Input
          id="dependentes"
          name="dependentes"
          type="number"
          min="0"
          value={formData.dependentes || ''}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <Label htmlFor="tipoContrato" className="form-label">Tipo de Contrato</Label>
        <Select 
          name="tipoContrato" 
          value={formData.tipoContrato}
          onValueChange={(value) => handleSelectChange('tipoContrato', value)}
        >
          <SelectTrigger id="tipoContrato" className="form-select">
            <SelectValue placeholder="Selecione o tipo de contrato" />
          </SelectTrigger>
          <SelectContent>
            {TIPOS_CONTRATO.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="form-group">
        <Label htmlFor="jornadaSemanal" className="form-label">Jornada Semanal (horas)</Label>
        <Input
          id="jornadaSemanal"
          name="jornadaSemanal"
          type="number"
          min="1"
          max="44"
          value={formData.jornadaSemanal || ''}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <Button type="submit" className="btn-primary">
        Salvar Informações
      </Button>
    </form>
  );
};

export default SalaryForm;
