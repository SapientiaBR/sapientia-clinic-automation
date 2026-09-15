import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
// Tokens do design system do produto. Ficam escopados em `.ds-root`, entao
// importar aqui nao vaza para o site: so quem opta pela classe consome.
import "../design-system-2/tokens/index.css";

if (
  import.meta.env.DEV ||
  (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("perf"))
) {
  import("./lib/perfMonitor").then((m) => {
    m.startFpsMonitor();
    m.startScrollFpsMonitor();
    m.markScrollTriggerCallbacks();
    m.logLongTasks();
    m.logCLS();
    m.logINP();
    console.info("[perf] monitoring enabled");
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
