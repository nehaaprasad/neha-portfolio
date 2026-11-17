"use client";
import { useEffect } from "react";
import gsap from "gsap";

// Subtle GSAP hover effects, attached by event delegation so no markup
// changes are needed. Each effect animates an inner element, so it never
// fights the CSS transforms on the host. Skipped for reduced-motion users.
const EFFECTS = [
  { host: ".social-link", inner: "svg", to: { scale: 1.2, rotate: -8 } },
  { host: ".chat-button", inner: ".chat-button-icon", to: { scale: 1.25, rotate: 12 } },
  { host: ".status-button", inner: ".status-dot", to: { scale: 1.5 } },
];

export default function HoverEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animate = (e, entering) => {
      for (const { host, inner, to } of EFFECTS) {
        const hostEl = e.target.closest?.(host);
        if (!hostEl) continue;
        // skip moves between children of the same host
        if (hostEl.contains(e.relatedTarget)) continue;
        const el = hostEl.querySelector(inner);
        if (!el) continue;
        gsap.to(el, {
          ...(entering ? to : { scale: 1, rotate: 0 }),
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onOver = (e) => animate(e, true);
    const onOut = (e) => animate(e, false);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return null;
}
