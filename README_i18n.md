# Internacionalização (i18n) - Guia de Implementação

## 🌍 Estrutura Atual

Este projeto agora suporta **duas versões de idioma**:
- 🇧🇷 **Português (Brasil)** - Versão padrão em `/` e `/pt-br/`
- 🇺🇸 **English** - Nova versão em `/en/`

## 📁 Arquivos Criados

```
src/
├── i18n/
│   ├── config.ts          # Configuração de idiomas e rotas
│   ├── utils.ts           # Funções utilitárias para tradução
│   └── translations.json  # Arquivo de tradução (PT-BR + EN)
├── components/
│   └── LanguageSwitcher.astro  # Seletor de idioma
└── pages/
    └── en/
        └── index.astro        # Home page em inglês (exemplo)
```

## 🔧 Como Usar

### 1. Adicionar Traduções

Edite `src/i18n/translations.json` para adicionar novas chaves:

```json
{
  "pt-br": {
    "seção": {
      "chave": "Texto em Português"
    }
  },
  "en": {
    "seção": {
      "chave": "English text"
    }
  }
}
```

### 2. Usar em Componentes Astro

```astro
---
import { t } from '../i18n/utils';

const lang = 'en'; // ou 'pt-br'
---

<h1>{t('home.heroHeadline', lang)}</h1>
```

### 3. Criar Páginas Localizadas

Para criar uma página em inglês:

1. Copie a página Portuguesa para `/src/pages/en/`
2. Altere as referências de rota (ex: `/servicos` → `/en/services`)
3. Use `t()` para traduzir conteúdo estático

**Exemplo:**
```astro
---
import { t } from '../../i18n/utils';
const lang = 'en';
---

<h1>{t('home.heroHeadline', lang)}</h1>
<a href="/en/services">{t('header.navServices', lang)}</a>
```

### 4. Adicionar Seletor de Idioma

Adicione o componente `<LanguageSwitcher>` no header ou rodapé:

```astro
<LanguageSwitcher currentPath={Astro.url.pathname} />
```

## 🎯 Próximos Passos

### Fazer agora:
1. ✅ Criar versão completa em inglês da homepage
2. ✅ Traduzir páginas principais (Serviços, Método DELTA, Sobre, Diagnóstico)
3. ✅ Atualizar componentes Header/Footer para suportar `LanguageSwitcher`
4. ✅ Atualizar `astro.config.mjs` se necessário para sitemap multilíngue

### Fazer depois:
1. 📦 Adicionar idiomas adicionais (ES, FR, etc.)
2. 🔄 Implementar preferência de idioma via localStorage/cookie
3. 🎨 Testar responsividade em ambos os idiomas
4. 📱 Testar em dispositivos mobile

## 🚀 Deployment

Aos fazer deploy:
1. As rotas `/pt-br/...` e `/en/...` estarão automaticamente disponíveis
2. O seletor de idioma redirecionará para a versão correta
3. Considere adicionar meta-tags `hreflang` para SEO multilíngue

## 📝 Notas

- **Zero JavaScript necessário** - Toda a troca de idioma é via links HTML estáticos
- **Build-time tradução** - Tudo é renderizado no build, sem custo de performance no cliente
- **Estrutura escalável** - Fácil adicionar novos idiomas simplesmente adicionando mais chaves em `translations.json`

## ❓ Dúvidas?

Se encontrar uma chave de tradução ausente ou quiser ajustar a estrutura, edite:
- `src/i18n/translations.json` - Conteúdo traduzido
- `src/i18n/config.ts` - Lógica de roteamento
- `src/i18n/utils.ts` - Funções utilitárias
