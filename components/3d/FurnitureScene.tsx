"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import type { FurnitureConfig } from "@/app/custom/page";

function OBJModel({ url, fabricColor }: { url: string; fabricColor: string }) {
  const [obj, setObj] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(url, (loaded) => {
      const color = new THREE.Color(fabricColor);
      loaded.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.88,
          });
          child.castShadow = true;
        }
      });

      const box = new THREE.Box3().setFromObject(loaded);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3 / maxDim;

      loaded.scale.setScalar(scale);
      loaded.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      setObj(loaded);
    });
  }, [url, fabricColor]);

  if (!obj) return null;
  return <primitive object={obj} />;
}

function SofaModel({ config }: { config: FurnitureConfig }) {
  const body = new THREE.Color(config.fabricColor);
  const leg = new THREE.Color(config.legColor);
  const w = config.sofaWidth;
  const d = config.sofaDepth;
  const h = config.sofaHeight;
  const armH = config.armStyle === "low" ? 0.5 : config.armStyle === "none" ? 0 : 0.72;
  const backH = config.backStyle === "high" ? 1.1 : config.backStyle === "low" ? 0.55 : 0.88;

  const cushions = Array.from({ length: config.cushionCount }, (_, i) => {
    const cushionW = (3.4 * w - 0.1) / config.cushionCount;
    return -(3.4 * w) / 2 + cushionW / 2 + i * cushionW;
  });

  return (
    <group position={[0.6 * w, -0.4 * h, 0]}>
      <mesh castShadow>
        <RoundedBox args={[3.4 * w, 0.28 * h, 1.3 * d]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={body} roughness={0.88} />
        </RoundedBox>
      </mesh>

      {cushions.map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.35 * h, 0]}>
          <RoundedBox args={[(3.4 * w) / config.cushionCount - 0.08, 0.42 * h, 1.12 * d]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color={body} roughness={0.92} />
          </RoundedBox>
        </mesh>
      ))}

      <mesh castShadow position={[0, backH * h * 0.5 + 0.14 * h, -0.5 * d]}>
        <RoundedBox args={[3.4 * w, backH * h, 0.26]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={body} roughness={0.88} />
        </RoundedBox>
      </mesh>

      {cushions.map((x, i) => (
        <mesh key={i} castShadow position={[x, backH * h * 0.5 + 0.14 * h, -0.32 * d]}>
          <RoundedBox args={[(3.4 * w) / config.cushionCount - 0.1, backH * h * 0.8, 0.18]} radius={0.08} smoothness={4}>
            <meshStandardMaterial color={body} roughness={0.95} />
          </RoundedBox>
        </mesh>
      ))}

      {config.armStyle !== "none" && (
        <>
          <mesh castShadow position={[-(1.8 * w), armH * h * 0.5, 0]}>
            <RoundedBox args={[0.24, armH * h, 1.3 * d]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color={body} roughness={0.88} />
            </RoundedBox>
          </mesh>
          <mesh castShadow position={[1.8 * w, armH * h * 0.5, 0]}>
            <RoundedBox args={[0.24, armH * h, 1.3 * d]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color={body} roughness={0.88} />
            </RoundedBox>
          </mesh>
        </>
      )}

      {([[-1.45 * w, -0.52 * d], [1.45 * w, -0.52 * d], [-1.45 * w, 0.52 * d], [1.45 * w, 0.52 * d]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, -0.22 * h, z]}>
          <cylinderGeometry args={[0.055, 0.045, 0.42 * h, 12]} />
          <meshStandardMaterial color={leg} roughness={0.35} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function ArmchairModel({ config }: { config: FurnitureConfig }) {
  const body = new THREE.Color(config.fabricColor);
  const leg = new THREE.Color(config.legColor);
  const h = config.sofaHeight;
  const d = config.sofaDepth;
  const armH = config.armStyle === "low" ? 0.5 : config.armStyle === "none" ? 0 : 0.55;
  const backH = config.backStyle === "high" ? 1.1 : config.backStyle === "low" ? 0.6 : 0.95;

  return (
    <group position={[-2.4, -0.4 * h, 0.2]} rotation={[0, 0.25, 0]}>
      <mesh castShadow position={[0, 0.22 * h, 0]}>
        <RoundedBox args={[1.15, 0.34 * h, 1.05 * d]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={body} roughness={0.92} />
        </RoundedBox>
      </mesh>
      <mesh castShadow position={[0, backH * h * 0.5 + 0.18 * h, -0.44 * d]}>
        <RoundedBox args={[1.15, backH * h, 0.24]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={body} roughness={0.88} />
        </RoundedBox>
      </mesh>
      {config.armStyle !== "none" && (
        <>
          <mesh castShadow position={[-0.6, armH * h * 0.5, 0]}>
            <RoundedBox args={[0.2, armH * h, 1.05 * d]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color={body} roughness={0.88} />
            </RoundedBox>
          </mesh>
          <mesh castShadow position={[0.6, armH * h * 0.5, 0]}>
            <RoundedBox args={[0.2, armH * h, 1.05 * d]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color={body} roughness={0.88} />
            </RoundedBox>
          </mesh>
        </>
      )}
      {([[-0.44, -0.4 * d], [0.44, -0.4 * d], [-0.44, 0.4 * d], [0.44, 0.4 * d]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, -0.1 * h, z]}>
          <cylinderGeometry args={[0.042, 0.035, 0.32 * h, 12]} />
          <meshStandardMaterial color={leg} roughness={0.35} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function FurnitureScene({ config }: { config: FurnitureConfig }) {
  return (
    <Canvas
      camera={{ position: [0, 2.8, 7], fov: 42 }}
      style={{ background: "#F5F0EB", width: "100%", height: "100%" }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 6]} intensity={1.4} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 4, -4]} intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.2} />

      <Suspense fallback={null}>
        {config.objUrl ? (
          <OBJModel url={config.objUrl} fabricColor={config.fabricColor} />
        ) : (
          <>
            {(config.furnitureType === "sofa" || config.furnitureType === "sofa-chair") && (
              <SofaModel config={config} />
            )}
            {(config.furnitureType === "chair" || config.furnitureType === "sofa-chair") && (
              <ArmchairModel config={config} />
            )}
          </>
        )}
      </Suspense>

      <ContactShadows position={[0, -1.05, 0]} opacity={0.4} scale={14} blur={2.5} far={12} />
      <Environment preset="apartment" />
      <OrbitControls
        enablePan
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={3}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
