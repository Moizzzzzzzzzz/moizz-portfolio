"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2000;

// Generated once at module load — Math.random() outside render is fine.
function buildParticleData() {
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    col[i * 3] = 0.8 + Math.random() * 0.2;
    col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
    col[i * 3 + 2] = 1;
  }
  return [pos, col] as const;
}

const [PARTICLE_POSITIONS, PARTICLE_COLORS] = buildParticleData();

export function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => [PARTICLE_POSITIONS, PARTICLE_COLORS], []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}
