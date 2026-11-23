"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, animate } from "motion/react";

/**
 * Oren Kasauli — Revamped Luxury Splash Screen
 *
 * Visual Highlights:
 * - Ambient resort photography backdrop with luminous ivory light scrim
 * - Concentric twin-orbital rings in signature deep spruce green (#103430)
 * - Crystal-clear, high-definition centered Oren Kasauli Logo
 * - Word-by-word Cormorant Garamond slogan reveal: "Explore to Luxury and Peace"
 * - High-precision 0% -> 100% progress counter & sleek progress line
 * - Fully responsive across mobile, tablet, and desktop
 * - Smooth cinematic dissolution exit
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
      {/* Container with Smooth Dissolution Transition */}
      <motion.div
        className="w-full h-full relative flex flex-col justify-between items-center px-4 sm:px-6 py-6 sm:py-10 md:py-12 overflow-hidden text-[#103430]"
        initial={{ opacity: 1 }}
        animate={
          isWiping
            ? {
                opacity: 0,
                scale: 1.03,
                transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              }
            : { opacity: 1, scale: 1 }
        }
        onAnimationComplete={() => {
          if (isWiping) setIsActive(false);
        }}
      >
        {/* ======================================================== */}
        {/* 1. galler12.jpg BACKGROUND WITH LIGHT OVERLAY            */}
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
          {/* Luminous Warm Light Scrim: Crisp contrast with subtle resort ambiance */}
          <div className="absolute inset-0 bg-[#FFF6F6]/80 backdrop-blur-[3px] pointer-events-none" />
          <div className="absolute inset-0 bg-stone-900/5 pointer-events-none" />
        </div>

        {/* Ambient Center Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 md:w-[500px] h-72 sm:h-96 md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,52,48,0.12)_0%,rgba(16,52,48,0.03)_50%,transparent_75%)] blur-2xl pointer-events-none z-[1]"
          aria-hidden="true"
        />

        {/* Top Spacer for balanced vertical alignment */}
        <div className="w-full pt-2 sm:pt-4 z-10" />

        {/* ======================================================== */}
        {/* 2. CENTER: DUAL-RING SPINNER WITH LOGO AT CENTER         */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center z-10 text-center my-auto px-4 max-w-lg">
          {/* Spinner + Centered Logo Container */}
          <div className="relative flex items-center justify-center w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 lg:w-88 lg:h-88 mb-3 sm:mb-5">
            {/* Outer Rotating Spinner Ring (Clockwise) */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
              viewBox="0 0 100 100"
              animate={prefersReducedMotion ? false : { rotate: 360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="splash-spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#103430" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#1a4e47" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#103430" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Faint Guide Ring */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#103430"
                strokeWidth="1.2"
                strokeOpacity="0.15"
              />

              {/* Active Sweeping Gradient Arc */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#splash-spinner-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="95 194"
              />

              {/* Accent Leading Bead Node */}
              <circle
                cx="50"
                cy="4"
                r="2.4"
                fill="#103430"
                className="drop-shadow-[0_0_6px_rgba(16,52,48,0.8)]"
              />
            </motion.svg>

            {/* Inner Counter-Rotating Ring (Counter-Clockwise) */}
            <motion.svg
              className="absolute inset-2.5 sm:inset-3.5 md:inset-4.5 w-[calc(100%-20px)] sm:w-[calc(100%-28px)] md:w-[calc(100%-36px)] h-[calc(100%-20px)] sm:h-[calc(100%-28px)] md:h-[calc(100%-36px)] pointer-events-none z-[2]"
              viewBox="0 0 100 100"
              animate={prefersReducedMotion ? false : { rotate: -360 }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              {/* Delicate Dotted Spruce Ring */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#103430"
                strokeWidth="1"
                strokeDasharray="3 7"
                strokeOpacity="0.35"
              />
              {/* Secondary Accent Bead */}
              <circle
                cx="50"
                cy="96"
                r="2"
                fill="#103430"
                className="drop-shadow-[0_0_4px_rgba(16,52,48,0.6)]"
              />
            </motion.svg>

            {/* Soft Ambient Radial Backlight behind the logo */}
            <div
              className="absolute inset-6 sm:inset-8 md:inset-10 rounded-full bg-gradient-to-tr from-[#FFF6F6] via-white/70 to-[#FFF6F6] backdrop-blur-[2px] shadow-[0_4px_24px_rgba(16,52,48,0.08)] border border-[#103430]/10 z-[3]"
              aria-hidden="true"
            />

            {/* Centered Logo — Crystal Clear, 100% Visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 w-36 sm:w-48 md:w-56 lg:w-60 h-20 sm:h-26 md:h-30 lg:h-34 flex items-center justify-center p-2"
            >
              <Image
                src="/images/deep-teal-logo.png"
                alt="Oren Kasauli Logo"
                width={320}
                height={214}
                priority
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_18px_rgba(16,52,48,0.18)] select-none"
              />
            </motion.div>
          </div>

          {/* Slogan: "Explore to Luxury and Peace" in Cormorant Serif */}
          <motion.h2
            className="font-serif text-[#103430] text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.22em] sm:tracking-[0.28em] uppercase font-normal flex items-center justify-center gap-1.5 sm:gap-2.5 select-none drop-shadow-sm mt-1"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            initial="hidden"
            animate="visible"
          >
            {SLOGAN_WORDS.map((word, i) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      delay: 0.15 + i * 0.08,
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

          {/* Spruce Underline Accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="w-16 sm:w-24 h-[1.5px] bg-[#103430]/40 rounded-full mt-3 sm:mt-4 mx-auto"
            aria-hidden="true"
          />
        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM SECTION: 0% -> 100% COUNTER & PROGRESS LINE    */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center pb-3 sm:pb-6 md:pb-8 z-10">
          <div className="flex items-center gap-1.5 text-[#103430] font-sans font-medium tracking-[0.28em] text-xs sm:text-sm tabular-nums select-none drop-shadow-sm mb-2">
            <span ref={counterRef}>0%</span>
          </div>

          {/* Thin Progress Line within Frosted Glass Groove */}
          <div
            className="w-36 sm:w-48 md:w-60 h-[2.5px] bg-[#103430]/10 backdrop-blur-md rounded-full overflow-hidden relative border border-[#103430]/15"
            aria-hidden="true"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#103430] via-[#1a4e47] to-[#103430] origin-left transform scale-x-0 transition-none shadow-[0_0_8px_rgba(16,52,48,0.5)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
