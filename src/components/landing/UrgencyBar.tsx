import { useState, useEffect } from "react";

const messages = [
  "🔴 Enquanto você lê isso, seu concorrente já está respondendo o paciente que te mandou mensagem",
  "⚠️ A cada 5 minutos sem resposta, a chance de perder o paciente dobra",
  "🔴 Consultórios sem automação perdem até 40% dos contatos recebidos",
];

const UrgencyBar = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-card/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-2 text-center">
        <p
          className={`text-xs sm:text-sm text-accent font-medium transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {messages[index]}
        </p>
      </div>
    </div>
  );
};

export default UrgencyBar;
