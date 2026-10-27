import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import LenisProvider from "./components/global/LenisProvider";

const ScrollProgress = lazy(() => import("./components/global/ScrollProgress"));
const FloatingWhatsApp = lazy(() => import("./components/global/FloatingWhatsApp"));

const Medico = lazy(() => import("./pages/Medico.tsx"));
const DesignSystemShowcase = lazy(() => import("./pages/DesignSystemShowcase.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const Assinar = lazy(() => import("./pages/Assinar.tsx"));
const AssinaturaObrigado = lazy(() => import("./pages/AssinaturaObrigado.tsx"));
const Recepcionista = lazy(() => import("./pages/Recepcionista.tsx"));
const Juridico = lazy(() => import("./pages/Juridico.tsx"));
const CookieBanner = lazy(() => import("./components/global/CookieBanner"));
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
        {/* O agradecimento do formulário de demonstração. Era /obrigado; a rota
            passou a ser a do pós-pagamento, que é para onde o Asaas e o n8n
            mandam quem assinou. */}
        <Route
          path="/obrigado-demo"
          element={
            <Suspense fallback={null}>
              <ThankYou />
            </Suspense>
          }
        />
        <Route
          path="/assinar"
          element={
            <Suspense fallback={null}>
              <Assinar />
            </Suspense>
          }
        />
        <Route
          path="/obrigado"
          element={
            <Suspense fallback={null}>
              <AssinaturaObrigado />
            </Suspense>
          }
        />
        <Route
          path="/recepcionista"
          element={
            <Suspense fallback={null}>
              <Recepcionista />
            </Suspense>
          }
        />
        {(["termos", "dpa", "privacidade"] as const).map((doc) => (
          <Route
            key={doc}
            path={`/${doc}`}
            element={
              <Suspense fallback={null}>
                <Juridico doc={doc} />
              </Suspense>
            }
          />
        ))}
        <Route
          path="/design-system-showcase"
          element={
            <Suspense fallback={null}>
              <DesignSystemShowcase />
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
        <CookieBanner />
      </Suspense>
    </LenisProvider>
  </BrowserRouter>
);

export default App;
