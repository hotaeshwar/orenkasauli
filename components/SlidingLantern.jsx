"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * SlidingLantern Component
 *
 * Premium Animated Traditional Hanging Lantern:
 * - Handcrafted antique-gold & brass metallic frame with illuminated warm amber glass
 * - Spring-based horizontal travel between navbar links
 * - Realistic pendulum swing with inertia-based movement reaction
 * - Soft ambient glowing halo and warm downward light cone
 * - Fully accessible and responsive with prefers-reduced-motion support
 */
export default function SlidingLantern({
  isMobile = false,
  slideDirection = 0, // -1 (moving left), 0 (idle), 1 (moving right)
  isScrolled = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  // Dynamic swing keyframes - reduced for subtle, elegant mountain luxury motion
  const swingKeyframes = shouldReduceMotion
    ? [0, 0]
    : slideDirection === 1
    ? [0, -1.8, 1.0, -0.4, 0] // Sliding right -> subtle tilt, settles smoothly
    : slideDirection === -1
    ? [0, 1.8, -1.0, 0.4, 0] // Sliding left -> subtle tilt, settles smoothly
    : [-0.75, 0.75, -0.75]; // Micro resting idle breeze sway

  const swingTransition = shouldReduceMotion
    ? { duration: 0 }
    : slideDirection !== 0
    ? { duration: 0.55, ease: "easeOut" }
    : { duration: 4.2, repeat: Infinity, ease: "easeInOut" };

  // ========================================================
  // MOBILE / TABLET DRAWER LANTERN INDICATOR
  // ========================================================
  if (isMobile) {
    return (
      <div className="relative flex items-center justify-center pointer-events-none select-none">
        {/* Soft Ambient Glow behind Mobile Lantern */}
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(16,52,48,0.35)_0%,rgba(52,211,153,0.15)_40%,transparent_75%)] blur-sm"
          aria-hidden="true"
        />

        {/* Gently Swinging Mobile Lantern */}
        <motion.div
          animate={{ rotate: shouldReduceMotion ? 0 : [-0.75, 0.75, -0.75] }}
          transition={{
            duration: 4.2,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top center" }}
          className="relative w-5 h-8 flex-shrink-0"
        >
          <Image
            suppressHydrationWarning
            src="/assets/lantern.svg"
            alt="Active Navigation Lantern Indicator"
            width={20}
            height={32}
            style={{ width: "auto", height: "auto" }}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(16, 52, 48,0.4)]"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    );
  }

  // ========================================================
  // DESKTOP HORIZONTAL SLIDING LANTERN
  // ========================================================
  return (
    <div className="relative flex flex-col items-center pointer-events-none select-none">
      {/* Top Sliding Green Ring (Mounts seamlessly to the top guide rail) */}
      <div className="w-2 h-1.5 rounded-full border-[1.5px] border-[#103430] bg-[#103430] shadow-sm flex items-center justify-center -mb-[2px] z-20">
        <span className="w-0.5 h-0.5 rounded-full bg-emerald-300" />
      </div>

      {/* Hanging Chain & Swinging Lantern Container (Pivots from the top ring) */}
      <motion.div
        animate={{ rotate: swingKeyframes }}
        transition={swingTransition}
        style={{ transformOrigin: "top center" }}
        className="relative flex flex-col items-center"
      >
        {/* Compact Chain */}
        <div className="w-[1px] h-2 sm:h-2.5 shadow-sm bg-gradient-to-b from-[#103430] via-[#34d399] to-[#103430]" />

        {/* Ambient Subtle Light Aura */}
        <motion.div
          animate={
            shouldReduceMotion
              ? false
              : {
                  opacity: isScrolled ? [0.2, 0.35, 0.2] : [0.35, 0.55, 0.35],
                  scale: [0.98, 1.02, 0.98],
                }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1 w-10 h-10 -translate-y-1 rounded-full blur-md pointer-events-none bg-[radial-gradient(circle,rgba(52,211,153,0.3)_0%,rgba(16, 52, 48,0.15)_40%,transparent_75%)]"
          aria-hidden="true"
        />

        {/* Scaled-down, Refined Lantern Graphic */}
        <div className="relative w-5 h-8 xl:w-5.5 xl:h-[34px] flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <Image
            suppressHydrationWarning
            src="/assets/lantern.svg"
            alt="Active Navigation Lantern"
            width={24}
            height={36}
            style={{ width: "auto", height: "auto" }}
            className={`w-full h-full object-contain filter ${
              isScrolled
                ? "drop-shadow-[0_0_6px_rgba(16, 52, 48,0.4)]"
                : "drop-shadow-[0_0_8px_rgba(255,160,30,0.5)]"
            }`}
            priority
            unoptimized
          />
        </div>

        {/* Downward Light Spotlight onto Active Link Text */}
        <motion.div
          animate={
            shouldReduceMotion
              ? false
              : {
                  opacity: [0.35, 0.6, 0.35],
                }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1.5 w-10 h-3.5 blur-[2px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.35)_0%,rgba(16, 52, 48,0.08)_50%,transparent_80%)]"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

