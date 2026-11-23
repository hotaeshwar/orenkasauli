"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Bed,
  CalendarCheck,
  Mountain,
  Utensils,
  Car,
  Trees,
  Waves,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

const TYPEWRITER_TEXT = "MORE THAN JUST A STAY";

// 6 Signature Hotel Services & Experiences for Oren Kasauli
const HOTEL_SERVICES = [
  {
    id: "comfortable-stay",
    title: "Comfortable Mountain Stay",
    subtitle: "Well-appointed rooms and suites designed for a relaxed and comfortable stay.",
    iconSrc: "/images/services/luxury-stay.png",
    IconComponent: Bed,
  },
  {
    id: "easy-booking",
    title: "Easy Online Booking",
    subtitle: "Plan your Kasauli getaway with a convenient booking experience.",
    iconSrc: "/images/services/booking.png",
    IconComponent: CalendarCheck,
  },
  {
    id: "nature-trails",
    title: "Private Nature Trails",
    subtitle: "Discover the natural surroundings and enjoy peaceful moments amidst the hills.",
    iconSrc: "/images/services/nature-trails.png",
    IconComponent: Mountain,
  },
  {
    id: "vegetarian-dining",
    title: "Pure Vegetarian Dining",
    subtitle: "Enjoy authentic vegetarian cuisine at our open-to-sky restaurant.",
    iconSrc: "/images/services/rooftop-dining.png",
    IconComponent: Utensils,
  },
  {
    id: "parking-facility",
    title: "Parking Facility",
    subtitle: "Convenient on-site parking for a hassle-free arrival.",
    iconSrc: "/images/services/parking.png",
    IconComponent: Car,
  },
  {
    id: "natural-surroundings",
    title: "Beautiful Natural Surroundings",
    subtitle: "Unwind in the calm atmosphere of Kasauli, surrounded by scenic mountain views.",
    iconSrc: "/images/services/ecosystem.png",
    IconComponent: Trees,
  },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  // Looping Typewriter Effect for "EXPLORE OUR HOTEL SERVICES" (types, pauses, erases, repeats)
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

  return (
    <section
      id="services"
      suppressHydrationWarning
      className="relative w-full bg-[#FFF6F6] text-[#103430] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10 border-t border-[#e2d8c7]"
    >
      {/* Ambient Resort Background with White Light Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div data-gsap="parallax" data-parallax-speed="-8" className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/gallery/galler12.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-[#FFF6F6]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-stone-900/5 pointer-events-none" />
      </div>

      {/* Decorative Subtle Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(16,52,48,0.06)_0%,transparent_70%)] pointer-events-none blur-2xl z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-14">
          {/* Eyebrow Label: OUR SERVICES */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4"
          >
            <span
              className="w-10 sm:w-14 h-[2px] bg-[#103430] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#103430]"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              WHAT MAKES YOUR STAY SPECIAL
            </span>
            <span
              className="w-10 sm:w-14 h-[2px] bg-[#103430] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
          </motion.div>

          {/* Main Title: More Than Just a Stay */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.3,
              ease: "easeOut",
            }}
            className="font-serif text-[#103430] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide leading-tight max-w-4xl select-none mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {/* Screen reader full text */}
            <span className="sr-only">{TYPEWRITER_TEXT}</span>

            {/* Zero-Layout-Shift Typewriter Text */}
            <span aria-hidden="true" className="inline relative">
              <span>{currentHeadingText}</span>
              {/* Zero-width cursor container guarantees 0px horizontal layout shift */}
              {!shouldReduceMotion && (
                <span className="inline-block w-0 relative align-middle" aria-hidden="true">
                  <span className="absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 w-[2px] sm:w-[3px] h-[0.8em] bg-[#103430] rounded-full animate-pulse" />
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

          {/* Subtitle Description - Reduced Size & Unified Weight 400 */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.45,
              ease: "easeOut",
            }}
            className="font-sans text-xs sm:text-sm md:text-[15px] text-[#103430] max-w-2xl mx-auto leading-relaxed font-normal tracking-normal"
            style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 400 }}
          >
            At OREN Kasauli, the experience goes beyond your room. Enjoy thoughtful amenities, relaxing spaces and experiences that make your time in the hills even more rewarding.
          </motion.p>
        </div>

        {/* ======================================================== */}
        {/* 3D ROTATING CAROUSEL RING (#fff Background Cards)        */}
        {/* ======================================================== */}
        <div className="carousel-stage-container">
          <div className="carousel-stage">
            <div className="carousel-ring">
              {HOTEL_SERVICES.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      "--i": index,
                    }}
                    className="carousel-panel p-5 sm:p-6 flex flex-col justify-center items-center text-center gap-3 sm:gap-4 bg-white border border-[#e5dccf] rounded-[18px] shadow-[0_12px_32px_rgba(38,40,36,0.08),_0_2px_8px_rgba(16,52,48,0.08)] hover:border-[#103430] transition-all duration-300 group"
                  >
                    {/* Service Icon with Gentle Hover Zoom */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full bg-[#FFF6F6] border border-[#e2d8c7] flex items-center justify-center p-3 sm:p-3.5 md:p-4 shadow-sm group-hover:scale-105 group-hover:border-[#103430]/40 transition-transform duration-300 flex-shrink-0">
                      {item.iconSrc ? (
                        <Image
                          src={item.iconSrc}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                        />
                      ) : (
                        <item.IconComponent className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#103430]" />
                      )}
                    </div>

                    {/* Service Title & Subtitle */}
                    <div className="w-full flex flex-col items-center">
                      <h3
                        className="text-base sm:text-lg md:text-[22px] font-bold text-[#103430] tracking-wide leading-snug line-clamp-2 group-hover:text-[#0b2421] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                      >
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p
                          className="text-xs sm:text-sm text-[#103430]/75 mt-1.5 line-clamp-1 font-medium tracking-wide"
                          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTERED EXPLORE OUR AMENITIES CTA BUTTON                */}
        {/* ======================================================== */}
        <div className="flex justify-center mt-6 sm:mt-10">
          <a
            href="#rooms"
            className="group/btn relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold uppercase text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.35)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.55)] hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-[13px] tracking-[0.14em] transition-all duration-300 cursor-pointer overflow-hidden"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            aria-label="Explore Our Amenities"
          >
            {/* Shimmer sweep effect */}
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative z-10 whitespace-nowrap">EXPLORE OUR AMENITIES</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 text-[#FFF6F6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
