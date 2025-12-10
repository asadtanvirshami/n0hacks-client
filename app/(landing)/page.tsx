// app/(site)/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import hooded from "@/public/images/hooded.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "@/public/images/logo.svg";
import Link from "next/link";
import LanguageSwitcher from "@/components/ui/language-switcher";

gsap.registerPlugin(ScrollTrigger);

// Globe dynamically imported for performance and to avoid SSR/window issues
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

const globeConfig = {
  pointSize: 4,
  globeColor: "#161617",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#161617",
  emissiveIntensity: 0.1,
  shininess: 0.15,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#d2d2d6",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "N0HACKS",
  url: "https://n0hacks.com",
  logo: "https://n0hacks.com/logo.svg",
  sameAs: ["https://www.linkedin.com/company/n0hacks"],
  description:
    "N0HACKS es una firma de hacking ético y red team enfocada en ciberseguridad ofensiva para startups, fintech y empresas de alto riesgo, alineada con CISOs y equipos ejecutivos.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ES",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "security",
      email: "hello@n0hacks.com",
      availableLanguage: ["es", "en"],
    },
  ],
};

const colors = ["#22c55e", "#ef4444", "#3b82f6"];

const globeArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[0],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[1],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[2],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[2],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[0],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[2],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[0],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: colors[1],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: colors[2],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[0],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[1],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: colors[2],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[0],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: colors[1],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[2],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: colors[0],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: colors[1],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[2],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: colors[1],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: colors[2],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: colors[1],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: colors[2],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: colors[0],
  },
];

const navItems = [
  { id: "nav.about" },
  { id: "nav.services" },
  { id: "nav.capabilities" },
  { id: "nav.contact" },
];

const horizontalCards = [
  {
    labelId: "horizontal.services.s1_label",
    titleId: "horizontal.services.s1_title",
    bodyId: "horizontal.services.s1_body",
  },
  {
    labelId: "horizontal.services.s2_label",
    titleId: "horizontal.services.s2_title",
    bodyId: "horizontal.services.s2_body",
  },
  {
    labelId: "horizontal.services.s3_label",
    titleId: "horizontal.services.s3_title",
    bodyId: "horizontal.services.s3_body",
  },
  {
    labelId: "horizontal.services.s4_label",
    titleId: "horizontal.services.s4_title",
    bodyId: "horizontal.services.s4_body",
  },
  {
    labelId: "horizontal.services.s5_label",
    titleId: "horizontal.services.s5_title",
    bodyId: "horizontal.services.s5_body",
  },
  {
    labelId: "horizontal.services.s6_label",
    titleId: "horizontal.services.s6_title",
    bodyId: "horizontal.services.s6_body",
  },
];

const capabilitiesCards = [
  {
    titleId: "capabilities.cards.c1_title",
    bodyId: "capabilities.cards.c1_body",
  },
  {
    titleId: "capabilities.cards.c2_title",
    bodyId: "capabilities.cards.c2_body",
  },
  {
    titleId: "capabilities.cards.c3_title",
    bodyId: "capabilities.cards.c3_body",
  },
  {
    titleId: "capabilities.cards.c4_title",
    bodyId: "capabilities.cards.c4_body",
  },
  {
    titleId: "capabilities.cards.c5_title",
    bodyId: "capabilities.cards.c5_body",
  },
  {
    titleId: "capabilities.cards.c6_title",
    bodyId: "capabilities.cards.c6_body",
  },
  {
    titleId: "capabilities.cards.c7_title",
    bodyId: "capabilities.cards.c7_body",
  },
  {
    titleId: "capabilities.cards.c8_title",
    bodyId: "capabilities.cards.c8_body",
  },
  {
    titleId: "capabilities.cards.c9_title",
    bodyId: "capabilities.cards.c9_body",
  },
];

// Deterministic "floating particles" (no Math.random in render → no hydration issues)
const SERVICE_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  top: `${(i * 37) % 100}%`,
  left: `${(i * 61) % 100}%`,
  delay: `${(i % 7) * 0.35}s`,
  duration: `${4 + (i % 6)}s`,
}));

