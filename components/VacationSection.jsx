"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-27&checkout=2026-10-28&adults=2&children=0";

const TYPEWRITER_TEXT = "LET THE HILLS SET THE PACE";

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
    <section className="relative w-full bg-[#FFF6F6] text-[#103430] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden border-t border-[#e2d8c7]">
      {/* Ambient Resort Background with White Light Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/gallery/galler12.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#FFF6F6]/82 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 pointer-events-none" />
      </div>

      {/* Subtle Warm Luxury Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-gradient-to-b from-[#C5A77B]/15 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Header Block with Smooth Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Eyebrow: DISCOVER KASAULI */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span
              className="w-10 sm:w-14 h-[2px] bg-[#C5A77B] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#C5A77B] select-none"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              DISCOVER KASAULI
            </span>
            <span
              className="w-10 sm:w-14 h-[2px] bg-[#C5A77B] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Main Heading: Let the Hills Set the Pace */}
          <h2
            className="font-serif text-[#103430] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight text-center break-words mb-4 sm:mb-6 w-full select-none"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="sr-only">{TYPEWRITER_TEXT}</span>
            <span aria-hidden="true" className="inline relative">
              <span>{currentHeadingText}</span>
              <span
                className="inline-block w-[2px] sm:w-[3px] h-[0.8em] bg-[#C5A77B] ml-1 sm:ml-1.5 align-middle animate-pulse"
                aria-hidden="true"
              />
              <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
                {TYPEWRITER_TEXT.slice(charIndex)}
              </span>
            </span>
          </h2>

          {/* Destination Description Paragraphs */}
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-[#103430] leading-relaxed font-normal tracking-normal mb-8 sm:mb-10">
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}>
              A charming hill station in Himachal Pradesh, Kasauli is known for its scenic landscapes, colonial-era charm and peaceful surroundings.
            </p>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}>
              Spend your days exploring the town, discovering its local attractions or simply enjoying the beauty of the hills. And when it is time to slow down, return to the comfort and warm hospitality of OREN.
            </p>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}>
              Make your visit to Kasauli more than just a trip. Make it a stay worth remembering.
            </p>
          </div>

          {/* CTA: EXPLORE KASAULI */}
          <div className="mb-12 sm:mb-16">
            <a
              href="/blog"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase whitespace-nowrap text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.35)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.16em] cursor-pointer overflow-hidden"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              aria-label="Explore Kasauli"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10 font-semibold">EXPLORE KASAULI</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 ml-0.5 text-[#FFF6F6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* 6. FINAL BOOKING CTA BANNER                              */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
        >
          {/* Ambient Glow Aura behind the pill */}
          <div
            className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#103430]/20 via-[#C5A77B]/25 to-[#103430]/20 rounded-3xl sm:rounded-[40px] md:rounded-full blur-xl -z-10 opacity-75 pointer-events-none"
            aria-hidden="true"
          />

          {/* Elegant Forest Green Capsule Container */}
          <div className="relative w-full bg-[#103430] text-[#FFF6F6] rounded-3xl sm:rounded-[36px] md:rounded-full px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 py-6 sm:py-7 md:py-8 lg:py-10 shadow-[0_20px_50px_rgba(16, 52, 48,0.3),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-[#C5A77B]/40 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-6 lg:gap-8">
            {/* Top Specular Sheen (Subtle Glass Reflection) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/20 pointer-events-none rounded-3xl sm:rounded-[36px] md:rounded-full"
              aria-hidden="true"
            />

            {/* Left Side: Your Kasauli Getaway Begins at OREN */}
            <div className="relative z-10 text-center md:text-left flex-1 min-w-0">
              <h3
                className="font-serif text-xl sm:text-2xl md:text-2xl lg:text-[28px] xl:text-[32px] font-normal tracking-[0.02em] leading-snug sm:leading-tight text-[#FFF6F6] mb-1.5"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Your Kasauli Getaway Begins at OREN
              </h3>
              <p
                className="font-sans text-xs sm:text-sm text-white/90 font-light leading-relaxed max-w-xl"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Beautiful views, comfortable stays and experiences worth looking forward to. Plan your next visit to the hills with OREN Kasauli.
              </p>
            </div>

            {/* Right Side: BOOK YOUR STAY CTA Button */}
            <div className="relative z-10 flex-shrink-0 w-full sm:w-auto flex justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap text-[#103430] bg-[#FFF6F6] hover:bg-white border border-white shadow-[0_6px_22px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_36px_rgba(255,255,255,0.4)] hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-95 transition-all duration-300 px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.16em] cursor-pointer select-none overflow-hidden text-center"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                aria-label="Book Your Stay at Oren Kasauli"
              >
                {/* Specular Shimmer Sweep Effect */}
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                  aria-hidden="true"
                />

                <span className="relative z-10 font-bold tracking-[0.16em]">
                  BOOK YOUR STAY
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 ml-0.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 text-[#103430]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
