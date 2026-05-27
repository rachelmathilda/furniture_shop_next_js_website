"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SofaModel({ fabricColor, legColor }: { fabricColor: string; legColor: string }) {
  const bodyColor = new THREE.Color(fabricColor);
  const lcol = new THREE.Color(legColor);

  return (
    <group position={[0, -0.5, 0]}>
      {/* Sofa base */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.25, 1.2]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} metalness={0.0} />
      </mesh>

      {/* Seat cushion left */}
      <mesh castShadow position={[-0.82, 0.32, 0]}>
        <boxGeometry args={[1.4, 0.38, 1.05]} />
        <meshStandardMaterial color={bodyColor} roughness={0.9} />
      </mesh>

      {/* Seat cushion right */}
      <mesh castShadow position={[0.82, 0.32, 0]}>
        <boxGeometry args={[1.4, 0.38, 1.05]} />
        <meshStandardMaterial color={bodyColor} roughness={0.9} />
      </mesh>

      {/* Backrest */}
      <mesh castShadow position={[0, 0.7, -0.48]}>
        <boxGeometry args={[3.2, 0.75, 0.22]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>

      {/* Arm left */}
      <mesh castShadow position={[-1.72, 0.42, 0]}>
        <boxGeometry args={[0.22, 0.6, 1.15]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>

      {/* Arm right */}
      <mesh castShadow position={[1.72, 0.42, 0]}>
        <boxGeometry args={[0.22, 0.6, 1.15]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>

      {/* Legs */}
      {[[-1.4, -0.5], [1.4, -0.5], [-1.4, 0.5], [1.4, 0.5]].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x as number, -0.18, z as number]}>
          <cylinderGeometry args={[0.05, 0.05, 0.35, 8]} />
          <meshStandardMaterial color={lcol} roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* Back pillows */}
      <mesh castShadow position={[-0.7, 0.72, -0.22]}>
        <sphereGeometry args={[0.28, 16, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0.7, 0.72, -0.22]}>
        <sphereGeometry args={[0.28, 16, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.95} />
      </mesh>
    </group>
  );
}

function ArmchairModel({ fabricColor, legColor }: { fabricColor: string; legColor: string }) {
  const bodyColor = new THREE.Color(fabricColor);
  const lcol = new THREE.Color(legColor);

  return (
    <group position={[-2.4, -0.5, 0.3]} rotation={[0, 0.2, 0]}>
      {/* Seat */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.1, 0.3, 1.0]} />
        <meshStandardMaterial color={bodyColor} roughness={0.9} />
      </mesh>
      {/* Back */}
      <mesh castShadow position={[0, 0.7, -0.42]}>
        <boxGeometry args={[1.1, 0.85, 0.2]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>
      {/* Arms */}
      <mesh castShadow position={[-0.58, 0.45, 0]}>
        <boxGeometry args={[0.18, 0.48, 1.0]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0.58, 0.45, 0]}>
        <boxGeometry args={[0.18, 0.48, 1.0]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>
      {/* Legs */}
      {[[-0.42, -0.38], [0.42, -0.38], [-0.42, 0.38], [0.42, 0.38]].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x as number, -0.08, z as number]}>
          <cylinderGeometry args={[0.04, 0.04, 0.28, 8]} />
          <meshStandardMaterial color={lcol} roughness={0.4} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

const LEG_COLORS: Record<string, string> = {
  "Natural Oak": "#C8A87A",
  "Dark Walnut": "#4A3728",
  "Matte Black": "#222222",
  "Polished Brass": "#B8860B",
};

export default function FurnitureScene({ fabricColor, legStyle }: { fabricColor: string; legStyle: string }) {
  const legColor = LEG_COLORS[legStyle] ?? "#C8A87A";

  return (
    <Canvas
      camera={{ position: [0, 2.5, 6], fov: 45 }}
      style={{ background: "#F5F0EB" }}
      shadows
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -3]} intensity={0.4} />

      <SofaModel fabricColor={fabricColor} legColor={legColor} />
      <ArmchairModel fabricColor={fabricColor} legColor={legColor} />

      <ContactShadows position={[0, -1.0, 0]} opacity={0.35} scale={12} blur={2} far={10} />
      <Environment preset="apartment" />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={4}
        maxDistance={10}
      />
    </Canvas>
  );
}
