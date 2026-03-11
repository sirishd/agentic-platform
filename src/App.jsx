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
  bg:       "#080A0F",
  surface:  "rgba(255,255,255,0.03)",
  glass:    "rgba(255,255,255,0.05)",
  glassBorder: "rgba(255,255,255,0.10)",
  text:     "#F0F0F5",
  textDim:  "#A8A8BE",
  textMuted:"#7A7A95",
  gov:      "#D4A853",
  loop:     "#6CB4D9",
  policyRail: "#E07A5F",
  knowledgeStore: "#9B8EC4",
};

const layerColors = {
  business:    { accent: "#D4A853", glow: "rgba(212,168,83,0.15)", bg: "rgba(212,168,83,0.06)", border: "rgba(212,168,83,0.20)" },
  product:     { accent: "#6CB4D9", glow: "rgba(108,180,217,0.15)", bg: "rgba(108,180,217,0.06)", border: "rgba(108,180,217,0.20)" },
  engineering: { accent: "#6ECF97", glow: "rgba(110,207,151,0.15)", bg: "rgba(110,207,151,0.06)", border: "rgba(110,207,151,0.20)" },
  operations:  { accent: "#CF7EBF", glow: "rgba(207,126,191,0.15)", bg: "rgba(207,126,191,0.06)", border: "rgba(207,126,191,0.20)" },
};

