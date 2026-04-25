"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Noise-based gradient using brand accent #7C3AED (0.486, 0.227, 0.929).
// Slow drift keeps it subtle and non-distracting behind text.
const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),               hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v   += amp * noise(p);
      p    = p * 2.1 + vec2(1.7, 9.2);
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    float t  = uTime * 0.05;
    // uMouse is in 0→1 range; (uMouse - 0.5) * 0.3 gives a restrained ±0.15 offset.
    vec2  mouseOffset = (uMouse - 0.5) * 0.3;
    float n  = fbm(vUv * 2.5 + vec2(t, t * 0.7) + mouseOffset);
    float n2 = fbm(vUv * 4.0 - vec2(t * 0.5, t) + vec2(5.2, 1.3));
    float pattern = n * 0.65 + n2 * 0.35;

    // Brand accent: #7C3AED
    vec3 accent = vec3(0.486, 0.227, 0.929);
    vec3 dark   = vec3(0.039, 0.039, 0.043); // #0A0A0B

    // Vignette concentrated upper-left where hero text sits
    vec2  c        = vUv - vec2(0.2, 0.55);
    float vignette = 1.0 - clamp(length(c) * 1.6, 0.0, 1.0);
    vignette = vignette * vignette;

    vec3  color = mix(dark, accent, pattern * vignette * 0.38);
    float alpha = pattern * vignette * 0.55;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface ShaderPlaneProps {
  active?: boolean;
  mouse?: MutableRefObject<THREE.Vector2>;
}

export function ShaderPlane({ active = true, mouse }: ShaderPlaneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (!active || !matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    if (mouse) {
      matRef.current.uniforms.uMouse.value.copy(mouse.current);
    }
  });

  return (
    <mesh>
      {/* Large enough to fill viewport regardless of aspect ratio */}
      <planeGeometry args={[22, 14, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:  { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
