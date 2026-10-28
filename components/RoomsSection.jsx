"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

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
      "A spacious suite featuring one bedroom with a balcony, a separate living area with sofa-cum-bed, and two washrooms. Designed for a family, it includes a hot tub, dedicated kids' washroom, and ample space for a comfortable shared stay.",
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

// Triplicated list for continuous infinite seamless looping
const TRACK_DATA = [...ROOMS_DATA, ...ROOMS_DATA, ...ROOMS_DATA];
const SET_SIZE = ROOMS_DATA.length;

export default function RoomsSection() {
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(SET_SIZE);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

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

    const animId = requestAnimationFrame(() => {
      setMounted(true);
      updateVisibleCount();
    });

    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  // Safe reset when track completes slide: strictly filters out bubbled child transitions
  const handleTransitionEnd = useCallback((e) => {
    // Only respond to the track div's own transform transition
    if (e && (e.target !== e.currentTarget || e.propertyName !== "transform")) {
      return;
    }

    setTrackIndex((current) => {
      if (current >= SET_SIZE * 2) {
        setIsTransitioning(false);
        return current - SET_SIZE;
      } else if (current < SET_SIZE) {
        setIsTransitioning(false);
        return current + SET_SIZE;
      }
      return current;
    });
  }, []);

  // Re-enable CSS transition on next animation frame after instantaneous wrap
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Handle Next Card (smoothly zooms out previous card and zooms in next card)
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  }, []);

  // Handle Previous Card
  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  }, []);

  // Click on any visible card to bring it into focus and zoom it in
  const handleCardClick = (indexInTrack) => {
    if (indexInTrack === trackIndex) return;
    const diff = indexInTrack - trackIndex;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + diff);
  };

  // Autoplay carousel: pauses when user hovers, touches, or presses
  useEffect(() => {
    if (shouldReduceMotion || isPressed || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPressed, isHovered, handleNext]);

  // Touch Swipe Handlers for mobile and tablet responsiveness
  const handleTouchStart = (e) => {
    setIsPressed(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    const threshold = 40;
    if (touchDeltaX.current < -threshold) {
      handleNext();
    } else if (touchDeltaX.current > threshold) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchDeltaX.current = 0;
  };

  // The active room index (0 to 7) based on current position
  const activeRoomIndex = ((trackIndex % SET_SIZE) + SET_SIZE) % SET_SIZE;

  return (
    <section
      id="rooms"
      className="relative w-full bg-[#f8f9f7] text-neutral-900 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Oren Logo Emblem at Top of Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-14">
          {/* Golden Circular Logo Emblem (oren1.png) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-3 sm:mb-4 select-none drop-shadow-sm flex items-center justify-center"
          >
            <Image
              src="/images/oren1.png"
              alt="Oren Kasauli Logo Emblem"
              width={81}
              height={79}
              priority={false}
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Eyebrow Label */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.15, ease: "easeOut" }}
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

          {/* Main Title: Featured Rooms */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.3,
              ease: "easeOut",
            }}
            className="font-serif text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Featured Rooms
          </motion.h2>
        </div>

        {/* Carousel Container with Generous Padding to Prevent Zoom/Shadow Clipping */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.65,
            delay: shouldReduceMotion ? 0 : 0.45,
            ease: "easeOut",
          }}
          className="relative w-full"
        >
          {/* Carousel Viewport & Sliding Track */}
          <div
            ref={carouselRef}
            className="overflow-hidden py-8 sm:py-10 md:py-12 px-2 sm:px-3 -mx-2 sm:-mx-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex will-change-transform items-stretch"
              style={{
                transform: mounted
                  ? `translateX(-${(trackIndex * 100) / visibleCount}%)`
                  : `translateX(-${(SET_SIZE * 100) / 3}%)`,
                transition: isTransitioning
                  ? "transform 750ms cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {TRACK_DATA.map((room, idx) => {
                const realRoomIndex = idx % SET_SIZE;
                // Active condition matches activeRoomIndex across duplicates to ensure seamless infinite zoom retention
                const isCardActive = realRoomIndex === activeRoomIndex;

                return (
                  <div
                    key={`${room.id}-${idx}`}
                    className="flex-shrink-0 px-2 sm:px-3 flex justify-center items-stretch self-stretch"
                    style={{ width: `${100 / visibleCount}%` }}
                    onClick={() => handleCardClick(idx)}
                  >
                    {/* Room Card: Fixed layout & stable GPU transitions so text & details NEVER jump while zooming */}
                    <div
                      className={`group w-full max-w-[340px] sm:max-w-none bg-white rounded-2xl h-full flex flex-col justify-between cursor-pointer select-none origin-center overflow-hidden transition-[transform,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        shouldReduceMotion
                          ? "border border-neutral-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
                          : isCardActive
                          ? "scale-[1.02] sm:scale-[1.03] lg:scale-[1.05] z-20 border border-[#a87d24] ring-2 ring-[#a87d24]/40 shadow-[0_20px_45px_rgba(168,125,36,0.22),_0_8px_20px_rgba(0,0,0,0.08)] opacity-100"
                          : "scale-[0.96] sm:scale-[0.97] z-10 border border-neutral-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.05)] opacity-80 sm:opacity-85 hover:opacity-100 hover:border-[#a87d24]/50"
                      }`}
                    >
                      {/* Room Image Top: Sleek widescreen 16:10 format with Smooth Zoom */}
                      <div
                        className="relative w-full aspect-[16/10] min-h-[190px] sm:min-h-[210px] md:min-h-[220px] bg-neutral-100 overflow-hidden flex-shrink-0"
                        style={{ position: "relative", minHeight: "190px" }}
                      >
                        <Image
                          src={room.image}
                          alt={room.alt}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          className={`object-cover transition-transform duration-700 ease-out ${
                            !shouldReduceMotion && isCardActive
                              ? "scale-110"
                              : "scale-100 group-hover:scale-105"
                          }`}
                        />
                      </div>

                      {/* Room Details: Uniform sizing so card layout never jitters */}
                      <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-grow justify-between">
                        {/* Top detail block: Title & Count */}
                        <div className="w-full flex flex-col items-center">
                          {/* Room Title with stable min-height */}
                          <h3
                            className={`font-serif font-normal text-xl sm:text-[22px] tracking-wide leading-snug transition-colors duration-300 min-h-[52px] sm:min-h-[56px] flex items-center justify-center text-center w-full ${
                              isCardActive
                                ? "text-[#a87d24]"
                                : "text-neutral-900 group-hover:text-[#a87d24]"
                            }`}
                            style={{
                              fontFamily: "var(--font-cormorant), Georgia, serif",
                            }}
                          >
                            {room.title}
                          </h3>

                          {/* Room Count */}
                          <span className="text-[11px] sm:text-xs text-neutral-500 font-medium tracking-wider uppercase mt-1 mb-2.5 block">
                            {room.count}
                          </span>
                        </div>

                        {/* Room Description: Uniform min-height prevents button or card jumping */}
                        <div className="w-full flex-grow flex items-center justify-center min-h-[86px] sm:min-h-[92px] md:min-h-[96px] my-1">
                          <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal text-center">
                            {room.description}
                          </p>
                        </div>

                        {/* Rounded Full Book Now Button firmly seated at bottom */}
                        <div className="pt-3 w-full flex justify-center flex-shrink-0">
                          <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`relative inline-flex items-center justify-center gap-1.5 rounded-full font-semibold uppercase whitespace-nowrap transition-all duration-300 px-6 sm:px-7 py-2 sm:py-2.5 text-[11px] sm:text-xs tracking-[0.14em] cursor-pointer select-none ${
                              isCardActive
                                ? "text-white bg-gradient-to-r from-[#d4a949] via-[#ba8c2e] to-[#886216] border border-[#ffe8a8]/60 shadow-[0_4px_16px_rgba(168,125,36,0.4)] hover:shadow-[0_6px_22px_rgba(168,125,36,0.6)] hover:scale-105 active:scale-95"
                                : "text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_3px_12px_rgba(168,125,36,0.3)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:scale-105 active:scale-95"
                            }`}
                            aria-label={`Book ${room.title} (opens booking engine)`}
                          >
                            <span>BOOK NOW</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
