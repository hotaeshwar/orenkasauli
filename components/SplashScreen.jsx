"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, animate } from "motion/react";

/**
 * Oren Kasauli — Architectural Luxury Splash Screen
 *
 * Design Direction:
 * - Completely NON-ROUNDED, modern architectural linear motion.
 * - Ambient resort photography background with luminous frosted ivory scrim.
 * - Geometric architectural portal frame with expanding horizon light beam.
 * - Crystal-clear, high-definition Oren Kasauli Logo with specular shimmer sweep.
 * - Word-by-word Cormorant Garamond typography reveal: "Explore to Luxury and Peace".
 * - Minimalist linear horizon progress bar & precision numerical percentage counter.
 * - Media-responsive across all screen sizes (mobile, tablet, desktop).
 */

const SLOGAN_WORDS = ["Explore", "to", "Luxury", "and", "Peace"];

export default function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);
  const [isWiping, setIsWiping] = useState(false);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  // Splash Lifecycle & Progress Counter
  useEffect(() => {
    try {
      const navEntries =
        typeof performance !== "undefined" &&
        performance.getEntriesByType?.("navigation");
      const isReload =
        (navEntries && navEntries[0]?.type === "reload") ||
        (typeof performance !== "undefined" && performance.navigation?.type === 1);

      if (isReload) {
        sessionStorage.removeItem("orenSplashSeen");
      } else {
        const alreadySeen = sessionStorage.getItem("orenSplashSeen");
        if (alreadySeen === "true") {
          queueMicrotask(() => setIsActive(false));
          return;
        }
      }
      sessionStorage.setItem("orenSplashSeen", "true");
    } catch {
      // Storage blocked in private mode
    }

    const handleBeforeUnload = () => {
      try {
        sessionStorage.removeItem("orenSplashSeen");
      } catch {}
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    if (prefersReducedMotion) {
      const timer = setTimeout(() => setIsActive(false), 200);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        clearTimeout(timer);
      };
    }

    // Smooth, cinematic 0% -> 100% Progress Animation
    const counterControls = animate(0, 100, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const val = Math.round(latest);
        if (counterRef.current) {
          counterRef.current.textContent = `${val}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${latest / 100})`;
        }
      },
    });

    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
    }, 2250);

    const exitTimer = setTimeout(() => {
      setIsActive(false);
    }, 2850);

    const maxSafetyTimer = setTimeout(() => {
      setIsActive(false);
    }, 3600);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      counterControls.stop();
      clearTimeout(wipeTimer);
      clearTimeout(exitTimer);
      clearTimeout(maxSafetyTimer);
    };
  }, [prefersReducedMotion]);

  if (!isActive) return null;

  return (
    <div
      id="oren-splash-screen"
      aria-label="Oren Kasauli Welcome Intro"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Outer Dissolution Wrapper */}
      <motion.div
        className="w-full h-full relative flex flex-col justify-between items-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 overflow-hidden text-[#103430]"
        initial={{ opacity: 1 }}
        animate={
          isWiping
            ? {
                opacity: 0,
                scale: 1.04,
                filter: "blur(6px)",
                transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        onAnimationComplete={() => {
          if (isWiping) setIsActive(false);
        }}
      >
        {/* ======================================================== */}
        {/* 1. galler12.jpg AMBIENT RESORT BACKGROUND                */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <Image
            src="/images/gallery/galler12.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Frosted Ivory Scrim */}
          <div className="absolute inset-0 bg-[#FFF6F6]/85 backdrop-blur-[4px] pointer-events-none" />
          <div className="absolute inset-0 bg-stone-900/5 pointer-events-none" />
        </div>

        {/* Ambient Linear Horizon Glow (Non-rounded) */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-64 bg-gradient-to-r from-transparent via-[#103430]/[0.06] to-transparent pointer-events-none z-[1]"
          aria-hidden="true"
        />

        {/* Top Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="z-10 flex items-center justify-center gap-3 text-[#103430]/75"
        >
          <span className="w-8 sm:w-12 h-[1px] bg-[#103430]/30" />
          <span
            className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
          >
            Kasauli • Himachal Pradesh
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#103430]/30" />
        </motion.div>

        {/* ======================================================== */}
        {/* 2. CENTER: ARCHITECTURAL LINEAR EMBLEM (NO ROUND SPINNER) */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center z-10 text-center my-auto px-4 max-w-xl">
          {/* Architectural Gate / Portal Frame */}
          <div className="relative w-full max-w-md sm:max-w-lg flex flex-col items-center justify-center py-6 sm:py-8 px-6 sm:px-10">
            {/* Top Horizon Line expanding smoothly from center */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 inset-x-8 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#103430]/35 to-transparent"
              aria-hidden="true"
            />

            {/* Corner Architectural Notches */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -top-1 left-8 sm:left-12 w-2 h-2 border-t border-l border-[#103430]/40"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -top-1 right-8 sm:right-12 w-2 h-2 border-t border-r border-[#103430]/40"
              aria-hidden="true"
            />

            {/* Frosted Glass Emblem Panel with Subtle Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-5 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-[#103430]/15 shadow-[0_12px_36px_rgba(16,52,48,0.08)] flex flex-col items-center overflow-hidden w-full"
            >
              {/* Shimmer Light Sweep across the logo */}
              <motion.div
                initial={{ x: "-150%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                aria-hidden="true"
              />

              {/* Centered Logo — 100% Crystal Clear */}
              <div className="relative w-44 sm:w-56 md:w-64 h-24 sm:h-28 md:h-32 flex items-center justify-center">
                <Image
                  src="/images/deep-teal-logo.png"
                  alt="Oren Kasauli Logo"
                  width={340}
                  height={226}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(16,52,48,0.14)] select-none"
                />
              </div>
            </motion.div>

            {/* Bottom Architectural Notches */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -bottom-1 left-8 sm:left-12 w-2 h-2 border-b border-l border-[#103430]/40"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -bottom-1 right-8 sm:right-12 w-2 h-2 border-b border-r border-[#103430]/40"
              aria-hidden="true"
            />

            {/* Bottom Horizon Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 inset-x-8 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#103430]/35 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Slogan: "Explore to Luxury and Peace" in Cormorant Serif */}
          <motion.h2
            className="font-serif text-[#103430] text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.24em] sm:tracking-[0.28em] uppercase font-normal flex items-center justify-center gap-1.5 sm:gap-2.5 select-none drop-shadow-sm mt-5 sm:mt-6"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            initial="hidden"
            animate="visible"
          >
            {SLOGAN_WORDS.map((word, i) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      delay: 0.2 + i * 0.08,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    },
                  },
                }}
                className="text-[#103430]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM SECTION: MINIMALIST LINEAR PROGRESS HORIZON    */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center pb-2 sm:pb-4 z-10 max-w-xs sm:max-w-sm">
          {/* Numerical Counter & Status */}
          <div className="w-full flex items-center justify-between text-[#103430]/80 font-sans font-medium text-[11px] sm:text-xs tracking-[0.2em] uppercase select-none mb-2 px-1">
            <span>Loading Experience</span>
            <span ref={counterRef} className="tabular-nums font-semibold text-[#103430]">
              0%
            </span>
          </div>

          {/* Linear Progress Bar with Frosted Track */}
          <div
            className="w-full h-[3px] bg-[#103430]/10 backdrop-blur-sm rounded-none overflow-hidden relative"
            aria-hidden="true"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#103430] via-[#1a4e47] to-[#103430] origin-left transform scale-x-0 transition-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
