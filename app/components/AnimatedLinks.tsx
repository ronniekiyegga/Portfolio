"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import DarkVeil from "./DarkVeil";
import FloatingLines from "./FloatingLines";
import LightRays from "./LightRays";
import Prism from "./Prism";
import LightPillar from "./LightPillar";

export const AnimatedLinks = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <nav className="relative flex min-h-screen w-full min-w-0 items-center justify-center overflow-hidden bg-neutral-950 py-12 text-neutral-100">
      <motion.div
        className="absolute inset-0 w-full"
        animate={active === null ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </motion.div>
      <div
        onMouseLeave={() => setActive(null)}
        className="relative z-20 flex flex-col items-center mix-blend-difference"
      >
        {/* <Logo /> */}
        {LINKS.map((l) => {
          return (
            <AnimatedLink
              setActive={setActive}
              active={active}
              href={l.href}
              id={l.id}
              key={l.id}
            >
              {l.text}
            </AnimatedLink>
          );
        })}
      </div>

      {LINKS.map((l) => {
        return (
          <LinkImage
            active={active}
            imgSrc={l.imgSrc}
            background={l.background}
            id={l.id}
            key={l.id}
          />
        );
      })}

      <UnderlayTransition active={active} />
    </nav>
    // <Spotlight>
    // </Spotlight>
  );
};

const UnderlayTransition = ({ active }: { active: number | null }) => {
  const [underlayScope, animateUnderlay] = useAnimate();

  useEffect(() => {
    if (active) {
      animateUnderlay(
        underlayScope.current,
        {
          top: ["100%", "0%", "0%"],
          bottom: ["0%", "0%", "100%"],
        },
        { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
      );
    }
  }, [active, animateUnderlay, underlayScope]);

  return (
    <div
      ref={underlayScope}
      className="absolute bottom-0 left-0 right-0 top-full z-10 bg-neutral-300"
    />
  );
};

const AnimatedLink = ({
  children,
  href,
  setActive,
  active,
  id,
}: {
  children: string;
  href: string;
  setActive: (id: number | null) => void;
  active: number | null;
  id: number;
}) => {
  return (
    <motion.a
      onMouseEnter={() => {
        setActive(id);
      }}
      href={href}
      animate={active === id || active === null ? "active" : "inactive"}
      variants={{
        active: {
          opacity: 1,
        },
        inactive: {
          opacity: 0.25,
        },
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.04,
      }}
      whileHover="hovered"
      className="flex min-w-0 overflow-hidden py-2 text-5xl font-thin uppercase md:text-6xl lg:text-8xl"
    >
      {children.split("").map((ch, idx) => {
        return (
          <motion.span
            className="block"
            initial={false}
            variants={{
              hovered: {
                y: ["0%", "-110%", "110%", "0%"],
                opacity: [1, 0, 0, 1],
              },
            }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
            }}
            key={idx}
          >
            {ch}
          </motion.span>
        );
      })}
    </motion.a>
  );
};

const LinkImage = ({
  imgSrc,
  background,
  active,
  id,
}: {
  imgSrc?: string;
  background?: React.ReactNode;
  active: number | null;
  id: number;
}) => {
  const isActive = active === id;
  // Only mount component backgrounds when active - WebGL needs a visible container to render
  const showBackground = background ? isActive : true;

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      animate={isActive ? "active" : "inactive"}
      variants={{
        active: {
          opacity: 0.5,
        },
        inactive: {
          opacity: 0,
        },
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 0.5],
        delay: 0.3,
      }}
      style={
        !background
          ? {
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(6px)",
            }
          : undefined
      }
    >
      {showBackground && background}
    </motion.div>
  );
};

const LINKS = [
  {
    href: "#",
    text: "DESIGN",
    id: 1,
    background: (
      <div className="absolute inset-0 w-full h-full">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
    ),
  },
  {
    href: "#",
    text: "ENGINEERING",
    id: 2,
    background: (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
    ),
  },
  {
    href: "/blog",
    text: "BLOG",
    id: 3,
    background: (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>
    ),
  },
  {
    href: "#",
    text: "Snapshots",
    id: 4,
    background: (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>
    ),
  },
];
