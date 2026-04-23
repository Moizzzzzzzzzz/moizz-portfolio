"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { ParticleField } from "./ParticleField";

export function HeroScene() {
  return (
    <Canvas className="absolute inset-0" dpr={[1, 2]} gl={{ antialias: false }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
