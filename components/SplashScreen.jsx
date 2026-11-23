"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, animate } from "motion/react";

/**
 * Oren Kasauli — Luxury Splash Screen
 *
 * Sequence:
 * 1. Logo smoothly glides up from the bottom into center position.
 * 2. Elegant slogan unveils softly beneath it.
 * 3. Loading animation sequence initiates with a sleek linear progress track and live 0% -> 100% counter.
 * 4. Ultra-smooth dissolution exit into the website.
 */

export default function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);
  const [isWiping, setIsWiping] = useState(false);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  // Splash Lifecycle & Sequential Animation
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

    let counterControls = null;

    // Start loading animation sequence AFTER the logo has smoothly arrived from bottom (850ms)
    const startLoadingTimer = setTimeout(() => {
      counterControls = animate(0, 100, {
        duration: 1.85,
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
    }, 850);

    // Smooth curtain dissolve after loading hits 100%
    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
    }, 2850);

    const exitTimer = setTimeout(() => {
      setIsActive(false);
    }, 3450);

    const maxSafetyTimer = setTimeout(() => {
      setIsActive(false);
    }, 4200);

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
                scale: 1.03,
                filter: "blur(4px)",
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

        {/* Ambient Warm Horizon Glow */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-72 bg-gradient-to-r from-transparent via-[#103430]/[0.06] to-transparent pointer-events-none z-[1]"
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
        {/* 2. CENTER: LOGO GLIDING SMOOTHLY FROM BOTTOM             */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center z-10 text-center my-auto px-4 max-w-lg">
          {/* Logo coming smoothly from the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-52 sm:w-64 md:w-72 lg:w-80 h-28 sm:h-34 md:h-38 flex items-center justify-center p-2 mb-2 sm:mb-3"
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
          </motion.div>

          {/* Slogan: "Explore to Luxury and Peace" in Cormorant Serif */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="font-serif text-[#103430] text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.24em] sm:tracking-[0.28em] uppercase font-normal select-none drop-shadow-sm"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Explore to Luxury and Peace
          </motion.h2>

          {/* Divider accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="w-16 sm:w-24 h-[1.5px] bg-[#103430]/35 rounded-full mt-3 sm:mt-4"
            aria-hidden="true"
          />

          {/* ======================================================== */}
          {/* 3. THEN LOADING ANIMATION (APPEARS SEQUENTIALLY)         */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xs sm:max-w-sm flex flex-col items-center mt-8 sm:mt-10"
          >
            {/* Status & Live Numerical Percentage Counter */}
            <div className="w-full flex items-center justify-between text-[#103430]/75 font-sans font-medium text-[10px] sm:text-[11px] tracking-[0.22em] uppercase select-none mb-2 px-1">
              <span>Loading Experience</span>
              <span ref={counterRef} className="tabular-nums font-semibold text-[#103430]">
                0%
              </span>
            </div>

            {/* Smooth Linear Progress Horizon Bar */}
            <div
              className="w-full h-[2.5px] bg-[#103430]/15 backdrop-blur-sm rounded-full overflow-hidden relative"
              aria-hidden="true"
            >
              <div
                ref={progressBarRef}
                className="h-full w-full bg-gradient-to-r from-[#103430] via-[#1a4e47] to-[#103430] origin-left transform scale-x-0 transition-none shadow-[0_0_8px_rgba(16,52,48,0.4)]"
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
