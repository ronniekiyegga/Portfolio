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
const IDENTITY_ROTATION: [number, number, number] = [0, 0, 0];
const SLIP_ROTATION: [number, number, number] = [Math.PI * 0.9, 0, 0];

useGLTF.preload(CARD_GLB);
extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  visible?: boolean;
  className?: string;
  scale?: number;
  initialDropHeight?: number;
  stringLineWidth?: number;
  ropeLength?: number;
  cardAttachmentY?: number;
  stringColor?: string;
  stringOpacity?: number;
  cardScale?: number;
  cardScaleY?: number;
  angularDamping?: number;
  linearDamping?: number;
  verticalDropStart?: boolean;
  /** When true with initialDropHeight, rope+card start bunched at top, then slip down into place */
  slipFromTop?: boolean;
  onCardHover?: (hovered: boolean) => void;
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
  cardAttachmentY = 1.45,
  stringColor: stringColorProp,
  stringOpacity = 1,
  cardScale: cardScaleProp,
  cardScaleY = 1,
  angularDamping: angularDampingProp,
  linearDamping: linearDampingProp,
  verticalDropStart = false,
  slipFromTop = true,
  onCardHover,
}: LanyardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";
  const stringColor = stringColorProp ?? (isLight ? "#ffffff" : "#e2e8f0");
  const stringLineWidth = stringLineWidthProp ?? (isLight ? 1.3 : 1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = (): void => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-25 w-full h-full flex justify-center md:justify-start md:pl-12 items-center",
        !visible && "hidden",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none size-full *:pointer-events-none [&_canvas]:bg-transparent!",
          onCardHover && "[&_canvas]:pointer-events-auto"
        )}
        style={{ background: "transparent" }}
      >
        <Canvas
          camera={{ position, fov }}
          dpr={[1, isMobile ? 1 : 1.5]}
          gl={{
            alpha: transparent,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          }}
        >
          <ambientLight intensity={Math.PI} />
          <Suspense fallback={null}>
            <Physics gravity={gravity} timeStep={1 / 60}>
              <Band
                isMobile={isMobile}
                scale={scale}
                cardScale={cardScaleProp}
                cardScaleY={cardScaleY}
                stringColor={stringColor}
                stringLineWidth={stringLineWidth}
                stringOpacity={stringOpacity}
                initialDropHeight={initialDropHeight}
                ropeLength={ropeLength}
                cardAttachmentY={cardAttachmentY}
                angularDamping={angularDampingProp}
                linearDamping={linearDampingProp}
                verticalDropStart={verticalDropStart}
                slipFromTop={slipFromTop}
                onCardHover={onCardHover}
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
  cardScale?: number;
  cardScaleY?: number;
  stringColor?: string;
  stringLineWidth?: number;
  stringOpacity?: number;
  initialDropHeight?: number;
  ropeLength?: number;
  cardAttachmentY?: number;
  angularDamping?: number;
  linearDamping?: number;
  verticalDropStart?: boolean;
  slipFromTop?: boolean;
  onCardHover?: (hovered: boolean) => void;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  scale = 1,
  cardScale = 3.25,
  cardScaleY = 1,
  stringColor = "#e2e8f0",
  stringLineWidth = 1,
  stringOpacity = 1,
  initialDropHeight,
  ropeLength = 1.6,
  cardAttachmentY = 1.45,
  angularDamping: angularDampingProp,
  linearDamping: linearDampingProp,
  verticalDropStart = false,
  slipFromTop = true,
  onCardHover,
}: BandProps) {
  const band = useRef<any>(null);
  const targetOpacityRef = useRef(stringOpacity);
  targetOpacityRef.current = stringOpacity;
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const frameCount = useRef(0);
  const [stringReady, setStringReady] = useState(!!initialDropHeight);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // Heavy-card physics: lower damping = more swing/bounce; higher mass = more inertia
  const HEAVY_CARD_ANGULAR_DAMPING = 1.2;
  const HEAVY_CARD_LINEAR_DAMPING = 1.6;
  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: angularDampingProp ?? HEAVY_CARD_ANGULAR_DAMPING,
    linearDamping: linearDampingProp ?? HEAVY_CARD_LINEAR_DAMPING,
  };

  // Drag inertia: card lags behind pointer (heavier feel)
  const dragLerpRef = useRef(new THREE.Vector3());
  const prevTargetRef = useRef(new THREE.Vector3());
  const hasPrevTargetRef = useRef(false);
  const releaseVelocityRef = useRef<THREE.Vector3 | null>(null);
  const wasDraggingRef = useRef(false);

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
    [0, cardAttachmentY, 0],
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
    if (!initialDropHeight && frameCount.current === 1) setStringReady(true);

    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      const targetX = vec.x - dragged.x;
      const targetY = vec.y - dragged.y;
      const targetZ = vec.z - dragged.z;
      dir.set(targetX, targetY, targetZ);

      // Track pointer velocity for release throw (skip first frame to avoid spike)
      const dt = Math.max(delta, 0.001);
      if (card.current && hasPrevTargetRef.current) {
        releaseVelocityRef.current = releaseVelocityRef.current ?? new THREE.Vector3();
        releaseVelocityRef.current.set(
          (targetX - prevTargetRef.current.x) / dt,
          (targetY - prevTargetRef.current.y) / dt,
          (targetZ - prevTargetRef.current.z) / dt,
        );
      }
      prevTargetRef.current.set(targetX, targetY, targetZ);
      hasPrevTargetRef.current = true;

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      // Light inertia: card follows pointer quickly (minimal resistance)
      const lerpFactor = Math.min(1, delta * 14);
      dragLerpRef.current.lerp(dir, lerpFactor);
      card.current?.setNextKinematicTranslation({
        x: dragLerpRef.current.x,
        y: dragLerpRef.current.y,
        z: dragLerpRef.current.z,
      });
      wasDraggingRef.current = true;
    } else {
      // Apply release velocity when transitioning from drag to free
      if (wasDraggingRef.current && card.current && releaseVelocityRef.current) {
        const v = releaseVelocityRef.current;
        const throwScale = 0.4; // Slight throw in drag direction
        card.current.setLinvel({
          x: v.x * throwScale,
          y: v.y * throwScale,
          z: v.z * throwScale,
        });
        releaseVelocityRef.current = null;
      }
      wasDraggingRef.current = false;
      hasPrevTargetRef.current = false;
      // Reset lerp when not dragging so next drag starts from current pos
      if (card.current) {
        const t = card.current.translation();
        dragLerpRef.current.set(t.x, t.y, t.z);
      }
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
    const mat = band.current?.material as { uniforms?: { opacity?: { value: number } } } | undefined;
    const target = targetOpacityRef.current;
    if (mat?.uniforms?.opacity) {
      const u = mat.uniforms.opacity;
      u.value = THREE.MathUtils.lerp(u.value, target, Math.min(1, delta * 6));
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const groupY = initialDropHeight ?? 1.5;

  const useVerticalStart = verticalDropStart && initialDropHeight != null;
  const useSlipFromTop = slipFromTop && initialDropHeight != null && !useVerticalStart;
  // Slip from top: rope angled left from anchor (hidden at top-left), card swings down in an arc
  const j1Pos: [number, number, number] = useSlipFromTop
    ? [-0.9, 3.7, 0]
    : useVerticalStart
      ? [0, 2.6, 0]
      : [0.5, 0, 0];
  const j2Pos: [number, number, number] = useSlipFromTop
    ? [-1.4, 3.0, 0]
    : useVerticalStart
      ? [0, 1, 0]
      : [1, 0, 0];
  const j3Pos: [number, number, number] = useSlipFromTop
    ? [-1.2, 2.2, 0]
    : useVerticalStart
      ? [0, -0.6, 0]
      : [1.5, 0, 0];
  const cardPos: [number, number, number] = useSlipFromTop
    ? [-1.2, 2.2 - cardAttachmentY, 0]
    : useVerticalStart
      ? [0, -1.45, 0]
      : [2, 0, 0];

  const cardRotation: [number, number, number] = useSlipFromTop
    ? SLIP_ROTATION
    : IDENTITY_ROTATION;

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
          position={j1Pos}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={j2Pos}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={j3Pos}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={cardPos}
          ref={card}
          {...segmentProps}
          rotation={cardRotation}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.111, 0.01]} density={2.5} restitution={0.35} />
          <group
            scale={[cardScale, cardScale * cardScaleY, cardScale]}
            position={[0, -2.3, 0.02]}
            rotation={[0.15, -0.7, 0.01]}
            onPointerOver={() => {
              hover(true);
              onCardHover?.(true);
            }}
            onPointerOut={() => {
              hover(false);
              onCardHover?.(false);
            }}
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
          transparent
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
