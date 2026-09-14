import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import LenisProvider from "./components/global/LenisProvider";

const ScrollProgress = lazy(() => import("./components/global/ScrollProgress"));
const FloatingWhatsApp = lazy(() => import("./components/global/FloatingWhatsApp"));

const Medico = lazy(() => import("./pages/Medico.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DeferredUI = lazy(() => import("./components/DeferredUI.tsx"));

const App = () => (
  <BrowserRouter>
    <LenisProvider>
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/medico"
          element={
            <Suspense fallback={null}>
              <Medico />
            </Suspense>
          }
        />
        {/* `/clinica` é a rota que se espera existir quando há uma `/medico`.
            `replace` evita que o botão voltar caia no redirecionamento e
            devolva o visitante para cá num laço. */}
        <Route path="/clinica" element={<Navigate to="/" replace />} />
        <Route
          path="/obrigado"
          element={
            <Suspense fallback={null}>
              <ThankYou />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Suspense fallback={null}>
        <FloatingWhatsApp />
        <DeferredUI />
      </Suspense>
    </LenisProvider>
  </BrowserRouter>
);

export default App;
