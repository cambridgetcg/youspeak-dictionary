"use client";

import { useState, useMemo } from "react";
import wordsData from "../dictionary.json";

type Word = {
  word: string;
  tier: string;
  gap: string;
  pos: string;
  pronunciation: string;
  definition: string;
  donors: string[];
  score: string;
  examples: string[];
  confused_with?: string[];
  etymology?: string;
  domain?: string;
  file: string;
};

const PALETTE = {
  ink: "#08070c",
  raised: "#14121b",
  card: "#1a1726",
  border: "#2a2640",
  borderHover: "#3d3859",
  bone: "#ece9e2",
  dim: "#9b96a8",
  faint: "#6b6780",
  mind: "#8b5cf6",
  mindBright: "#a78bfa",
  synapse: "#22d3ee",
  ember: "#f5b04b",
};

const DONOR_COLORS: Record<string, string> = {
  Hebrew: "#f5b04b",
  Greek: "#22d3ee",
  Sanskrit: "#ff6b9d",
  Japanese: "#8b5cf6",
  Latin: "#4ade80",
  Arabic: "#fb923c",
  Egyptian: "#facc15",
  Yoruba: "#c084fc",
  Sumerian: "#60a5fa",
  Akkadian: "#f472b6",
  Mandarin: "#ef4444",
  Avestan: "#2dd4bf",
  "Old English": "#94a3b8",
  German: "#a3e635",
  Norse: "#7dd3fc",
};

function donorColor(donor: string): string {
  for (const [lang, color] of Object.entries(DONOR_COLORS)) {
    if (donor.startsWith(lang + ":")) return color;
  }
  return "#9b96a8";
}

function donorLabel(donor: string): string {
  return donor.split(":", 2)[0];
}

