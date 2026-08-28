import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Reframe from "@/components/landing/Reframe";
import { faqEntries } from "@/components/landing/FAQ";

const Scene = lazy(() => import("@/components/landing/Scene"));
const HiddenCosts = lazy(() => import("@/components/landing/HiddenCosts"));

const SocialProof = lazy(() => import("@/components/landing/SocialProof"));
const SecurityData = lazy(() => import("@/components/landing/SecurityData"));
const SinglePlace = lazy(() => import("@/components/landing/SinglePlace"));
const LeadForm = lazy(() =>
  import("@/components/landing/LeadForm").then((m) => ({ default: m.LeadForm }))
);
const RealConversations = lazy(() => import("@/components/landing/RealConversations"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));

const Footer = lazy(() => import("@/components/landing/Footer"));
const MobileCtaBar = lazy(() => import("@/components/landing/MobileCtaBar"));

const Fallback = ({ h = "h-32" }: { h?: string }) => <div className={h} aria-hidden="true" />;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-[var(--navy-0)] text-[var(--text)] overflow-x-hidden">
      <Helmet>
        <title>Secretária Invisível | Sua recepção atendendo o WhatsApp 24 horas</title>
        <meta
          name="description"
          content="Sua equipe cuida de quem está na clínica. A Secretária Invisível cuida do WhatsApp 24 horas por dia: responde, agenda, confirma presença e reduz faltas."
        />
        <meta
          name="keywords"
          content="atendimento whatsapp clínica, agendamento automático consultório, recepção clínica São Paulo, confirmação de consulta"
        />
        <link rel="canonical" href="https://secretariainvisivel.com.br/" />
        <meta property="og:url" content="https://secretariainvisivel.com.br/" />
        <meta property="og:title" content="Secretária Invisível | Sua recepção nunca mais deixa um paciente esperando" />
        <meta
          property="og:description"
          content="Sua recepcionista cuida de quem está na clínica. A Secretária Invisível cuida do WhatsApp."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />
      <main className="page-canvas pb-24 md:pb-0">
        <Hero />
        <Reframe />

        <Suspense fallback={<Fallback h="h-96" />}>
          <Scene />
          <HiddenCosts />
          
          <SocialProof />
          <SecurityData />
          <SinglePlace />
          <LeadForm />
          <RealConversations />
          <Pricing />
          <FAQ />
          <LeadForm variant="compact" />
          
        </Suspense>
      </main>
      <Suspense fallback={<Fallback h="h-32" />}>
        <Footer />
        <MobileCtaBar />
      </Suspense>
    </div>
  );
};

export default Index;
