"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, animate } from "motion/react";

/**
 * Oren Kasauli — Luxury Glassmorphism Buffer Splash Screen
 *
 * Design:
 * - Frosted glass backdrop (backdrop-blur-3xl with subtle ambient video bleed-through)
 * - Centered Oren Kasauli logo with smooth scale entrance
 * - Slogan: "Escape to Luxury and Peace"
 * - Concentric Golden Buffer Animation with orbital rings and subtle radiant pulse
 * - Minimal 0% to 100% progress counter with thin gold progress bar
 * - Seamless glass dissolution revealing the crystal-clear hero video and transparent navbar
 */

const SLOGAN_WORDS = ["Escape", "to", "Luxury", "and", "Peace"];

export default function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);
  const [isWiping, setIsWiping] = useState(false);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  // Handle splash lifecycle & ensure splash appears on refresh
  useEffect(() => {
    try {
      // Detect if user reloaded the page (F5, browser refresh button, etc.)
      const navEntries =
        typeof performance !== "undefined" &&
        performance.getEntriesByType?.("navigation");
      const isReload =
        (navEntries && navEntries[0]?.type === "reload") ||
        (typeof performance !== "undefined" && performance.navigation?.type === 1);

      if (isReload) {
        // User refreshed the page — reset flag so splash screen always plays on refresh
        sessionStorage.removeItem("orenSplashSeen");
      } else {
        // If it's internal route navigation within the same tab, check if already seen
        const alreadySeen = sessionStorage.getItem("orenSplashSeen");
        if (alreadySeen === "true") {
          queueMicrotask(() => setIsActive(false));
          return;
        }
      }

      // Mark as seen for internal client-side navigations
      sessionStorage.setItem("orenSplashSeen", "true");
    } catch {
      // Storage access blocked/private mode — allow graceful execution
    }

    // Clear flag on window reload so splash screen will play on subsequent refreshes
    const handleBeforeUnload = () => {
      try {
        sessionStorage.removeItem("orenSplashSeen");
      } catch {}
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // If reduced motion is requested, dismiss immediately with minimal delay
    if (prefersReducedMotion) {
      const timer = setTimeout(() => setIsActive(false), 200);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        clearTimeout(timer);
      };
    }

    // 1. Progress Counter Animation (0 -> 100%)
    const counterControls = animate(0, 100, {
      duration: 2.4,
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

    // 2. Trigger glass dissolution at 2.4s as counter reaches 100%
    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
    }, 2400);

    // 3. Complete and unmount splash at 3.0s
    const exitTimer = setTimeout(() => {
      setIsActive(false);
    }, 3000);

    // 4. Safe fallback timeout (max 4.0s)
    const maxSafetyTimer = setTimeout(() => {
      setIsActive(false);
    }, 4000);

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
      {/* Full-Screen Frosted Glass Backdrop Overlay */}
      <motion.div
        className="w-full h-full bg-[#0c0a09]/80 backdrop-blur-3xl flex flex-col justify-between items-center px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative overflow-hidden"
        initial={{ opacity: 1 }}
        animate={
          isWiping
            ? {
                opacity: 0,
                backdropFilter: "blur(0px)",
                transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              }
            : { opacity: 1 }
        }
        onAnimationComplete={() => {
          if (isWiping) setIsActive(false);
        }}
      >
        {/* Ambient Warm Golden Aura */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_center,rgba(168,125,36,0.18)_0%,rgba(12,10,9,0)_75%)]"
          aria-hidden="true"
        />

        {/* Subtle Glass Noise/Texture Tint */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] via-transparent to-black/40"
          aria-hidden="true"
        />

        {/* TOP SECTION: Centered Logo & Slogan */}
        <div className="w-full flex flex-col items-center justify-center pt-4 sm:pt-6 md:pt-8 z-10 text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="relative flex items-center justify-center mb-3 sm:mb-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/orenkasauli-logo.png"
              alt="Oren Kasauli Logo"
              width={260}
              height={160}
              loading="eager"
              fetchPriority="high"
              className="w-40 sm:w-52 md:w-60 lg:w-68 max-w-[75vw] h-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none"
            />
          </motion.div>

          {/* Slogan: "Escape to Luxury and Peace" */}
          <motion.h2
            className="font-serif text-[#f8f9f7] text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.24em] sm:tracking-[0.3em] uppercase font-light flex items-center justify-center gap-1.5 sm:gap-2.5 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            initial="hidden"
            animate="visible"
          >
            {SLOGAN_WORDS.map((word, i) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.35 + i * 0.12,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    },
                  },
                }}
                className={
                  word === "Luxury"
                    ? "text-[#c59737] font-normal drop-shadow-[0_0_12px_rgba(197,151,55,0.4)]"
                    : "text-[#f8f9f7]"
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* MIDDLE SECTION: Luxury Glass Buffer Animation */}
        <div className="w-full relative flex items-center justify-center my-auto py-6 sm:py-8 z-10 pointer-events-none">
          {/* Glass Orb Housing */}
          <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]">
            {/* Outer Expanding Radiant Pulse Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#a87d24]/30 pointer-events-none"
              animate={{
                scale: [0.95, 1.45, 1.7],
                opacity: [0.7, 0.25, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#c59737]/20 pointer-events-none"
              animate={{
                scale: [0.95, 1.35, 1.55],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 2.2,
                delay: 0.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Outer Smooth Rotating Golden Buffer Arc */}
            <motion.div
              className="absolute inset-2 sm:inset-3 rounded-full border-2 border-transparent border-t-[#c59737] border-r-[#a87d24]/80 shadow-[0_0_15px_rgba(168,125,36,0.3)]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner Counter-Rotating Luxury Ring */}
            <motion.div
              className="absolute inset-5 sm:inset-7 rounded-full border-2 border-transparent border-b-[#f3d999] border-l-[#8f671b]/60"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Center Brand Emblem: /images/oren1.png */}
            <motion.div
              className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full select-none"
              animate={{
                scale: [0.94, 1.06, 0.94],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Ambient Golden Core Glow */}
              <div
                className="absolute inset-1 rounded-full bg-[#a87d24]/25 blur-md pointer-events-none"
                aria-hidden="true"
              />

              {/* Oren Emblem Logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/oren1.png"
                alt="Oren Kasauli Emblem"
                width={80}
                height={80}
                className="relative w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(197,151,55,0.7)]"
              />
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: Minimal Progress Counter 0 to 100 with Glass Card */}
        <div className="w-full flex flex-col items-center justify-center pb-4 sm:pb-6 md:pb-8 z-10">
          <div className="flex items-center gap-1.5 text-[#a87d24] font-sans font-medium tracking-[0.28em] text-xs sm:text-sm tabular-nums select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            <span ref={counterRef}>0%</span>
          </div>

          {/* Thin Gold Progress Line within Glass Groove */}
          <div
            className="w-36 sm:w-48 md:w-60 h-[2px] bg-white/10 backdrop-blur-md rounded-full overflow-hidden mt-2.5 relative border border-white/5"
            aria-hidden="true"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#8f671b] via-[#c59737] to-[#a87d24] origin-left transform scale-x-0 transition-none shadow-[0_0_8px_rgba(197,151,55,0.6)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
