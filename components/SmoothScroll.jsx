"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user's accessibility reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // 1. Initialize Lenis with luxury hospitality easing
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 2. Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. Smooth Anchor Scroll Interceptor for in-page section links (#about, #services)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70, duration: 1.3 });
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // 4. GSAP ScrollTrigger Declarative Animation Registry
    const ctx = gsap.context(() => {
      // (a) Fade-in and upward movement for text, headings, and paragraphs
      const fadeElements = document.querySelectorAll('[data-gsap="fade-up"]');
      fadeElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // (b) Cinematic image reveal with smooth clip-path and gentle scale-down
      const revealImages = document.querySelectorAll(
        '[data-gsap="image-reveal"]'
      );
      revealImages.forEach((el) => {
        gsap.fromTo(
          el,
          {
            clipPath: "inset(8% 0% 8% 0% round 16px)",
            scale: 1.05,
            opacity: 0.85,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // (c) Staggered entrance for feature lists and card grids
      const staggerGroups = document.querySelectorAll('[data-gsap="stagger"]');
      staggerGroups.forEach((group) => {
        const items = group.children;
        if (!items || items.length === 0) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // (d) Subtle vertical parallax movement on background and scenic photography
      const parallaxElements = document.querySelectorAll(
        '[data-gsap="parallax"]'
      );
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax-speed")) || -10;
        gsap.to(el, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    });

    // 5. Refresh ScrollTrigger after DOM images load and dynamic layout updates
    const onWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onWindowLoad);

    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", onWindowLoad);
      document.removeEventListener("click", handleAnchorClick);
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // On page navigation change: scroll to top and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