/* ── Data ────────────────────────────────────────────────────────────── */
const layers = [
  {
    id: "business", num: "01",
    label: "Business Strategy", sublabel: "Alignment & Prioritization",
    govLabel: "Strategic approval", govIcon: "\u2295",
    loopSignal: "OKR drift \u2192 re-prioritise", loopIcon: "\u21BB",
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
    govLabel: "Spec sign-off", govIcon: "\u2295",
    loopSignal: "Customer signals \u2192 criteria", loopIcon: "\u21BB",
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
    govLabel: "Architecture review", govIcon: "\u2295",
    loopSignal: "Tech debt \u2192 backlog weight", loopIcon: "\u21BB",
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
    govLabel: "Incident escalation", govIcon: "\u2295",
    loopSignal: "Incident data \u2192 PRD risk flags", loopIcon: "\u21BB",
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
        background: hovered ? "rgba(255,255,255,0.06)" : palette.glass,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : palette.glassBorder}`,
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
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "6px 14px", borderRadius: 20,
      background: `${color}10`, border: `1px solid ${color}25`,
      fontSize: 13, color, fontFamily: FONT_MONO,
      letterSpacing: "0.03em",
    }}>
      {icon && <span style={{ fontSize: 12, opacity: 0.7 }}>{icon}</span>}
      {label}
    </span>
  );
}

/* ── Horizontal dashed connector ─────────────────────────────────────── */
function HorizontalConnector({ color, direction = "right" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100%", minHeight: 60, position: "relative",
    }}>
      {/* dashed line */}
      <div style={{
        width: "100%", height: 0,
        borderTop: `1.5px dashed ${color}35`,
      }} />
      {/* arrow tip */}
      <div style={{
        position: "absolute",
        [direction === "right" ? "right" : "left"]: 0,
        width: 0, height: 0,
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        ...(direction === "right"
          ? { borderLeft: `6px solid ${color}50` }
          : { borderRight: `6px solid ${color}50` }),
      }} />
      {/* glow dot at center */}
      <div style={{
        position: "absolute",
        width: 5, height: 5, borderRadius: "50%",
        background: `${color}40`,
        boxShadow: `0 0 8px ${color}25`,
      }} />
    </div>
  );
}

/* ── Vertical flow connector (between rows) ──────────────────────────── */
function VerticalConnector({ color }) {
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "4px 0", position: "relative",
    }}>
      <div style={{
        width: 2, height: 28, borderRadius: 1,
        background: `linear-gradient(180deg, ${color}35, ${color}15)`,
      }} />
      <div style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        width: 6, height: 6, borderRadius: "50%",
        background: palette.bg,
        border: `1.5px solid ${color}40`,
      }} />
    </div>
  );
}

/* ── Side rail card (governance / feedback) ───────────────────────────── */
function RailCard({ label, icon, color, align = "left" }) {
  return (
    <div style={{
      padding: "16px 18px",
      background: `${color}08`,
      border: `1px solid ${color}22`,
      borderRadius: 12,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex", alignItems: "center",
      gap: 12,
      flexDirection: align === "right" ? "row-reverse" : "row",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: `linear-gradient(135deg, ${color}18, ${color}08)`,
        border: `1px solid ${color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, color: `${color}dd`, flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{
        fontSize: 13, color: `${color}cc`, fontFamily: FONT_MONO,
        letterSpacing: "0.03em", lineHeight: 1.4,
        textAlign: align,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */
export default function App() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeTab, setActiveTab] = useState("agents");
  const [openFoundation, setOpenFoundation] = useState(null); // "policy" | "signal" | "knowledge" | null
  const isMobile = useIsMobile();

  const GRID_COLS = isMobile ? "1fr" : "200px 40px 1fr 40px 200px";

  return (
    <div style={{
      fontFamily: FONT_SANS, background: palette.bg, minHeight: "100vh",
      color: palette.text, padding: isMobile ? "24px 12px" : "48px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: "fixed", top: "-30%", left: "10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", right: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108,180,217,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: 12, color: palette.textDim, fontFamily: FONT_MONO,
            letterSpacing: "0.15em", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ECF97", boxShadow: "0 0 8px rgba(110,207,151,0.4)" }} />
            ENTERPRISE ARCHITECTURE
          </div>

          <h1 style={{
            fontSize: isMobile ? 28 : 40, fontWeight: 700, margin: "0 0 12px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
            background: "linear-gradient(135deg, #D4A853 0%, #E8E8ED 40%, #6CB4D9 80%, #CF7EBF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Agentic AI Platform Lifecycle
          </h1>

          <p style={{
            fontSize: 16, color: palette.textDim, margin: 0,
            letterSpacing: "0.02em", lineHeight: 1.6,
          }}>
            Platform-orchestrated {"\u00B7"} Knowledge-connected {"\u00B7"} Continuously learning
          </p>
        </div>

        {/* ── Orchestration: unified container ── */}
        <div style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: isMobile ? 12 : 20,
          padding: isMobile ? "16px 12px 16px" : "28px 28px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle inner glow at top edge */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }} />

          {/* Orchestration label */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 24,
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06))" }} />
            <span style={{
              fontSize: 12, fontFamily: FONT_MONO, letterSpacing: "0.25em",
              color: palette.textMuted, textTransform: "uppercase",
            }}>
              Business Engine
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.06))" }} />
          </div>

        {/* ── Column headers ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: GRID_COLS,
          gap: 0, marginBottom: 16, alignItems: "end",
          padding: "0 0 12px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          {!isMobile && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 12, fontFamily: FONT_MONO, letterSpacing: "0.2em",
                color: palette.textDim, display: "flex", alignItems: "center",
                justifyContent: "center", gap: 6,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }} />
                GOVERNANCE
              </div>
              <div style={{ fontSize: 12, color: palette.textMuted, marginTop: 4, fontFamily: FONT_MONO }}>
                Policy {"\u00B7"} Approval {"\u00B7"} Override
              </div>
            </div>
          )}
          {!isMobile && <div />}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 10, fontFamily: FONT_MONO, letterSpacing: "0.2em",
              color: palette.textDim,
            }}>
              EXECUTION PIPELINE
            </div>
            <div style={{ fontSize: 10, color: palette.textMuted, marginTop: 4, fontFamily: FONT_MONO }}>
              Agents {"\u00B7"} Inputs {"\u00B7"} Outputs
            </div>
          </div>
          {!isMobile && <div />}
          {!isMobile && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 12, fontFamily: FONT_MONO, letterSpacing: "0.2em",
                color: palette.textDim, display: "flex", alignItems: "center",
                justifyContent: "center", gap: 6,
              }}>
                FEEDBACK LOOP
                <span style={{ width: 8, height: 8, borderRadius: 3, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }} />
              </div>
              <div style={{ fontSize: 12, color: palette.textMuted, marginTop: 4, fontFamily: FONT_MONO }}>
                Signals {"\u00B7"} Embed {"\u00B7"} Retrieve
              </div>
            </div>
          )}
        </div>

        {/* ── Layer rows ── */}
        {layers.map((layer, i) => {
          const c = layerColors[layer.id];
          const isActive = activeLayer === layer.id;
          const isLast = i === layers.length - 1;

          return (
            <div key={layer.id}>
              {/* ── Row: [Gov card] [connector] [Layer card] [connector] [Loop card] ── */}
              <div style={{
                display: "grid",
                gridTemplateColumns: GRID_COLS,
                gap: 0,
                alignItems: "center",
                marginTop: i === 0 ? 16 : 0,
              }}>
                {/* Governance card */}
                {!isMobile && <RailCard label={layer.govLabel} icon={layer.govIcon} color={c.accent} align="right" />}

                {/* Connector: gov → center */}
                {!isMobile && <HorizontalConnector color={c.accent} direction="right" />}

                {/* Center layer card */}
                <GlassCard
                  hover
                  onClick={() => { setActiveLayer(isActive ? null : layer.id); setActiveTab("agents"); }}
                  style={{
                    padding: "24px 28px",
                    cursor: "pointer",
                    borderColor: isActive ? `${c.accent}40` : palette.glassBorder,
                    borderRadius: isActive ? "16px 16px 0 0" : 16,
                    boxShadow: isActive ? `0 4px 30px ${c.glow}, inset 0 1px 0 ${c.accent}10` : "none",
                    background: isActive ? `linear-gradient(135deg, ${c.bg}, ${palette.glass})` : palette.glass,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {/* Number badge */}
                    <div style={{
                      width: 46, height: 46, borderRadius: 12,
                      background: `linear-gradient(135deg, ${c.accent}15, ${c.accent}05)`,
                      border: `1px solid ${c.accent}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, color: c.accent,
                      fontFamily: FONT_MONO, flexShrink: 0,
                    }}>
                      {layer.num}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 19, fontWeight: 600, color: palette.text,
                        letterSpacing: "-0.01em", marginBottom: 4,
                      }}>
                        {layer.label}
                      </div>
                      <div style={{ fontSize: 15, color: palette.textDim }}>
                        {layer.sublabel}
                      </div>
                    </div>

                    {/* Agent count pill */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "6px 12px", borderRadius: 20,
                      background: `${c.accent}08`, border: `1px solid ${c.accent}15`,
                    }}>
                      <div style={{ display: "flex", gap: 3 }}>
                        {layer.agents.map((_, j) => (
                          <div key={j} style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: isActive ? c.accent : `${c.accent}50`,
                            transition: "background 0.3s",
                          }} />
                        ))}
                      </div>
                      <span style={{
                        fontSize: 13, color: `${c.accent}dd`, fontFamily: FONT_MONO,
                      }}>
                        {layer.agents.length} agents
                      </span>
                    </div>

                    <div style={{
                      fontSize: 16, color: palette.textMuted,
                      transform: isActive ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}>
                      &#x2304;
                    </div>
                  </div>
                </GlassCard>

                {/* Connector: center → loop */}
                {!isMobile && <HorizontalConnector color={c.accent} direction="right" />}

                {/* Feedback loop card */}
                {!isMobile && <RailCard label={layer.loopSignal} icon={layer.loopIcon} color={c.accent} align="left" />}
              </div>

              {/* ── Expanded detail panel (center column only) ── */}
              {isActive && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLS,
                  gap: 0,
                }}>
                  {!isMobile && <><div /><div /></>}
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${c.border}`,
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    padding: "4px 4px 4px",
                    animation: "expandIn 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    {/* Tab bar */}
                    <div style={{
                      display: "flex", gap: 4, padding: "12px 16px 0",
                      marginBottom: 16,
                    }}>
                      {["agents", "inputs", "outputs"].map(tab => (
                        <button
                          key={tab}
                          onClick={(e) => { e.stopPropagation(); setActiveTab(tab); }}
                          style={{
                            padding: "8px 18px", borderRadius: 10,
                            background: activeTab === tab ? `${c.accent}15` : "transparent",
                            border: activeTab === tab ? `1px solid ${c.accent}25` : "1px solid transparent",
                            color: activeTab === tab ? c.accent : palette.textMuted,
                            fontSize: 14, fontWeight: 500, cursor: "pointer",
                            fontFamily: FONT_SANS, letterSpacing: "0.02em",
                            transition: "all 0.2s",
                            textTransform: "capitalize",
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div style={{ padding: "0 16px 20px" }}>
                      {activeTab === "agents" && (
                        <div style={{ display: "grid", gap: 12 }}>
                          {layer.agents.map((agent, j) => (
                            <div key={j} style={{
                              display: "flex", gap: 14, padding: "14px 16px",
                              background: "rgba(255,255,255,0.02)",
                              borderRadius: 12, border: "1px solid rgba(255,255,255,0.04)",
                            }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 8,
                                background: `linear-gradient(135deg, ${c.accent}20, ${c.accent}08)`,
                                border: `1px solid ${c.accent}20`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 14, flexShrink: 0, color: c.accent,
                              }}>
                                {j === 0 ? "\u25C6" : j === 1 ? "\u25CF" : "\u25C7"}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: 15, fontWeight: 600, color: palette.text, marginBottom: 5,
                                }}>
                                  {agent.name}
                                </div>
                                <div style={{
                                  fontSize: 14, color: palette.textDim, lineHeight: 1.65,
                                }}>
                                  {agent.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "inputs" && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {layer.inputs.map((inp, j) => (
                            <Pill key={j} label={inp} color={c.accent} icon={"\u2193"} />
                          ))}
                        </div>
                      )}

                      {activeTab === "outputs" && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {layer.outputs.map((out, j) => (
                            <Pill key={j} label={out} color={c.accent} icon={"\u2191"} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {!isMobile && <><div /><div /></>}
                </div>
              )}

              {/* ── Between-row vertical connectors ── */}
              {!isLast && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLS,
                  gap: 0,
                }}>
                  {/* Gov vertical connector */}
                  {!isMobile && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <VerticalConnector color={c.accent} />
                    </div>
                  )}
                  {!isMobile && <div />}
                  {/* Center vertical connector */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <VerticalConnector color={c.accent} />
                  </div>
                  {!isMobile && <div />}
                  {/* Loop vertical connector */}
                  {!isMobile && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <VerticalConnector color={layerColors[layer.id].accent} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        </div>

        {/* ── Visual hooks between boxes ── */}
        <div style={{
          display: isMobile ? "none" : "flex", justifyContent: "space-around", alignItems: "center",
          padding: "0 60px", position: "relative",
        }}>
          {/* Left connector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 1.5, height: 14, background: "linear-gradient(180deg, rgba(212,168,83,0.35), rgba(212,168,83,0.10))" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.bg, border: `1.5px solid rgba(212,168,83,0.40)`, boxShadow: "0 0 6px rgba(212,168,83,0.15)" }} />
            <div style={{ width: 1.5, height: 14, background: "linear-gradient(180deg, rgba(212,168,83,0.10), rgba(212,168,83,0.35))" }} />
          </div>

          {/* Center connector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 1.5, height: 14, background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.bg, border: "1.5px solid rgba(255,255,255,0.20)", boxShadow: "0 0 6px rgba(255,255,255,0.08)" }} />
            <div style={{ width: 1.5, height: 14, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.12))" }} />
          </div>

          {/* Right connector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 1.5, height: 14, background: "linear-gradient(180deg, rgba(108,180,217,0.35), rgba(108,180,217,0.10))" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.bg, border: `1.5px solid rgba(108,180,217,0.40)`, boxShadow: "0 0 6px rgba(108,180,217,0.15)" }} />
            <div style={{ width: 1.5, height: 14, background: "linear-gradient(180deg, rgba(108,180,217,0.10), rgba(108,180,217,0.35))" }} />
          </div>
        </div>

        {/* ── Continuous Feedback Loops: unified container ── */}
        <div style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: isMobile ? 12 : 20,
          padding: isMobile ? "16px 12px 16px" : "28px 28px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle inner glow at top edge */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }} />

          {/* Foundation label */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 24,
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06))" }} />
            <span style={{
              fontSize: 12, fontFamily: FONT_MONO, letterSpacing: "0.25em",
              color: palette.textMuted, textTransform: "uppercase",
            }}>
              Continuous Feedback Loops
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.06))" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8, alignItems: "stretch" }}>
          {[
            {
              key: "policy",
              icon: "\u2295", color: palette.knowledgeStore,
              title: "Policy Rails",
              subtitle: "Governance \u00B7 Signals \u00B7 Compliance",
              items: ["Audit log", "Ethics gates", "Override controls", "Compliance checks", "Capture signals", "Embed knowledge", "Index patterns", "Retrieve context"],
              horizontal: true,
            },
            {
              key: "knowledge",
              icon: "\u27F3", color: palette.knowledgeStore,
              title: "Knowledge Store",
              subtitle: "Embedded \u00B7 Indexed \u00B7 Cross-layer retrievable",
              items: knowledgeStoreItems,
              horizontal: true,
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
                    padding: "20px 28px",
                    cursor: hasItems ? "pointer" : "default",
                    borderColor: isOpen ? `${section.color}40` : palette.glassBorder,
                    borderRadius: isOpen ? "16px 16px 0 0" : 16,
                    boxShadow: isOpen ? `0 4px 20px ${section.color}08` : "none",
                    background: isOpen
                      ? `linear-gradient(135deg, ${section.color}06, ${palette.glass})`
                      : palette.glass,
                    flex: 1,
                    display: "flex", alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `linear-gradient(135deg, ${section.color}15, ${section.color}05)`,
                      border: `1px solid ${section.color}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, color: section.color, flexShrink: 0,
                    }}>
                      {section.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 17, fontWeight: 600, color: palette.text,
                        letterSpacing: "-0.01em", marginBottom: 3,
                      }}>
                        {section.title}
                      </div>
                      <div style={{ fontSize: 14, color: palette.textDim }}>
                        {section.subtitle}
                      </div>
                    </div>
                    {hasItems && (
                      <div style={{
                        fontSize: 14, color: palette.textMuted,
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
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${section.color}20`,
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    padding: "16px 20px",
                    animation: "expandIn 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <div style={{
                      display: "flex",
                      flexWrap: section.horizontal ? "wrap" : "nowrap",
                      flexDirection: section.horizontal ? "row" : "column",
                      gap: section.horizontal ? 8 : 0,
                    }}>
                      {section.items.map((item, i) => (
                        section.horizontal ? (
                          <div key={i} style={{
                            fontSize: 13.5, color: palette.textDim,
                            padding: "6px 14px",
                            display: "flex", alignItems: "center", gap: 8,
                            background: `${section.color}06`,
                            border: `1px solid ${section.color}15`,
                            borderRadius: 8,
                          }}>
                            <span style={{
                              width: 5, height: 5, borderRadius: "50%",
                              background: `${section.color}30`, border: `1px solid ${section.color}40`,
                              flexShrink: 0,
                            }} />
                            {item}
                          </div>
                        ) : (
                          <div key={i} style={{
                            fontSize: 12, color: palette.textDim, padding: "5px 0",
                            display: "flex", alignItems: "center", gap: 9,
                          }}>
                            <span style={{
                              width: 5, height: 5, borderRadius: "50%",
                              background: `${section.color}30`, border: `1px solid ${section.color}40`,
                            }} />
                            {item}
                          </div>
                        )
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
          marginTop: 32, textAlign: "center", padding: "16px 0",
        }}>
          <span style={{
            fontSize: 13, color: palette.textMuted,
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: FONT_MONO, letterSpacing: "0.06em",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              animation: "pulse 2s ease infinite",
            }} />
            Click any section to explore details
          </span>
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