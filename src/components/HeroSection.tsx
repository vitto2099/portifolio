
import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Phone, Mail, Linkedin, Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-montserrat">
              <span className="text-primary">Vitor</span> Camargo Kunicki
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 font-montserrat">
              Desenvolvedor Full Stack
            </h2>
            <p className="text-lg mb-8 max-w-lg">
              Transformando ideias em soluções digitais que impactam pessoas e negócios através de código limpo e interfaces intuitivas.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="tel:+5547999635698" className="glass flex items-center px-4 py-3 gap-2 hover:bg-primary/10 transition-all">
                    <Phone size={18} />
                    <span>(47) 99963-5698</span>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  <div className="text-sm">
                    <p>Disponível para contato</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="mailto:vck987123@gmail.com" className="glass flex items-center px-4 py-3 gap-2 hover:bg-primary/10 transition-all">
                    <Mail size={18} />
                    <span>vck987123@gmail.com</span>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  <div className="text-sm">
                    <p>Entre em contato por email</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="https://www.linkedin.com/in/vitor-camargo-kunicki-6a426920b/" target="_blank" rel="noreferrer" className="glass flex items-center px-4 py-3 gap-2 hover:bg-primary/10 transition-all">
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  <div className="text-sm">
                    <p>Conecte-se profissionalmente</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="https://github.com/vitto2099" target="_blank" rel="noreferrer" className="glass flex items-center px-4 py-3 gap-2 hover:bg-primary/10 transition-all">
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  <div className="text-sm">
                    <p>Veja meus projetos e código</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse opacity-30"></div>
              <div className="glass p-1 rounded-full relative">
                <img 
                  src="/images/eu.jpg" 
                  alt="Vitor Camargo Kunicki" 
                  className="w-80 h-80 object-cover rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "eu.jpg";
                  }}
                />
              </div>
              
              <div className="absolute top-5 -right-10 glass px-4 py-2 animate-float">
                <p className="font-medium">JavaScript</p>
              </div>
              
              <div className="absolute bottom-10 -left-12 glass px-4 py-2 animate-float" style={{ animationDelay: '1s' }}>
                <p className="font-medium">React</p>
              </div>
              
              <div className="absolute -bottom-5 right-10 glass px-4 py-2 animate-float" style={{ animationDelay: '2s' }}>
                <p className="font-medium">Node.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
