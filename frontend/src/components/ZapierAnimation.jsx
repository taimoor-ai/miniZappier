'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { SiGmail, SiGooglesheets, SiSlack, SiGoogledrive, SiNotion } from "react-icons/si";

const styles = `
  @keyframes hubPulse {
    0%   { box-shadow: 0 0 0 0 rgba(249,115,22,.5), 0 8px 32px rgba(249,115,22,.2); }
    60%  { box-shadow: 0 0 0 22px rgba(249,115,22,0), 0 8px 32px rgba(249,115,22,.2); }
    100% { box-shadow: 0 0 0 0 rgba(249,115,22,0), 0 8px 32px rgba(249,115,22,.2); }
  }
  @keyframes dashFlow { to { stroke-dashoffset: -22; } }
  @keyframes slideInRight { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideInDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes barGrow { from { width:0; } to { width:100%; } }
  @keyframes scaleIn { from { transform:scale(.88); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes dotBounce { 0%,80%,100%{transform:scale(0);} 40%{transform:scale(1);} }

  .zap-wrap {
    background: #ffffff;
    border-radius: 24px;
    padding: 36px 24px 32px;
    position: relative;
    overflow: hidden;
    min-height: 500px;
    font-family: sans-serif;
  }
  .zap-grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(99,102,241,.06) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
  .zap-scene {
    position: relative;
    width: 100%;
    max-width: 700px;
    height: 420px;
    margin: 0 auto;
  }
  .zap-svg {
    position: absolute; inset: 0;
    pointer-events: none;
    overflow: visible;
  }
  .zap-node {
    position: absolute;
    background: #fff;
    border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 18px rgba(0,0,0,.09), 0 1px 4px rgba(0,0,0,.06);
    cursor: default;
    z-index: 10;
    transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
    border: 1px solid rgba(255,255,255,.9);
  }
  .zap-node:hover {
    transform: scale(1.12) translateY(-2px);
    box-shadow: 0 10px 36px rgba(0,0,0,.15);
  }
  .zap-hub {
    position: absolute;
    background: #fff;
    border-radius: 28px;
    width: 96px; height: 96px;
    display: flex; align-items: center; justify-content: center;
    z-index: 12;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    border: 1.5px solid rgba(249,115,22,.15);
  }
  .zap-hub.pulse { animation: hubPulse 1.8s ease-out infinite; }
  .zap-badge {
    position: absolute;
    background: #fff;
    border-radius: 100px;
    padding: 7px 16px 7px 12px;
    display: flex; align-items: center; gap: 8px;
    font-size: 12.5px; font-weight: 500; color: #1a1a1a;
    box-shadow: 0 3px 14px rgba(0,0,0,.09), 0 1px 3px rgba(0,0,0,.05);
    z-index: 11;
    white-space: nowrap;
    border: 1px solid rgba(0,0,0,.04);
    opacity: 0;
    pointer-events: none;
  }
  .zap-badge.show { animation: slideInDown .4s cubic-bezier(.34,1.56,.64,1) forwards; }
  .zap-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #22C55E; flex-shrink: 0; }
  .zap-card {
    position: absolute;
    background: #fff;
    border-radius: 18px;
    padding: 16px 20px;
    box-shadow: 0 6px 24px rgba(0,0,0,.10), 0 1px 4px rgba(0,0,0,.05);
    opacity: 0;
    z-index: 14;
    min-width: 220px;
    border: 1px solid rgba(0,0,0,.04);
    pointer-events: none;
  }
  .zap-card.show { animation: scaleIn .4s cubic-bezier(.34,1.56,.64,1) forwards; }
  .zap-card-title { font-size: 14px; font-weight: 600; color: #111; display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
  .zap-card-check { width: 22px; height: 22px; border-radius: 50%; background: #22C55E; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(34,197,94,.35); }
  .zap-bar-bg { background: #E5E7EB; border-radius: 8px; height: 6px; overflow: hidden; }
  .zap-bar { height: 100%; border-radius: 8px; background: linear-gradient(90deg, #22C55E, #16A34A); width: 0; }
  .zap-bar.fill { animation: barGrow 1.8s cubic-bezier(.4,0,.2,1) forwards; }
  .zap-sub { font-size: 11.5px; color: #6B7280; margin-top: 8px; display: flex; align-items: center; gap: 5px; }
  .zap-counter {
    position: absolute; bottom: -4px; right: -4px;
    background: #F97316; color: #fff;
    font-size: 10px; font-weight: 700;
    width: 18px; height: 18px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid #fff; z-index: 15;
  }
  .zap-dots { display: flex; gap: 4px; align-items: center; }
  .zap-dots span {
    width: 4px; height: 4px; background: #6B7280; border-radius: 50%;
    animation: dotBounce 1.2s ease-in-out infinite;
  }
  .zap-dots span:nth-child(2) { animation-delay: .15s; }
  .zap-dots span:nth-child(3) { animation-delay: .3s; }
  .zap-node-label {
    position: absolute;
    font-size: 11px; font-weight: 500; color: #6B7280;
    white-space: nowrap; pointer-events: none;
  }
  .zap-replay {
    position: absolute; bottom: 16px; right: 16px;
    background: #fff; border: 1px solid rgba(0,0,0,.08);
    border-radius: 100px; padding: 7px 14px;
    font-size: 12px; font-weight: 500; color: #374151;
    cursor: pointer; z-index: 20;
    display: flex; align-items: center; gap: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,.07);
    transition: background .15s, transform .1s;
  }
  .zap-replay:hover { background: #f9fafb; transform: scale(1.03); }
  .zap-replay:active { transform: scale(.97); }
  .zap-steps { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 20; }
  .zap-step-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(0,0,0,.15);
    transition: background .3s, transform .3s;
  }
  .zap-step-dot.active { background: #F97316; transform: scale(1.4); }
  .zap-step-dot.done { background: #22C55E; }

  @media (max-width: 768px) {
    .zap-wrap {
      padding: 24px 16px 24px;
      min-height: 450px;
    }
    .zap-scene {
      height: 340px;
    }
    .zap-badge {
      font-size: 11px;
      padding: 5px 12px 5px 10px;
    }
  }

  @media (max-width: 480px) {
    .zap-wrap {
      padding: 20px 12px 20px;
      min-height: 400px;
    }
    .zap-scene {
      height: 280px;
    }
    .zap-badge {
      font-size: 10px;
      padding: 4px 10px 4px 8px;
      gap: 6px;
    }
    .zap-badge-dot {
      width: 6px;
      height: 6px;
    }
  }
`;

