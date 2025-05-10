
import React from 'react';
import { Card } from "@/components/ui/card";

const experiences = [
  {
    company: "Prefeitura de Itaiópolis",
    period: "2025 - Presente",
    role: "Desenvolvedor Full Stack",
    description: "Desenvolvimento e manutenção de sistemas web para a administração municipal, utilizando tecnologias modernas como React, Node.js e bancos de dados SQL. Implementação de soluções para otimizar processos internos e melhorar serviços aos cidadãos."
  },
  {
    company: "LDZ Portas",
    period: "2024 - 2025",
    role: "Analista de Sistemas",
    description: "Gerenciamento de sistemas ERP, desenvolvimento de relatórios e dashboards para análise de dados. Implementação de melhorias no fluxo de produção através de soluções tecnológicas e automação de processos."
  },
  {
    company: "Grupo SOS Telecom",
    period: "2023 - 2024",
    role: "Suporte Técnico / Desenvolvedor Jr",
    description: "Atuação no suporte técnico a clientes e desenvolvimento de ferramentas internas para monitoramento de rede. Implementação de scripts para automatizar tarefas repetitivas e melhorar a eficiência operacional."
  },
  {
    company: "Jumper! Profissões e Idiomas",
    period: "2021 - 2022",
    role: "Instrutor de Informática",
    description: "Ensino de informática básica e avançada, desenvolvimento web e design gráfico. Criação de material didático personalizado e acompanhamento do progresso dos alunos."
  },
  {
    company: "Seara",
    period: "2018 - 2020",
    role: "Assistente de TI",
    description: "Suporte ao usuário e manutenção de equipamentos. Colaboração na implementação de sistemas de controle de estoque e produção."
  },
  {
    company: "Toppers Tech",
    period: "2017 - 2021",
    role: "Desenvolvedor Front End",
    description: "Criação Publicação e Manutenção de Sites para comercios Locais da Minha Regiao utilizando A plataforma Hostinger para implementar o dominio e As linguagens de Javascript e Css para Criação."
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-transparent to-blue-50/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Experiência Profissional</h2>
        
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="glass">
            <div className="p-6">
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="mb-1">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mt-2">{exp.company}</h3>
                    <div className="text-primary font-medium">{exp.role}</div>
                    <p className="mt-2 text-foreground/70">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
