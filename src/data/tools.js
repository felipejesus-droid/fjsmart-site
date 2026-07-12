// src/data/tools.js
// Dados estáticos: categorias de profissão, mapa de cores por categoria (paleta DELTA)
// e lista de ferramentas de IA. Extraído do protótipo HTML original.

export const CATEGORIES = [
  "Todos", "Comercial", "RH / Pessoas", "Financeiro", "TI / Dados", "Marketing",
  "Operações", "Jurídico", "Saúde", "Engenharia", "Administrativo", "Educação",
  "Estratégia", "Varejo", "Mídia", "Construção", "Gastronomia", "Agronegócio",
  "Transporte", "Setor Público",
];

// Mapa de cor por categoria — grupos temáticos DELTA
// D=cyan (Comercial/Marketing/Varejo/Mídia) · E=verde (RH/Educação/Gastronomia/Agro)
// L=laranja (Financeiro/Jurídico/Operações/Transporte) · T=violeta (TI/Engenharia/Construção/Público)
// A=teal (Saúde/Administrativo/Estratégia)
export const CAT_STYLE = {
  "Comercial":      { bg: "rgba(0,212,255,0.08)",   c: "#00D4FF", b: "rgba(0,212,255,0.25)" },
  "Marketing":      { bg: "rgba(0,212,255,0.06)",   c: "#00D4FF", b: "rgba(0,212,255,0.2)" },
  "Varejo":         { bg: "rgba(0,212,255,0.06)",   c: "#00D4FF", b: "rgba(0,212,255,0.2)" },
  "Mídia":          { bg: "rgba(0,212,255,0.06)",   c: "#00D4FF", b: "rgba(0,212,255,0.2)" },
  "RH / Pessoas":   { bg: "rgba(74,222,128,0.08)",  c: "#4ADE80", b: "rgba(74,222,128,0.25)" },
  "Educação":       { bg: "rgba(74,222,128,0.06)",  c: "#4ADE80", b: "rgba(74,222,128,0.2)" },
  "Gastronomia":    { bg: "rgba(74,222,128,0.06)",  c: "#4ADE80", b: "rgba(74,222,128,0.2)" },
  "Agronegócio":    { bg: "rgba(74,222,128,0.06)",  c: "#4ADE80", b: "rgba(74,222,128,0.2)" },
  "Financeiro":     { bg: "rgba(251,146,60,0.08)",  c: "#FB923C", b: "rgba(251,146,60,0.25)" },
  "Jurídico":       { bg: "rgba(251,146,60,0.06)",  c: "#FB923C", b: "rgba(251,146,60,0.2)" },
  "Operações":      { bg: "rgba(251,146,60,0.06)",  c: "#FB923C", b: "rgba(251,146,60,0.2)" },
  "Transporte":     { bg: "rgba(251,146,60,0.06)",  c: "#FB923C", b: "rgba(251,146,60,0.2)" },
  "TI / Dados":     { bg: "rgba(167,139,250,0.08)", c: "#A78BFA", b: "rgba(167,139,250,0.25)" },
  "Engenharia":     { bg: "rgba(167,139,250,0.06)", c: "#A78BFA", b: "rgba(167,139,250,0.2)" },
  "Construção":     { bg: "rgba(167,139,250,0.06)", c: "#A78BFA", b: "rgba(167,139,250,0.2)" },
  "Setor Público":  { bg: "rgba(167,139,250,0.06)", c: "#A78BFA", b: "rgba(167,139,250,0.2)" },
  "Saúde":          { bg: "rgba(52,211,153,0.08)",  c: "#34D399", b: "rgba(52,211,153,0.25)" },
  "Administrativo": { bg: "rgba(52,211,153,0.06)",  c: "#34D399", b: "rgba(52,211,153,0.2)" },
  "Estratégia":     { bg: "rgba(52,211,153,0.06)",  c: "#34D399", b: "rgba(52,211,153,0.2)" },
};

