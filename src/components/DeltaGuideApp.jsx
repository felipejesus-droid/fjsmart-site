// src/components/DeltaGuideApp.jsx
// Ilha React: toda a interatividade do Guia DELTA (busca, filtro por categoria,
// modal de profissão, modal de ferramenta). É a ÚNICA parte do site que envia
// JS para o cliente — hidratada via client:load na página .astro.
//
// Diferença-chave vs. o protótipo original: aqui o JSX é compilado em build time
// pelo Vite/Astro. Não há mais React+Babel standalone carregados via CDN no navegador.

import { useState, useMemo } from "react";
import { PROFS } from "../data/professions.js";
import { CATEGORIES, CAT_STYLE, TOOLS } from "../data/tools.js";

function Logo({ src, name, size = 44 }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        style={{
          width: size, height: size, borderRadius: 10,
          background: "linear-gradient(135deg,#00D4FF,#7C3AED)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 900, fontSize: size * 0.38, flexShrink: 0,
        }}
      >
        {name[0]}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setErr(true)}
      style={{ width: size, height: size, objectFit: "contain", borderRadius: 10, background: "white", flexShrink: 0 }}
    />
  );
}

function catStyle(c) {
  return CAT_STYLE[c] || { bg: "#f9fafb", c: "rgba(245,247,250,0.75)", b: "#d1d5db" };
}

