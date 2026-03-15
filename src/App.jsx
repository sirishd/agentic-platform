import { useState, useEffect } from "react";

/* ── Responsive hook ────────────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ── Design tokens ───────────────────────────────────────────────────── */
const FONT_SANS = "'Inter','SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";
const FONT_MONO = "'JetBrains Mono','Fira Code','SF Mono',monospace";

const palette = {
  bg:       "#0B0D14",
  surface:  "rgba(255,255,255,0.04)",
  glass:    "rgba(255,255,255,0.07)",
  glassBorder: "rgba(255,255,255,0.14)",
  text:     "#FFFFFF",
  textDim:  "#C0C0D4",
  textMuted:"#9090A8",
};

const layerColors = {
  business:    { accent: "#E8BE5A", glow: "rgba(232,190,90,0.20)", bg: "rgba(232,190,90,0.08)", border: "rgba(232,190,90,0.25)" },
  product:     { accent: "#7CC8ED", glow: "rgba(124,200,237,0.20)", bg: "rgba(124,200,237,0.08)", border: "rgba(124,200,237,0.25)" },
  engineering: { accent: "#7EDBA8", glow: "rgba(126,219,168,0.20)", bg: "rgba(126,219,168,0.08)", border: "rgba(126,219,168,0.25)" },
  operations:  { accent: "#E094D4", glow: "rgba(224,148,212,0.20)", bg: "rgba(224,148,212,0.08)", border: "rgba(224,148,212,0.25)" },
};

/* ── Data ────────────────────────────────────────────────────────────── */
const layers = [
  {
    id: "business", num: "01",
    label: "Business Strategy", sublabel: "Alignment & Prioritization",
    gov: "Strategic approval", loop: "OKR drift \u2192 re-prioritise",
    agents: [
      { name: "Strategy Agent", desc: "Ingests market signals, competitive intelligence, and OKR performance to surface strategic recommendations and flag misalignments." },
      { name: "Portfolio Agent", desc: "Tracks initiative ROI, resurfaces stalled work, and identifies resource contention across programs in real time." },
      { name: "Voice of Customer Agent", desc: "Synthesizes CRM data, support tickets, NPS, and interview transcripts into actionable product signals." },
    ],
    inputs:  ["Market signals", "OKRs & KPIs", "Executive decisions", "Financial targets"],
    outputs: ["Prioritized intent", "Funding signals", "Strategic constraints"],
  },
  {
    id: "product", num: "02",
    label: "Product Specifications", sublabel: "Requirements & Design",
    gov: "Spec sign-off", loop: "Customer signals \u2192 criteria",
    agents: [
      { name: "PRD Agent", desc: "Translates business intent into structured PRDs with acceptance criteria, edge cases, and dependency maps \u2014 grounded in the knowledge base." },
      { name: "Design Agent", desc: "Generates wireframes, design tokens, and component specs. Enforces design system consistency and flags accessibility issues." },
      { name: "Prioritization Agent", desc: "Scores backlog items against strategic weight, engineering effort estimates, and customer impact signals." },
    ],
    inputs:  ["Prioritized intent", "User research", "Design system", "Tech constraints"],
    outputs: ["PRDs", "User stories", "Acceptance criteria", "Design specs"],
  },
  {
    id: "engineering", num: "03",
    label: "Engineering", sublabel: "Build & Verify",
    gov: "Architecture review", loop: "Tech debt \u2192 backlog weight",
    agents: [
      { name: "Architect Agent", desc: "Generates system design proposals, evaluates tradeoffs (latency, cost, scale), and flags architectural drift from approved patterns." },
      { name: "Code Agent", desc: "Scaffolds implementations from specs, writes unit and integration tests, raises PRs, and responds to review feedback autonomously." },
      { name: "Security Agent", desc: "Continuously audits code for vulnerability patterns, dependency risks, and compliance drift. Blocks merges on critical findings." },
    ],
    inputs:  ["PRDs", "Architecture patterns", "API contracts", "Test suites"],
    outputs: ["Merged code", "Test coverage reports", "Architecture records", "Tech debt log"],
  },
  {
    id: "operations", num: "04",
    label: "Operations", sublabel: "Deploy & Monitor",
    gov: "Incident escalation", loop: "Incident data \u2192 PRD risk flags",
    agents: [
      { name: "Deploy Agent", desc: "Orchestrates progressive rollouts, validates canary health metrics, and executes or escalates rollbacks with blast-radius analysis." },
      { name: "Observability Agent", desc: "Correlates logs, traces, and metrics to identify anomalies before they become incidents. Drafts runbooks in real time." },
      { name: "Incident Agent", desc: "Triages pages, identifies probable cause chains, proposes and (with approval) executes remediations. Writes post-mortems automatically." },
    ],
    inputs:  ["Merged code", "Infra config", "SLO definitions", "Runbooks"],
    outputs: ["Deployment telemetry", "Incident learnings", "Cost signals", "Usage patterns"],
  },
];

