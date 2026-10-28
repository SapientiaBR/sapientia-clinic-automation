/** Máscaras e validações dos formulários da assinatura. */

export const soDigitos = (v: string) => v.replace(/\D/g, "");

/** 000.000.000-00 até 11 dígitos, 00.000.000/0000-00 a partir do 12º. */
export function mascaraDocumento(v: string): string {
  const d = soDigitos(v).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function cpfValido(d: string): boolean {
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const dv = (base: string, pesoInicial: number) => {
    const soma = base.split("").reduce((acc, n, i) => acc + Number(n) * (pesoInicial - i), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return dv(d.slice(0, 9), 10) === Number(d[9]) && dv(d.slice(0, 10), 11) === Number(d[10]);
}

function cnpjValido(d: string): boolean {
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const dv = (base: string) => {
    const pesos = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma = base.split("").reduce((acc, n, i) => acc + Number(n) * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  return dv(d.slice(0, 12)) === Number(d[12]) && dv(d.slice(0, 13)) === Number(d[13]);
}

/** CPF ou CNPJ com dígitos verificadores certos. */
export const documentoValido = (v: string) => {
  const d = soDigitos(v);
  return d.length === 11 ? cpfValido(d) : d.length === 14 ? cnpjValido(d) : false;
};

/** (11) 90000-0000 ou (11) 3000-0000. */
export function mascaraTelefone(v: string): string {
  const d = soDigitos(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** DDD mais 8 ou 9 dígitos. */
export const telefoneValido = (v: string) => {
  const n = soDigitos(v).length;
  return n === 10 || n === 11;
};

export const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** 16 caracteres hexadecimais, o id que liga assinatura, implantação e recepcionista. */
export function novoIdClinica(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** sessionStorage sem quebrar em navegação privada ou armazenamento bloqueado. */
export const sessao = {
  ler(chave: string): string {
    try {
      return window.sessionStorage.getItem(chave) ?? "";
    } catch {
      return "";
    }
  },
  gravar(chave: string, valor: string) {
    try {
      window.sessionStorage.setItem(chave, valor);
    } catch {
      /* segue sem guardar */
    }
  },
  apagar(chave: string) {
    try {
      window.sessionStorage.removeItem(chave);
    } catch {
      /* nada a fazer */
    }
  },
};

/**
 * POST JSON com tempo limite e uma nova tentativa depois de 600 ms.
 * Devolve true se o servidor respondeu 2xx.
 */
export async function postarComRetentativa(url: string, corpo: unknown): Promise<boolean> {
  const tentar = async () => {
    const controle = new AbortController();
    const relogio = window.setTimeout(() => controle.abort(), 6000);
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
        keepalive: true,
        signal: controle.signal,
      });
      return r.ok;
    } catch {
      return false;
    } finally {
      window.clearTimeout(relogio);
    }
  };
  if (await tentar()) return true;
  await new Promise((r) => window.setTimeout(r, 600));
  return tentar();
}
