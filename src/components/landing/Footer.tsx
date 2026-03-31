import { Instagram, Linkedin, MessageCircle, Mail } from "lucide-react";
import logo from "@/assets/sapient-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <img src={logo} alt="Sapient.IA" className="h-8 w-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Automação inteligente para clínicas e consultórios. Sua operação funcionando 24h no automático.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground mb-1">Navegação</p>
            <a href="#solucoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Soluções</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Contato</p>
            <div className="flex items-center gap-4 mb-4">
              <a
                href="https://instagram.com/sapient.ia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/company/sapientia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://wa.me/5511920795583"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:contato@sapientiabr.cloud"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground/50">São Paulo, SP</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/50">
            © 2026 Sapient.IA — Todos os direitos reservados
          </p>
          <p className="text-xs text-muted-foreground/40">
            Ao usar este site, você concorda com nossa política de privacidade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