const knowledgeStoreItems = [
  "Vector embedding index", "Decision audit trail", "Architecture decision records",
  "Post-mortem corpus", "Runbook library", "API contract registry",
  "Customer signal store", "Code pattern library", "Incident correlation graph", "OKR-to-feature linkage map",
];

/* ── Glass Card ──────────────────────────────────────────────────────── */
function GlassCard({ children, style = {}, onClick, hover = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.09)" : palette.glass,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : palette.glassBorder}`,
        borderRadius: 16,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Pill tag ────────────────────────────────────────────────────────── */
function Pill({ label, color, icon }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 16px", borderRadius: 20,
      background: `${color}15`, border: `1px solid ${color}30`,
      fontSize: 14, color, fontFamily: FONT_MONO,
      letterSpacing: "0.03em",
    }}>
      {icon && <span style={{ fontSize: 13, opacity: 0.8 }}>{icon}</span>}
      {label}
    </span>
  );
}

/* ── Vertical flow connector (between rows) ──────────────────────────── */
function VerticalConnector({ color }) {
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "6px 0", position: "relative",
    }}>
      <div style={{
        width: 2, height: 36, borderRadius: 1,
        background: `linear-gradient(180deg, ${color}50, ${color}20)`,
      }} />
      <div style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        width: 7, height: 7, borderRadius: "50%",
        background: palette.bg,
        border: `1.5px solid ${color}60`,
      }} />
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */
export default function App() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeTab, setActiveTab] = useState("agents");
  const [openFoundation, setOpenFoundation] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div style={{
      fontFamily: FONT_SANS, background: palette.bg, minHeight: "100vh",
      color: palette.text, padding: isMobile ? "32px 16px" : "60px 40px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: "fixed", top: "-30%", left: "10%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,190,90,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", right: "5%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,200,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 20px", borderRadius: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            fontSize: 13, color: palette.textDim, fontFamily: FONT_MONO,
            letterSpacing: "0.15em", marginBottom: 24,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7EDBA8", boxShadow: "0 0 10px rgba(126,219,168,0.5)" }} />
            ENTERPRISE ARCHITECTURE
          </div>

          <h1 style={{
            fontSize: isMobile ? 32 : 48, fontWeight: 700, margin: "0 0 16px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
            background: "linear-gradient(135deg, #E8BE5A 0%, #FFFFFF 40%, #7CC8ED 80%, #E094D4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Agentic AI Platform Lifecycle
          </h1>

          <p style={{
            fontSize: 18, color: palette.textDim, margin: 0,
            letterSpacing: "0.02em", lineHeight: 1.6,
          }}>
            Platform-orchestrated {"\u00B7"} Knowledge-connected {"\u00B7"} Continuously learning
          </p>
        </div>

        {/* ── Business Engine container ── */}
        <div style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: isMobile ? 16 : 24,
          padding: isMobile ? "24px 16px" : "40px 40px 36px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Inner glow */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }} />

          {/* Section label */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: 36,
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
            <span style={{
              fontSize: 13, fontFamily: FONT_MONO, letterSpacing: "0.25em",
              color: palette.textMuted, textTransform: "uppercase",
            }}>
              Business Engine
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.08))" }} />
          </div>

          {/* ── Layer rows ── */}
          {layers.map((layer, i) => {
            const c = layerColors[layer.id];
            const isActive = activeLayer === layer.id;
            const isLast = i === layers.length - 1;

            return (
              <div key={layer.id}>
                {/* Layer card */}
                <GlassCard
                  hover
                  onClick={() => { setActiveLayer(isActive ? null : layer.id); setActiveTab("agents"); }}
                  style={{
                    padding: isMobile ? "20px 20px" : "28px 32px",
                    cursor: "pointer",
                    borderColor: isActive ? `${c.accent}50` : palette.glassBorder,
                    borderRadius: isActive ? "16px 16px 0 0" : 16,
                    boxShadow: isActive ? `0 6px 40px ${c.glow}, inset 0 1px 0 ${c.accent}15` : "none",
                    background: isActive ? `linear-gradient(135deg, ${c.bg}, ${palette.glass})` : palette.glass,
                  }}
                >
                  {/* Top row: badge + title + chevron */}
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 14 : 20 }}>
                    {/* Number badge */}
                    <div style={{
                      width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: isMobile ? 12 : 14,
                      background: `linear-gradient(135deg, ${c.accent}20, ${c.accent}08)`,
                      border: `1px solid ${c.accent}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isMobile ? 16 : 18, fontWeight: 700, color: c.accent,
                      fontFamily: FONT_MONO, flexShrink: 0,
                    }}>
                      {layer.num}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: isMobile ? 18 : 22, fontWeight: 600, color: palette.text,
                        letterSpacing: "-0.01em", marginBottom: 4,
                      }}>
                        {layer.label}
                      </div>
                      <div style={{ fontSize: isMobile ? 14 : 16, color: palette.textDim }}>
                        {layer.sublabel}
                      </div>
                    </div>

                    <div style={{
                      fontSize: 18, color: palette.textMuted, flexShrink: 0,
                      transform: isActive ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}>
                      &#x2304;
                    </div>
                  </div>

                  {/* Agent pill + Gov/Loop tags row */}
                  <div style={{
                    display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 14,
                    paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.06)`,
                  }}>
                    {/* Agent count pill */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "6px 12px", borderRadius: 20,
                      background: `${c.accent}12`, border: `1px solid ${c.accent}25`,
                    }}>
                      <div style={{ display: "flex", gap: 3 }}>
                        {layer.agents.map((_, j) => (
                          <div key={j} style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: isActive ? c.accent : `${c.accent}60`,
                            transition: "background 0.3s",
                          }} />
                        ))}
                      </div>
                      <span style={{
                        fontSize: 12, color: c.accent, fontFamily: FONT_MONO,
                      }}>
                        {layer.agents.length} agents
                      </span>
                    </div>
                    <span style={{
                      fontSize: 11, fontFamily: FONT_MONO, color: palette.textMuted,
                      padding: "4px 10px", borderRadius: 8,
                      background: `${c.accent}08`, border: `1px solid ${c.accent}18`,
                      letterSpacing: "0.02em",
                    }}>
                      Gov: {layer.gov}
                    </span>
                    <span style={{
                      fontSize: 11, fontFamily: FONT_MONO, color: palette.textMuted,
                      padding: "4px 10px", borderRadius: 8,
                      background: `${c.accent}08`, border: `1px solid ${c.accent}18`,
                      letterSpacing: "0.02em",
                    }}>
                      Loop: {layer.loop}
                    </span>
                  </div>
                </GlassCard>

                {/* Expanded detail panel */}
                {isActive && (
                  <div style={{
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${c.border}`,
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    padding: "8px 8px 8px",
                    animation: "expandIn 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    {/* Tab bar */}
                    <div style={{
                      display: "flex", gap: 6, padding: "16px 20px 0",
                      marginBottom: 20,
                    }}>
                      {["agents", "inputs", "outputs"].map(tab => (
                        <button
                          key={tab}
                          onClick={(e) => { e.stopPropagation(); setActiveTab(tab); }}
                          style={{
                            padding: "10px 22px", borderRadius: 10,
                            background: activeTab === tab ? `${c.accent}20` : "transparent",
                            border: activeTab === tab ? `1px solid ${c.accent}35` : "1px solid transparent",
                            color: activeTab === tab ? c.accent : palette.textMuted,
                            fontSize: 15, fontWeight: 500, cursor: "pointer",
                            fontFamily: FONT_SANS, letterSpacing: "0.02em",
                            transition: "all 0.2s",
                            textTransform: "capitalize",
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div style={{ padding: "0 20px 24px" }}>
                      {activeTab === "agents" && (
                        <div style={{ display: "grid", gap: 14 }}>
                          {layer.agents.map((agent, j) => (
                            <div key={j} style={{
                              display: "flex", gap: 16, padding: "18px 20px",
                              background: "rgba(255,255,255,0.03)",
                              borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)",
                            }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: `linear-gradient(135deg, ${c.accent}25, ${c.accent}10)`,
                                border: `1px solid ${c.accent}30`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 16, flexShrink: 0, color: c.accent,
                              }}>
                                {j === 0 ? "\u25C6" : j === 1 ? "\u25CF" : "\u25C7"}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: 16, fontWeight: 600, color: palette.text, marginBottom: 6,
                                }}>
                                  {agent.name}
                                </div>
                                <div style={{
                                  fontSize: 15, color: palette.textDim, lineHeight: 1.7,
                                }}>
                                  {agent.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "inputs" && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                          {layer.inputs.map((inp, j) => (
                            <Pill key={j} label={inp} color={c.accent} icon={"\u2193"} />
                          ))}
                        </div>
                      )}

                      {activeTab === "outputs" && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                          {layer.outputs.map((out, j) => (
                            <Pill key={j} label={out} color={c.accent} icon={"\u2191"} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Vertical connector between rows */}
                {!isLast && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <VerticalConnector color={c.accent} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Transition connector ── */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          padding: "8px 0",
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 2, height: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: palette.bg, border: "1.5px solid rgba(255,255,255,0.25)", boxShadow: "0 0 8px rgba(255,255,255,0.10)" }} />
            <div style={{ width: 2, height: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.15))" }} />
          </div>
        </div>

        {/* ── Continuous Feedback Loops container ── */}
        <div style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: isMobile ? 16 : 24,
          padding: isMobile ? "24px 16px" : "40px 40px 36px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }} />

          {/* Section label */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: 32,
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
            <span style={{
              fontSize: 13, fontFamily: FONT_MONO, letterSpacing: "0.25em",
              color: palette.textMuted, textTransform: "uppercase",
            }}>
              Continuous Feedback Loops
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.08))" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, alignItems: "stretch" }}>
          {[
            {
              key: "policy",
              icon: "\u2295", color: "#B8A0E0",
              title: "Policy Rails",
              subtitle: "Governance \u00B7 Signals \u00B7 Compliance",
              items: ["Audit log", "Ethics gates", "Override controls", "Compliance checks", "Capture signals", "Embed knowledge", "Index patterns", "Retrieve context"],
            },
            {
              key: "knowledge",
              icon: "\u27F3", color: "#B8A0E0",
              title: "Knowledge Store",
              subtitle: "Embedded \u00B7 Indexed \u00B7 Cross-layer retrievable",
              items: knowledgeStoreItems,
            },
          ].map((section) => {
            const hasItems = section.items.length > 0;
            const isOpen = hasItems && openFoundation === section.key;
            return (
              <div key={section.key} style={{ display: "flex", flexDirection: "column" }}>
                <GlassCard
                  hover={hasItems}
                  onClick={hasItems ? () => setOpenFoundation(isOpen ? null : section.key) : undefined}
                  style={{
                    padding: "24px 28px",
                    cursor: hasItems ? "pointer" : "default",
                    borderColor: isOpen ? `${section.color}50` : palette.glassBorder,
                    borderRadius: isOpen ? "16px 16px 0 0" : 16,
                    boxShadow: isOpen ? `0 6px 24px ${section.color}12` : "none",
                    background: isOpen
                      ? `linear-gradient(135deg, ${section.color}0A, ${palette.glass})`
                      : palette.glass,
                    flex: 1,
                    display: "flex", alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `linear-gradient(135deg, ${section.color}20, ${section.color}08)`,
                      border: `1px solid ${section.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, color: section.color, flexShrink: 0,
                    }}>
                      {section.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 19, fontWeight: 600, color: palette.text,
                        letterSpacing: "-0.01em", marginBottom: 4,
                      }}>
                        {section.title}
                      </div>
                      <div style={{ fontSize: 15, color: palette.textDim }}>
                        {section.subtitle}
                      </div>
                    </div>
                    {hasItems && (
                      <div style={{
                        fontSize: 16, color: palette.textMuted,
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                      }}>
                        &#x2304;
                      </div>
                    )}
                  </div>
                </GlassCard>

                {isOpen && (
                  <div style={{
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${section.color}25`,
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    padding: "20px 24px",
                    animation: "expandIn 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <div style={{
                      display: "flex", flexWrap: "wrap", gap: 10,
                    }}>
                      {section.items.map((item, i) => (
                        <div key={i} style={{
                          fontSize: 14, color: palette.textDim,
                          padding: "8px 16px",
                          display: "flex", alignItems: "center", gap: 10,
                          background: `${section.color}08`,
                          border: `1px solid ${section.color}20`,
                          borderRadius: 10,
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: `${section.color}40`, border: `1px solid ${section.color}50`,
                            flexShrink: 0,
                          }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          marginTop: 40, textAlign: "center", padding: "20px 0",
        }}>
          <span style={{
            fontSize: 14, color: palette.textMuted,
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: FONT_MONO, letterSpacing: "0.06em",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "rgba(255,255,255,0.20)",
              animation: "pulse 2s ease infinite",
            }} />
            Click any section to explore details
          </span>
          <div style={{
            marginTop: 16, fontSize: 12, color: palette.textMuted,
            fontFamily: FONT_MONO, letterSpacing: "0.04em",
          }}>
            Sirish R Davuluri
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expandIn {
          from { opacity: 0; max-height: 0; transform: translateY(-8px); }
          to { opacity: 1; max-height: 600px; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}