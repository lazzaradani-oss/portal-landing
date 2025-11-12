"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, ThreeElements } from "@react-three/fiber";

export type LeafNodeProps = {
  position?: ThreeElements["group"]["position"];
  color?: string;
  scale?: number;
  pulseSpeed?: number; // Hz-ish, smaller is slower
  sway?: boolean;
  lookAtCamera?: boolean;
};

function createLeafShape() {
  const s = new THREE.Shape();
  // Simple symmetric leaf using quadratic curves
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.6, 0.8, 0, 1.4);
  s.quadraticCurveTo(-0.6, 0.8, 0, 0);
  return s;
}

export function LeafNode({
  position = [0, 1.2, 0],
  color = "#a0ffc8",
  scale = 1,
  pulseSpeed = 0.9,
  sway = true,
  lookAtCamera = false,
}: LeafNodeProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  const shape = useMemo(() => createLeafShape(), []);
  const geometry = useMemo(() => new THREE.ShapeGeometry(shape, 64), [shape]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const p = 0.5 + 0.5 * Math.sin(t * pulseSpeed + phase * 1.13);

    // Soft size pulse
    if (group.current) {
      const base = scale;
      const s = base * (1 + 0.05 * p);
      group.current.scale.set(s, s, s);

      if (sway) {
        const rx = Math.sin(t * 0.6 + phase) * 0.08; // radians
        const rz = Math.cos(t * 0.5 + phase * 0.7) * 0.06;
        group.current.rotation.x = rx;
        group.current.rotation.z = rz;
      }

      if (lookAtCamera && mesh.current) {
        // billboard-ish: make the leaf face the camera softly
        mesh.current.lookAt(camera.position);
      }
    }

    // Glow pulse via emissive intensity
    const m = mesh.current?.material as THREE.MeshStandardMaterial | undefined;
    if (m) {
      m.emissiveIntensity = 0.6 + 0.8 * p; // 0.6..1.4
    }
  });

  return (
    <group ref={group} position={position as any}>
      {/* Leaf body */}
      <mesh ref={mesh} rotation={[-Math.PI / 2 + 0.25, 0, 0]} geometry={geometry} castShadow={false} receiveShadow={false}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          roughness={0.6}
          metalness={0.05}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export default LeafNode;