export default function YouspeakPage() {
  const words = wordsData as Word[];
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Word | null>(null);

  const filtered = useMemo(() => {
    return words.filter((w) => {
      if (tierFilter !== "all" && w.tier !== tierFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        w.word.toLowerCase().includes(q) ||
        w.gap?.toLowerCase().includes(q) ||
        w.definition?.toLowerCase().includes(q) ||
        w.donors?.some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [words, query, tierFilter]);

  const donorLangs = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => w.donors?.forEach((d) => set.add(donorLabel(d))));
    return Array.from(set).sort();
  }, [words]);
  return (
    <div style={{ minHeight: "100vh", background: PALETTE.ink, color: PALETTE.bone, fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(11,10,15,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${PALETTE.border}`,
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              display: "inline-block", width: 32, height: 32, borderRadius: 10,
              background: `linear-gradient(135deg, ${PALETTE.mind}, ${PALETTE.synapse})`,
            }} />
            <span style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>YOUSPEAK</span>
          </div>
          <span style={{ fontSize: "0.75rem", color: PALETTE.faint, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            A cathedral of vocabulary
          </span>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        position: "relative", overflow: "hidden", textAlign: "center",
        padding: "80px 24px 60px",
      }}>
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "90vw", height: "60vh",
          background: `radial-gradient(ellipse closest-side, ${PALETTE.mind}22, transparent)`,
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            display: "inline-flex", gap: 8, alignItems: "center",
            background: `${PALETTE.mind}15`, color: PALETTE.mindBright,
            fontSize: "0.75rem", fontWeight: 600, padding: "6px 16px",
            borderRadius: 999, border: `1px solid ${PALETTE.mind}40`, marginBottom: 24,
          }}>
            151 words · 12 donor tongues · built for worship
          </p>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800,
            letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20,
            background: `linear-gradient(180deg, ${PALETTE.bone}, #c4bfd0)`,
            WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Words the world<br />
            <span style={{
              background: `linear-gradient(100deg, ${PALETTE.mindBright}, ${PALETTE.synapse}, ${PALETTE.ember})`,
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              doesn't have yet
            </span>
          </h1>
          <p style={{
            fontSize: "1.15rem", color: PALETTE.dim, maxWidth: "48ch",
            margin: "0 auto 40px", lineHeight: 1.65,
          }}>
            YOUSPEAK forges missing words from a dozen ancient tongues — naming what modern languages cannot easily say.
          </p>
        </div>
      </section>

      {/* Search + filter */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <input
            type="search"
            placeholder="Search words, meanings, donor tongues..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1, minWidth: 250, padding: "12px 18px",
              fontSize: "1rem", background: PALETTE.raised,
              border: `1px solid ${PALETTE.border}`, borderRadius: 12,
              color: PALETTE.bone, outline: "none",
            }}
            onFocus={(e) => e.target.style.borderColor = PALETTE.mind}
            onBlur={(e) => e.target.style.borderColor = PALETTE.border}
          />
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            style={{
              padding: "12px 18px", fontSize: "0.9rem", background: PALETTE.raised,
              border: `1px solid ${PALETTE.border}`, borderRadius: 12,
              color: PALETTE.bone, cursor: "pointer",
            }}
          >
            <option value="all">All tiers</option>
            <option value="core">Core ({words.filter(w => w.tier === "core").length})</option>
            <option value="specialized">Specialized ({words.filter(w => w.tier === "specialized").length})</option>
            <option value="mathema">Mathema ({words.filter(w => w.tier === "mathema").length})</option>
            <option value="theobasis">Theobasis ({words.filter(w => w.tier === "theobasis").length})</option>
            <option value="convergence">Convergence ({words.filter(w => w.tier === "convergence").length})</option>
          </select>
        </div>

        {/* Donor tongue legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {donorLangs.map((lang) => (
            <span key={lang} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: "0.75rem", color: PALETTE.dim,
              padding: "4px 10px", borderRadius: 999,
              background: PALETTE.raised, border: `1px solid ${PALETTE.border}`,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: DONOR_COLORS[lang] || PALETTE.faint }} />
              {lang}
            </span>
          ))}
        </div>

        <p style={{ color: PALETTE.faint, fontSize: "0.85rem", marginBottom: 16 }}>
          {`${filtered.length} word${filtered.length === 1 ? "" : "s"}`}
        </p>

        {/* Word grid */}
        <div style={{
          display: "grid", gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}>
          {filtered.map((w) => (
            <button
              key={w.word}
              onClick={() => setSelected(w)}
              style={{
                textAlign: "left", cursor: "pointer",
                background: PALETTE.card,
                border: `1px solid ${PALETTE.border}`,
                borderRadius: 16, padding: 24,
                transition: "all 0.2s ease",
                color: PALETTE.bone,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = PALETTE.borderHover;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 32px -8px ${PALETTE.mind}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = PALETTE.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
                  {w.word}
                </h3>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  color: { core: PALETTE.mindBright, specialized: PALETTE.ember, mathema: PALETTE.synapse, theobasis: "#ff6b9d", convergence: "#4ade80" }[w.tier] || PALETTE.faint,
                }}>
                  {w.tier}
                </span>
              </div>
              {w.pronunciation && (
                <p style={{ fontSize: "0.8rem", color: PALETTE.faint, margin: "0 0 12px" }}>
                  {w.pronunciation}
                </p>
              )}
              <p style={{ fontSize: "0.9rem", color: PALETTE.dim, lineHeight: 1.6, margin: 0 }}>
                {w.gap || w.definition?.slice(0, 120)}
              </p>
              {w.donors && w.donors.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {w.donors.slice(0, 4).map((d, i) => (
                    <span key={i} style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      fontSize: "0.7rem", color: PALETTE.dim,
                      padding: "2px 8px", borderRadius: 999,
                      background: PALETTE.raised,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: donorColor(d) }} />
                      {donorLabel(d)}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Word detail modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 600, width: "100%", maxHeight: "80vh", overflowY: "auto",
              background: PALETTE.card,
              border: `1px solid ${PALETTE.borderHover}`,
              borderRadius: 20, padding: 40,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 8px" }}>{selected.word}</h2>
                {selected.pronunciation && (
                  <p style={{ fontSize: "0.9rem", color: PALETTE.faint, margin: 0 }}>{selected.pronunciation}</p>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none", border: "none", color: PALETTE.faint,
                  fontSize: "1.5rem", cursor: "pointer", padding: 0,
                }}
              >
                ✕
              </button>
            </div>

            {selected.gap && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 8px" }}>The gap</p>
                <p style={{ color: PALETTE.bone, lineHeight: 1.65, margin: 0 }}>{selected.gap}</p>
              </div>
            )}

            {selected.definition && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 8px" }}>Definition</p>
                <p style={{ color: PALETTE.dim, lineHeight: 1.65, margin: 0 }}>{selected.definition}</p>
              </div>
            )}

            {selected.donors && selected.donors.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 12px" }}>Etymology</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selected.donors.map((d, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", borderRadius: 10,
                      background: PALETTE.raised,
                    }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: donorColor(d), flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: PALETTE.bone }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selected.etymology && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 12px" }}>Etymology</p>
                <p style={{ color: PALETTE.dim, lineHeight: 1.65, margin: 0, fontSize: "0.9rem" }}>{selected.etymology}</p>
              </div>
            )}

            {selected.confused_with && selected.confused_with.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 12px" }}>Not confused with</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selected.confused_with.map((c, i) => (
                    <p key={i} style={{
                      fontSize: "0.85rem", color: PALETTE.dim, lineHeight: 1.6,
                      margin: 0, paddingLeft: 16,
                      borderLeft: `2px solid ${PALETTE.synapse}40`,
                    }}>
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {selected.examples && selected.examples.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 12px" }}>Examples</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selected.examples.map((ex, i) => (
                    <p key={i} style={{
                      fontSize: "0.9rem", color: PALETTE.dim, lineHeight: 1.65,
                      margin: 0, paddingLeft: 16,
                      borderLeft: `2px solid ${PALETTE.mind}40`,
                    }}>
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {selected.score && (
              <div>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PALETTE.faint, margin: "0 0 8px" }}>Constitution score</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: PALETTE.mindBright, margin: 0 }}>
                  {selected.score}<span style={{ fontSize: "0.9rem", color: PALETTE.faint }}> / 10</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${PALETTE.border}`,
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <p style={{ color: PALETTE.faint, fontSize: "0.85rem" }}>
          YOUSPEAK — A cathedral of vocabulary. A forge of missing words. A standing worship.
        </p>
        <p style={{ color: PALETTE.faint, fontSize: "0.75rem", marginTop: 8 }}>
          Rebuild the vocabulary. Rebuild the web.
        </p>
      </footer>
    </div>
  );
}