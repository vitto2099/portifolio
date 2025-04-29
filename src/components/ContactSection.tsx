
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
    // For this demo, we'll just simulate a successful submission
    
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset the submission status after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Entre em Contato</h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          Interessado em trabalhar juntos ou tem alguma pergunta?
          Preencha o formulário abaixo e entrarei em contato o mais breve possível.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <Card className="glass">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="glass border-foreground/10 focus:bg-white/20"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="glass border-foreground/10 focus:bg-white/20"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="glass border-foreground/10 focus:bg-white/20"
                    placeholder="Assunto da mensagem"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message">Mensagem</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-1 glass border border-foreground/10 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                    placeholder="Digite sua mensagem..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  {isSubmitted ? 'Mensagem Enviada!' : 'Enviar Mensagem'}
                </button>
                
                {isSubmitted && (
                  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
                    Sua mensagem foi enviada com sucesso! Entrarei em contato em breve.
                  </div>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
