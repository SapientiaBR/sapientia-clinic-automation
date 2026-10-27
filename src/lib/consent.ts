import { SI_CONFIG } from "@/config/si";

/**
 * Consentimento de cookies e rastreio.
 *
 * Antes o pixel da Meta e o Clarity carregavam no primeiro scroll ou depois de
 * 4 segundos, sem perguntar. A Política de Privacidade diz que eles só
 * carregam com aceite, então o carregamento mora aqui e só acontece depois do
 * "Aceitar" no banner. Todo evento passa por `trackEvent`, que confere o aceite:
 * nenhum componente chama `fbq` direto.
 */
type Escolha = "aceito" | "recusado";

const CHAVE = "si_cookies";
export const EVENTO_ABRIR_BANNER = "si:abrir-cookies";

/** Rotas com CPF, e-mail e dados da clínica: o gravador de sessão nunca roda nelas. */
const ROTAS_SEM_CLARITY = ["/assinar", "/obrigado", "/recepcionista"];

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};
type Janela = Window & { fbq?: Fbq; _fbq?: Fbq; clarity?: (...args: unknown[]) => void };

export function lerEscolha(): Escolha | null {
  try {
    const v = window.localStorage.getItem(CHAVE);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

function gravarEscolha(v: Escolha) {
  try {
    window.localStorage.setItem(CHAVE, v);
  } catch {
    /* navegação privada ou armazenamento bloqueado: vale só nesta visita */
  }
}

let escolhaDaSessao: Escolha | null = null;
const temAceite = () => (escolhaDaSessao ?? lerEscolha()) === "aceito";

function inserirScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let carregado = false;

/** Carrega o pixel e, fora das rotas com dado pessoal, o Clarity. Só com aceite. */
function carregarRastreio() {
  if (carregado || !temAceite()) return;
  carregado = true;
  const w = window as Janela;

  // O stub enfileira chamadas até o fbevents.js chegar, como o snippet oficial.
  if (!w.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue!.push(args);
    } as Fbq;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    w._fbq = n;
  }
  inserirScript("https://connect.facebook.net/en_US/fbevents.js");
  w.fbq!("init", SI_CONFIG.pixelId);
  w.fbq!("track", "PageView");

  if (!ROTAS_SEM_CLARITY.includes(window.location.pathname)) {
    const c = (w.clarity =
      w.clarity ||
      function (...args: unknown[]) {
        ((c as unknown as { q?: unknown[] }).q ||= []).push(args);
      });
    inserirScript(`https://www.clarity.ms/tag/${SI_CONFIG.clarityId}`);
  }
}

function apagarCookie(nome: string) {
  const dominio = window.location.hostname.replace(/^www\./, "");
  document.cookie = `${nome}=; Max-Age=0; path=/`;
  document.cookie = `${nome}=; Max-Age=0; path=/; domain=.${dominio}`;
}

export function aceitar() {
  escolhaDaSessao = "aceito";
  gravarEscolha("aceito");
  carregarRastreio();
}

export function recusar() {
  const jaTinhaAceitado = temAceite();
  escolhaDaSessao = "recusado";
  gravarEscolha("recusado");
  if (jaTinhaAceitado) {
    const w = window as Janela;
    w.fbq?.("consent", "revoke");
    apagarCookie("_fbp");
    apagarCookie("_fbc");
  }
}

/** O único jeito de mandar evento ao pixel. Sem aceite, não sai nada. */
export function trackEvent(nome: string, params?: Record<string, unknown>) {
  if (!temAceite()) return;
  const w = window as Janela;
  w.fbq?.("track", nome, params);
}

export const abrirPreferencias = () => window.dispatchEvent(new Event(EVENTO_ABRIR_BANNER));

/**
 * Liga o rastreio na abertura do app.
 *
 * Também registra, num lugar só, o clique em qualquer link de WhatsApp como
 * `Contact`: botão flutuante, rodapé, cards, /assinar e /obrigado. Antes cada
 * componente disparava `Lead` por conta própria, e não dava para separar quem
 * só clicou no WhatsApp de quem preencheu o formulário.
 */
let iniciado = false;
export function iniciarRastreio() {
  if (iniciado) return;
  iniciado = true;
  carregarRastreio();
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (a && /^https:\/\/wa\.me\//.test(a.href)) trackEvent("Contact");
    },
    { capture: true },
  );
}

/** Lê um cookie de primeira parte, para mandar _fbp e _fbc ao n8n. */
export function lerCookie(nome: string): string | undefined {
  const m = document.cookie.match(new RegExp(`(?:^|; )${nome}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}
