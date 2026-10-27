"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

const ROOMS_DATA = [
  {
    id: "attic-room",
    title: "Attic Room",
    count: "6 Rooms",
    description:
      "The spacious superior rooms are a haven of indulgence, facilitated by a variety of amenities accompanied by warm and efficient services.",
    image: "/images/rooms/atticroom.jpg",
    alt: "Attic Room at Oren Kasauli",
  },
  {
    id: "superior-attic-room",
    title: "Superior Attic Room",
    count: "5 Rooms",
    description:
      "Valley-facing, all-wooden rooms with private balconies that open to uninterrupted views of the hills. Positioned higher for a more immersive experience, these rooms offer enhanced space, natural light, warmth and privacy—ideal for guests seeking elevated comfort with scenic serenity.",
    image: "/images/rooms/superatticroom.png",
    alt: "Superior Attic Room with Hill Views",
  },
  {
    id: "superior-room",
    title: "Superior Room",
    count: "20 Rooms",
    description:
      "Well-appointed rooms with balconies overlooking the valley, designed for relaxed and comfortable stays. Ideal for guests seeking spacious interiors, natural views, and everyday luxury.",
    image: "/images/rooms/superiorroom.png",
    alt: "Superior Room with Valley Balcony",
  },
  {
    id: "superior-jacuzzi",
    title: "Superior Room with Hot tub / Jacuzzi",
    count: "4 Rooms",
    description:
      "Valley-facing rooms featuring private balconies and a hot tub for two. Select rooms offer outdoor hot tubs on the balcony with complete privacy, while others feature indoor hot tub, all with hot and cold water.",
    image: "/images/rooms/jacuzziroom.png",
    alt: "Superior Room with Hot Tub and Jacuzzi",
  },
  {
    id: "superior-pool",
    title: "Superior Room with Infinity Plunge Pool",
    count: "2 Rooms",
    description:
      "Exclusive valley-facing rooms with a private outdoor infinity plunge pool on the balcony. Specially designed for couples, the pool offers full privacy with both hot and cold water options.",
    image: "/images/rooms/poolroom.png",
    alt: "Superior Room with Private Infinity Plunge Pool",
  },
  {
    id: "family-suite",
    title: "Family Suite",
    count: "1 Rooms",
    description:
      "A spacious suite featuring one bedroom with a balcony, a separate living area with sofa-cum-bed, and two washrooms. Designed for a family, it includes a hot tub, dedicated kids’ washroom, and ample space for a comfortable shared stay.",
    image: "/images/rooms/familysuite.png",
    alt: "Family Suite with Misty Hills Balcony",
  },
  {
    id: "club-room",
    title: "Oren Club Room",
    count: "1 Rooms",
    description:
      "A private celebration suite featuring a personal pool and an exclusive entertainment zone designed for social gatherings. Ideal for intimate celebrations, this room comfortably hosts up to 20 guests, with hot and cold pool options.",
    image: "/images/rooms/clubroom.png",
    alt: "Oren Club Room Celebration Suite",
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    count: "1 Rooms",
    description:
      "An expansive luxury suite with one bedroom, a separate living room with sofa-cum-bed, two private balconies, and two washrooms with a hot tub and bath options. Completed with a thoughtfully designed compact kitchenette, it offers elevated comfort for extended and premium stays.",
    image: "/images/rooms/presidentialsuite.png",
    alt: "Presidential Suite with Panoramic Views",
  },
];

export default function RoomsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const carouselRef = useRef(null);

  // Responsive items visible per slide (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, ROOMS_DATA.length - visibleCount);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Autoplay carousel: pauses when user clicks, presses, or hovers over a card until release
  useEffect(() => {
    if (shouldReduceMotion || isPressed || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPressed, isHovered, handleNext]);

  return (
    <section
      id="rooms"
      className="relative w-full bg-[#f8f9f7] text-neutral-900 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header: Sequenced Reveal (OUR ROOMS appears first for a second, then Featured Rooms) */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow Label: Appears first when scrolling into view */}
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
              OUR ROOMS
            </span>
            <span
              className="w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-[2.5px] sm:h-[3px] md:h-[3.5px] bg-[#a87d24] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
          </motion.div>

          {/* Main Title: Featured Rooms — Appears after a moment */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.7,
              ease: "easeOut",
            }}
            className="font-serif text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Featured Rooms
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.65,
            delay: shouldReduceMotion ? 0 : 0.85,
            ease: "easeOut",
          }}
          className="relative w-full"
        >
          {/* Carousel Viewport & Sliding Track */}
          <div
            ref={carouselRef}
            className="overflow-hidden px-1 py-3 sm:py-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
              }}
            >
              {ROOMS_DATA.map((room) => (
                <div
                  key={room.id}
                  className="flex-shrink-0 px-2 sm:px-3 flex justify-center"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Room Card: Compact refined card with high-end proportions */}
                  <div className="group w-full max-w-[340px] sm:max-w-none bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(168,125,36,0.12)] hover:border-[#a87d24]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                    {/* Room Image Top: Sleek widescreen 16:10 format */}
                    <div
                      className="relative w-full aspect-[16/10] min-h-[190px] sm:min-h-[210px] md:min-h-[220px] bg-neutral-100 overflow-hidden"
                      style={{ position: "relative", minHeight: "190px" }}
                    >
                      <Image
                        src={room.image}
                        alt={room.alt}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Room Details: Refined Compact Padding & Balanced Typography */}
                    <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-grow">
                      {/* Room Title */}
                      <h3
                        className="font-serif text-neutral-900 group-hover:text-[#a87d24] font-normal text-xl sm:text-[22px] tracking-wide leading-snug transition-colors duration-300 min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                      >
                        {room.title}
                      </h3>

                      {/* Room Count */}
                      <span className="text-[11px] sm:text-xs text-neutral-500 font-medium tracking-wider uppercase mt-0.5 mb-2.5">
                        {room.count}
                      </span>

                      {/* Room Description — Fully visible, clean readable sizing */}
                      <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal mb-5 flex-grow text-center">
                        {room.description}
                      </p>

                      {/* Rounded Full Book Now Button with Refined Proportions */}
                      <div className="mt-auto pt-1 w-full flex justify-center">
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_3px_12px_rgba(168,125,36,0.3)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_5px_18px_rgba(168,125,36,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 px-6 sm:px-7 py-2 sm:py-2.5 text-[11px] sm:text-xs tracking-[0.14em] cursor-pointer select-none"
                          aria-label={`Book ${room.title} (opens booking engine)`}
                        >
                          <span>BOOK NOW</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
