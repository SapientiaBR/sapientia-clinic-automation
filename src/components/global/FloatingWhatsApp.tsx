import { motion } from "framer-motion";

const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/5511920795583?text=Olá%2C+vim+pelo+site+e+quero+saber+mais+sobre+a+Secretária+Invisível"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
    style={{ background: "#25D366" }}
    animate={{ y: [0, -6, 0, 0, 0, 0, 0] }}
    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", times: [0, 0.02, 0.04, 0.06, 0.5, 0.75, 1] }}
  >
    <svg viewBox="0 0 24 24" width="26" height="26" fill="white" aria-hidden="true">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .15 5.34.13 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.55 0 11.9-5.34 11.92-11.9a11.83 11.83 0 0 0-3.47-8.42M12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.66-.24-.38a9.86 9.86 0 0 1-1.5-5.24c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.04 7 2.92a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.87-9.91 9.87m5.43-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.1 4.5.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35"/>
    </svg>
  </motion.a>
);

export default FloatingWhatsApp;