const GmailIcon = () => <SiGmail size={36} color="#EA4335" />;
const SheetsIcon = () => <SiGooglesheets size={36} color="#0F9D58" />;
const SlackIconComponent = () => <SiSlack size={36} color="#E01E5A" />;
const DriveIcon = () => <SiGoogledrive size={32} color="#4285F4" />;
const NotionIcon = () => <SiNotion size={32} color="#000000" />;

const ZapIcon = () => (
  <svg width="52" height="52" viewBox="0 0 56 56">
    <circle cx="28" cy="14" r="6.5" fill="#F97316" />
    <circle cx="14" cy="28" r="6.5" fill="#F97316" />
    <circle cx="28" cy="42" r="6.5" fill="#F97316" />
    <circle cx="42" cy="28" r="6.5" fill="#F97316" />
    <rect x="21" y="21" width="14" height="14" rx="4" fill="#F97316" />
  </svg>
);

const PATHS = [
  { id: "gmail",  color: "red", fromX: 90,  fromY: 72,  toX: 300, toY: 210, cx1: 190, cy1: 72,  cx2: 300, cy2: 150, delay: 0,    out: false },
  { id: "sheets", color: "#22C55E", fromX: 90,  fromY: 202, toX: 300, toY: 210, cx1: 190, cy1: 202, cx2: 300, cy2: 210, delay: 500,  out: false },
  { id: "slack",  color: "#3B82F6", fromX: 90,  fromY: 330, toX: 300, toY: 220, cx1: 190, cy1: 330, cx2: 300, cy2: 270, delay: 1000, out: false },
  { id: "drive",  color: "#FBBC05", fromX: 396, fromY: 205, toX: 590, toY: 100, cx1: 470, cy1: 200, cx2: 520, cy2: 120, delay: 1600, out: true  },
  { id: "slkout", color: "#22C55E", fromX: 396, fromY: 210, toX: 590, toY: 210, cx1: 470, cy1: 210, cx2: 520, cy2: 210, delay: 2100, out: true  },
  { id: "notion", color: "#8B5CF6", fromX: 396, fromY: 218, toX: 590, toY: 330, cx1: 470, cy1: 220, cx2: 520, cy2: 310, delay: 2600, out: true  },
];

const PHASES = [
  { label: "Trigger received" },
  { label: "Processing inputs" },
  { label: "Routing outputs" },
  { label: "Zap complete" },
];

