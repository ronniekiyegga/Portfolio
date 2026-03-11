/* eslint-disable react/no-unknown-property */
"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { cn } from "@/lib/utils";

import lanyardTexture from "./lanyard/lanyard.png";

const CARD_GLB = "/lanyard/card.glb";

useGLTF.preload(CARD_GLB);
extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  /** When false, component is hidden (for V1). When true, visible (for V2 hero). */
  visible?: boolean;
  /** Optional className for the wrapper (e.g. for positioning). */
  className?: string;
  /** Scale of the lanyard model (default 1). Use 0.5–0.7 for smaller. */
  scale?: number;
  /** When set, lanyard starts at this Y height and physics drops it from above. */
  initialDropHeight?: number;
  /** Width of the string (default: theme-based). Use smaller value for thinner string. */
  stringLineWidth?: number;
  /** Length of each rope segment (default 1.6). Smaller = shorter string. */
  ropeLength?: number;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  visible = false,
  className = "",
  scale = 1,
  initialDropHeight,
  stringLineWidth: stringLineWidthProp,
  ropeLength = 1.6,
}: LanyardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";
  const stringColor = isLight ? "#ffffff" : "#e2e8f0";
  const stringLineWidth = stringLineWidthProp ?? (isLight ? 1.3 : 1);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-25 w-full h-full hidden md:flex justify-center md:justify-start md:pl-12 items-center",
        !visible && "hidden",
        className,
      )}
    >
      <div className="pointer-events-none size-full *:pointer-events-none">
        <Canvas
          camera={{ position, fov }}
          dpr={[1, isMobile ? 1 : 1.5]}
          gl={{ alpha: transparent }}
          onCreated={({ gl }) =>
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
          }
        >
          <ambientLight intensity={Math.PI} />
          <Suspense fallback={null}>
            <Physics gravity={gravity} timeStep={isMobile ? 1 / 60 : 1 / 60}>
              <Band
                isMobile={isMobile}
                scale={scale}
                stringColor={stringColor}
                stringLineWidth={stringLineWidth}
                initialDropHeight={initialDropHeight}
                ropeLength={ropeLength}
              />
            </Physics>
          </Suspense>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  scale?: number;
  stringColor?: string;
  stringLineWidth?: number;
  initialDropHeight?: number;
  ropeLength?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  scale = 1,
  stringColor = "#e2e8f0",
  stringLineWidth = 1,
  initialDropHeight,
  ropeLength = 1.6,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const frameCount = useRef(0);
  const [stringReady, setStringReady] = useState(false);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const texture = useTexture(
    typeof lanyardTexture === "string" ? lanyardTexture : lanyardTexture.src,
  );

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    frameCount.current += 1;
    if (frameCount.current === 50) setStringReady(true);

    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      band.current
    ) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
      });
      [j1, j2].forEach((ref) => {
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      const valid = curve.points.every(
        (p) =>
          Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z),
      );
      const pts = valid
        ? curve.getPoints(isMobile ? 16 : 32)
        : [
            new THREE.Vector3(1.5, 1.5, 0),
            new THREE.Vector3(1, 3.2, 0),
            new THREE.Vector3(0.5, 4.5, 0),
            new THREE.Vector3(0, 5.7, 0),
          ];
      if (
        pts.every(
          (p) =>
            Number.isFinite(p.x) &&
            Number.isFinite(p.y) &&
            Number.isFinite(p.z),
        )
      ) {
        band.current.geometry.setPoints(pts);
      }
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const groupY = initialDropHeight ?? 1.5;

  return (
    <>
      <group position={[0, groupY, 0]} scale={scale}>
        <group position={[0, 4.2, 0]}>
          <RigidBody
            ref={fixed}
            {...segmentProps}
            type={"fixed" as RigidBodyProps["type"]}
          />
        </group>
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.111, 0.01]} />
          <group
            scale={3.25}
            position={[0, -2.3, 0.02]}
            rotation={[0.15, -0.7, 0.01]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} visible={stringReady} renderOrder={1000}>
        <meshLineGeometry />
        <meshLineMaterial
          color={stringColor}
          depthTest={false}
          depthWrite={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={stringLineWidth}
        />
      </mesh>
    </>
  );
}
