/* ==========================================================================
   FATAH AI — floating launcher + chat panel
   --------------------------------------------------------------------------
   • Launcher: a small 3D object drawn with Zdog (canvas, ~8 KB gzipped,
     no WebGL, no shaders). It spins slowly and turns toward the pointer.
   • Panel: fully offline Q&A — matching happens in src/utils/fatahAI.js,
     answers come from FATAH_AI.intents in data.js.
   • Sits directly above the WhatsApp pill (see .fatah-launcher in CSS).
   ========================================================================== */
import { useEffect, useMemo, useRef, useState } from "react";
import { FATAH_AI, STICKY } from "../data.js";
import { matchIntents, FOLLOW_UPS, SUGGESTIONS_AFTER_MISS } from "../utils/fatahAI.js";
import "../styles/fatah-ai.css";

const GOLD = "#ddbe76";
const GOLD_DEEP = "#b88c32";
const INK = "#0a0a0a";

/* -------------------------------------------------------------- brand mark */
/* Only the calligraphic emblem from the Al-Fatah logo — the full lockup has
   the wordmark and "ICON" bar, which we don't want in the launcher. */
function FatahMark({ size = 44 }) {
  return (
    <img
      src="/images/alfatah-emblem.webp"
      alt=""
      className="fatah-mark"
      width={size}
      height={size}
      aria-hidden="true"
      draggable="false"
    />
  );
}

/* --------------------------------------------------------------- helpers */
function Formatted({ text }) {
  /* **bold** + newlines only — no HTML injection */
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span className="fatah-line" key={i}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
            chunk.startsWith("**") && chunk.endsWith("**") ? (
              <strong key={j}>{chunk.slice(2, -2)}</strong>
            ) : (
              <span key={j}>{chunk}</span>
            )
          )}
        </span>
      ))}
    </>
  );
}

/* ----------------------------------------------------------------- panel */
export function FatahAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    { role: "bot", text: FATAH_AI.greeting },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState(FATAH_AI.chips);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const intents = FATAH_AI.intents;
  const totalIntents = useMemo(() => intents.length, [intents]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw) => {
    const text = String(raw ?? draft).trim();
    if (!text) return;
    setDraft("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);

    const hits = matchIntents(text, intents);
    const delay = 420 + Math.min(text.length * 8, 420);

    window.setTimeout(() => {
      setTyping(false);
      if (!hits.length) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: FATAH_AI.missReply, miss: true },
        ]);
        setChips(SUGGESTIONS_AFTER_MISS);
        return;
      }
      setMessages((prev) => [
        ...prev,
        ...hits.map((intent) => ({ role: "bot", text: intent.reply })),
      ]);
      setChips(FOLLOW_UPS[hits[0].id] ?? FATAH_AI.chips.slice(0, 4));
    }, delay);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <div className="fatah-ai">
      {/* ---------------- panel ---------------- */}
      <div
        ref={panelRef}
        className={`fatah-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label={`${FATAH_AI.name} assistant`}
        aria-hidden={open ? "false" : "true"}
      >
        <header className="fatah-head">
          <span className="fatah-head-mark">
            <FatahMark size={40} />
          </span>
          <span className="fatah-head-text">
            <strong>{FATAH_AI.name}</strong>
            <span className="fatah-status">
              <i aria-hidden="true" /> {FATAH_AI.status}
            </span>
          </span>
          <button
            type="button"
            className="fatah-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div
          className="fatah-log"
          ref={listRef}
          aria-live="polite"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          tabIndex={0}
        >
          {messages.map((m, i) => (
            <div className={`fatah-msg fatah-msg--${m.role}`} key={i}>
              {m.role === "bot" && <span className="fatah-avatar" aria-hidden="true">AF</span>}
              <p className="fatah-bubble">
                <Formatted text={m.text} />
              </p>
            </div>
          ))}
          {typing && (
            <div className="fatah-msg fatah-msg--bot">
              <span className="fatah-avatar" aria-hidden="true">AF</span>
              <p className="fatah-bubble fatah-typing" aria-label="FATAH AI is typing">
                <i /><i /><i />
              </p>
            </div>
          )}
        </div>

        <div className="fatah-chips">
          {chips.map((chip) => (
            <button type="button" key={chip} onClick={() => send(chip)} className="fatah-chip">
              {chip}
            </button>
          ))}
        </div>

        <form className="fatah-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={FATAH_AI.placeholder}
            aria-label="Your question"
            autoComplete="off"
          />
          <button type="submit" aria-label="Send" disabled={!draft.trim()}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>

        <div className="fatah-foot">
          <a href={STICKY.whatsappHref} target="_blank" rel="noreferrer" className="fatah-wa">
            {FATAH_AI.whatsappLabel}
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
          <span className="fatah-disclaimer">{FATAH_AI.disclaimer}</span>
        </div>
      </div>

      {/* ---------------- launcher ---------------- */}
      <button
        type="button"
        className={`fatah-launcher${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close FATAH AI" : "Open FATAH AI assistant"}
        title={FATAH_AI.name}
      >
        <span className="fatah-launcher-glow" aria-hidden="true" />
        <span className="fatah-launcher-mark" aria-hidden="true">
          <FatahMark size={44} />
        </span>
        <span className="fatah-launcher-label">{FATAH_AI.name}</span>
      </button>
    </div>
  );
}
