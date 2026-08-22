// src/i18n/config.ts
// Configuração central de internacionalização (i18n)

export const LANGUAGES = {
  'pt-br': 'Português (Brasil)',
  'en': 'English',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = 'pt-br';

// Mapeia rotas para o idioma
// Exemplo: /pt-br/... → 'pt-br', /en/... → 'en'
export function getLanguageFromPath(pathname: string): Language {
  const match = pathname.match(/^\/(pt-br|en)(?:\/|$)/);
  return match ? (match[1] as Language) : DEFAULT_LANGUAGE;
}

// Remove o prefixo de idioma da rota
// Exemplo: /pt-br/servicos → /servicos
export function removeLanguagePrefix(pathname: string): string {
  return pathname.replace(/^\/(pt-br|en)(?=\/|$)/, '') || '/';
}

// Adiciona o prefixo de idioma à rota
// Exemplo: /servicos + 'pt-br' → /pt-br/servicos
export function addLanguagePrefix(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) {
    // Rota padrão sem prefixo
    return path;
  }
  // Adiciona prefixo para idiomas não-padrão
  return `/${lang}${path}`;
}
