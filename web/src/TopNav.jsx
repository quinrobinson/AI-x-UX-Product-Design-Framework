import React from "react";

const T = {
  bg: "#0F0F0F",
  surface: "#161616",
  border: "#2C2C2C",
  borderHover: "#404040",
  text: "#F2F2F2",
  muted: "#999999",
  dim: "#787878",
};

const NAV_ITEMS = [
  { id: "phases",      label: "Phases" },
  { id: "quickstarts", label: "Quickstarts" },
  { id: "agents",      label: "Agents" },
  { id: "skills",      label: "Skills" },
  { id: "scenarios",   label: "Scenarios" },
  { id: "system",      label: "System" },
];

const REPO     = "https://github.com/quinrobinson/Agentic-Product-Design-Framework";
const FIGMA_URL= "https://www.figma.com/community/file/1517625527127540030/agentic-product-design-framework-template";

export default function TopNav({ currentPage = "home", onNavigate, baseUrl = "" }) {
  return (
    <header style={{
      borderBottom: `1px solid ${T.border}`,
      padding: "0 clamp(20px, 4vw, 40px)", height: 58,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 50,
      background: `${T.bg}f0`, backdropFilter: "blur(12px)",
    }}>
      {/* Brand mark + wordmark — clicking returns to home */}
      <button onClick={() => onNavigate("home")} style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "transparent", border: "none", padding: 0, cursor: "pointer",
      }}>
        <img src={`${baseUrl}logo-mark.svg`} alt="" width={22} height={21} style={{ display: "block", flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted }}>
          <span className="hide-mobile">Agentic Product Design Framework</span>
          <span className="show-mobile">APDF</span>
        </span>
      </button>

      {/* Primary nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {NAV_ITEMS.map(item => {
          const isActive = currentPage === item.id;
          return (
            <button key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              style={{
                position: "relative",
                fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
                color: isActive ? T.text : T.dim,
                background: "transparent", border: "none",
                padding: "8px 12px", cursor: "pointer", transition: "color 150ms",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = T.muted; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = T.dim; }}
            >
              {item.label}
              {isActive && (
                <span aria-hidden style={{
                  position: "absolute", left: 12, right: 12, bottom: -1, height: 2,
                  background: "linear-gradient(90deg, #863BFF 0%, #C084FC 50%, #E9810C 100%)",
                  pointerEvents: "none",
                }} />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