export const TOOLS = [
  { name: "ChatGPT",   logo: "https://logo.clearbit.com/openai.com",         cat: "IA Conversacional", desc: "Modelo da OpenAI para texto, código, imagens e navegação na web. Versões gratuita e paga (GPT-4o, o1).", url: "https://chatgpt.com" },
  { name: "Claude",    logo: "https://logo.clearbit.com/anthropic.com",      cat: "IA Conversacional", desc: "IA da Anthropic com 200k tokens de contexto. Destaque em análise de documentos longos e raciocínio.", url: "https://claude.ai" },
  { name: "Gemini",    logo: "https://logo.clearbit.com/gemini.google.com",  cat: "IA Conversacional", desc: "IA multimodal do Google integrada ao Workspace (Docs, Gmail, Drive). Processa texto, imagens e vídeo.", url: "https://gemini.google.com" },
  { name: "DeepSeek",  logo: "https://logo.clearbit.com/deepseek.com",       cat: "IA Conversacional", desc: "Modelo open source de alto desempenho em matemática e código. Versão gratuita disponível via chat e API.", url: "https://chat.deepseek.com" },
  { name: "Perplexity",logo: "https://logo.clearbit.com/perplexity.ai",      cat: "Pesquisa",          desc: "Buscador com IA que apresenta respostas com citações verificadas. Ideal para pesquisa e síntese rápida.", url: "https://perplexity.ai" },
  { name: "NotebookLM",logo: "https://logo.clearbit.com/notebooklm.google.com", cat: "Pesquisa",       desc: "Ferramenta do Google que cria um assistente treinado nos seus próprios documentos (PDFs, Docs, YouTube).", url: "https://notebooklm.google.com" },
  { name: "Genspark",  logo: "https://logo.clearbit.com/genspark.ai",        cat: "Pesquisa",          desc: "Motor de busca com IA que gera páginas interativas com síntese de múltiplas fontes por tema.", url: "https://www.genspark.ai" },
  { name: "Google AI Studio", logo: "https://logo.clearbit.com/aistudio.google.com", cat: "Pesquisa",  desc: "Ambiente gratuito do Google para experimentar e prototipar com os modelos Gemini via API.", url: "https://aistudio.google.com" },
  { name: "Power BI",  logo: "https://logo.clearbit.com/powerbi.microsoft.com", cat: "Dados & BI",     desc: "Plataforma de BI da Microsoft para dashboards interativos com linguagem natural via Copilot.", url: "https://powerbi.microsoft.com" },
  { name: "Excel",     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/246px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png", cat: "Dados & BI", desc: "Planilha líder de mercado com Copilot integrado para análise por linguagem natural.", url: "https://microsoft.com/excel" },
  { name: "Notion",    logo: "https://logo.clearbit.com/notion.so",          cat: "Produtividade",     desc: "Workspace all-in-one com IA que gera conteúdo, resume páginas e responde perguntas do workspace.", url: "https://notion.so" },
  { name: "Gamma",     logo: "https://logo.clearbit.com/gamma.app",         cat: "Produtividade",      desc: "Gera apresentações, documentos e páginas web profissionais a partir de um prompt em segundos.", url: "https://gamma.app" },
  { name: "Mapify",    logo: "https://logo.clearbit.com/mapify.so",         cat: "Produtividade",      desc: "Converte PDFs, vídeos do YouTube e textos em mapas mentais visuais automaticamente.", url: "https://mapify.so" },
  { name: "Lovable",   logo: "https://logo.clearbit.com/lovable.dev",       cat: "Produtividade",      desc: "Cria aplicações web completas e funcionais a partir de descrições em linguagem natural.", url: "https://lovable.dev" },
  { name: "HeyGen",    logo: "https://logo.clearbit.com/heygen.com",        cat: "Vídeo & Voz",        desc: "Cria vídeos com avatares realistas de IA e voz sincronizada em mais de 40 idiomas.", url: "https://heygen.com" },
  { name: "ElevenLabs",logo: "https://logo.clearbit.com/elevenlabs.io",     cat: "Vídeo & Voz",        desc: "Síntese e clonagem de voz ultra-realista. Usado em podcasts, audiobooks e dublagem de vídeos.", url: "https://elevenlabs.io" },
  { name: "Kling",     logo: "https://logo.clearbit.com/klingai.com",       cat: "Vídeo & Voz",        desc: "Gera vídeos realistas a partir de texto ou imagens com movimentos de câmera convincentes.", url: "https://klingai.com" },
  { name: "Opus Clip", logo: "https://logo.clearbit.com/opus.pro",          cat: "Vídeo & Voz",        desc: "Transforma vídeos longos em clipes virais para TikTok, Reels e Shorts automaticamente.", url: "https://opus.pro" },
  { name: "TLDV",      logo: "https://logo.clearbit.com/tldv.io",           cat: "Vídeo & Voz",        desc: "Grava, transcreve e resume automaticamente reuniões do Meet, Zoom e Teams com pontos de ação.", url: "https://tldv.io" },
  { name: "N8N",       logo: "https://logo.clearbit.com/n8n.io",            cat: "Automação",          desc: "Plataforma open source que conecta 400+ apps sem código e com IA integrada. Pode ser hospedado localmente.", url: "https://n8n.io" },
  { name: "Manus",     logo: "https://logo.clearbit.com/manus.im",          cat: "IA Conversacional",  desc: "Agente de IA autônomo que executa tarefas de ponta a ponta: navega na web, escreve código e cria arquivos.", url: "https://manus.im" },
  { name: "Ideamap",   logo: "https://logo.clearbit.com/ideamap.ai",        cat: "Produtividade",      desc: "Canvas infinito para brainstorming visual com IA que expande conceitos, sugere conexões e organiza ideias.", url: "https://www.ideamap.ai" },
  { name: "GLM",       logo: "https://logo.clearbit.com/zhipuai.cn",        cat: "IA Conversacional",  desc: "Modelos da Tsinghua/Zhipu AI com alto desempenho em raciocínio e código. Versão gratuita disponível.", url: "https://chatglm.cn" },
  { name: "Runway",    logo: "https://logo.clearbit.com/runwayml.com",      cat: "Vídeo & Voz",        desc: "Plataforma líder em geração e edição de vídeo com IA. Cria vídeos profissionais a partir de texto ou imagem.", url: "https://runwayml.com" },
  { name: "Suno",      logo: "https://logo.clearbit.com/suno.com",          cat: "Vídeo & Voz",        desc: "Cria músicas completas com letra, melodia e instrumentação a partir de uma descrição em texto.", url: "https://suno.com" },
];
