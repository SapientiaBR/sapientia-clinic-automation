import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Aggravation from "@/components/landing/Aggravation";
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
      <Header />
      <Hero />
      <Problems />
      <Aggravation />
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
