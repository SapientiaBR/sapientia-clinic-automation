import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
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

const faqEntities = [
  ["Isso não vai parecer robótico para meus pacientes?", "Não. O sistema é treinado com o tom de voz da sua clínica. Seus pacientes conversam de forma natural, como se estivessem falando com uma secretária de verdade. Sem respostas engessadas, sem parecer máquina."],
  ["Vou perder o controle do meu atendimento?", "De jeito nenhum. Você mantém controle total. O sistema segue suas regras, seus horários, seus critérios. E você acompanha tudo em tempo real. A IA trabalha para você, não no lugar de você."],
  ["É difícil de implementar? Preciso entender de tecnologia?", "Zero complicação. Nós cuidamos de tudo — da configuração ao treinamento da sua equipe. Você não precisa instalar nada nem entender de tecnologia. Em poucos dias, está funcionando."],
  ["Como funciona o contrato?", "Todas as condições — prazo, recorrência e regras — são apresentadas com total clareza antes do início. Você entra sabendo exatamente o que esperar, sem surpresas."],
  ["Quanto custa?", "O valor depende do volume e complexidade do seu consultório. Na conversa de diagnóstico (gratuita), entendemos sua realidade e apresentamos uma proposta sob medida. Para referência: o investimento costuma se pagar nas primeiras semanas com os pacientes que deixariam de ser perdidos."],
  ["E se eu não gostar do resultado?", "Nosso objetivo é que você veja resultados desde o primeiro mês. Acompanhamos de perto e fazemos ajustes contínuos. Se algo não estiver funcionando como esperado, trabalhamos juntos para resolver — transparência e parceria são nossos valores."],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntities.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <link rel="canonical" href="https://secretariainvisivel.com.br/" />
        <meta property="og:url" content="https://secretariainvisivel.com.br/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main>
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
      </main>
    </div>
  );
};

export default Index;
