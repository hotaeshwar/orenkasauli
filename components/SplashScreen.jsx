"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, animate } from "motion/react";

/**
 * Oren Kasauli — Fast Luxury Splash Screen
 *
 * Fast & Responsive Sequence:
 * 1. Immediate ivory background paint (0ms blank/delay).
 * 2. Rapid, silky logo upward glide (0.5s) with specular shimmer.
 * 3. Instant counter & progress bar starts right away (0% → 100% in 1.1s).
 * 4. Crisp, elegant dissolution into the website (~1.7s total duration).
 */

export default function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);
  const [isWiping, setIsWiping] = useState(false);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  // Splash Lifecycle & Fast Responsive Animation
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
      const timer = setTimeout(() => setIsActive(false), 150);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        clearTimeout(timer);
      };
    }

    let counterControls = null;

    // Start loading counter immediately with zero hesitation (100ms)
    const startLoadingTimer = setTimeout(() => {
      counterControls = animate(0, 100, {
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1],
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
    }, 100);

    // Smooth curtain dissolve promptly after 100% completion (1.35s)
    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
    }, 1350);

    // End splash and reveal website completely (1.75s)
    const exitTimer = setTimeout(() => {
      setIsActive(false);
    }, 1750);

    // Safety fallback timer (2.2s)
    const maxSafetyTimer = setTimeout(() => {
      setIsActive(false);
    }, 2200);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearTimeout(startLoadingTimer);
      if (counterControls) counterControls.stop();
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
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden bg-[#FFF6F6]"
    >
      {/* Outer Dissolution Wrapper */}
      <motion.div
        className="w-full h-full relative flex flex-col justify-between items-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 overflow-hidden text-[#103430]"
        initial={{ opacity: 1 }}
        animate={
          isWiping
            ? {
                opacity: 0,
                scale: 1.03,
                filter: "blur(5px)",
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        onAnimationComplete={() => {
          if (isWiping) setIsActive(false);
        }}
      >
        {/* ======================================================== */}
        {/* 1. CINEMATIC AMBIENT RESORT BACKGROUND                   */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/gallery/galler12.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          {/* Frosted Ivory Scrim */}
          <div className="absolute inset-0 bg-[#FFF6F6]/88 backdrop-blur-[5px] pointer-events-none" />
          <div className="absolute inset-0 bg-stone-900/5 pointer-events-none" />
        </div>

        {/* Ambient Warm Golden-Emerald Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] h-[450px] bg-[radial-gradient(circle_at_50%_50%,rgba(16,52,48,0.08)_0%,rgba(197,167,123,0.06)_40%,transparent_75%)] pointer-events-none blur-2xl z-[1]"
          aria-hidden="true"
        />

        {/* Top Eyebrow Tag: Kasauli • Himachal Pradesh */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
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
        {/* 2. CENTER: LOGO GLIDING SMOOTHLY FROM BOTTOM             */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center z-10 text-center my-auto px-4 max-w-lg">
          {/* Logo coming smoothly and rapidly from bottom with Specular Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-52 sm:w-64 md:w-72 lg:w-80 h-28 sm:h-34 md:h-38 flex items-center justify-center p-2 mb-2 sm:mb-3 overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/deep-teal-logo.png"
              alt="Oren Kasauli Logo"
              width={360}
              height={240}
              priority
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_24px_rgba(16,52,48,0.18)] select-none"
            />
            {/* Specular Shimmer Sweep Effect Across Logo */}
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "180%" }}
              transition={{ delay: 0.25, duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Slogan: "Explore to Luxury and Peace" in Cormorant Serif */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[#103430] text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.24em] sm:tracking-[0.28em] uppercase font-normal select-none drop-shadow-sm"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Explore to Luxury and Peace
          </motion.h2>

          {/* Elegant Expanding Center Hairline Accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="w-16 sm:w-24 h-[1.5px] bg-[#103430]/35 rounded-full mt-3 sm:mt-4"
            aria-hidden="true"
          />

          {/* ======================================================== */}
          {/* 3. SLEEK ARCHITECTURAL HORIZON LOADER (STARTS AT ONCE)   */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xs sm:max-w-sm flex flex-col items-center mt-7 sm:mt-9"
          >
            {/* Status & Live Numerical Percentage Counter */}
            <div className="w-full flex items-center justify-between text-[#103430]/75 font-sans font-medium text-[10px] sm:text-[11px] tracking-[0.22em] uppercase select-none mb-2 px-1">
              <span>Loading Experience</span>
              <span ref={counterRef} className="tabular-nums font-semibold text-[#103430]">
                0%
              </span>
            </div>

            {/* Architectural Hairline Progress Track */}
            <div
              className="w-full h-[2px] bg-[#103430]/15 backdrop-blur-sm rounded-full overflow-hidden relative"
              aria-hidden="true"
            >
              <div
                ref={progressBarRef}
                className="h-full w-full bg-gradient-to-r from-[#103430] via-[#1a4e47] to-[#103430] origin-left transform scale-x-0 transition-none shadow-[0_0_8px_rgba(16,52,48,0.5)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacer for balanced layout across mobile and desktop */}
        <div className="w-full pb-2 z-10" />
      </motion.div>
    </div>
  );
}