const FOOTER_PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  top: `${(i * 23) % 100}%`,
  left: `${(i * 47) % 100}%`,
  delay: `${(i % 9) * 0.3}s`,
  duration: `${5 + (i % 7)}s`,
}));

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [enableScrollFx, setEnableScrollFx] = useState(false);

  // Decide when to enable animations (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      // change 1024 to 768 if you want tablet to have no animations too
      const shouldEnable = window.innerWidth >= 1024;
      setEnableScrollFx(shouldEnable);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // LENIS – single instance for smooth scrolling + ScrollTrigger proxy
  useEffect(() => {
    if (!enableScrollFx) return;
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let currentScroll = 0;

    // Keep ScrollTrigger in sync with Lenis
    const onLenisScroll = (e: { scroll: number }) => {
      currentScroll = e.scroll;
      ScrollTrigger.update();
    };

    lenis.on("scroll", onLenisScroll);

    // Tell ScrollTrigger to use Lenis' virtual scroll instead of the browser's
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return currentScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // When ScrollTrigger recalculates positions, also notify Lenis
    ScrollTrigger.addEventListener("refresh", () => {
      lenis.resize();
    });

    // Initial sync
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onLenisScroll as any);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.removeEventListener("refresh", () => {
        lenis.resize();
      });
    };
  }, []);

  // GSAP
  useEffect(() => {
    if (!enableScrollFx) return;
    if (!containerRef.current) return;

    const root = containerRef.current;

    const ctx = gsap.context(() => {
      // HERO PIN + OVERLAY
      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const overlay = heroOverlayRef.current;

      if (hero && overlay) {
        const heroContent = hero.querySelector<HTMLElement>(
          "[data-hero-content]"
        );
        const heroImage =
          overlay.querySelector<HTMLElement>("[data-hero-image]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=130%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.to(
          overlay,
          {
            y: "0%",
            ease: "none",
          },
          0
        );

        if (heroContent) {
          tl.to(
            heroContent,
            {
              autoAlpha: 0.3,
              ease: "power2.out",
            },
            0.2
          );
        }

        if (heroImage) {
          tl.fromTo(
            heroImage,
            { y: 40, scale: 1.04, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              ease: "power2.out",
            },
            0
          );
        }
      }
      // GENERIC PINNED SECTIONS
      const pinnedSections =
        gsap.utils.toArray<HTMLElement>("section[data-pin]");

      pinnedSections.forEach((section) => {
        if (section.hasAttribute("data-timeline")) return;
        if (section.hasAttribute("data-offsec")) return;
        if (section.hasAttribute("data-horizontal")) return;
        if (section.hasAttribute("data-capabilities")) return;
        if (section.hasAttribute("data-about")) return;
        if (section.hasAttribute("data-contact")) return;

        const title = section.querySelector<HTMLElement>("[data-title]");
        const body = section.querySelector<HTMLElement>("[data-body]");
        const cards = section.querySelectorAll<HTMLElement>("[data-card]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          section,
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        if (title) {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" },
            "-=0.6"
          );
        }

        if (body) {
          tl.fromTo(
            body,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" },
            "-=0.6"
          );
        }

        if (cards.length > 0) {
          tl.fromTo(
            cards,
            { autoAlpha: 0, y: 50, rotateX: -6 },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.15,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }
      });

      // ABOUT
      const aboutSection = root.querySelector<HTMLElement>("[data-about]");

      if (aboutSection) {
        const left =
          aboutSection.querySelector<HTMLElement>("[data-about-left]");
        const right =
          aboutSection.querySelector<HTMLElement>("[data-about-right]");
        const bulletsWrapper = aboutSection.querySelector<HTMLElement>(
          "[data-about-bullets]"
        );
        const title = aboutSection.querySelector<HTMLElement>("[data-title]");
        const body = aboutSection.querySelector<HTMLElement>("[data-body]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: "top top",
            end: "+=" + window.innerHeight * 1.5,
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          aboutSection,
          { autoAlpha: 0, y: 80, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, ease: "power3.out" },
          0
        );

        if (title) {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 40, skewX: -8 },
            { autoAlpha: 1, y: 0, skewX: 0, ease: "power3.out" },
            0.05
          );
        }

        if (body) {
          tl.fromTo(
            body,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, ease: "power3.out" },
            0.12
          );
        }

        if (left) {
          tl.fromTo(
            left,
            { autoAlpha: 0, x: -50 },
            { autoAlpha: 1, x: 0, ease: "power3.out" },
            0.15
          );
        }

        if (bulletsWrapper) {
          const bulletItems =
            bulletsWrapper.querySelectorAll<HTMLElement>("div.flex");

          tl.fromTo(
            bulletItems,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.25
          );
        }

        if (right) {
          tl.fromTo(
            right,
            { autoAlpha: 0, x: 60, scale: 0.9, rotateX: -6 },
            { autoAlpha: 1, x: 0, scale: 1, rotateX: 0, ease: "power3.out" },
            0.25
          ).to(
            right,
            {
              y: -20,
              rotateX: 4,
              ease: "sine.inOut",
            },
            0.7
          );
        }
      }

      // OFFSEC / CISO SECTION
      const offsecSection = root.querySelector<HTMLElement>("[data-offsec]");

      if (offsecSection) {
        const offsecTitle =
          offsecSection.querySelector<HTMLElement>("[data-title]");
        const offsecBody =
          offsecSection.querySelector<HTMLElement>("[data-body]");
        const offsecCards =
          offsecSection.querySelectorAll<HTMLElement>("[data-card]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: offsecSection,
            start: "top top",
            end: "+=" + window.innerHeight * 1.5,
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          offsecSection,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, ease: "power2.out" },
          0
        );

        if (offsecTitle) {
          tl.fromTo(
            offsecTitle,
            { autoAlpha: 0, y: 40, letterSpacing: "0.15em" },
            {
              autoAlpha: 1,
              y: 0,
              letterSpacing: "0.35em",
              ease: "power3.out",
            },
            0.05
          );
        }

        if (offsecBody) {
          tl.fromTo(
            offsecBody,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, ease: "power3.out" },
            0.1
          );
        }

        if (offsecCards.length) {
          tl.fromTo(
            offsecCards,
            { autoAlpha: 0, y: 80, rotateX: -12, rotateZ: -3 },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              rotateZ: 0,
              stagger: 0.15,
              ease: "power3.out",
            },
            0.2
          ).to(
            offsecCards,
            {
              y: (i) => (i % 2 === 0 ? -8 : 8),
              rotateZ: (i) => (i % 2 === 0 ? 2 : -2),
              ease: "sine.inOut",
            },
            0.7
          );
        }
      }

      // TIMELINE
      const timelineSection =
        root.querySelector<HTMLElement>("[data-timeline]");

      if (timelineSection) {
        const vertical = timelineSection.querySelector<HTMLElement>(
          "[data-timeline-vertical]"
        );

        if (vertical) {
          gsap.fromTo(
            vertical,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timelineSection,
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            }
          );
        }

        const items = timelineSection.querySelectorAll<HTMLElement>(
          "[data-timeline-item]"
        );

        items.forEach((item) => {
          const horizontal = item.querySelector<HTMLElement>(
            "[data-timeline-horizontal]"
          );
          const content = item.querySelector<HTMLElement>(
            "[data-timeline-content]"
          );
          const side = item.dataset.side === "left" ? "left" : "right";
          const offset = side === "left" ? -60 : 60;

          if (horizontal) {
            gsap.fromTo(
              horizontal,
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin:
                  side === "left" ? "right center" : "left center",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  end: "top 45%",
                  scrub: true,
                },
              }
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { autoAlpha: 0, x: offset },
              {
                autoAlpha: 1,
                x: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  end: "top 45%",
                  scrub: true,
                },
              }
            );
          }
        });
      }

      // HORIZONTAL SERVICES
      const horizontalSection =
        root.querySelector<HTMLElement>("[data-horizontal]");

      if (horizontalSection) {
        const track = horizontalSection.querySelector<HTMLElement>(
          "[data-horizontal-track]"
        );
        const title = horizontalSection.querySelector<HTMLElement>(
          "[data-horizontal-title]"
        );
        const subtitle = horizontalSection.querySelector<HTMLElement>(
          "[data-horizontal-subtitle]"
        );

        if (track) {
          const getDistance = () =>
            Math.max(track.scrollWidth - horizontalSection.offsetWidth, 0);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              start: "top top",
              end: () => "+=" + getDistance(),
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          });
        }

        if (title) {
          gsap.fromTo(
            title,
            { autoAlpha: 0, y: 40, skewX: -6 },
            {
              autoAlpha: 1,
              y: 0,
              skewX: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: horizontalSection,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: horizontalSection,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // CAPABILITIES
      const capabilitiesSection = root.querySelector<HTMLElement>(
        "[data-capabilities]"
      );

      if (capabilitiesSection) {
        const title =
          capabilitiesSection.querySelector<HTMLElement>("[data-title]");
        const body =
          capabilitiesSection.querySelector<HTMLElement>("[data-body]");
        const cards =
          capabilitiesSection.querySelectorAll<HTMLElement>("[data-card]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: capabilitiesSection,
            start: "top top",
            end: "+=" + window.innerHeight * 2,
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          capabilitiesSection,
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, ease: "power3.out" },
          0
        );

        if (title) {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, ease: "power3.out" },
            0.05
          );
        }

        if (body) {
          tl.fromTo(
            body,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, ease: "power3.out" },
            0.1
          );
        }

        if (cards.length) {
          tl.fromTo(
            cards,
            { autoAlpha: 0, y: 80 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.2
          );
        }
      }

      // CONTACT
      const contactSection = root.querySelector<HTMLElement>("[data-contact]");

      if (contactSection) {
        const left = contactSection.querySelector<HTMLElement>(
          "[data-contact-left]"
        );
        const right = contactSection.querySelector<HTMLElement>(
          "[data-contact-right]"
        );
        const title = contactSection.querySelector<HTMLElement>(
          "[data-contact-title]"
        );
        const body = contactSection.querySelector<HTMLElement>(
          "[data-contact-body]"
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contactSection,
            start: "top top",
            end: "+=" + window.innerHeight * 1.4,
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          contactSection,
          { autoAlpha: 0, y: 80, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, ease: "power3.out" },
          0
        );

        if (title) {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 40, skewX: -6 },
            { autoAlpha: 1, y: 0, skewX: 0, ease: "power3.out" },
            0.05
          );
        }

        if (body) {
          tl.fromTo(
            body,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, ease: "power3.out" },
            0.1
          );
        }

        if (left) {
          tl.fromTo(
            left,
            { autoAlpha: 0, x: -50 },
            { autoAlpha: 1, x: 0, ease: "power3.out" },
            0.15
          );
        }

        if (right) {
          tl.fromTo(
            right,
            { autoAlpha: 0, x: 50, scale: 0.9, rotateX: -8 },
            { autoAlpha: 1, x: 0, scale: 1, rotateX: 0, ease: "power3.out" },
            0.2
          ).to(
            right,
            {
              y: -16,
              rotateX: 4,
              ease: "sine.inOut",
            },
            0.7
          );
        }
      }

      // WORLD + COUNTERS + HEADER + FOOTER
      const worldSection = root.querySelector<HTMLElement>("[data-world]");
      if (worldSection) {
        const counters =
          worldSection.querySelectorAll<HTMLElement>("[data-counter]");
        const globeWrapper =
          worldSection.querySelector<HTMLElement>("[data-world-globe]");

        gsap.fromTo(
          globeWrapper,
          { scale: 0.8, rotateZ: -10, autoAlpha: 0 },
          {
            scale: 1,
            rotateZ: 0,
            autoAlpha: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: worldSection,
              start: "top 75%",
              end: "top 30%",
              scrub: true,
            },
          }
        );

        counters.forEach((counter) => {
          const target = Number(counter.getAttribute("data-counter"));
          gsap.fromTo(counter, { innerText: 0 }, {
            innerText: target,
            duration: 2.5,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: worldSection,
              start: "top 80%",
            },
          } as any);
        });

        const footer = root.querySelector<HTMLElement>("[data-footer]");

        if (footer) {
          const cols =
            footer.querySelectorAll<HTMLElement>("[data-footer-col]");

          gsap.fromTo(
            footer,
            { autoAlpha: 0, y: 80 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footer,
                start: "top 85%",
                end: "top 40%",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            cols,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footer,
                start: "top 80%",
                end: "top 40%",
                scrub: true,
              },
            }
          );
        }

        const header = root.querySelector<HTMLElement>("[data-header]");
        const menu = root.querySelector<HTMLElement>("[data-menu]");
        const trigger = root.querySelector<HTMLElement>("[data-menu-trigger]");
        const line1 = root.querySelector<HTMLElement>("[data-line1]");
        const line2 = root.querySelector<HTMLElement>("[data-line2]");
        const line3 = root.querySelector<HTMLElement>("[data-line3]");

        if (header) {
          gsap.fromTo(
            header,
            { y: -40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: header, start: "top top" },
            }
          );

          ScrollTrigger.create({
            trigger: header,
            start: "top top",
            end: "+=200",
            scrub: true,
            onUpdate: (self) => {
              header.style.height = `${80 - self.progress * 16}px`;
              header.style.backgroundColor = `rgba(2,10,8,${
                0.4 + self.progress * 0.4
              })`;
            },
          });
        }

        let menuOpen = false;

        if (trigger && menu) {
          trigger.addEventListener("click", () => {
            menuOpen = !menuOpen;

            gsap.to(menu, {
              height: menuOpen ? "100vh" : "0vh",
              duration: 0.55,
              ease: "power3.inOut",
            });

            if (menuOpen) {
              gsap.to(line1, { y: 6, rotate: 45, width: 22, duration: 0.3 });
              gsap.to(line2, { autoAlpha: 0, duration: 0.3 });
              gsap.to(line3, { y: -6, rotate: -45, width: 22, duration: 0.3 });
            } else {
              gsap.to(line1, { y: 0, rotate: 0, width: 20, duration: 0.3 });
              gsap.to(line2, { autoAlpha: 1, duration: 0.3 });
              gsap.to(line3, { y: 0, rotate: 0, width: 20, duration: 0.3 });
            }
          });
        }

        ScrollTrigger.create({
          trigger: worldSection,
          start: "top 70%",
          end: "bottom 20%",
          onEnter: () => globeWrapper?.classList.add("animate-pulse-glow"),
          onLeave: () => globeWrapper?.classList.remove("animate-pulse-glow"),
          onEnterBack: () => globeWrapper?.classList.add("animate-pulse-glow"),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, {
        offset: -80,
        duration: 1.3,
        easing: (x: number) => 1 - Math.pow(1 - x, 3),
      });
    } else {
      window.scrollTo({ top: top - 80, behavior: "smooth" });
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen text-white overflow-hidden !bg-transparent"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      {/* HEADER */}
      <header
        data-header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#020a08]/40 border-b border-emerald-400/10 shadow-[0_0_25px_rgba(16,185,129,0.15)] flex items-center justify-between h-20 px-6 md:px-14 transition-all duration-500"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <h1 className="font-[family-name:var(--font-orbitron)] text-2xl tracking-[0.28em] bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent flex items-center gap-2">
            <Image src={logo} alt="N0HACKS Logo" width={30} height={30} />
            <FormattedMessage id="footer.brand" defaultMessage="N0HACKS" />
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id.split(".")[1])}
              className="relative text-sm text-emerald-100/80 tracking-wide hover:text-emerald-300 transition-colors group"
            >
              <FormattedMessage id={item.id} />
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-emerald-200 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <LanguageSwitcher />
          <Button
            onClick={() => scrollToSection("contact")}
            className="
              relative overflow-hidden
              px-6 py-3 rounded-xl font-semibold
              text-black
              bg-gradient-to-br from-[#00ff9d] via-[#00e676] to-[#00c853]
              shadow-[0_0_12px_#00ff9d,0_0_24px_#00ff9d]
              hover:shadow-[0_0_20px_#00ff9d,0_0_40px_#00ff9d]
              transition-all duration-300
            "
          >
            <span
              className="
                pointer-events-none absolute inset-0 opacity-20
                bg-[radial-gradient(circle_at_10%_10%,#00ff9d_0%,transparent_60%),
                    linear-gradient(120deg,transparent_0%,#00ff9d_8%,transparent_16%),
                    linear-gradient(300deg,transparent_0%,#00ff9d_10%,transparent_20%)]
                bg-[length:200%_200%]
                animate-[pulseCircuit_6s_linear_infinite]
              "
            />
            <FormattedMessage id="nav.get_in_touch" />
          </Button>
        </nav>

        <button
          data-menu-trigger
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-emerald-400/20 backdrop-blur-md text-emerald-300 transition-all"
        >
          <div className="space-y-1.5">
            <span
              className="block w-5 h-[2px] bg-emerald-300 transition-all"
              data-line1
            />
            <span
              className="block w-5 h-[2px] bg-emerald-300 transition-all"
              data-line2
            />
            <span
              className="block w-5 h-[2px] bg-emerald-300 transition-all"
              data-line3
            />
          </div>
        </button>
      </header>

      {/* BG */}
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000b08] to-black" />
        <div className="absolute top-[60%] left-[-10%] w-[40vh] h-[40vh] blur-[110px] rounded-full bg-emerald-500/25 animate-pulse-slow" />
      </div>

      {/* MENU */}
      <div
        data-menu
        className="fixed top-0 left-0 right-0 h-0 bg-[#020a08]/95 backdrop-blur-2xl border-b border-emerald-400/20 overflow-hidden z-40 transition-all duration-500"
      >
        <div className="flex flex-col items-center justify-center gap-10 mt-32">
          {navItems.map((item) => (
            <p
              key={item.id}
              onClick={() => {
                scrollToSection(item.id.split(".")[1]);
              }}
              className="text-3xl font-semibold bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent tracking-wide hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              <FormattedMessage id={item.id} />
            </p>
          ))}
          <LanguageSwitcher />
          <Button
            onClick={() => scrollToSection("contact")}
            className="
              relative overflow-hidden
              px-6 py-3 rounded-xl font-semibold
              text-black
              bg-gradient-to-br from-[#00ff9d] via-[#00e676] to-[#00c853]
              shadow-[0_0_12px_#00ff9d,0_0_24px_#00ff9d]
              hover:shadow-[0_0_20px_#00ff9d,0_0_40px_#00ff9d]
              transition-all duration-300
            "
          >
            <span
              className="
                pointer-events-none absolute inset-0 opacity-20
                bg-[radial-gradient(circle_at_10%_10%,#00ff9d_0%,transparent_60%),
                    linear-gradient(120deg,transparent_0%,#00ff9d_8%,transparent_16%),
                    linear-gradient(300deg,transparent_0%,#00ff9d_10%,transparent_20%)]
                bg-[length:200%_200%]
                animate-[pulseCircuit_6s_linear_infinite]
              "
            />
            <FormattedMessage id="nav.get_in_touch" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[radial-gradient(circle_at_bottom,rgba(0,255,120,0.3),transparent)] blur-2xl" />
      </div>

      {/* HERO */}
      <section
        data-hero
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        <div
          data-hero-content
          className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl"
        >
          <h1
            data-title
            className="mt-4 font-[family-name:var(--font-orbitron)] text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-[0.35em] bg-gradient-to-r from-[#00ff5a] via-[#00992f] to-[#003d18] bg-clip-text text-transparent"
          >
            <FormattedMessage id="hero.title" defaultMessage="N0HACKS" />
          </h1>

          <p
            data-body
            className="mt-6 font-[family-name:var(--font-red)] text-base sm:text-lg md:text-xl text-emerald-50/90 max-w-2xl mx-auto"
          >
            <FormattedMessage
              id="hero.sub_title"
              defaultMessage="Ofensiva digital para CISOs, CTOs y fundadores que necesitan ver su riesgo real antes que los atacantes."
            />
          </p>

          <Button
            variant="brand"
            size="lg"
            className="text-black font-semibold tracking-wide px-8"
            onClick={() => scrollToSection("contact")}
          >
            <FormattedMessage
              id="hero.cta"
              defaultMessage="Hablemos de tu superficie de ataque"
            />
          </Button>
        </div>

        <div
          ref={heroOverlayRef}
          className="
            absolute inset-0 z-20
            bg-[radial-gradient(circle_at_10%_0%,#00ff5a_0%,#00b43d_35%,#002010_100%)]
            bg-[length:200%_200%]
            animate-[gradientShift_18s_ease_infinite]
            flex items-center justify-center
            translate-y-full will-change-transform
          "
        >
          <div className="max-w-5xl w-full px-6 flex items-center justify-between">
            <div className="relative w-full flex items-center justify-center">
              <div className="relative inline-block">
                <Image
                  src="/images/hooded.svg"
                  alt="N0HACKS Hooded Operator"
                  data-hero-image
                  className="relative z-10  w-[47rem] mt-12"
                  width={80}
                  height={80}
                  priority // <-- tells Next to preload on server
                  loading="eager"
                />
                <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-[radial-gradient(circle_at_center,rgba(0,255,90,0.5),rgba(0,120,50,0.35),transparent)] blur-3xl opacity-90" />
                <div className="pointer-events-none absolute -bottom-16 -left-10 w-[380px] h-[260px] bg-[radial-gradient(circle_at_bottom_left,rgba(0,255,90,0.4),transparent)] blur-2xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-10 w-[380px] h-[260px] bg-[radial-gradient(circle_at_bottom_right,rgba(0,255,90,0.4),transparent)] blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        data-pin
        data-about
        className="relative min-h-screen flex items-center px-6 md:px-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 w-[32rem] h-[32rem] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[20rem] h-[20rem] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="w-full grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          <div data-about-left>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-400/70 mb-4">
              <FormattedMessage
                id="about.badge"
                defaultMessage="SOBRE NOSOTROS"
              />
            </p>

            <h2
              data-title
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent"
            >
              <FormattedMessage
                id="about.title"
                defaultMessage="N0HACKS: tu unidad ofensiva de ciberseguridad, alineada con el CISO y el negocio."
              />
            </h2>

            <p
              data-body
              className="text-emerald-50/80 text-base md:text-lg leading-relaxed mb-6"
            >
              <FormattedMessage id="about.body_1" />
            </p>

            <p className="text-emerald-50/70 text-sm md:text-base leading-relaxed mb-8">
              <FormattedMessage id="about.body_2" />
            </p>

            <div data-about-bullets className="grid gap-4 sm:grid-cols-2">
              <Bullet
                titleId="about.bullets.attacker_mindset_title"
                bodyId="about.bullets.attacker_mindset_body"
              />
              <Bullet
                titleId="about.bullets.end_to_end_title"
                bodyId="about.bullets.end_to_end_body"
              />
              <Bullet
                titleId="about.bullets.detail_title"
                bodyId="about.bullets.detail_body"
              />
              <Bullet
                titleId="about.bullets.high_risk_title"
                bodyId="about.bullets.high_risk_body"
              />
            </div>
          </div>

          <div data-about-right className="space-y-4 lg:space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-[#020712] via-black to-[#03140d] shadow-[0_0_35px_rgba(16,185,129,0.28)] p-6">
              <div className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80 mb-3">
                <FormattedMessage
                  id="about.why_badge"
                  defaultMessage="POR QUÉ N0HACKS"
                />
              </p>
              <p className="text-sm text-emerald-50/80 leading-relaxed">
                <FormattedMessage id="about.why_body" />
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-400/20 bg-[#020712]/80 p-4 flex flex-col gap-1">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/70">
                  <FormattedMessage
                    id="about.focus_badge"
                    defaultMessage="FOCO"
                  />
                </p>
                <p className="text-sm text-emerald-50/90 whitespace-pre-line">
                  <FormattedMessage id="about.focus_body" />
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-[#020712]/80 p-4 flex flex-col gap-1">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/70">
                  <FormattedMessage
                    id="about.style_badge"
                    defaultMessage="ESTILO"
                  />
                </p>
                <p className="text-sm text-emerald-50/90 whitespace-pre-line">
                  <FormattedMessage id="about.style_body" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        data-pin
        data-timeline
        className="relative min-h-screen flex items-center px-6 md:px-20"
      >
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="pointer-events-none absolute inset-y-10 left-1/2 -translate-x-1/2 w-px bg-emerald-500/25" />

          <div
            data-timeline-vertical
            className="pointer-events-none absolute inset-y-10 left-1/2 -translate-x-1/2 w-[3px] rounded-full origin-top scale-y-0 bg-[linear-gradient(to_bottom,#22c55e,#a3e635)] shadow-[0_0_26px_rgba(34,197,94,0.9)]"
          />

          <div className="space-y-24 relative z-10 mt-10">
            <TimelineItem side="right">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-2">
                <FormattedMessage id="timeline.items.recon_badge" />
              </p>
              <h3 className="text-2xl font-semibold mb-2">
                <FormattedMessage id="timeline.items.recon_title" />
              </h3>
              <p className="text-emerald-50/75 text-sm leading-relaxed">
                <FormattedMessage id="timeline.items.recon_body" />
              </p>
            </TimelineItem>

            <TimelineItem side="left">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-2">
                <FormattedMessage id="timeline.items.exploit_badge" />
              </p>
              <h3 className="text-2xl font-semibold mb-2">
                <FormattedMessage id="timeline.items.exploit_title" />
              </h3>
              <p className="text-emerald-50/75 text-sm leading-relaxed">
                <FormattedMessage id="timeline.items.exploit_body" />
              </p>
            </TimelineItem>

            <TimelineItem side="right">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mb-2">
                <FormattedMessage id="timeline.items.remediate_badge" />
              </p>
              <h3 className="text-2xl font-semibold mb-2">
                <FormattedMessage id="timeline.items.remediate_title" />
              </h3>
              <p className="text-emerald-50/75 text-sm leading-relaxed">
                <FormattedMessage id="timeline.items.remediate_body" />
              </p>
            </TimelineItem>
          </div>
        </div>
      </section>

      {/* CISO */}
      <section
        data-pin
        data-offsec
        className="min-h-screen flex flex-col justify-center px-6 md:px-20"
      >
        <h2 data-title className="text-5xl font-semibold mb-6 tracking-wide">
          <FormattedMessage
            id="cisco.title"
            defaultMessage="CISO – Chief Information Security Officer as a Service"
          />
        </h2>

        <p
          data-body
          className="text-emerald-50/80 max-w-2xl mb-14 text-lg leading-relaxed"
        >
          <FormattedMessage
            id="cisco.body"
            defaultMessage="N0HACKS actúa como tu CISO ofensivo: traducimos riesgo técnico a decisiones ejecutivas, priorizamos las superficies de ataque críticas y coordinamos la defensa junto a tu equipo interno."
          />
        </p>

        <div className="grid md:grid-cols-3 gap-10 relative z-10">
          <CISCOCard
            labelId="cisco.cards.card1_label"
            titleId="cisco.cards.card1_title"
            bodyId="cisco.cards.card1_body"
          />
          <CISCOCard
            labelId="cisco.cards.card2_label"
            titleId="cisco.cards.card2_title"
            bodyId="cisco.cards.card2_body"
          />
          <CISCOCard
            labelId="cisco.cards.card3_label"
            titleId="cisco.cards.card3_title"
            bodyId="cisco.cards.card3_body"
          />
        </div>
      </section>

      {/* WORLD */}
      <section
        data-world
        className="relative min-h-screen mb-32 flex flex-col items-center justify-center px-6 md:px-20 mt-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_center,#22c55e_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.7),transparent)]" />
        </div>

        <div className="mb-10 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
            <FormattedMessage id="world.title" />
          </h2>
          <p className="text-emerald-200/70 max-w-xl mx-auto text-lg">
            <FormattedMessage id="world.body" />
          </p>

          <div className="flex items-center justify-center gap-10 mt-8">
            <div className="text-center">
              <p className="text-[13px] uppercase tracking-[0.3em] text-emerald-300/70">
                <FormattedMessage id="world.stats.attacks_detected" />
              </p>
              <p
                data-counter="6842"
                className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              >
                0
              </p>
            </div>

            <div className="text-center">
              <p className="text-[13px] uppercase tracking-[0.3em] text-emerald-300/70">
                <FormattedMessage id="world.stats.defences_executed" />
              </p>
              <p
                data-counter="6735"
                className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              >
                0
              </p>
            </div>
          </div>
        </div>

        <div
          data-world-globe
          className="relative w-full max-w-3xl h-[600px] mx-auto flex items-center justify-center transition-transform duration-700"
        >
          <div className="w-full h-full">
            <World globeConfig={globeConfig} data={globeArcs} />
          </div>
        </div>
      </section>

      {/* HORIZONTAL SERVICES */}
      <section
        id="services"
        data-horizontal
        className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          {SERVICE_PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="w-full">
          <h2 data-horizontal-title className="text-5xl font-semibold mb-4">
            <FormattedMessage id="horizontal.title" />
          </h2>

          <p
            data-horizontal-subtitle
            className="text-emerald-50/80 max-w-xl mb-10 text-lg"
          >
            <FormattedMessage id="horizontal.subtitle" />
          </p>

          <div className="relative mt-8">
            <div
              data-horizontal-track
              className="flex gap-6 will-change-transform"
            >
              {horizontalCards.map((card, idx) => (
                <div
                  key={idx}
                  data-horizontal-card
                  className="min-w-[280px] md:min-w-[360px] lg:min-w-[420px]"
                >
                  <ServiceCard
                    labelId={card.labelId}
                    titleId={card.titleId}
                    bodyId={card.bodyId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        data-pin
        id="capabilities"
        data-capabilities
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-20"
      >
        <h2 data-title className="text-5xl font-semibold mb-4">
          <FormattedMessage id="capabilities.title" />
        </h2>

        <p data-body className="text-emerald-50/80 max-w-xl mb-10 text-lg">
          <FormattedMessage id="capabilities.body" />
        </p>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(34,197,94,0.15),transparent)] animate-scanline" />

        <div className="grid gap-6 md:grid-cols-3 relative z-10">
          {capabilitiesCards.map((card, idx) => (
            <CapabilityCard
              key={idx}
              index={idx}
              titleId={card.titleId}
              bodyId={card.bodyId}
            />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        data-pin
        data-contact
        className="relative min-h-screen flex items-center px-6 md:px-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_top,#22c55e_0,transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,118,110,0.25),transparent)]" />
        </div>

        <div className="w-full grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div data-contact-left>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-400/70 mb-4">
              <FormattedMessage id="contact.badge" />
            </p>

            <h2
              data-contact-title
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 via-emerald-100 to-emerald-500 bg-clip-text text-transparent"
            >
              <FormattedMessage id="contact.title" />
            </h2>

            <p
              data-contact-body
              className="text-emerald-50/80 text-base md:text-lg leading-relaxed mb-6 max-w-xl"
            >
              <FormattedMessage id="contact.body" />
            </p>

            <ul className="space-y-3 text-sm text-emerald-50/75">
              <ContactBullet id="contact.bullets.b1" />
              <ContactBullet id="contact.bullets.b2" />
              <ContactBullet id="contact.bullets.b3" />
            </ul>
          </div>

          <div data-contact-right className="flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-2xl bg-[#020a08]/80 backdrop-blur-xl border border-emerald-400/25 shadow-[0_0_35px_rgba(16,185,129,0.35)] overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-20 h-48 w-48 rounded-full bg-emerald-500/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-emerald-400/15 blur-2xl" />
              <span className="pointer-events-none absolute top-0 left-0 h-10 w-10 border-l border-t border-emerald-400/40 rounded-tl-xl" />
              <span className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-r border-b border-emerald-400/40 rounded-br-xl" />

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80 mb-2">
                    <FormattedMessage id="contact.card_badge" />
                  </p>
                  <h3 className="text-2xl font-semibold text-emerald-50">
                    <FormattedMessage id="contact.card_title" />
                  </h3>
                  <p className="mt-2 text-sm text-emerald-50/75">
                    <FormattedMessage id="contact.card_body" />
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                      <FormattedMessage id="contact.form.email_label" />
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg bg-black/40 border border-emerald-500/30 px-3 py-2 text-sm text-emerald-50 outline-none focus:border-emerald-400 focus:ring-0"
                      placeholder="tú@empresa.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                      <FormattedMessage id="contact.form.company_label" />
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg bg-black/40 border border-emerald-500/30 px-3 py-2 text-sm text-emerald-50 outline-none focus:border-emerald-400 focus:ring-0"
                      placeholder="CTO en fintech, CISO, fundador…"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                      <FormattedMessage id="contact.form.message_label" />
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-lg bg-black/40 border border-emerald-500/30 px-3 py-2 text-sm text-emerald-50 outline-none focus:border-emerald-400 focus:ring-0 resize-none"
                      placeholder="Describe brevemente tu stack, incidente o preocupación."
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center w-full rounded-xl bg-emerald-400 text-black text-sm font-semibold px-4 py-2.5 tracking-wide hover:bg-emerald-300 transition-colors"
                  >
                    <FormattedMessage id="contact.form.submit" />
                  </button>
                </form>

                <p className="text-[11px] text-emerald-100/50">
                  <FormattedMessage id="contact.disclaimer" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section
        data-footer
        className="relative mt-40 py-28 px-6 md:px-20 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,#22c55e20,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#00110a60,transparent)]" />
          {FOOTER_PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-emerald-400/40 animate-float"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div data-footer-col className="space-y-6">
            <h3 className="text-3xl font-bold tracking-[0.25em] bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              <FormattedMessage id="footer.brand" />
            </h3>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm">
              <FormattedMessage id="footer.description" />
            </p>

            <div className="flex gap-4 pt-4">
              <Link href={"https://www.linkedin.com/company/n0hacks"}>
                <SocialChip id="social.linkedin" />
              </Link>
            </div>
          </div>

          <div data-footer-col className="space-y-4">
            <h4 className="text-emerald-300/80 text-sm tracking-[0.2em] uppercase">
              <FormattedMessage id="footer.navigation_heading" />
            </h4>
            <ul className="space-y-3 text-emerald-100/70 text-sm">
              <li
                className="hover:text-emerald-300 transition-colors cursor-pointer"
                onClick={() => scrollToSection("about")}
              >
                <FormattedMessage id="footer.navigation.about_us" />
              </li>
              <li
                className="hover:text-emerald-300 transition-colors cursor-pointer"
                onClick={() => scrollToSection("services")}
              >
                <FormattedMessage id="footer.navigation.services" />
              </li>
              <li
                className="hover:text-emerald-300 transition-colors cursor-pointer"
                onClick={() => scrollToSection("capabilities")}
              >
                <FormattedMessage id="footer.navigation.capabilities" />
              </li>
              <li
                className="hover:text-emerald-300 transition-colors cursor-pointer"
                onClick={() => scrollToSection("contact")}
              >
                <FormattedMessage id="footer.navigation.contact" />
              </li>
            </ul>
          </div>

          <div data-footer-col className="space-y-4">
            <h4 className="text-emerald-300/80 text-sm tracking-[0.2em] uppercase">
              <FormattedMessage id="footer.contact_heading" />
            </h4>

            <p className="text-emerald-100/70 text-sm leading-relaxed">
              <FormattedMessage id="footer.contact_body" />
            </p>

            <div className="space-y-2 text-sm">
              <p className="text-emerald-300 font-semibold">
                <FormattedMessage id="footer.contact_email" />
              </p>
              <p className="text-emerald-300 font-semibold">
                <FormattedMessage id="footer.contact_location" />
              </p>
            </div>

            <button
              className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold tracking-wide hover:bg-emerald-300 transition-colors"
              onClick={() => scrollToSection("contact")}
            >
              <FormattedMessage id="footer.cta" />
            </button>
          </div>
        </div>

        <div className="mt-20 text-center text-xs text-emerald-100/40 tracking-wide">
          © {new Date().getFullYear()} <FormattedMessage id="footer.brand" />{" "}
          <FormattedMessage id="footer.copyright" />
        </div>
      </section>
    </main>
  );
};

export default Page;

/* ────────────────────────────────────────────── */
/*  SMALL COMPONENTS                              */
/* ────────────────────────────────────────────── */

const Bullet = ({ titleId, bodyId }: { titleId: string; bodyId: string }) => (
  <div className="flex items-start gap-3">
    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
    <div>
      <p className="text-sm font-semibold text-emerald-50">
        <FormattedMessage id={titleId} />
      </p>
      <p className="text-xs text-emerald-50/70 mt-1">
        <FormattedMessage id={bodyId} />
      </p>
    </div>
  </div>
);

const TimelineItem = ({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) => {
  const isLeft = side === "left";

  return (
    <div
      data-timeline-item
      data-side={side}
      className="relative flex items-center justify-between gap-10"
    >
      {isLeft ? (
        <>
          <div data-timeline-content className="flex-1 max-w-md text-left">
            {children}
          </div>
          <div
            data-timeline-horizontal
            className="hidden md:block h-[2px] flex-1 bg-emerald-400/40 shadow-[0_0_18px_rgba(52,211,153,0.85)] scale-x-0"
          />
          <div className="hidden md:block flex-1" />
        </>
      ) : (
        <>
          <div className="hidden md:block flex-1" />
          <div
            data-timeline-horizontal
            className="hidden md:block h-[2px] flex-1 bg-emerald-400/40 shadow-[0_0_18px_rgba(52,211,153,0.85)] scale-x-0"
          />
          <div data-timeline-content className="flex-1 max-w-md text-right">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

const ServiceCard = ({
  labelId,
  titleId,
  bodyId,
}: {
  labelId: string;
  titleId: string;
  bodyId: string;
}) => {
  return (
    <div
      data-card
      className="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#020712] via-black to-[#020712] shadow-[0_0_40px_rgba(16,185,129,0.22)] px-5 py-5 transition-transform duration-500 ease-out hover:-translate-y-2 hover:-rotate-2"
    >
      <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
      <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-emerald-500/25 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-emerald-300/80">
          <span>
            <FormattedMessage id={labelId} />
          </span>
          <span className="text-emerald-500/70">
            <FormattedMessage id="footer.brand" defaultMessage="N0HACKS" />
          </span>
        </div>

        <h3 className="text-lg font-semibold text-emerald-50">
          <FormattedMessage id={titleId} />
        </h3>

        <p className="text-sm text-emerald-50/75 leading-relaxed">
          <FormattedMessage id={bodyId} />
        </p>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-emerald-400 via-emerald-400/0 to-transparent opacity-80 group-hover:from-emerald-300 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </div>
  );
};

const CapabilityCard = ({
  titleId,
  bodyId,
  index,
}: {
  titleId: string;
  bodyId: string;
  index: number;
}) => {
  return (
    <div
      data-card
      className="relative group p-8 rounded-2xl bg-[#03140d]/70 backdrop-blur-xl border border-green-400/20 shadow-[0_0_25px_rgba(34,197,94,0.15)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_45px_rgba(34,197,94,0.4)] overflow-hidden"
    >
      <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-md" />
      <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400/60 rounded-tr-md" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400/60 rounded-bl-md" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400/60 rounded-br-md" />

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-emerald-400/10 blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/70">
          {index < 9 ? `0${index + 1}` : index + 1}
        </p>

        <h3 className="text-xl font-semibold text-emerald-50">
          <FormattedMessage id={titleId} />
        </h3>

        <p className="text-sm text-emerald-50/70 leading-relaxed">
          <FormattedMessage id={bodyId} />
        </p>
      </div>
    </div>
  );
};

const CISCOCard = ({
  labelId,
  titleId,
  bodyId,
}: {
  labelId: string;
  titleId: string;
  bodyId: string;
}) => {
  return (
    <div
      data-card
      className="relative group p-8 rounded-2xl bg-[#03140d]/70 backdrop-blur-xl border border-green-400/20 shadow-[0_0_25px_rgba(34,197,94,0.15)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_45px_rgba(34,197,94,0.4)] overflow-hidden"
    >
      <span className="pointer-events-none absolute top-0 left-0 h-12 w-12 border-t border-l border-cyan-400/40 rounded-tl-lg" />
      <span className="pointer-events-none absolute top-0 right-0 h-12 w-12 border-t border-r border-cyan-400/40 rounded-tr-lg" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 border-b border-l border-cyan-400/40 rounded-bl-lg" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b border-r border-cyan-400/40 rounded-br-lg" />

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-cyan-400/10 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">
          <FormattedMessage id={labelId} />
        </p>

        <h3 className="text-2xl font-semibold text-cyan-100 leading-snug">
          <FormattedMessage id={titleId} />
        </h3>

        <p className="text-sm text-cyan-100/70 leading-relaxed">
          <FormattedMessage id={bodyId} />
        </p>
      </div>
    </div>
  );
};

const ContactBullet = ({ id }: { id: string }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
    <span>
      <FormattedMessage id={id} />
    </span>
  </li>
);

const SocialChip = ({ id }: { id: string }) => (
  <div className="w-full px-2 h-10 rounded-lg bg-[#03140d]/70 border border-emerald-400/20 flex items-center justify-center cursor-pointer hover:border-emerald-300/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300">
    <span className="text-emerald-300 text-xs uppercase tracking-wider">
      <FormattedMessage id={id} />
    </span>
  </div>
);
