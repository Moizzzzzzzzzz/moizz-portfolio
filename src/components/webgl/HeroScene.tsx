"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { ShaderPlane } from "./ShaderPlane";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef    = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const [active, setActive] = useState(true);

  // Pause the render loop when the hero scrolls out of view to save GPU time.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Track normalised mouse position (0→1) relative to the container.
  // Stored in a ref to avoid triggering re-renders on every mousemove.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      mouseRef.current.set(
        (e.clientX - left) / width,
        1.0 - (e.clientY - top) / height, // flip Y so bottom = 0, top = 1
      );
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        <Suspense fallback={null}>
          <ShaderPlane active={active} mouse={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
