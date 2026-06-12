import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import LenisProvider from "./components/global/LenisProvider";

const ScrollProgress = lazy(() => import("./components/global/ScrollProgress"));
const FloatingWhatsApp = lazy(() => import("./components/global/FloatingWhatsApp"));

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
