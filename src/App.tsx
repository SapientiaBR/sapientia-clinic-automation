import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";

const LenisProvider = lazy(() => import("./components/global/LenisProvider"));
const ScrollProgress = lazy(() => import("./components/global/ScrollProgress"));
const CustomCursor = lazy(() => import("./components/global/CustomCursor"));
const FloatingWhatsApp = lazy(() => import("./components/global/FloatingWhatsApp"));

const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DeferredUI = lazy(() => import("./components/DeferredUI.tsx"));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <LenisProvider>
        <ScrollProgress />
        <CustomCursor />
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
        <FloatingWhatsApp />
        <Suspense fallback={null}>
          <DeferredUI />
        </Suspense>
      </LenisProvider>
    </Suspense>
  </BrowserRouter>
);

export default App;
