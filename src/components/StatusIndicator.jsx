"use client";
import { useEffect, useRef, useState } from "react";

export default function StatusIndicator() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="status-container" ref={containerRef}>
      <button
        className="status-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="status-dot"></span>
        <span className="status-text">Status</span>
      </button>

      {isOpen && (
        <div className="status-dropdown">
          <div className="status-title">available_for</div>
          <div className="status-option">
            <span className="status-icon">□</span>
            <a
              href="#contact"
              className="status-link"
              onClick={() => setIsOpen(false)}
            >
              Open to Full‑Time Opportunities
            </a>
          </div>
          <div className="status-option">
            <span className="status-icon">□</span>
            <a
              href="#contact"
              className="status-link"
              onClick={() => setIsOpen(false)}
            >
              Seeking Frontend/Full‑Stack Roles
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
