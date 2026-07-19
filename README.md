# FJ Smart · Site v1

Site oficial da FJ Smart — Inteligência Pessoal.

Stack: [Astro](https://astro.build) `^4.0.0` (React + TypeScript) · Deploy: Netlify / Cloudflare Pages

## Páginas

| Rota | Status | Descrição |
|------|--------|-----------|
| `/` | ✅ Completa | Home — Hero, Método DELTA (cards com glow neon), Serviços, CTA |
| `/diagnostico` | ✅ Completa | Landing page de conversão — porta de entrada B2B |
| `/servicos` | ✅ Completa | Portfólio completo B2B + B2C |
| `/metodo-delta` | ✅ Completa | Framework DELTA detalhado, com schema FAQPage |
| `/sobre` | ✅ Completa | Felipe Jesus + FJ Smart, com fotos reais |
| `/contato` | ✅ Completa | Formulário + WhatsApp + email |
| `/guia-delta` | ✅ Completa | Guia de IA por Cargo — 161 profissões, filtros por categoria |
| `/termos` | ✅ Completa | Termos legais + conformidade LGPD |
| `/404` | ✅ Completa | Página de erro customizada (corrige status HTTP em rotas inexistentes) |

## SEO

- Sitemap real gerado via `@astrojs/sitemap`
- `robots.txt` referenciando o sitemap
- Schema.org: `Organization` na home, `FAQPage` em `/metodo-delta`
- Meta descriptions otimizadas em `/metodo-delta` e `/servicos`
- Âncoras específicas nos cards de serviço da home

## Como rodar localmente

```bash
npm install
npm run dev
```

## Deploy (Netlify)

1. Push para GitHub
2. Conectar repositório no Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Apontar domínio `fjsmart.com.br` nas DNS settings

## Identidade Visual

- Midnight Navy `#0A1628`
- Electric Cyan `#00D4FF`
- Strategic Gold `#DCAF3C`
- Matrix Green `#00FF88` (accent only)
- Deep Violet `#4C1D95`
- Off White `#F5F7FA`

Tipografia: Syne (display) · DM Sans (body) · DM Mono (mono)

## Notas técnicas

- Componentes React (ex: `DeltaGuideApp.jsx`) integrados via `@astrojs/react`
- TypeScript configurado (`tsconfig.json`)
- **Atenção ao encoding:** salve sempre este arquivo em UTF-8. Se os acentos/emojis aparecerem quebrados no terminal, force a leitura com:
  ```powershell
  git show HEAD:README.md | Out-File -Encoding utf8 README-check.txt
  ```

---
*Última atualização: 19/07/2026*
