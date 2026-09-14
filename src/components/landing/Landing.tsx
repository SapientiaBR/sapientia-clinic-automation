import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import TurmaBanner from "@/components/landing/TurmaBanner";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Reframe from "@/components/landing/Reframe";
import { faqClinica, faqMedico } from "@/components/landing/FAQ";

const Scene = lazy(() => import("@/components/landing/Scene"));
const Cuida = lazy(() => import("@/components/landing/Cuida"));
const RealConversations = lazy(() => import("@/components/landing/RealConversations"));
const SocialProof = lazy(() => import("@/components/landing/SocialProof"));
const SecurityData = lazy(() => import("@/components/landing/SecurityData"));
const Turma = lazy(() => import("@/components/landing/Turma"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const LeadForm = lazy(() =>
  import("@/components/landing/LeadForm").then((m) => ({ default: m.LeadForm })),
);
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const MobileCtaBar = lazy(() => import("@/components/landing/MobileCtaBar"));

const Fallback = ({ h = "h-32" }: { h?: string }) => <div className={h} aria-hidden="true" />;

const meta = {
  clinica: {
    url: "https://secretariainvisivel.com.br/",
    title: "Secretária Invisível | Sua recepção no balcão. Ela cuida do resto.",
    description:
      "Responde, agenda, confirma, lembra e remarca pacientes 24h, sem substituir sua recepcionista. Implantação grátis para a turma do mês.",
  },
  medico: {
    url: "https://secretariainvisivel.com.br/medico",
    title: "Secretária Invisível | Você atende o paciente. Ela cuida do resto.",
    description:
      "Para médicos que atendem sozinhos: responde, agenda e confirma pacientes 24h. Chega de WhatsApp às 23h.",
  },
};

type Props = { variante: "clinica" | "medico" };

/**
 * A landing, parametrizada pela rota.
 *
 * As duas versões — clínica e médico solo — compartilham estrutura, ordem de
 * seções e componentes; o que muda é a copy e dois cortes (o médico solo vê um
 * chat em vez de três, e um plano em vez de três). Duas páginas copiadas
 * sairiam de sincronia no primeiro ajuste.
 *
 * As meta tags são declaradas uma vez por rota. Antes havia dois `og:title` e
 * dois `og:description` na mesma página, e o que o compartilhamento mostrava
 * dependia de qual o crawler lia por último.
 */
const Landing = ({ variante }: Props) => {
  const m = meta[variante];
  const perguntas = variante === "medico" ? faqMedico : faqClinica;
  const ehMedico = variante === "medico";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--navy-0)] text-[var(--text)]">
      <Helmet>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <meta
          name="keywords"
          content="atendimento whatsapp clínica, agendamento automático consultório, recepção clínica São Paulo, confirmação de consulta"
        />
        <link rel="canonical" href={m.url} />
        <meta property="og:url" content={m.url} />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        {/* O twitter:* acompanha o og:* — as duas famílias saem daqui para não
            reaparecerem duplicadas no HTML estático. A og:image fica no
            index.html: ela é a mesma nas duas rotas. */}
        <meta property="twitter:url" content={m.url} />
        <meta property="twitter:title" content={m.title} />
        <meta property="twitter:description" content={m.description} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <TurmaBanner />
      <Header />

      <main className="page-canvas pb-24 md:pb-0">
        <Hero variante={variante} />
        <Reframe variante={variante} />

        <Suspense fallback={<Fallback h="h-96" />}>
          <Scene variante={variante} />
          <Cuida variante={variante} />
          <RealConversations apenasPrimeira={ehMedico} />
          <SocialProof variante={variante} />
          <SecurityData />
          <Turma unidade={ehMedico ? "consultório" : "clínica"} />
          <Pricing variante={ehMedico ? "solo" : "clinica"} />
          <FAQ variante={variante} />
          <LeadForm origem={variante} />
          <FinalCTA variante={variante} />
        </Suspense>
      </main>

      <Suspense fallback={<Fallback h="h-32" />}>
        <Footer />
        <MobileCtaBar />
      </Suspense>
    </div>
  );
};

export default Landing;
