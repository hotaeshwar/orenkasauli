"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, animate } from "motion/react";

/**
 * Oren Kasauli — Luxury Brand Splash Screen with Centered Logo & Dual-Ring Spinner
 *
 * Design:
 * - galler12.jpg background with white light luxury frosted scrim
 * - Concentric dual-ring spinner in forest emerald & champagne gold
 * - Prominent, crystal-clear Oren Kasauli Logo at exact center
 * - Slogan: "Explore to Luxury and Peace"
 * - High-precision 0% -> 100% progress counter
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

    // Fast, crisp 0 -> 100% Progress Animation
    const counterControls = animate(0, 100, {
      duration: 2.2,
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
    }, 2350);

    const exitTimer = setTimeout(() => {
      setIsActive(false);
    }, 2950);

    const maxSafetyTimer = setTimeout(() => {
      setIsActive(false);
    }, 3800);

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
        className="w-full h-full relative flex flex-col justify-between items-center px-4 sm:px-6 py-8 sm:py-10 md:py-12 overflow-hidden text-[#165823]"
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
        {/* 1. galler12.jpg BACKGROUND WITH WHITE LIGHT OVERLAY      */}
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
          {/* Luminous White Light Scrim: Subtle, visible wood ambiance */}
          <div className="absolute inset-0 bg-[#FFF6F6]/82 backdrop-blur-sm pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 pointer-events-none" />
        </div>

        {/* Ambient Warm Golden Center Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[520px] h-80 sm:h-96 md:h-[520px] rounded-full bg-[radial-gradient(circle,rgba(197,167,123,0.25)_0%,rgba(22,88,35,0.08)_45%,transparent_70%)] blur-2xl pointer-events-none z-[1]"
          aria-hidden="true"
        />

        {/* Top Spacer for perfect vertical alignment */}
        <div className="w-full pt-4 sm:pt-6 z-10" />

        {/* ======================================================== */}
        {/* 2. CENTER: DUAL-RING SPINNER WITH LOGO AT CENTER         */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center z-10 text-center my-auto px-4">
          {/* Spinner + Centered Logo Container */}
          <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-4 sm:mb-6">
            {/* Outer Rotating Spinner Ring (Clockwise) */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
              viewBox="0 0 100 100"
              animate={prefersReducedMotion ? false : { rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="splash-spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#165823" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#C5A77B" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#165823" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Faint Guide Ring */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#165823"
                strokeWidth="1.2"
                strokeOpacity="0.12"
              />

              {/* Active Sweeping Gradient Arc */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#splash-spinner-grad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="95 194"
              />

              {/* Accent Leading Bead Node */}
              <circle
                cx="50"
                cy="4"
                r="2.2"
                fill="#C5A77B"
                className="drop-shadow-[0_0_6px_rgba(197,167,123,0.9)]"
              />
            </motion.svg>

            {/* Inner Counter-Rotating Ring (Counter-Clockwise) */}
            <motion.svg
              className="absolute inset-3 sm:inset-4 md:inset-5 w-[calc(100%-24px)] sm:w-[calc(100%-32px)] md:w-[calc(100%-40px)] h-[calc(100%-24px)] sm:h-[calc(100%-32px)] md:h-[calc(100%-40px)] pointer-events-none z-[2]"
              viewBox="0 0 100 100"
              animate={prefersReducedMotion ? false : { rotate: -360 }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              {/* Delicate Dotted Gold Ring */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#C5A77B"
                strokeWidth="1"
                strokeDasharray="3 7"
                strokeOpacity="0.5"
              />
              {/* Secondary Emerald Bead */}
              <circle
                cx="50"
                cy="96"
                r="2"
                fill="#165823"
                className="drop-shadow-[0_0_4px_rgba(22,88,35,0.7)]"
              />
            </motion.svg>

            {/* Soft Ambient Radial Backlight behind the logo */}
            <div
              className="absolute inset-8 sm:inset-10 md:inset-12 rounded-full bg-gradient-to-tr from-[#FFF6F6] via-[#C5A77B]/20 to-[#FFF6F6] backdrop-blur-[2px] shadow-[0_4px_24px_rgba(22,88,35,0.12)] border border-[#165823]/10 z-[3]"
              aria-hidden="true"
            />

            {/* Centered Logo — Crystal Clear, 100% Visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 w-44 sm:w-52 md:w-60 lg:w-64 h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center p-2"
            >
              <Image
                src="/images/deep-teal-logo.png"
                alt="Oren Kasauli Logo"
                width={320}
                height={214}
                priority
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_20px_rgba(22,88,35,0.22)] select-none"
              />
            </motion.div>
          </div>

          {/* Slogan: "Explore to Luxury and Peace" in Cormorant Serif */}
          <motion.h2
            className="font-serif text-[#165823] text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.22em] sm:tracking-[0.28em] uppercase font-normal flex items-center justify-center gap-1.5 sm:gap-2.5 select-none drop-shadow-sm mt-1"
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
                className="text-[#165823]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Golden Underline Accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="w-16 sm:w-24 h-[1.5px] bg-[#C5A77B] rounded-full mt-3 sm:mt-4 mx-auto"
            aria-hidden="true"
          />
        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM SECTION: 0% -> 100% COUNTER & PROGRESS LINE    */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center pb-4 sm:pb-6 md:pb-8 z-10">
          <div className="flex items-center gap-1.5 text-[#165823] font-sans font-medium tracking-[0.28em] text-xs sm:text-sm tabular-nums select-none drop-shadow-sm mb-2">
            <span ref={counterRef}>0%</span>
          </div>

          {/* Thin Progress Line within Frosted Glass Groove */}
          <div
            className="w-36 sm:w-48 md:w-60 h-[2.5px] bg-[#165823]/10 backdrop-blur-md rounded-full overflow-hidden relative border border-[#165823]/15"
            aria-hidden="true"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#165823] via-[#C5A77B] to-[#165823] origin-left transform scale-x-0 transition-none shadow-[0_0_10px_rgba(197,167,123,0.7)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
