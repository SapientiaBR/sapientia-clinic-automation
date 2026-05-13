import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import LenisProvider from "./components/global/LenisProvider";
import ScrollProgress from "./components/global/ScrollProgress";
import CustomCursor from "./components/global/CustomCursor";

const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DeferredUI = lazy(() => import("./components/DeferredUI.tsx"));

const App = () => (
  <BrowserRouter>
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
      <Suspense fallback={null}>
        <DeferredUI />
      </Suspense>
    </LenisProvider>
  </BrowserRouter>
);

export default App;
