// src/GlitchMessagePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * GlitchMessagePage
 * - Submits to Web3Forms (no backend needed).
 * - On success: plays a 1.5s glitch animation, then shows a success card.
 * - Add your Web3Forms access key below.
 */
const WEB3FORMS_KEY = "859421c8-d66f-4069-8592-2a2dbd4ecc34"; // ← paste your key

export default function GlitchMessagePage() {
  const ANIM_MS = 1500;
  const [glitching, setGlitching] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY.includes("YOUR_WEB3FORMS_ACCESS_KEY")) {
      alert("Please set WEB3FORMS_KEY in GlitchMessagePage.jsx");
      return;
    }

    setSending(true);

    // Build payload
    const fd = new FormData(formRef.current);
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", "New message from Glitch page");
    fd.append("from_name", "Glitch Message Page");

    // Honeypot check — if the hidden field is filled, treat as bot and silently stop
    if (fd.get("botcheck")) {
      setSending(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      }).then((r) => r.json());

      if (!res?.success) throw new Error(res?.message || "Submission failed");

      // Success → play glitch, then confirm
      setGlitching(true);
      setTimeout(() => {
        setGlitching(false);
        setSent(true);
        formRef.current?.reset();
      }, ANIM_MS);
    } catch (err) {
      console.error(err);
      alert("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (glitching) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [glitching]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white">
      <style>{`
        .glitch-overlay {
          position: fixed; inset: 0; z-index: 9999; pointer-events: none;
          display: grid; place-items: center;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.02), rgba(0,0,0,0.9));
          animation: bg-flicker 150ms infinite;
        }
        .glitch-text { position: relative; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; text-align: center; filter: brightness(1.2) contrast(1.05); animation: jitter 60ms infinite; }
        .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; inset: 0; mix-blend-mode: screen; }
        .glitch-text::before { color: #ff006e; transform: translate(-2px,0); animation: rgbx 80ms infinite; }
        .glitch-text::after  { color: #00e5ff; transform: translate(2px,0);  animation: rgby 80ms infinite; }
        .glitch-text > span { color: white; text-shadow: 0 0 4px rgba(255,255,255,0.6), 0 0 12px rgba(255,255,255,0.2); }
        .scanlines { position: absolute; inset: 0; background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 2px, transparent 4px); pointer-events: none; mix-blend-mode: soft-light; animation: scan 2s linear infinite; }
        .noise { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .noise::before, .noise::after { content: ""; position: absolute; left: -10%; width: 120%; height: 8%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); animation: sweep 700ms infinite; }
        .noise::after { top: auto; bottom: 15%; animation-delay: 120ms; }
        @keyframes bg-flicker { 0%,100% { filter:none } 50% { filter: brightness(1.1) contrast(1.1) } }
        @keyframes jitter { 0% { transform: translate(0,0) skew(0) } 50% { transform: translate(.5px,-.5px) skew(.1deg) } 100% { transform: translate(-.5px,.5px) skew(-.1deg) } }
        @keyframes rgbx { 0% { transform: translate(-2px,0) } 50% { transform: translate(2px,0) } 100% { transform: translate(-2px,0) } }
        @keyframes rgby { 0% { transform: translate(2px,0) } 50% { transform: translate(-2px,0) } 100% { transform: translate(2px,0) } }
        @keyframes scan { 0% { transform: translateY(-100%) } 100% { transform: translateY(100%) } }
        @keyframes sweep { 0% { top: 15%; transform: translateX(-10%) skewX(-10deg) } 50% { top: 40%; transform: translateX(10%) skewX(10deg) } 100% { top: 65%; transform: translateX(-10%) skewX(-10deg) } }
        .shake { animation: shake 160ms ease-in-out 0s 6; }
        @keyframes shake { 0% { transform: translate(0,0) } 25% { transform: translate(2px,-1px) } 50% { transform: translate(-2px,1px) } 75% { transform: translate(1px,2px) } 100% { transform: translate(0,0) } }
      `}</style>

      <div className={`max-w-2xl mx-auto px-4 py-10 ${glitching ? "shake" : ""}`}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Send a message and see a cool animation</h1>
          <Link to="/" className="text-sm px-3 py-1 rounded-md border border-white/20 hover:border-white/40">← Back</Link>
        </div>

        <p className="text-white/70 mb-6">Send a message! I would love to connect with you, it could be something professional or casual. I love talking with new people!</p>

        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            required
            placeholder="Your name"
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />
          {/* Honeypot (hidden) */}
          <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <button
            type="submit"
            disabled={sending}
            className="px-4 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>

        {sent && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
            <div className="text-emerald-300 font-semibold">I got the message!</div>
            <div className="text-sm text-white/70">I will get back to you asap.</div>
          </div>
        )}
      </div>

      {glitching && (
        <div className="glitch-overlay">
          <div className="scanlines" />
          <div className="noise" />
          <div
            className="glitch-text"
            data-text="SENDING..."
            style={{ fontSize: "clamp(28px, 6vw, 72px)", lineHeight: 1.15, padding: "0 12px" }}
          >
            <span>SENDING...</span>
          </div>
        </div>
      )}
    </div>
  );
}
