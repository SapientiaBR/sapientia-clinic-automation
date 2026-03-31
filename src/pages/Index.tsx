import Header from "@/components/landing/Header";
import UrgencyBar from "@/components/landing/UrgencyBar";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Aggravation from "@/components/landing/Aggravation";
import LossCalculator from "@/components/landing/LossCalculator";
import Solutions from "@/components/landing/Solutions";
import Visualization from "@/components/landing/Visualization";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import SocialProof from "@/components/landing/SocialProof";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <UrgencyBar />
      <Header />
      <Hero />
      <Problems />
      <Aggravation />
      <LossCalculator />
      <Solutions />
      <Visualization />
      <HowItWorks />
      <FAQ />
      <SocialProof />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
