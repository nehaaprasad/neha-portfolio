"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";

// One-time intro: the nav drops in, the headline rises word by word out of a
// mask, then the kicker, status pill, social links and first section follow
// in a tight stagger. Skipped for reduced-motion users.
export default function IntroAnimation() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = document.querySelector(".hero-title");
    if (!title) return;

    // Split the headline into words, each inside an overflow-hidden mask.
    const words = title.textContent.trim().split(/\s+/);
    title.setAttribute("aria-label", words.join(" "));
    title.innerHTML = words
      .map(
        (w) =>
          `<span aria-hidden="true" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;margin-bottom:-0.12em"><span class="intro-word" style="display:inline-block;will-change:transform">${w}</span></span>`
      )
      .join(" ");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // clearProps hands transforms back to CSS afterwards, so the existing
      // hover lifts and the header's translateX(-50%) keep working.
      tl.from(".nav-link", {
        y: -14,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.05,
        clearProps: "transform,opacity,visibility",
      })
        .from(
          ".intro-word",
          { yPercent: 110, duration: 0.8, stagger: 0.08 },
          "-=0.4"
        )
        .from(
          [
            ".hero-kicker",
            ".status-container",
            ".social-links .social-link",
            ".about-section",
          ],
          {
            y: 16,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.07,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.45"
        );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
