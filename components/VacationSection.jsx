"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-27&checkout=2026-10-28&adults=2&children=0";

const TYPEWRITER_TEXT = "ENJOY YOUR HOLIDAYS";

export default function VacationSection() {
  // Looping Typewriter Effect for "ENJOY YOUR HOLIDAYS" (types, pauses, erases, and repeats)
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 110);
      } else {
        // Hold full phrase for 2.4 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 55);
      } else {
        // Pause briefly before typing again
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  const currentHeadingText = TYPEWRITER_TEXT.slice(0, charIndex);

  return (
    <section className="relative w-full bg-[#ffffff] text-neutral-900 py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden border-t border-neutral-100">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Logo Emblem & Header Block with Smooth Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Golden Circular Logo Emblem (oren1.png) */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-3 sm:mb-4 select-none drop-shadow-sm">
            <Image
              src="/images/oren1.png"
              alt="Oren Kasauli Logo Emblem"
              width={81}
              height={79}
              priority={false}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Eyebrow: A BEAUTIFUL VACATION DESTINATION */}
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.28em] text-[#a87d24] uppercase font-sans mb-3 sm:mb-4">
            A BEAUTIFUL VACATION DESTINATION
          </span>

          {/* Main Heading: ENJOY YOUR HOLIDAYS with Typewriter Effect */}
          <h2
            className="font-serif text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] leading-tight min-h-[1.25em] flex items-center justify-center break-words mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="sr-only">ENJOY YOUR HOLIDAYS</span>
            <span aria-hidden="true">{currentHeadingText}</span>
            <span
              className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.8em] bg-[#a87d24] ml-2 animate-pulse align-middle"
              aria-hidden="true"
            />
          </h2>

          {/* Subtitle Paragraph */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-14 md:mb-16">
            Enjoy a luxurious weekend dedicated to helping you unwind from the stress of daily work.
          </p>
        </motion.div>

        {/* Floating Capsule / Pill Banner with Golden Glassmorphism Effect */}
        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
        >
          {/* Ambient Glow Aura behind the glass pill */}
          <div
            className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#d4a949]/35 via-[#a87d24]/30 to-[#8c641a]/35 rounded-3xl sm:rounded-[40px] md:rounded-full blur-xl -z-10 opacity-75 pointer-events-none"
            aria-hidden="true"
          />

          {/* Golden Glass Capsule Container */}
          <div className="relative w-full bg-gradient-to-r from-[#b3882f]/85 via-[#a87d24]/90 to-[#886216]/90 backdrop-blur-xl sm:backdrop-blur-2xl backdrop-saturate-150 text-white rounded-3xl sm:rounded-[36px] md:rounded-full px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-6 sm:py-7 md:py-8 lg:py-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),_inset_0_-1px_2px_rgba(0,0,0,0.15),_0_20px_50px_rgba(168,125,36,0.3)] border border-white/35 sm:border-[#ffe8a8]/40 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-6 lg:gap-8">
            {/* Top Specular Sheen (Glass Reflection) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none rounded-3xl sm:rounded-[36px] md:rounded-full"
              aria-hidden="true"
            />

            {/* Left Side: Reserve your spot now, to enjoy tranquility later */}
            <div className="relative z-10 text-left text-center md:text-left flex-1 min-w-0">
              <h3 className="font-sans text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-bold tracking-normal leading-snug sm:leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <span>Reserve your spot now, to</span>
                <br className="hidden sm:inline" />
                <span className="sm:ml-0.5"> enjoy tranquility later</span>
              </h3>
            </div>

            {/* Right Side: BOOK YOUR ROOM NOW White Pill Button with Rich Hover Animation */}
            <div className="relative z-10 flex-shrink-0 w-full sm:w-auto flex justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase whitespace-nowrap text-[#8c641a] hover:text-neutral-950 bg-white hover:bg-neutral-50 shadow-[0_6px_22px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.32)] hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-95 transition-all duration-300 px-6 sm:px-8 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-3.5 lg:py-4 text-xs sm:text-xs md:text-xs lg:text-sm tracking-[0.12em] lg:tracking-[0.14em] cursor-pointer select-none overflow-hidden text-center"
                aria-label="Book Your Room Now at Oren Kasauli"
              >
                {/* Subtle Shimmer Sweep Effect across the button on hover */}
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                  aria-hidden="true"
                />

                <span className="relative z-10 font-bold tracking-[0.15em]">
                  BOOK YOUR ROOM NOW
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 ml-0.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 text-[#a87d24] group-hover:text-neutral-950" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
