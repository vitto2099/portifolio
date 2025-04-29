
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Sobre Mim</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4 text-primary">Quem Sou</h3>
            <p className="text-foreground/80">
              Desenvolvedor Full Stack com foco em criar experiências digitais de alta qualidade.
              Engenheiro de Software em formação, busco constantemente aprimorar minhas
              habilidades e conhecimentos para entregar soluções completas e eficientes.
            </p>
          </div>
          
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4 text-primary">Missão</h3>
            <p className="text-foreground/80">
              Contribuir com soluções digitais de alta performance e transformar desafios
              em resultados práticos para negócios e usuários. Acredito que a tecnologia
              deve ser uma ponte para melhorar a vida das pessoas.
            </p>
          </div>
          
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4 text-primary">Visão</h3>
            <p className="text-foreground/80">
              Ser reconhecido como um profissional de excelência no desenvolvimento de software,
              capaz de criar soluções inovadoras que impactem positivamente organizações e
              comunidades, sempre buscando o aprendizado contínuo.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <Card className="glass overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <h3 className="section-subtitle text-primary">Formação Acadêmica</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold">Engenharia de Software</h4>
                      <p className="text-muted-foreground">Universidade do Contestado (UNC)</p>
                      <p className="text-sm">Início em Fevereiro de 2024 - Conclusão prevista para 2028</p>
                    </div>
                  </div>
                  
                  <h3 className="section-subtitle text-primary mt-8">Certificações</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-medium">Bootcamp Back-end</h4>
                      <p className="text-sm text-muted-foreground">Python e Java - DIO</p>
                    </div>
                    
                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-medium">Flutter - Imersão Mobile</h4>
                      <p className="text-sm text-muted-foreground">Alura</p>
                    </div>
                    
                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-medium">Full Stack Developer</h4>
                      <p className="text-sm text-muted-foreground">One Bit Code</p>
                    </div>
                    
                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-medium">JavaScript & TypeScript</h4>
                      <p className="text-sm text-muted-foreground">Udemy</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full glass flex items-center justify-center mb-6">
                      <span className="text-5xl font-bold text-primary">5+</span>
                    </div>
                    <h4 className="text-xl font-semibold">Anos de experiência</h4>
                    <p className="mt-2 text-foreground/70">
                      em desenvolvimento e tecnologia
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
