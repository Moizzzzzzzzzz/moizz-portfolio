"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float wave = sin(uv.x * 10.0 + uTime) * 0.5 + 0.5;
    vec3 color = mix(vec3(0.05, 0.05, 0.15), vec3(0.1, 0.3, 0.9), wave * uv.y);
    gl_FragColor = vec4(color, 0.6);
  }
`;

export function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
