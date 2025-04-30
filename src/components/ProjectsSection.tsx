
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";

const projects = [
  {
    name: "Tetris Clone",
    description: "Recriação do game Classico Tetris com foco em reproduzir algo parecido com o gameboy.",
    technologies: ["Javascript", "CSS"],
    image: "https://via.placeholder.com/600x400?text=Netflix+Clone",
    github: "https://github.com/vitorkunicki/netflix-clone",
    live: "#"
  },
  {
    name: "Loja Virtual 16-Bits",
    description: "E-commerce de Jogos geek e retro, com sistema completo de carrinho, pagamentos, ce painel de jogos favoritos.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://via.placeholder.com/600x400?text=Loja+Virtual+16-Bits",
    github: "https://github.com/vitorkunicki/ecommerce-16bits",
    live: "#"
  },
  {
    name: "Calculadora Trabalhista",
    description: "Aplicativo de Calculador de Rescição trabalhista feita para treinar typescript e React",
    technologies: ["Vue.js", "React", "Typescript"],
    image: "https://via.placeholder.com/600x400?text=Gestão+Municipal",
    github: "https://github.com/vitorkunicki/gestao-municipal",
    live: "#"
  },
  {
    name: "Jogo De Rpg por Texto",
    description: "Um game de RPG de Texto feito com base em um trabalho de faculdade feito em Java. Refiz ele em Javascript para demonstrar a minha ideia ao meu grupo.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "https://via.placeholder.com/600x400?text=App+Clima+Tempo",
    github: "https://github.com/vitorkunicki/clima-app",
    live: "#"
  },
  {
    name: "Task Manager",
    description: "Sistema de gerenciamento de tarefas com categorias, prioridades, datas limite e notificações.",
    technologies: ["React", "TypeScript", "Redux", "Firebase"],
    image: "https://via.placeholder.com/600x400?text=Task+Manager",
    github: "https://github.com/vitorkunicki/task-manager",
    live: "#"
  },
  {
    name: "Sistema de Gestão ERP",
    description: "ERP modular para pequenas empresas com controle de estoque, vendas, financeiro e relatórios.",
    technologies: ["Angular", "Spring Boot", "PostgreSQL"],
    image: "https://via.placeholder.com/600x400?text=Sistema+ERP",
    github: "https://github.com/vitorkunicki/erp-system",
    live: "#"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Meus Projetos</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <div key={index} className="glass-card group h-full flex flex-col">
              <div className="mb-4 overflow-hidden rounded-lg relative">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="glass p-2 hover:bg-primary/20 transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                                     </div>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-foreground/70 mb-4">{project.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
