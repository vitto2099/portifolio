
import React, { useState, useEffect } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Phone, Mail, Linkedin, Github } from "lucide-react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      // Check if we've scrolled down enough to change header style
      setScrolled(window.scrollY > 50);
      
      // Determine which section is in view
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold font-montserrat">
              <span className="text-primary">Vitor</span> Kunicki
            </h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1 md:space-x-4">
              <NavigationMenuItem>
                <button onClick={() => scrollToSection('home')} 
                  className={`nav-item ${activeSection === 'home' ? 'nav-item-active' : ''}`}>
                  Home
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => scrollToSection('about')}
                  className={`nav-item ${activeSection === 'about' ? 'nav-item-active' : ''}`}>
                  Sobre
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => scrollToSection('experience')} 
                  className={`nav-item ${activeSection === 'experience' ? 'nav-item-active' : ''}`}>
                  Experiência
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => scrollToSection('projects')}
                  className={`nav-item ${activeSection === 'projects' ? 'nav-item-active' : ''}`}>
                  Projetos
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => scrollToSection('skills')}
                  className={`nav-item ${activeSection === 'skills' ? 'nav-item-active' : ''}`}>
                  Habilidades
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => scrollToSection('contact')}
                  className={`nav-item ${activeSection === 'contact' ? 'nav-item-active' : ''}`}>
                  Contato
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="hidden lg:flex items-center space-x-4 mt-4 md:mt-0">
            <a href="tel:+5547999635698" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone size={18} />
            </a>
            <a href="mailto:vck987123@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vitor-camargo-kunicki-6a426920b/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/vitto2099" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
