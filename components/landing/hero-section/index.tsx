// app/(site)/page.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import LetterGlitch from "@/components/LetterGlitch";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────── */
/*  MAIN LAYOUT                                   */
/* ────────────────────────────────────────────── */

const sectionsCopy = [
  {
    title: "Zero-Trust. Zero Excuses.",
    body: "We simulate real-world attackers so you can fix what actually matters before they find it.",
  },
  {
    title: "Offensive Security as a Service",
    body: "Pentesting, red teaming and continuous attack surface monitoring for serious teams.",
  },
  {
    title: "Elite Hackers. On Demand.",
    body: "Plug battle-tested ethical hackers into your roadmap without slowing delivery.",
  },
];

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* LENIS SMOOTH SCROLL */
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* GSAP PINNED SECTIONS + ON-SCROLL ANIMATIONS */
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("section[data-pin]");

      sections.forEach((section) => {
        const title = section.querySelector("[data-title]");
        const body = section.querySelector("[data-body]");
        const cards = section.querySelectorAll("[data-card]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,        // ⭐ PIN SECTION
            pinSpacing: true,
          },
        });

        // Entire section fade + rise
        tl.fromTo(
          section,
          { autoAlpha: 0, y: 100 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );

        if (title) {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          );
        }

        if (body) {
          tl.fromTo(
            body,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          );
        }

        if (cards.length > 0) {
          tl.fromTo(
            cards,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.15,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen text-white  overflow-hidden"
    >
      {/* Neon gradient background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-3xl bg-emerald-400/40" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full blur-3xl bg-lime-400/30" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full blur-3xl bg-emerald-500/30" />
      </div>

      {/* HERO (PINNED) + THREE.JS GLOBE */}
      <section
        data-pin
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <ThreeBackground />

        <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl">
          <h1
            data-title
            className="mt-4 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.35em]"
          >
            N0HACKS
          </h1>
          <p
            data-body
            className="mt-6 text-base sm:text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto"
          >
            Live attack surface visualization with smooth pinned scroll,
            powered by Three.js, GSAP and Lenis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button
              size="lg"
              className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold tracking-wide px-8"
            >
              Let&apos;s Start
            </Button>
            <button
              className="text-sm uppercase tracking-[0.25em] text-emerald-200/70 hover:text-white transition"
              onClick={() => {
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Scroll to explore
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Pinned sections · Scroll-driven motion
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-emerald-400/70 via-emerald-400/20 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* SECTION 1 (PINNED) */}
      <section
        id="services"
        data-pin
        className="min-h-screen flex flex-col justify-center px-6 md:px-20"
      >
        <h2 data-title className="text-5xl font-semibold mb-4">
          Red-Team, Pentest & Digital Forensics.
        </h2>
        <p
          data-body
          className="text-emerald-50/80 max-w-xl mb-10 text-lg"
        >
          We think like attackers, map your real exposure and guide your team
          through every fix until you are genuinely harder to hack.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            label="01"
            title="Red Teaming"
            body="Full-scope attack simulations on apps, infra and people."
          />
          <ServiceCard
            label="02"
            title="Web & Mobile Pentest"
            body="Deep testing for critical web and mobile assets."
          />
          <ServiceCard
            label="03"
            title="Digital Forensics"
            body="Post-incident investigation and remediation planning."
          />
        </div>
      </section>

      {/* SECTION 2 (PINNED) */}
      <section
        data-pin
        className="min-h-screen flex flex-col justify-center px-6 md:px-20"
      >
        <h2 data-title className="text-5xl font-semibold mb-4">
          Offensive Security as a Service
        </h2>
        <p
          data-body
          className="text-emerald-50/80 max-w-xl mb-10 text-lg"
        >
          Continuous red-team pressure, fresh intel and prioritized remediation
          support every month.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            label="01"
            title="Attack Surface Discovery"
            body="Find exposed assets and shadow infra before attackers do."
          />
          <ServiceCard
            label="02"
            title="Continuous Pentest"
            body="Rolling assessments instead of once-a-year checkbox tests."
          />
          <ServiceCard
            label="03"
            title="Threat Intelligence"
            body="Contextual insights mapped to your stack and industry."
          />
        </div>
      </section>

      {/* SECTION 3 (PINNED) */}
      <section
        data-pin
        className="min-h-screen flex flex-col justify-center px-6 md:px-20"
      >
        <h2 data-title className="text-5xl font-semibold mb-4">
          Built for Engineering Teams
        </h2>
        <p
          data-body
          className="text-emerald-50/80 max-w-xl mb-10 text-lg"
        >
          We integrate with your tools and workflows so security doesn&apos;t slow
          shipping.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {sectionsCopy.map((item, idx) => (
            <ServiceCard
              key={idx}
              label={idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;

/* ────────────────────────────────────────────── */
/*  THREE.JS BACKGROUND                           */
/* ────────────────────────────────────────────── */

const ThreeBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.4} />
        <CyberOrb />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
};

const CyberOrb: React.FC = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.3;
  });

  return (
    <group>
      {/* Core globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshStandardMaterial
          wireframe
          metalness={0.7}
          roughness={0.2}
          color={"#22c55e"}
        />
      </mesh>

      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[3.2, 0.05, 16, 200]} />
        <meshBasicMaterial color={"#22c55e"} transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

/* ────────────────────────────────────────────── */
/*  SERVICE CARD                                  */
/* ────────────────────────────────────────────── */

type ServiceCardProps = {
  label: string;
  title: string;
  body: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ label, title, body }) => {
  return (
    <div
      data-card
      className="relative rounded-3xl border border-emerald-100/20 bg-gradient-to-b from-emerald-200/10 via-black/80 to-black p-6 flex flex-col gap-3"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">
        {label}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-emerald-50/80 flex-1">{body}</p>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-emerald-400 via-emerald-400/0 to-transparent" />
    </div>
  );
};
