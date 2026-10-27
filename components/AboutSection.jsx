"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

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
      className="relative w-full bg-[#f8f9f7] text-neutral-900 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Text Content & Book Your Stay CTA */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start">
            {/* Eyebrow Label: Appears first when scrolling into view */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5"
            >
              <span
                className="w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-[2.5px] sm:h-[3px] md:h-[3.5px] bg-[#a87d24] rounded-full flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#a87d24] font-sans">
                ABOUT US
              </span>
            </motion.div>

            {/* Main Heading: Oren Kasauli — Sequenced entrance after About Us appears */}
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 0.7,
                ease: "easeOut",
              }}
              className="font-serif text-[#a87d24] text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Oren Kasauli
            </motion.h2>

            {/* Paragraph 1: Exact Kasauli background */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 0.85,
                ease: "easeOut",
              }}
              className="font-sans text-neutral-800 text-base sm:text-lg leading-relaxed font-normal mb-5"
            >
              Located in the Indian state of Himachal Pradesh, Kasauli is a world-renowned hill station. It’s a beautiful place, where nature and bird lovers find peace. Established in 1842 by the British, Kasauli offers spectacular views of the Shivalik mountain range.
            </motion.p>

            {/* Paragraph 2: Exact Oren Kasauli Hotel amenities */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 1.0,
                ease: "easeOut",
              }}
              className="font-sans text-neutral-700 text-sm sm:text-base leading-relaxed font-normal mb-8"
            >
              Oren Kasauli Hotel provides high-end accommodation in Kasauli, with well-maintained rooms offering mesmerizing mountain view. All the rooms and suites have affluent amenities, such as controlled room temperature, 43” LED, tea & coffee station, Wi-Fi, intercom, closet, dressing mirror, separate seating and dining area, private bathroom with a constant supply of hot and cold water, disposable slippers, towels, extra bedding/rollaway, packaged drinking water, and newspaper.
            </motion.p>

            {/* Rounded Book Your Stay Button (No divide line, Pure Tailwind CSS) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : 1.15,
                ease: "easeOut",
              }}
              className="pt-2"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_18px_rgba(168,125,36,0.38)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_6px_26px_rgba(168,125,36,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.18em] cursor-pointer select-none"
                aria-label="Book Your Stay at Oren Kasauli (opens reservation system)"
              >
                <span>BOOK YOUR STAY</span>
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
