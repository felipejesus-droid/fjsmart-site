// src/i18n/utils.ts
// Utilitários para trabalhar com traduções

import type { Language } from './config';
import translations from './translations.json';

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends string
        ? K extends string
          ? K
          : never
        : T[K] extends object
          ? `${K extends string ? K : never}.${NestedKeys<T[K]> & string}`
          : never;
    }[keyof T]
  : never;

type TranslationKeys = NestedKeys<(typeof translations)['pt-br']>;

/**
 * Obtém uma tradução pela chave.
 * Suporta notação de ponto para chaves aninhadas.
 * Ex: t('home.heroHeadline', 'pt-br')
 */
export function t(
  key: TranslationKeys,
  language: Language = 'pt-br'
): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key} for language ${language}`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Cria uma função de tradução pré-configurada para um idioma.
 * Ex: const pt = createTranslator('pt-br');
 *     const texto = pt('home.heroHeadline');
 */
export function createTranslator(language: Language) {
  return (key: TranslationKeys): string => t(key, language);
}
