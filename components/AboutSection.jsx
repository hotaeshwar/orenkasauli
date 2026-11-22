"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

const TYPEWRITER_TEXT = "Your Mountain Retreat in Kasauli";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Looping Typewriter Effect (types, pauses, erases, repeats)
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 110);
      } else {
        // Hold full phrase for 2.6 seconds so guests can comfortably read it
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 55);
      } else {
        // Brief pause before typing again
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, shouldReduceMotion]);

  const currentHeadingText = shouldReduceMotion
    ? TYPEWRITER_TEXT
    : TYPEWRITER_TEXT.slice(0, charIndex);

  const ghostRemainder = shouldReduceMotion
    ? ""
    : TYPEWRITER_TEXT.slice(charIndex);

  // Ensure autoplay on all browsers including mobile/iOS
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#FFF6F6] text-[#165823] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10 border-t border-[#e2d8c7]"
    >
      {/* Ambient Resort Background with White Light Overlay — Desktop & Tablet */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Text Content & Book Your Stay CTA */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start">
            {/* Eyebrow Label: Appears first when scrolling into view */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.15, ease: "easeOut" }}
              className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4"
            >
              <span
                className="w-10 sm:w-14 h-[2px] bg-[#C5A77B] rounded-full flex-shrink-0"
                aria-hidden="true"
              />
              <span
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#C5A77B]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                ABOUT US
              </span>
            </motion.div>

            {/* Main Heading: Your Mountain Retreat in Kasauli with Zero-Layout-Shift Typewriter */}
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 0.7,
                ease: "easeOut",
              }}
              className="font-serif text-[#165823] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight mb-6 select-none"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400 }}
            >
              {/* Screen reader full text */}
              <span className="sr-only">{TYPEWRITER_TEXT}</span>

              {/* Zero-Layout-Shift Typewriter Text */}
              <span aria-hidden="true" className="inline relative">
                <span>{currentHeadingText}</span>
                {/* Zero-width cursor container guarantees 0px horizontal layout shift */}
                {!shouldReduceMotion && (
                  <span className="inline-block w-0 relative align-middle" aria-hidden="true">
                    <span className="absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 w-[2px] sm:w-[3px] h-[0.8em] bg-[#C5A77B] rounded-full animate-pulse" />
                  </span>
                )}
                {/* Invisible ghost remainder locks width, height, and line wraps */}
                {ghostRemainder && (
                  <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
                    {ghostRemainder}
                  </span>
                )}
              </span>
            </motion.h2>

            {/* Paragraph 1: Welcome experience - Unified Font Weight 400 */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 0.85,
                ease: "easeOut",
              }}
              className="text-[#165823] text-base sm:text-lg md:text-xl leading-relaxed font-normal mb-5 tracking-wide"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}
            >
              Nestled amidst the serene surroundings of Kasauli, OREN offers a welcoming stay experience with beautiful valley views and the charm of the Shivalik Hills.
            </motion.p>

            {/* Paragraph 2: 40 valley-facing rooms & hospitality - Unified Font Weight 400 */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 1.0,
                ease: "easeOut",
              }}
              className="text-[#165823] text-sm sm:text-base md:text-[17px] leading-relaxed font-normal mb-5 tracking-wide"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}
            >
              With 40 valley-facing rooms, thoughtfully designed spaces and warm hospitality, every part of your stay is shaped around comfort and relaxation. From peaceful mornings overlooking the hills to evenings spent enjoying good food and meaningful moments, OREN brings together the experiences that make a mountain getaway special.
            </motion.p>

            {/* Paragraph 3: Family, couple, or friends getaway - Unified Font Weight 400 */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 1.1,
                ease: "easeOut",
              }}
              className="text-[#165823] text-sm sm:text-base md:text-[17px] leading-relaxed font-normal mb-8 tracking-wide"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}
            >
              Whether you are planning a family holiday, a couple&apos;s getaway or a refreshing break with friends, discover a comfortable stay at OREN Kasauli.
            </motion.p>

            {/* Rounded Discover Oren CTA Button */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : 1.2,
                ease: "easeOut",
              }}
              className="pt-2"
            >
              <a
                href="#rooms"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full font-bold uppercase whitespace-nowrap text-[#FFF6F6] bg-[#165823] hover:bg-[#12481c] border-2 border-[#165823] shadow-[0_6px_22px_rgba(22,88,35,0.35)] hover:shadow-[0_12px_36px_rgba(22,88,35,0.55)] hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-95 transition-all duration-300 px-7 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.18em] cursor-pointer select-none overflow-hidden"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                aria-label="Discover Oren Kasauli"
              >
                {/* Specular Shimmer Sweep Effect across the button on hover */}
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                  aria-hidden="true"
                />

                <span className="relative z-10 font-bold tracking-[0.18em]">
                  DISCOVER OREN
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 ml-0.5 text-[#FFF6F6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Autoplay Muted Video (1920x1080 16:9) */}
          <div className="lg:col-span-5 xl:col-span-5 w-full">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : 0.75,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-neutral-200/80 bg-neutral-900 aspect-video">
                <video
                  ref={videoRef}
                  src="/videos/about.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/images/about.jpg"
                  className="w-full h-full object-cover rounded-2xl"
                  aria-label="Oren Kasauli Resort Experience Video"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
