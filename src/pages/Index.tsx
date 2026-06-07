import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import { LeadForm } from "@/components/landing/LeadForm";

const Problems = lazy(() => import("@/components/landing/Problems"));
const RealConversations = lazy(() => import("@/components/landing/RealConversations"));
const VideoDemo = lazy(() => import("@/components/landing/VideoDemo"));

const Solutions = lazy(() => import("@/components/landing/Solutions"));
const SocialProof = lazy(() => import("@/components/landing/SocialProof"));
const Method = lazy(() => import("@/components/landing/Method"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const Fallback = ({ h = "h-32" }: { h?: string }) => <div className={h} aria-hidden="true" />;

const faqEntities: [string, string][] = [
  ["Isso não vai parecer robótico para meus pacientes?", "Não. O sistema aprende o tom de voz da sua clínica e usa o nome do paciente em cada mensagem. Você aprova o fluxo completo antes de ativar."],
  ["Vou perder o controle do meu atendimento?", "Pelo contrário. Você ganha visibilidade com painel de conversas, alertas e relatório semanal. Você define as regras, a IA executa."],
  ["É difícil de implementar? Preciso entender de tecnologia?", "Zero configuração da sua parte. Implementação em poucos dias. Sem código, sem técnico contratado."],
  ["Como funciona o contrato?", "Contrato mensal flexível, cancelamento por e-mail com 30 dias de antecedência. Todas as condições apresentadas com clareza antes do início."],
  ["Quanto custa?", "Investimento calculado com base no volume da sua clínica. Antes de qualquer número, você recebe um diagnóstico gratuito com estimativa de retorno."],
  ["E se eu não gostar do resultado?", "Acompanhamos de perto e fazemos ajustes contínuos no primeiro mês. Objetivo: redução de faltas e mais agendamentos desde as primeiras semanas."],
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
    <div className="min-h-screen bg-[var(--navy-0)] text-[var(--text)] overflow-x-hidden">
      <Helmet>
        <title>Secretária Invisível | IA que atende seu WhatsApp 24/7 e agenda pacientes</title>
        <meta
          name="description"
          content="Coloque seu WhatsApp e fale ao vivo com nossa IA. Ela atende, qualifica e agenda pacientes 24/7. Para clínicas em São Paulo. Por Sapient.IA."
        />
        <meta name="keywords" content="secretária virtual IA, automação WhatsApp clínica, agendamento automático médico, IA para consultório" />
        <link rel="canonical" href="https://secretariainvisivel.com.br/" />
        <meta property="og:url" content="https://secretariainvisivel.com.br/" />
        <meta property="og:title" content="Secretária Invisível | IA que atende seu WhatsApp 24/7" />
        <meta property="og:description" content="Teste a IA ao vivo. Ela atende, qualifica e agenda no WhatsApp." />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />
      <main className="page-canvas">
        <Hero />
        <LeadForm />

        <Suspense fallback={<Fallback h="h-96" />}>
          <Problems />
          <RealConversations />
          <VideoDemo />
          
          <Solutions />
          <SocialProof />
          <Method />
          <LeadForm variant="compact" />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={<Fallback h="h-32" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
