import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import Problems from "@/components/landing/Problems";
import Solutions from "@/components/landing/Solutions";
import Visualization from "@/components/landing/Visualization";
import LossCalculator from "@/components/landing/LossCalculator";
import HowItWorks from "@/components/landing/HowItWorks";
import Founder from "@/components/landing/Founder";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import { LeadForm } from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SocialProof />
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
    </div>
  );
};

export default Index;
