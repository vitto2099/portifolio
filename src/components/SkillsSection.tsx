
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const frontendSkills = [
  { name: "JavaScript", level: 100 },
  { name: "TypeScript", level: 95 },
  { name: "React", level: 90 },
  { name: "Vue.js", level: 60 },
  { name: "HTML/CSS", level: 100 },
  { name: "Tailwind CSS", level: 70 },
  { name: "Flutter", level: 60 },
];

const backendSkills = [
  { name: "Node.js", level: 100 },
  { name: "Python", level: 80 },
  { name: "Java (Spring Boot)", level: 80 },
  { name: "PHP (Laravel)", level: 40 },
    { name: "REST API", level: 90 },
];

const databaseSkills = [
  { name: "MySQL", level: 80 },
  { name: "PostgreSQL", level: 50 },
  { name: "MongoDB", level: 50 },
  { name: "Firebase", level: 70 },
  ];

const otherSkills = [
  { name: "Git", level: 90 },
  { name: "Git Hub", level: 90 },
  { name: "Docker", level: 75 },
  { name: "Azure", level: 65 },
  { name: "Power BI", level: 85 },
  ];

const SkillBar = ({ skill, level }: { skill: string; level: number }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{skill}</span>
            <span className="text-sm text-primary">{level}%</span>
          </div>
          <div className="glass h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary/70 to-primary h-2.5 rounded-full"
              style={{ width: `${level}%` }}
            ></div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <div className="flex flex-col">
          <span className="font-medium">{skill}</span>
          <div className="flex items-center mt-1">
            {level < 60 && <span className="text-sm">Básico</span>}
            {level >= 60 && level < 80 && <span className="text-sm">Intermediário</span>}
            {level >= 80 && <span className="text-sm">Avançado</span>}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-blue-50/50 to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Minhas Habilidades</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-primary">Desenvolvimento Frontend</h3>
              {frontendSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill.name} level={skill.level} />
              ))}
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-primary">Desenvolvimento Backend</h3>
              {backendSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill.name} level={skill.level} />
              ))}
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-primary">Bancos de Dados</h3>
              {databaseSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill.name} level={skill.level} />
              ))}
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-primary">Outras Habilidades</h3>
              {otherSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill.name} level={skill.level} />
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="section-subtitle">Diferenciais</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="glass px-6 py-4 text-lg">Resolução de problemas</div>
            <div className="glass px-6 py-4 text-lg">Aprendizado rápido</div>
            <div className="glass px-6 py-4 text-lg">Trabalho em equipe</div>
            <div className="glass px-6 py-4 text-lg">Comunicação clara</div>
            <div className="glass px-6 py-4 text-lg">Pensamento analítico</div>
            <div className="glass px-6 py-4 text-lg">Adaptabilidade</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
