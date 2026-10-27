"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const SERVICES_DATA = [
  {
    id: "luxury-stay",
    title: "Luxury Stay",
    subtitle: null,
    icon: "/images/services/luxury-stay.png",
    alt: "Luxury Stay at Oren Kasauli",
  },
  {
    id: "easy-booking",
    title: "Easy Booking",
    subtitle: null,
    icon: "/images/services/booking.png",
    alt: "Easy Online Booking",
  },
  {
    id: "nature-trails",
    title: "Private Nature Trails",
    subtitle: null,
    icon: "/images/services/nature-trails.png",
    alt: "Private Nature Trails in Shivalik Hills",
  },
  {
    id: "rooftop-dining",
    title: "Open to Sky restaurant",
    subtitle: "(Pure Vegetarian)",
    icon: "/images/services/rooftop-dining.png",
    alt: "Open to Sky Pure Vegetarian Restaurant",
  },
  {
    id: "parking-facility",
    title: "Parking Facility",
    subtitle: null,
    icon: "/images/services/parking.png",
    alt: "On-site Parking Facility",
  },
  {
    id: "natural-environment",
    title: "Natural Environment",
    subtitle: null,
    icon: "/images/services/ecosystem.png",
    alt: "Serene Natural Himalayan Environment",
  },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Automatically cycle through service cards (one zooms in while others remain zoomed out)
  useEffect(() => {
    if (shouldReduceMotion || isUserInteracting) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isUserInteracting]);

  return (
    <section
      id="services"
      className="relative w-full bg-[#ffffff] text-neutral-900 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10 border-t border-neutral-100"
    >
      {/* Decorative Botanical Leaf Watermark on the Right (Referenced from Design) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 lg:w-[480px] h-full pointer-events-none opacity-[0.06] select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain object-right"
        >
          <path
            d="M380 50C250 120 180 280 200 450C210 540 280 580 350 600"
            stroke="#a87d24"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M200 450C150 400 120 330 140 250C160 170 230 110 320 80"
            stroke="#a87d24"
            strokeWidth="2"
          />
          <circle cx="200" cy="450" r="12" fill="#a87d24" fillOpacity="0.3" />
          <path
            d="M280 220C210 240 180 300 190 380"
            stroke="#a87d24"
            strokeWidth="2"
          />
          <path
            d="M340 150C280 170 240 230 250 310"
            stroke="#a87d24"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Centered Eyebrow & Grand Serif Heading */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow Label: Appears first when scrolling into view (same as About Us) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5"
          >
            <span
              className="w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-[2.5px] sm:h-[3px] md:h-[3.5px] bg-[#a87d24] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#a87d24] font-sans">
              OUR SERVICES
            </span>
            <span
              className="w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-[2.5px] sm:h-[3px] md:h-[3.5px] bg-[#a87d24] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
          </motion.div>

          {/* Main Title: EXPLORE OUR HOTEL SERVICES — Appears after a moment */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.7,
              ease: "easeOut",
            }}
            className="font-serif text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-wider leading-tight max-w-4xl"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            EXPLORE OUR HOTEL SERVICES
          </motion.h2>
        </div>

        {/* 6 Services Grid: Media Responsive (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {SERVICES_DATA.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : 0.85 + index * 0.08,
                  ease: "easeOut",
                }}
                onMouseEnter={() => {
                  setIsUserInteracting(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => setIsUserInteracting(false)}
                onClick={() => {
                  setActiveIndex(index);
                  setIsUserInteracting(true);
                }}
                className={`group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl cursor-pointer select-none transition-all duration-500 ease-out ${
                  isActive
                    ? "scale-[1.03] sm:scale-[1.05] md:scale-[1.06] z-20 bg-gradient-to-br from-white via-[#fcfaf5] to-[#fbf6ec] border border-[#a87d24] shadow-[0_14px_40px_rgba(168,125,36,0.18)] ring-1 ring-[#a87d24]/30 -translate-y-1"
                    : "scale-100 z-10 bg-white/95 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-neutral-200"
                }`}
              >
                {/* Circular Icon Badge: Zooms in when active, remains normal when inactive */}
                <div
                  className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-110 border-2 border-[#a87d24] bg-gradient-to-br from-[#fbf8f2] to-[#f5edd9] shadow-[0_6px_22px_rgba(168,125,36,0.25)]"
                      : "scale-100 border border-neutral-200/80 bg-neutral-50/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  <div className="relative w-full h-full p-3.5 sm:p-4 flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.alt}
                      width={64}
                      height={64}
                      className={`w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-500 ${
                        isActive ? "scale-110" : "scale-100"
                      }`}
                    />
                  </div>
                </div>

                {/* Service Label Text */}
                <div className="flex flex-col justify-center">
                  <h3
                    className={`font-sans text-base sm:text-lg md:text-xl tracking-wide transition-colors duration-300 leading-snug ${
                      isActive
                        ? "text-[#a87d24] font-semibold"
                        : "text-neutral-800 font-medium"
                    }`}
                  >
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <span
                      className={`text-xs sm:text-sm font-normal transition-colors duration-300 mt-0.5 ${
                        isActive ? "text-[#8a681c]" : "text-neutral-500"
                      }`}
                    >
                      {service.subtitle}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
