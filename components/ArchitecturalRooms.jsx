"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Eye,
  Maximize2,
  Bed,
  Mountain,
  Wind,
  Coffee,
  Sparkles,
  ShieldCheck,
  Tv,
  Bath,
  Waves,
  X,
} from "lucide-react";
import { ROOMS_COLLECTION, BOOKING_URL } from "./roomsData";

const TYPEWRITER_TEXT = "FIND YOUR PERFECT STAY IN KASAULI";

// Helper for amenity icons
function getAmenityIcon(type) {
  switch (type) {
    case "size":
      return Maximize2;
    case "bed":
      return Bed;
    case "view":
    case "balcony":
      return Mountain;
    case "climate":
      return Wind;
    case "coffee":
      return Coffee;
    case "bath":
      return Bath;
    case "pool":
      return Waves;
    case "shield":
      return ShieldCheck;
    case "tv":
      return Tv;
    case "sparkles":
    default:
      return Sparkles;
  }
}

export default function ArchitecturalRooms() {
  const shouldReduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeRoom = ROOMS_COLLECTION[currentIndex] || ROOMS_COLLECTION[0];
  const [isPaused, setIsPaused] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ROOMS_COLLECTION.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ROOMS_COLLECTION.length) % ROOMS_COLLECTION.length);
  };

  const handleSelectRoom = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation when section is in view
  useEffect(() => {
    if (!isInView || isDetailsOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, isDetailsOpen]);

  // Looping Typewriter Effect for "OUR ROOMS"
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 120);
      } else {
        // Hold full phrase for 2.6 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 60);
      } else {
        // Pause briefly before typing again
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 450);
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

  // Viewport observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Preload room images for instant, zero-flicker background rendering
  useEffect(() => {
    if (typeof window === "undefined") return;
    ROOMS_COLLECTION.forEach((room) => {
      const img = new window.Image();
      img.src = room.image;
    });
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isPausedRef = useRef(isPaused);
  const isDetailsOpenRef = useRef(isDetailsOpen);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isDetailsOpenRef.current = isDetailsOpen;
  }, [isDetailsOpen]);

  // Automatic room change every 4.2 seconds (pauses on card hover or modal open)
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPausedRef.current || isDetailsOpenRef.current) return;
      setCurrentIndex((prev) => (prev + 1) % ROOMS_COLLECTION.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  // Modal body scroll lock & Escape key handling + Lenis sync
  useEffect(() => {
    if (!isDetailsOpen) return;

    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsDetailsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDetailsOpen]);

  return (
    <section
      id="rooms"
      ref={sectionRef}
      suppressHydrationWarning
      className="relative w-full min-h-[720px] lg:min-h-[800px] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden z-10 bg-[#FFF6F6] text-[#103430] border-t border-[#e2d8c7]"
    >
      {/* ======================================================== */}
      {/* AUTOMATIC CINEMATIC BACKGROUND REFLECTING ACTIVE ROOM    */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {ROOMS_COLLECTION.map((room, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={room.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={room.image}
                alt={room.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center scale-105"
              />
            </div>
          );
        })}

        {/* Protective ambient gradient scrim keeping text & controls 100% readable while richly reflecting the active room */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#FFF6F6]/80 via-[#FFF6F6]/65 to-[#FFF6F6]/45 transition-opacity duration-500 pointer-events-none ${
            isPaused ? "opacity-75" : "opacity-90"
          }`}
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ======================================================== */}
        {/* 1. SECTION HEADER (THE OREN COLLECTION • OUR ROOMS)      */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          {/* Eyebrow Label: STAY WITH A VIEW */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span
              className="w-10 sm:w-14 h-[2px] bg-[#103430] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#103430]"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              STAY WITH A VIEW
            </span>
            <span
              className="w-10 sm:w-14 h-[2px] bg-[#103430] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Main Title: Find Your Perfect Stay in Kasauli */}
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide leading-tight text-center break-words select-none text-[#103430]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="sr-only">{TYPEWRITER_TEXT}</span>
            <span aria-hidden="true" className="inline relative">
              <span>{currentHeadingText}</span>
              {!shouldReduceMotion && (
                <span
                  className="inline-block w-0 relative align-middle"
                  aria-hidden="true"
                >
                  <span className="absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 w-[2px] sm:w-[3px] h-[0.8em] bg-[#103430] rounded-full animate-pulse" />
                </span>
              )}
              {ghostRemainder && (
                <span
                  className="opacity-0 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {ghostRemainder}
                </span>
              )}
            </span>
          </h2>
        </div>

        {/* ======================================================== */}
        {/* 2. MAIN SHOWCASE                                          */}
        {/* Desktop: Side-by-side grid (details + stacked cards)      */}
        {/* Mobile: Full-width auto-sliding room cards                */}
        {/* ======================================================== */}

        {/* =================== MOBILE AUTO-SLIDE =================== */}
        <div className="block lg:hidden">
          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoom.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* Room Image Card */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_16px_40px_-8px_rgba(16,52,48,0.25)] border border-white/60 mb-4">
                  <Image
                    src={activeRoom.image}
                    alt={activeRoom.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Room Details Below Image */}
                <div className="px-1">
                  {/* Room Title & Count */}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3
                      className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#103430] leading-tight"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      {activeRoom.title}
                    </h3>
                    <span
                      className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#103430]/70 flex-shrink-0"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      {activeRoom.count}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p
                    className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2.5 text-[#103430]/80"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    {activeRoom.tagline}
                  </p>

                  {/* Description */}
                  <p
                    className="font-sans text-xs sm:text-sm leading-relaxed font-normal mb-5 text-[#103430]/90 line-clamp-3"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    {activeRoom.description}
                  </p>

                  {/* Action Buttons — Full-Width Stacked */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold uppercase text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16,52,48,0.25)] active:scale-95 transition-all duration-300 text-xs tracking-[0.12em] cursor-pointer select-none overflow-hidden w-full"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                      aria-label={`Book ${activeRoom.title} now`}
                    >
                      <span
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                        aria-hidden="true"
                      />
                      <span className="relative z-10 whitespace-nowrap">BOOK NOW</span>
                      <ArrowUpRight className="relative z-10 w-4 h-4 text-[#FFF6F6] flex-shrink-0" />
                    </a>

                    <a
                      href="/room-and-tariff"
                      className="group/more inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold uppercase text-[#103430] bg-transparent border-2 border-[#103430] active:scale-95 transition-all duration-300 text-xs tracking-[0.12em] cursor-pointer select-none w-full"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                      aria-label="Explore all rooms and tariff"
                    >
                      <Eye className="w-4 h-4 text-[#103430] flex-shrink-0" />
                      <span className="whitespace-nowrap">EXPLORE ALL ROOMS</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =================== DESKTOP GRID =================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* ------------------------------------------------------ */}
          {/* LEFT: ACTIVE ROOM SPOTLIGHT DETAILS (CARDLESS)         */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Category / Badge & Room Inventory Count */}
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#103430]"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                {activeRoom.badge}
              </span>
              <span
                className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#103430]"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                • {activeRoom.count}
              </span>
            </div>

            {/* Room Title */}
            <h3
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide leading-tight mb-2 text-[#103430]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {activeRoom.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-4 sm:mb-5 text-[#103430]"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              {activeRoom.tagline}
            </p>

            {/* Description */}
            <p
              className="font-sans text-sm sm:text-base leading-relaxed font-normal mb-6 sm:mb-8 max-w-xl text-[#103430]"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              {activeRoom.description}
            </p>

            {/* Key Amenities Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
              {activeRoom.amenities.slice(0, 5).map((amenity, idx) => {
                const Icon = getAmenityIcon(amenity.type);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#103430]/20 text-[#103430] shadow-sm hover:border-[#103430] transition-colors"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#103430] flex-shrink-0" />
                    <span>{amenity.name}</span>
                  </span>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-4 max-w-md w-full">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold uppercase text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.25)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[13px] tracking-[0.14em] cursor-pointer select-none overflow-hidden text-center flex-1"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                aria-label={`Book ${activeRoom.title} now`}
              >
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative z-10 whitespace-nowrap">BOOK NOW</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 text-[#FFF6F6] flex-shrink-0" />
              </a>

              <a
                href="/room-and-tariff"
                className="group/more relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold uppercase text-[#103430] hover:text-[#FFF6F6] bg-transparent hover:bg-[#103430] hover:border-[#103430] border-2 border-[#103430] shadow-sm hover:shadow-[0_4px_16px_rgba(16, 52, 48,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[13px] tracking-[0.14em] cursor-pointer select-none text-center flex-1"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                aria-label="Explore all rooms and tariff"
              >
                <Eye className="w-4 h-4 text-[#103430] group-hover/more:text-white transition-colors flex-shrink-0" />
                <span className="whitespace-nowrap">EXPLORE ALL ROOMS</span>
              </a>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT: STACKED CARD DECK (HOVER TO PAUSE & FULL VIEW)  */}
          {/* Desktop Only — Hidden on Mobile/Tablet                  */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-end justify-center relative py-6">
            {/* Luminous Light Shadow Aura reflecting the room image */}
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-[36px] overflow-hidden blur-2xl -z-10 pointer-events-none opacity-70 transition-all duration-700"
              aria-hidden="true"
            >
              <Image
                src={activeRoom.image}
                alt=""
                fill
                sizes="(max-width: 768px) 320px, 360px"
                className="object-cover scale-125 brightness-110 saturate-150 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#103430]/30 via-emerald-800/15 to-transparent mix-blend-overlay" />
            </div>

            {/* Stacked Cards Deck Container — Pauses rotation while mouse is over */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-[235px] sm:w-[265px] md:w-[285px] lg:w-[305px] h-[330px] sm:h-[370px] md:h-[400px] lg:h-[420px] mx-auto lg:ml-auto lg:mr-0 select-none"
            >
              {[3, 2, 1, 0].map((stackIdx) => {
                const roomIdx = (currentIndex + stackIdx) % ROOMS_COLLECTION.length;
                const room = ROOMS_COLLECTION[roomIdx];
                const isTop = stackIdx === 0;

                // Responsive tilt and horizontal fan offsets
                const tiltAngle = isTop
                  ? 0
                  : isMobile
                    ? -stackIdx * 2.2
                    : -stackIdx * 3.5;

                const xOffset = isTop
                  ? 0
                  : isMobile
                    ? -stackIdx * 10
                    : -stackIdx * 16;

                return (
                  <motion.div
                    key={`${room.id}-${stackIdx}`}
                    style={{
                      zIndex: 20 - stackIdx,
                      transformOrigin: "bottom left",
                      touchAction: "pan-y",
                    }}
                    animate={{
                      x: xOffset,
                      rotate: tiltAngle,
                      scale: 1 - stackIdx * 0.035,
                      opacity: 1 - stackIdx * 0.16,
                    }}
                    whileHover={isTop ? { scale: 1.04, rotate: 0 } : undefined}
                    transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.65}
                    onDragEnd={
                      isTop
                        ? (e, info) => {
                          if (info.offset.x < -40 || info.velocity.x < -200) {
                            handleNext();
                          } else if (info.offset.x > 40 || info.velocity.x > 200) {
                            handlePrev();
                          }
                        }
                        : undefined
                    }
                    onClick={!isTop ? () => handleSelectRoom(roomIdx) : () => setIsDetailsOpen(true)}
                    className={`group/card absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_22px_48px_-10px_rgba(0,0,0,0.2),0_12px_28px_-6px_rgba(16,52,48,0.25),0_0_20px_rgba(255,255,255,0.4)] border border-white/80 ring-1 ring-[#103430]/20 transition-all duration-300 ${isTop
                      ? "cursor-grab active:cursor-grabbing ring-2 ring-[#103430]/50 hover:ring-[#103430] hover:shadow-[0_28px_56px_-8px_rgba(16,52,48,0.35),0_14px_32px_rgba(16,52,48,0.25)]"
                      : "cursor-pointer"
                      }`}
                  >
                    {/* Background Image */}
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      sizes="(max-width: 768px) 265px, 305px"
                      className={`object-cover object-center transition-all duration-500 ${!isTop ? "filter brightness-90" : "group-hover/card:scale-105"
                        }`}
                      priority={isTop}
                    />

                    {/* Gradient Overlay — Fades away on hover to reveal full room view */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent transition-opacity duration-300 group-hover/card:opacity-10 pointer-events-none" />

                    {/* Front Card Typography — Fades out on hover so guest gets complete unobstructed room view */}
                    {isTop && (
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-20 flex flex-col items-start transition-opacity duration-300 group-hover/card:opacity-0 pointer-events-none">
                        <span
                          className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFE4A0] mb-0.5 drop-shadow-md truncate max-w-full"
                          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                        >
                          {room.badge}
                        </span>

                        <h4
                          className="font-serif text-xl sm:text-2xl md:text-[26px] font-normal text-white tracking-wide leading-tight mb-0.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] truncate max-w-full"
                          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                          {room.title}
                        </h4>

                        <p
                          className="text-[11px] sm:text-xs text-white/90 font-normal tracking-wide drop-shadow-md"
                          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                        >
                          {room.count}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. CINEMATIC SUITE DETAILS MODAL DIALOG                  */}
      {/* ======================================================== */}
      {isDetailsOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto overscroll-contain"
          onClick={() => setIsDetailsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-room-title"
        >
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-2xl lg:max-w-3xl bg-[#FFF6F6] text-[#103430] rounded-2xl sm:rounded-3xl border border-[#103430]/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden h-[90vh] sm:h-[88vh] max-h-[90vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#e2d8c7] bg-white/70">
              <div className="flex items-center gap-3">
                <h4
                  id="modal-room-title"
                  className="font-serif text-xl sm:text-2xl text-[#103430] font-medium tracking-wide truncate"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {activeRoom.title}
                </h4>
                <span className="text-xs uppercase tracking-widest text-[#103430] font-bold hidden sm:inline-block">
                  • {activeRoom.count}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#103430]/25 hover:border-[#103430] bg-white hover:bg-[#103430]/10 text-[#103430] flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close suite details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div
              data-lenis-prevent="true"
              className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1 min-h-0 overscroll-contain touch-pan-y"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              {/* High-res Room Preview Banner */}
              <div className="relative w-full aspect-[16/9] min-h-[190px] sm:min-h-[240px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-[#e2d8c7] shadow-md">
                <Image
                  src={activeRoom.image}
                  alt={activeRoom.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/30">
                  {activeRoom.badge}
                </div>
              </div>

              {/* Tagline and Description */}
              <div>
                <p
                  className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#103430] font-bold mb-2"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {activeRoom.tagline}
                </p>
                <p className="font-sans text-sm sm:text-base text-[#103430] leading-relaxed font-normal">
                  {activeRoom.description}
                </p>
              </div>

              {/* The Oren Suites Narrative */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#103430]/[0.05] border border-[#103430]/20 text-[#103430] text-xs sm:text-sm leading-relaxed">
                <p className="font-serif text-sm sm:text-base font-medium mb-1 text-[#103430]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  Every Stay Has Its Own Story
                </p>
                <p className="font-normal text-[#103430]/90">
                  Choose from thoughtfully designed rooms and suites, each offering comfort and a beautiful connection with the surrounding hills. From cosy attic rooms and valley-facing balconies to private jacuzzis and plunge pool experiences, discover a room that suits the way you want to unwind.
                </p>
              </div>

              {/* Signature Amenities Grid */}
              <div className="pt-2 border-t border-[#e2d8c7]">
                <h5
                  className="text-xs uppercase tracking-[0.2em] text-[#103430] font-bold mb-4"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  SIGNATURE SUITE AMENITIES
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeRoom.amenities.map((item, idx) => {
                    const Icon = getAmenityIcon(item.type);
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#e2d8c7] shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#103430]/10 flex items-center justify-center text-[#103430] flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#103430]">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTA */}
            <div className="p-4 sm:p-6 border-t border-[#e2d8c7] bg-white/70 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <span className="text-xs text-[#103430]/70 font-medium tracking-wide">
                Best direct rates guaranteed with complimentary breakfast
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold uppercase text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] shadow-md hover:shadow-lg transition-all text-xs tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  <span>RESERVE NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
