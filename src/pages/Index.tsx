import { lazy, Suspense } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

// Below-the-fold: lazy-loaded to reduce initial JS and improve mobile LCP
const Problems = lazy(() => import("@/components/landing/Problems"));
const Solutions = lazy(() => import("@/components/landing/Solutions"));
const Visualization = lazy(() => import("@/components/landing/Visualization"));
const LossCalculator = lazy(() => import("@/components/landing/LossCalculator"));
const LeadForm = lazy(() =>
  import("@/components/landing/LeadForm").then((m) => ({ default: m.LeadForm }))
);
const SocialProof = lazy(() => import("@/components/landing/SocialProof"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Founder = lazy(() => import("@/components/landing/Founder"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const Fallback = ({ h = "h-32" }: { h?: string }) => <div className={h} aria-hidden="true" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Suspense fallback={<Fallback h="h-96" />}>
        <Problems />
        <Solutions />
        <Visualization />
        <LossCalculator />
        <LeadForm />
        <SocialProof />
        <HowItWorks />
        <Founder />
        <FAQ />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
