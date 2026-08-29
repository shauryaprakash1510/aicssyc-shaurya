import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingParticles({
  mousePosition,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const count = 180;
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate initial random positions, velocity vector, and sizes for floating anti-gravity particles
  const { positions, velocities, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 12;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Anti-gravity upward drift velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = Math.random() * 0.012 + 0.004; // Upward anti-gravity drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    const linePos = new Float32Array(count * count * 6);
    return { positions: pos, velocities: vel, linePositions: linePos };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;

    const mouseX = mousePosition.current.x * 12;
    const mouseY = mousePosition.current.y * 8;

    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Upward float defying gravity
      posArray[iy] += velocities[iy] * delta * 60;
      posArray[ix] += velocities[ix] * delta * 60;
      posArray[iz] += velocities[iz] * delta * 60;

      // Reset when floating out of upper boundary
      if (posArray[iy] > 10) {
        posArray[iy] = -10;
        posArray[ix] = (Math.random() - 0.5) * 22;
      }

      // Mouse Parallax & Repel effect
      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4.5) {
        const force = (4.5 - dist) * 0.03;
        posArray[ix] += (dx / dist) * force;
        posArray[iy] += (dy / dist) * force;
      }

      // Connect nearby particles for constellation effect
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const jy = j * 3 + 1;
        const jz = j * 3 + 2;

        const pdx = posArray[ix] - posArray[jx];
        const pdy = posArray[iy] - posArray[jy];
        const pdz = posArray[iz] - posArray[jz];
        const pDist = Math.sqrt(pdx * pdx + pdy * pdy + pdz * pdz);

        if (pDist < 3.2) {
          linePositions[lineIndex * 6] = posArray[ix];
          linePositions[lineIndex * 6 + 1] = posArray[iy];
          linePositions[lineIndex * 6 + 2] = posArray[iz];

          linePositions[lineIndex * 6 + 3] = posArray[jx];
          linePositions[lineIndex * 6 + 4] = posArray[jy];
          linePositions[lineIndex * 6 + 5] = posArray[jz];

          lineIndex++;
        }
      }
    }

    positionAttr.needsUpdate = true;

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
      const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      lineAttr.needsUpdate = true;
    }

    // Slow atmospheric rotation
    meshRef.current.rotation.y += delta * 0.02;
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Particle Constellation Points */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#E2B767"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#10b981"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.4;
  });

  return (
    <group ref={groupRef}>
      {/* Central Anti-Gravity Core Sphere */}
      <mesh position={[4, 1.5, -2]}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial
          color="#eab308"
          wireframe
          transparent
          opacity={0.3}
          emissive="#eab308"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-3.2, -1.8, -4]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.18}
          emissive="#10b981"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

export function HeroCanvas3D() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#eab308" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10b981" />

        <FloatingParticles mousePosition={mousePosition} />
        <FloatingNodes />
      </Canvas>
    </div>
  );
}
