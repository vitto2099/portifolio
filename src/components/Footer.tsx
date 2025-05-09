
import React from 'react';
import { Phone, Mail, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 mt-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-3 font-montserrat">Vitor Camargo Kunicki</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Desenvolvedor Full Stack apaixonado por criar soluções digitais de alta performance
              que transformam desafios em resultados práticos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">Sobre Mim</a></li>
                <li><a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experiência</a></li>
                <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projetos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Contato</h4>
              <ul className="space-y-2">
                <li>
                  <a href="tel:+5500000000000" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <Phone size={16} className="mr-2" />
                    (47) 99963-5698
                  </a>
                </li>
                <li>
                  <a href="mailto:vitor@example.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <Mail size={16} className="mr-2" />
                    vck987123@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/vitorcamargokunicki/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vitto2099" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <Github size={16} className="mr-2" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© {currentYear} Vitor Camargo Kunicki - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
