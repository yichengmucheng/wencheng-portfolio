"use client";

import { useEffect, useState } from "react";

type Ripple = { id: number; x: number; y: number };

export function AmbientInteractions() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const handleMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const handleDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const id = Date.now();
      setRipples((current) => [...current.slice(-3), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 850);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
    };
  }, []);

  return (
    <div className="interaction-layer" aria-hidden="true">
      {ripples.map((ripple) => (
        <i key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </div>
  );
}