export default function ZapierAnimation() {
  const [phase, setPhase] = useState(-1);
  const [activePaths, setActivePaths] = useState({});
  const [badges, setBadges] = useState({ drive: false, slack: false, notion: false });
  const [showCard, setShowCard] = useState(false);
  const [barFill, setBarFill] = useState(false);
  const [hubPulse, setHubPulse] = useState(false);
  const [zapCount, setZapCount] = useState(0);

  const dotsRef = useRef([]);
  const tickersRef = useRef([]);
  const phaseTimers = useRef([]);
  const animFrameRef = useRef(null);
  const running = useRef(false);

  const getPathD = (p) =>
    `M ${p.fromX} ${p.fromY} C ${p.cx1} ${p.cy1}, ${p.cx2} ${p.cy2}, ${p.toX} ${p.toY}`;

  const spawnDot = useCallback((p) => {
    const d = getPathD(p);
    const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tmp.setAttribute("d", d);
    document.body.appendChild(tmp);
    const len = tmp.getTotalLength();
    document.body.removeChild(tmp);
    dotsRef.current.push({ color: p.color, pathD: d, len, start: performance.now(), dur: 900 });
  }, []);

  const runSequence = useCallback(() => {
    if (!running.current) return;
    setPhase(0);
    const timers = [];

    PATHS.forEach((p) => {
      const t = setTimeout(() => {
        if (!running.current) return;
        setActivePaths((prev) => ({ ...prev, [p.id]: true }));
        const iv = setInterval(() => {
          if (!running.current) { clearInterval(iv); return; }
          spawnDot(p);
        }, 340);
        tickersRef.current.push(iv);
      }, p.delay);
      timers.push(t);
    });

    timers.push(setTimeout(() => { if (running.current) { setHubPulse(true); setPhase(1); } }, 1200));
    timers.push(setTimeout(() => { if (running.current) setPhase(2); }, 2200));
    timers.push(setTimeout(() => { if (running.current) setBadges((b) => ({ ...b, drive: true })); }, 1900));
    timers.push(setTimeout(() => { if (running.current) setBadges((b) => ({ ...b, slack: true })); }, 2400));
    timers.push(setTimeout(() => { if (running.current) setBadges((b) => ({ ...b, notion: true })); }, 2900));
    timers.push(setTimeout(() => {
      if (!running.current) return;
      setPhase(3);
      setShowCard(true);
      setZapCount((c) => c + 1);
      setTimeout(() => setBarFill(true), 80);
    }, 3400));

    phaseTimers.current = timers;
  }, [spawnDot]);

  const resetAll = useCallback(() => {
    phaseTimers.current.forEach(clearTimeout);
    tickersRef.current.forEach(clearInterval);
    tickersRef.current = [];
    dotsRef.current = [];
    setActivePaths({});
    setHubPulse(false);
    setBadges({ drive: false, slack: false, notion: false });
    setShowCard(false);
    setBarFill(false);
    setPhase(-1);
  }, []);

  const replay = useCallback(() => {
    resetAll();
    setTimeout(() => { if (running.current) runSequence(); }, 300);
  }, [resetAll, runSequence]);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    running.current = true;
    runSequence();
    const loop = setInterval(() => {
      if (!running.current) return;
      resetAll();
      setTimeout(() => { if (running.current) runSequence(); }, 400);
    }, 7500);

    return () => {
      running.current = false;
      clearInterval(loop);
      resetAll();
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("zap-dot-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 420;

    const frame = () => {
      ctx.clearRect(0, 0, 700, 420);
      const now = performance.now();
      dotsRef.current = dotsRef.current.filter((dot) => {
        const t = (now - dot.start) / dot.dur;
        if (t > 1) return false;
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tmp.setAttribute("d", dot.pathD);
        document.body.appendChild(tmp);
        const pt = tmp.getPointAtLength(eased * dot.len);
        document.body.removeChild(tmp);
        const alpha = t < 0.08 ? t / 0.08 : t > 0.88 ? (1 - t) / 0.12 : 1;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
        ctx.strokeStyle = dot.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        return true;
      });
      animFrameRef.current = requestAnimationFrame(frame);
    };
    animFrameRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const pathStyle = (p) => ({
    stroke: p.color,
    fill: "none",
    strokeWidth: 2,
    strokeDasharray: "6 5",
    strokeLinecap: "round",
    opacity: activePaths[p.id] ? 1 : 0.15,
    transition: "opacity .5s",
    animation: activePaths[p.id] ? "dashFlow 1s linear infinite" : "none",
    markerEnd: p.out ? `url(#arr-${p.id})` : undefined,
  });

  return (
    <div className="zap-wrap">
      <div className="zap-grid" />

      <div className="zap-steps">
        {PHASES.map((ph, i) => (
          <div
            key={i}
            className={`zap-step-dot ${phase === i ? "active" : phase > i ? "done" : ""}`}
            title={ph.label}
          />
        ))}
      </div>

      <div className="zap-scene">
        <canvas
          id="zap-dot-canvas"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 13 }}
        />

        <svg className="zap-svg" width="700" height="420">
          <defs>
            {PATHS.filter((p) => p.out).map((p) => (
              <marker
                key={p.id}
                id={`arr-${p.id}`}
                viewBox="0 0 10 10"
                refX="8" refY="5"
                markerWidth="5" markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M2 2L8 5L2 8" fill="none" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" />
              </marker>
            ))}
          </defs>
          {PATHS.map((p) => (
            <path key={p.id} d={getPathD(p)} style={pathStyle(p)} />
          ))}
        </svg>

        {/* Input nodes */}
        <div className="zap-node" style={{ width: 68, height: 68, left: 22, top: 38 }}><GmailIcon /></div>
        <div className="zap-node-label" style={{ left: 0, top: 108, width: 112, textAlign: "center" }}>Gmail</div>

        <div className="zap-node" style={{ width: 68, height: 68, left: 22, top: 168 }}><SheetsIcon /></div>
        <div className="zap-node-label" style={{ left: 0, top: 238, width: 112, textAlign: "center" }}>Sheets</div>

        <div className="zap-node" style={{ width: 68, height: 68, left: 22, top: 298 }}><SlackIconComponent /></div>
        <div className="zap-node-label" style={{ left: 0, top: 368, width: 112, textAlign: "center" }}>Slack</div>

        {/* Hub */}
        <div className={`zap-hub ${hubPulse ? "pulse" : ""}`}>
          <ZapIcon />
          {zapCount > 0 && <div className="zap-counter">{zapCount}</div>}
        </div>

        {/* Output nodes */}
        <div className="zap-node" style={{ width: 64, height: 64, left: 558, top: 68 }}><DriveIcon /></div>
        <div className="zap-node-label" style={{ left: 546, top: 134, width: 88, textAlign: "center" }}>Drive</div>

        <div className="zap-node" style={{ width: 64, height: 64, left: 558, top: 178 }}><SlackIconComponent /></div>
        <div className="zap-node-label" style={{ left: 546, top: 244, width: 88, textAlign: "center" }}>Slack</div>

        <div className="zap-node" style={{ width: 64, height: 64, left: 558, top: 298 }}><NotionIcon /></div>
        <div className="zap-node-label" style={{ left: 546, top: 364, width: 88, textAlign: "center" }}>Notion</div>

        {/* Badges - Now positioned below icons */}
        <div className={`zap-badge ${badges.drive ? "show" : ""}`} style={{ left: 530, top: 140 }}>
          <div className="zap-badge-dot" />File saved
        </div>
        <div className={`zap-badge ${badges.slack ? "show" : ""}`} style={{ left: 530, top: 250 }}>
          <div className="zap-badge-dot" />Message sent
        </div>
        <div className={`zap-badge ${badges.notion ? "show" : ""}`} style={{ left: 530, top: 370 }}>
          <div className="zap-badge-dot" />Task created
        </div>

        {/* Status card */}
        <div className={`zap-card ${showCard ? "show" : ""}`} style={{ left: 120, top: 330 }}>
          <div className="zap-card-title">
            <div className="zap-card-check">
              <svg width="12" height="9" viewBox="0 0 12 9">
                <path d="M1 4.5L4.5 8 11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            Zap is running
          </div>
          <div className="zap-bar-bg">
            <div className={`zap-bar ${barFill ? "fill" : ""}`} />
          </div>
          <div className="zap-sub">
            {phase < 3 ? (
              <><div className="zap-dots"><span /><span /><span /></div> Processing…</>
            ) : (
              "✓ All tasks completed successfully"
            )}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#9CA3AF", fontWeight: 500, letterSpacing: 0.3 }}>
        {phase >= 0 ? PHASES[Math.min(phase, 3)].label : "Waiting for trigger…"}
      </div>

      <button className="zap-replay" onClick={replay}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M1 6a5 5 0 1 0 1.5-3.5L1 1v3h3L2.5 2.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Replay
      </button>
    </div>
  );
}