export default function DeltaGuideApp() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const [toolModal, setToolModal] = useState(null);
  const [copied, setCopied] = useState(null);

  const filtered = useMemo(() => {
    return PROFS.filter((p) => {
      const matchCat = cat === "Todos" || p.cat === cat;
      const sq = q.toLowerCase();
      return matchCat && (!sq || p.cargo.toLowerCase().includes(sq) || p.cat.toLowerCase().includes(sq));
    });
  }, [cat, q]);

  const copyApp = (txt, idx) => {
    navigator.clipboard?.writeText(txt);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const uniqueTools = TOOLS.filter((t, i, a) => a.findIndex((x) => x.name === t.name) === i);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", paddingBottom: 48, position: "relative" }}>
      
      {/* HERO */}
      <div
        style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(145deg,#0A1628 0%,#0d2040 50%,#0A1628 100%)",
          padding: "72px 20px 64px", textAlign: "center", zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Syne',sans-serif", fontSize: "clamp(140px,22vw,320px)", fontWeight: 800,
            color: "rgba(0,212,255,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}
        >
          Δ
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#00D4FF,#DCAF3C,transparent)" }} />

        <div
          className="dg-pulse-gold"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(220,175,60,0.08)",
            border: "0.5px solid rgba(220,175,60,0.3)", borderRadius: 4, padding: "5px 14px", fontSize: 11,
            fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#DCAF3C", marginBottom: 24,
          }}
        >
          🎁 Presente Gratuito · Por Tempo Limitado
        </div>

        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, margin: "0 auto 16px", maxWidth: 720, letterSpacing: "-0.5px", color: "#F5F7FA" }}>
          Guia DELTA<br />
          <span style={{ color: "#00D4FF" }}>para Profissões</span>
        </h1>
        <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "rgba(245,247,250,0.6)", maxWidth: 540, margin: "0 auto 12px", lineHeight: 1.7 }}>
          Descubra como a Inteligência Artificial transforma o seu cargo — com{" "}
          <strong style={{ color: "#F5F7FA", fontWeight: 500 }}>5 aplicações práticas prontas</strong> para usar amanhã.
        </p>
        <p style={{ fontSize: 12, color: "rgba(245,247,250,0.3)", margin: "0 auto 36px", fontFamily: "'DM Mono',monospace", letterSpacing: "0.1em" }}>
          {PROFS.length} profissões · {CATEGORIES.length - 1} áreas · {PROFS.length * 5}+ aplicações práticas
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#cargos" style={{ background: "#00D4FF", color: "#0A1628", fontWeight: 800, padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 13, letterSpacing: "0.06em", fontFamily: "'Syne',sans-serif" }}>
            Explorar Profissões →
          </a>
          <a href="#ferramentas" style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.15)", color: "rgba(245,247,250,0.7)", fontWeight: 600, padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 13 }}>
            🛠 Ferramentas de IA
          </a>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: "#0D1F3C", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "28px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 16 }}>
            {[
              { v: "+56%", l: "salário para quem domina IA", c: "#00D4FF", b: "rgba(0,212,255,0.08)", bo: "rgba(0,212,255,0.15)" },
              { v: `${PROFS.length}`, l: "profissões mapeadas", c: "#A78BFA", b: "rgba(167,139,250,0.08)", bo: "rgba(167,139,250,0.15)" },
              { v: `${CATEGORIES.length - 1}`, l: "áreas profissionais", c: "#4ADE80", b: "rgba(74,222,128,0.08)", bo: "rgba(74,222,128,0.15)" },
              { v: `${PROFS.length * 5}+`, l: "aplicações práticas", c: "#FB923C", b: "rgba(251,146,60,0.08)", bo: "rgba(251,146,60,0.15)" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center", padding: "18px 12px", borderRadius: 8, border: `0.5px solid ${s.bo}`, background: s.b }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: s.c, marginBottom: 3 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(245,247,250,0.5)", lineHeight: 1.4, letterSpacing: "0.02em" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,212,255,0.04)", border: "0.5px solid rgba(0,212,255,0.15)", borderRadius: 8, padding: "14px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#F5F7FA" }}>Profissionais que dominam IA têm salários até 56% maiores</p>
              <p style={{ margin: 0, color: "rgba(245,247,250,0.35)", fontSize: 11, marginTop: 2 }}>Fonte: McKinsey Global Institute &amp; LinkedIn Workforce Report 2024</p>
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#00D4FF", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 6, padding: "6px 16px", flexShrink: 0 }}>+56% 💸</div>
          </div>
        </div>
      </div>

      {/* PROFESSIONS */}
      <div id="cargos" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px 0", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#DCAF3C", fontWeight: 700, marginBottom: 6, fontFamily: "'Syne',sans-serif" }}>
            — {PROFS.length} profissões · {CATEGORIES.length - 1} áreas
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800, color: "#F5F7FA", margin: "0 0 4px" }}>Encontre sua profissão</h2>
          <p style={{ color: "rgba(245,247,250,0.45)", fontSize: 12, margin: 0 }}>Clique em qualquer cargo para ver as 5 aplicações práticas de IA prontas para usar</p>
        </div>

        {/* SEARCH */}
        <div className="dg-search" style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "rgba(245,247,250,0.35)" }}>🔍</span>
          <input type="text" placeholder={`Buscar entre ${PROFS.length} profissões...`} value={q} onChange={(e) => setQ(e.target.value)} />
          {q && (
            <button onClick={() => setQ("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "rgba(245,247,250,0.35)" }}>
              ✕
            </button>
          )}
        </div>

        {/* CHIPS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
          {CATEGORIES.map((c) => (
            <button key={c} className={`tag${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>
              {c} <span style={{ opacity: 0.6, fontSize: 10, marginLeft: 3 }}>({c === "Todos" ? PROFS.length : PROFS.filter((p) => p.cat === c).length})</span>
            </button>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "rgba(245,247,250,0.3)", marginBottom: 14, fontFamily: "'DM Mono',monospace", letterSpacing: "0.05em" }}>
          {filtered.length} profissão{filtered.length !== 1 ? "ões" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(245,247,250,0.35)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(245,247,250,0.55)", margin: "0 0 6px" }}>Nenhuma profissão encontrada</p>
            <p style={{ fontSize: 13, margin: "0 0 16px", color: "rgba(245,247,250,0.4)" }}>Tente buscar por outro termo ou categoria</p>
            <button
              onClick={() => { setQ(""); setCat("Todos"); }}
              style={{ padding: "8px 20px", borderRadius: 6, background: "#00D4FF", color: "#0A1628", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'Syne',sans-serif" }}
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 48 }}>
          {filtered.map((p) => {
            const s = catStyle(p.cat);
            return (
              <div key={p.id} className="dg-card dg-fade-up" style={{ background: "#0D1F3C", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ height: "3px", background: `linear-gradient(90deg,${s.c},transparent)` }} />
                <div style={{ padding: "16px 14px 0", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 26 }}>{p.icon}</span>
                    <span className="dg-chip" style={{ background: s.bg, color: s.c, borderColor: s.b, fontFamily: "'DM Mono',monospace" }}>{p.cat}</span>
                  </div>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#F5F7FA", margin: "0 0 6px", lineHeight: 1.3 }}>{p.cargo}</p>
                  <p style={{ fontSize: 11, color: "rgba(245,247,250,0.5)", lineHeight: 1.5, margin: "0 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.resumo}</p>
                  {p.frase && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, background: "rgba(220,175,60,0.05)", borderRadius: 6, padding: "6px 8px", marginBottom: 10, border: "0.5px solid rgba(220,175,60,0.2)" }}>
                      <span style={{ fontSize: 12, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{p.frase.split(" ")[0]}</span>
                      <p style={{ margin: 0, fontSize: 10, color: "rgba(220,175,60,0.8)", fontStyle: "italic", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {p.frase.slice(p.frase.indexOf(" ") + 1)}
                      </p>
                    </div>
                  )}
                </div>
                <div style={{ padding: "0 14px 14px" }}>
                  <button className="dg-btn-ver" onClick={() => setModal(p)} style={{ width: "100%", padding: "9px 0", background: "rgba(0,212,255,0.06)", border: "0.5px solid rgba(0,212,255,0.2)", borderRadius: 6, color: "#00D4FF", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, letterSpacing: "0.06em", fontFamily: "'DM Sans',sans-serif" }}>
                    Ver 5 aplicações de IA →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOOLS */}
      <div id="ferramentas" style={{ background: "#060E1C", borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "52px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#DCAF3C", fontWeight: 700, marginBottom: 6, fontFamily: "'Syne',sans-serif" }}>— Ferramentas</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: "#F5F7FA", margin: "0 0 8px" }}>Arsenal de IA para Profissionais</h2>
            <p style={{ fontSize: 13, color: "rgba(245,247,250,0.5)", maxWidth: 500 }}>As principais plataformas de IA aplicadas ao mercado de trabalho. Clique para detalhes e acesso.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 }}>
            {uniqueTools.map((t) => (
              <div key={t.name} className="dg-card" onClick={() => setToolModal(t)} style={{ background: "#0D1F3C", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.07)", padding: "16px 12px 12px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.1)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, overflow: "hidden", padding: 3 }}>
                  <Logo src={t.logo} name={t.name} size={42} />
                </div>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, color: "#F5F7FA", margin: "0 0 3px" }}>{t.name}</p>
                <p style={{ fontSize: 10, color: "rgba(245,247,250,0.4)", lineHeight: 1.4, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.cat}</p>
                <div style={{ width: "100%", padding: "4px 0", background: "rgba(0,212,255,0.06)", borderRadius: 5, color: "#00D4FF", fontSize: 10, fontWeight: 700, textAlign: "center", border: "0.5px solid rgba(0,212,255,0.15)" }}>Detalhes ↗</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FJ SMART */}
      <div style={{ background: "linear-gradient(145deg,#0A1628 0%,#0d2040 50%,#0A1628 100%)", borderTop: "0.5px solid rgba(0,212,255,0.1)", padding: "56px 20px", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Syne',sans-serif", fontSize: "clamp(80px,15vw,200px)", fontWeight: 800, color: "rgba(0,212,255,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>Δ</div>
        <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#00D4FF", fontWeight: 700, marginBottom: 16, fontFamily: "'DM Mono',monospace" }}>FJ Smart · Inteligência Pessoal</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, color: "#F5F7FA", marginBottom: 12, lineHeight: 1.15 }}>
            Quer implementar IA<br /><span style={{ color: "#00D4FF" }}>no seu negócio?</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(245,247,250,0.6)", lineHeight: 1.7, marginBottom: 8 }}>
            O <strong style={{ color: "#F5F7FA", fontWeight: 500 }}>Diagnóstico de Maturidade em IA</strong> da FJ Smart mapeia os seus processos em 5 dimensões e entrega as 3 oportunidades de IA com maior retorno — prontas para executar.
          </p>
          <p style={{ fontSize: 12, color: "rgba(245,247,250,0.35)", marginBottom: 32, fontFamily: "'DM Mono',monospace" }}>Método DELTA™ · Relatório executivo · Roadmap de 90 dias</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/5554996419886" target="_blank" rel="noopener" style={{ background: "#00D4FF", color: "#0A1628", fontWeight: 800, padding: "13px 28px", borderRadius: 6, textDecoration: "none", fontSize: 13, letterSpacing: "0.06em", fontFamily: "'Syne',sans-serif" }}>
              Quero meu diagnóstico →
            </a>
            <a href="https://fjsmart.com.br" target="_blank" rel="noopener" style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(245,247,250,0.6)", fontWeight: 600, padding: "13px 28px", borderRadius: 6, textDecoration: "none", fontSize: 13 }}>
              Conhecer a FJ Smart
            </a>
          </div>
          <p style={{ marginTop: 16, fontSize: 11, color: "rgba(245,247,250,0.25)", fontFamily: "'DM Mono',monospace" }}>R$1.500–2.500 · Entrega 5–7 dias úteis · fjsmart.com.br</p>
        </div>
      </div>

      {/* PROFESSION MODAL */}
      {modal && (
        <div className="dg-modal-bg" onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="dg-modal scale-in">
            <div style={{ position: "sticky", top: 0, background: "#0D1F3C", borderBottom: "0.5px solid rgba(255,255,255,0.08)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "20px 20px 0 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{modal.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: "#F5F7FA", lineHeight: 1.2 }}>{modal.cargo}</p>
                  <span className="dg-chip" style={{ background: catStyle(modal.cat).bg, color: catStyle(modal.cat).c, borderColor: catStyle(modal.cat).b, marginTop: 3, display: "inline-block" }}>{modal.cat}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => {
                    const txt = modal.apps.map((a, i) => `${i + 1}. ${a}`).join("\n");
                    navigator.clipboard?.writeText(`${modal.cargo}\n\n${txt}`);
                  }}
                  title="Copiar todas as aplicações"
                  style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(0,212,255,0.25)", background: "rgba(0,212,255,0.08)", cursor: "pointer", fontSize: 11, color: "#00D4FF", fontWeight: 700 }}
                >
                  Copiar tudo
                </button>
                <button onClick={() => setModal(null)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "#0D1F3C", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,247,250,0.55)" }}>
                  ✕
                </button>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: 12, color: "rgba(245,247,250,0.5)", margin: "0 0 12px", lineHeight: 1.6, fontStyle: "italic", borderLeft: "2px solid rgba(0,212,255,0.3)", paddingLeft: 10 }}>{modal.resumo}</p>
              {modal.frase && (
                <div style={{ background: "rgba(220,175,60,0.05)", border: "0.5px solid rgba(220,175,60,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 15, flexShrink: 0 }}>{modal.frase.split(" ")[0]}</span>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(220,175,60,0.85)", fontStyle: "italic", lineHeight: 1.55 }}>{modal.frase.slice(modal.frase.indexOf(" ") + 1)}</p>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(245,247,250,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontFamily: "'Syne',sans-serif" }}>5 aplicações práticas de IA</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {modal.apps.map((ap, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(0,212,255,0.04)", border: "0.5px solid rgba(0,212,255,0.15)", borderRadius: 8, padding: "10px 12px", position: "relative" }}>
                    <span style={{ width: 22, height: 22, flexShrink: 0, background: "rgba(0,212,255,0.12)", color: "#00D4FF", fontSize: 10, fontWeight: 800, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, fontFamily: "'DM Mono',monospace" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ margin: 0, fontSize: 12.5, color: "rgba(245,247,250,0.85)", lineHeight: 1.55, flex: 1 }}>{ap}</p>
                    <button
                      onClick={() => copyApp(ap, i)}
                      title="Copiar"
                      style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 4, border: "0.5px solid rgba(0,212,255,0.2)", background: copied === i ? "#00D4FF" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: copied === i ? "#0A1628" : "#00D4FF", marginTop: 1, transition: "all 0.15s" }}
                    >
                      {copied === i ? "✓" : "⧉"}
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, background: "rgba(0,212,255,0.05)", border: "0.5px solid rgba(0,212,255,0.15)", borderRadius: 8, padding: "14px 18px", textAlign: "center" }}>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, color: "rgba(245,247,250,0.5)" }}>Quer implementar IA com método e resultado?</p>
                <p style={{ margin: "0 0 10px", fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: "#F5F7FA" }}>Diagnóstico DELTA · FJ Smart</p>
                <a href="https://wa.me/5554996419886" target="_blank" rel="noopener" style={{ display: "inline-block", background: "#00D4FF", color: "#0A1628", fontWeight: 800, padding: "8px 20px", borderRadius: 5, textDecoration: "none", fontSize: 12, fontFamily: "'Syne',sans-serif", letterSpacing: "0.04em" }}>
                  Falar com Felipe →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL MODAL */}
      {toolModal && (
        <div className="dg-modal-bg" onClick={(e) => { if (e.target === e.currentTarget) setToolModal(null); }}>
          <div className="dg-scale-in" style={{ background: "#0D1F3C", border: "0.5px solid rgba(0,212,255,0.15)", borderRadius: 12, boxShadow: "0 30px 70px rgba(0,0,0,0.5)", width: "100%", maxWidth: 420, overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(145deg,#0A1628,#0D2040)", padding: "22px 20px 18px", position: "relative", borderBottom: "0.5px solid rgba(0,212,255,0.1)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#00D4FF,transparent)" }} />
              <button onClick={() => setToolModal(null)} style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderRadius: 4, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(245,247,250,0.5)", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✕
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.3)", padding: 5, overflow: "hidden" }}>
                  <Logo src={toolModal.logo} name={toolModal.name} size={42} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Syne',sans-serif", color: "#F5F7FA", fontWeight: 800, fontSize: 18, margin: "0 0 5px" }}>{toolModal.name}</h2>
                  <span style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "0.5px solid rgba(0,212,255,0.2)", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 4, letterSpacing: "0.1em", fontFamily: "'DM Mono',monospace" }}>{toolModal.cat}</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(245,247,250,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 10px", fontFamily: "'Syne',sans-serif" }}>Sobre a ferramenta</p>
              <p style={{ fontSize: 13, color: "rgba(245,247,250,0.7)", lineHeight: 1.7, margin: "0 0 20px" }}>{toolModal.desc}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={toolModal.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "#00D4FF", color: "#0A1628", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12, padding: "11px 0", borderRadius: 6, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, letterSpacing: "0.04em" }}>
                  Acessar site ↗
                </a>
                <button onClick={() => setToolModal(null)} style={{ padding: "11px 16px", borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "rgba(245,247,250,0.45)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
