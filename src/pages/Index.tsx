import { lazy, Suspense } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";

const Problems = lazy(() => import("@/components/landing/Problems"));
const Solutions = lazy(() => import("@/components/landing/Solutions"));
const Visualization = lazy(() => import("@/components/landing/Visualization"));
const LossCalculator = lazy(() => import("@/components/landing/LossCalculator"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Founder = lazy(() => import("@/components/landing/Founder"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const LeadForm = lazy(() =>
  import("@/components/landing/LeadForm").then((m) => ({ default: m.LeadForm })),
);
const Footer = lazy(() => import("@/components/landing/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SocialProof />
      <Suspense fallback={null}>
        <Problems />
        <Solutions />
        <Visualization />
        <LossCalculator />
        <HowItWorks />
        <Founder />
        <FAQ />
        <FinalCTA />
        <LeadForm />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
