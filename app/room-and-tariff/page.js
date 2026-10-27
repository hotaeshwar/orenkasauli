"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Check,
  ArrowUpRight,
  Sparkles,
  Coffee,
  Maximize2,
  Bed,
  Wind,
  Mountain,
  Armchair,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

const TYPEWRITER_TEXT = "Room & Tariff";

const ROOM_FACILITIES = [
  {
    text: "285 Sqft. of interior space",
    icon: Maximize2,
  },
  {
    text: "King Size Bed (6ft x 6.5ft)",
    icon: Bed,
  },
  {
    text: "Large size Balcony to Valley View (11ft x 7.5ft)",
    icon: Mountain,
  },
  {
    text: "Centrally Hot & Cold AC providing well maintained room temperatures",
    icon: Wind,
  },
  {
    text: "Mini Fridge",
    icon: ShieldCheck,
  },
  {
    text: "Tea & Coffee Station",
    icon: Coffee,
  },
  {
    text: "Comfortable 2 seated sofa with 2 chairs",
    icon: Armchair,
  },
  {
    text: "Well Equipped & Hygienically maintained Bathrooms with modern amenities and toiletries.",
    icon: Sparkles,
  },
];

const GALLERY_IMAGES = [
  {
    id: "g2",
    src: "/images/gallery/gallery2.jpg",
    alt: "Luxury Room Interiors at Oren Kasauli",
    label: "Sophisticated Comfort",
  },
  {
    id: "g4",
    src: "/images/gallery/gallery4.jpg",
    alt: "Panoramic Himalayan Valley View from Oren Kasauli",
    label: "Valley Panoramas",
  },
  {
    id: "g5",
    src: "/images/gallery/gallery5.jpg",
    alt: "Pine Forests and Scenic Mountain Scenery",
    label: "Tranquil Surroundings",
  },
  {
    id: "g6",
    src: "/images/gallery/gallery6.jpg",
    alt: "Scenic Valley Balcony Horizon",
    label: "Balcony Horizons",
  },
  {
    id: "g1",
    src: "/images/gallery/gallery1.jpg",
    alt: "Warm Wooden Architecture and Cozy Living",
    label: "Warm Wooden Ambiance",
  },
];

function GalleryAutoCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(5);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartXRef = useRef(null);

  // 3 duplicate sets of 5 images = 15 images
  // Index 5 is the first image of the middle set.
  const extendedItems = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When currentIndex reaches 10, after 700ms transition finishes,
  // silently snap back to index 5 with transition: none so the loop is 100% infinite and seamless.
  useEffect(() => {
    if (currentIndex >= 10) {
      const snapTimer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(5);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, 700);
      return () => clearTimeout(snapTimer);
    } else if (currentIndex < 5) {
      const snapTimer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(currentIndex + 5);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, 700);
      return () => clearTimeout(snapTimer);
    }
  }, [currentIndex]);

  // Autoplay timer advances every 3.2 seconds
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const interval = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3200);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPaused]);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartXRef.current !== null) {
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
      if (deltaX > 40) {
        setWithTransition(true);
        setCurrentIndex((prev) => prev + 1);
      } else if (deltaX < -40) {
        setWithTransition(true);
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
      touchStartXRef.current = null;
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex will-change-transform"
        style={{
          transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
          transition: withTransition
            ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)"
            : "none",
        }}
      >
        {extendedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 px-2 sm:px-3 flex justify-center"
            style={{ width: `${100 / visibleCount}%` }}
          >
            <div
              className="group relative w-full aspect-[16/10] min-h-[190px] sm:min-h-[220px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:border-[#c59737]/60 transition-all duration-500"
              style={{ position: "relative", minHeight: "190px" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const ROOMS_TARIFF_DATA = [
  {
    id: "attic-room",
    title: "ATTIC ROOM SMALL IN SIZE AND HEIGHT WITH VIEW",
    totalRooms: 6,
    description:
      "These all-wooden rooms offer an elevated stay with pleasing mountain views. Positioned higher for a more immersive experience A cosy choice for guests who enjoy warmth, privacy, and a classic hillside ambience.",
    image: "/images/rooms/atticroom.jpg",
    alt: "Attic Room with Hillside View at Oren Kasauli",
    amenities: [
      "Approx. 225 sq.ft.",
      "Queen Size Bed",
      "Hill / Surrounding Views",
      "Modern Bathroom",
      "Fully wooden interiors",
      "Hot & cold air conditioning",
      "Tea & coffee station",
      "Mini bar",
      "42 inch screen",
      "Electronic safe",
    ],
  },
  {
    id: "superior-attic-balcony",
    title: "SUPERIOR ATTIC WITH BALCONY",
    totalRooms: 5,
    description:
      "Valley-facing, all-wooden rooms with private balconies that open to uninterrupted views of the hills. Positioned higher for a more immersive experience, these rooms offer enhanced space, natural light, warmth and privacy—ideal for guests seeking elevated comfort with scenic serenity.",
    image: "/images/rooms/superatticroom.png",
    alt: "Superior Attic Room with Private Balcony",
    amenities: [
      "Approx. 285 sq.ft",
      "King / Queen Size Bed",
      "Private balcony with Valley View",
      "Modern Bathroom",
      "Hot & cold air conditioning",
      "Minibar",
      "Tea & coffee station",
      "Electronic safe",
      "42 inch smart screen",
      "Hairdryer & premium toiletries",
    ],
  },
  {
    id: "superior-balcony",
    title: "SUPERIOR WITH BALCONY",
    totalRooms: 20,
    description:
      "Well-appointed rooms with balconies overlooking the valley, designed for relaxed and comfortable stays. Ideal for guests seeking spacious interiors, natural views, and everyday luxury.",
    image: "/images/rooms/superiorroom.png",
    alt: "Superior Room with Valley Overlook Balcony",
    amenities: [
      "Approx. 285 sq.ft.",
      "King / Queen Size Bed",
      "Private balcony with Valley View",
      "Modern Bathroom",
      "Hot & cold air conditioning",
      "Minibar",
      "Tea & coffee station",
      "Electronic safe",
      "42 inch smart screen",
      "Hairdryer & premium toiletries",
    ],
  },
  {
    id: "superior-jacuzzi",
    title: "SUPERIOR WITH JACUZZI/BATHTUB AND BALCONY",
    totalRooms: 4,
    description:
      "Valley-facing rooms featuring private balconies and a hot tub for two. Select rooms offer outdoor hot tubs on the balcony with complete privacy, while others feature indoor hot tub, all with hot and cold water.",
    image: "/images/rooms/jacuzziroom.png",
    alt: "Superior Room with Jacuzzi and Bathtub",
    amenities: [
      "Approx. 350 sq.ft.",
      "King Size Bed",
      "Balcony with Valley View",
      "Modern Bathroom",
      "Indoor / Outdoor hot tub",
      "Full privacy for outdoor hot tub",
      "Hot tub suitable for two adults",
      "Hot & cold Air conditioning",
      "Minibar",
      "Tea/coffee station",
      "Premium bathroom amenities",
    ],
  },
  {
    id: "superior-pool",
    title: "SUPERIOR WITH INFINITY PLUNGE POOL AND BALCONY",
    totalRooms: 2,
    description:
      "Exclusive valley-facing rooms with a private outdoor infinity plunge pool on the balcony. Specially designed for couples, the pool offers full privacy with both hot and cold water options.",
    image: "/images/rooms/poolroom.png",
    alt: "Superior Room with Private Infinity Plunge Pool",
    amenities: [
      "Approx. 250 sq. ft.",
      "King / Queen size bed",
      "Balcony with valley view",
      "Private infinity plunge pool (hot & cold)",
      "Complete privacy for the pool",
      "Modern bathroom",
      "Ideal for couples",
      "Mini bar",
      "42-inch smart TV",
      "Tea & coffee station",
      "Electronic safe",
      "Premium bathroom amenities",
    ],
  },
  {
    id: "family-suite",
    title: "FAMILY SUITE WITH BALCONY & LIVING AREA",
    totalRooms: 1,
    description:
      "A spacious suite featuring one bedroom with a balcony, a separate living area with sofa-cum-bed, and two washrooms. Designed for a family, it includes a hot tub, dedicated kids’ washroom, and ample space for a comfortable shared stay.",
    image: "/images/rooms/familysuite.png",
    alt: "Family Suite with Private Balcony and Living Area",
    amenities: [
      "Approx. 550 sq. ft.",
      "Master bedroom + Living room with sofa-cum-bed",
      "Private balcony with Himalayan views",
      "2 washrooms with hot tub",
      "Dedicated kids' washroom",
      "Hot & cold air conditioning",
      "Minibar & Tea/coffee station",
      "43-inch smart LED TV",
      "Electronic safe",
      "Ample wardrobe space",
    ],
  },
  {
    id: "club-room",
    title: "OREN CLUB ROOM WITH PRIVATE POOL",
    totalRooms: 1,
    description:
      "A private celebration suite featuring a personal pool and an exclusive entertainment zone designed for social gatherings. Ideal for intimate celebrations, this room comfortably hosts up to 20 guests, with hot and cold pool options.",
    image: "/images/rooms/clubroom.png",
    alt: "Oren Club Room Celebration Suite with Pool",
    amenities: [
      "Approx. 650 sq. ft.",
      "Private celebration pool (hot & cold water)",
      "Exclusive entertainment & dining lounge",
      "Hosts up to 20 guests comfortably",
      "King Size Bed & luxury seating",
      "55-inch smart LED entertainment system",
      "Private scenic balcony",
      "Fully stocked minibar & beverage station",
      "Designer bathroom with luxury fittings",
      "Electronic safe & customized services",
    ],
  },
  {
    id: "presidential-suite",
    title: "PRESIDENTIAL SUITE WITH BALCONY & KITCHENETTE",
    totalRooms: 1,
    description:
      "An expansive luxury suite with one bedroom, a separate living room with sofa-cum-bed, two private balconies, and two washrooms with a hot tub and bath options. Completed with a thoughtfully designed compact kitchenette, it offers elevated comfort for extended and premium stays.",
    image: "/images/rooms/presidentialsuite.png",
    alt: "Presidential Suite with Private Balconies and Kitchenette",
    amenities: [
      "Approx. 750 sq. ft.",
      "1 King Bedroom + Separate Living room",
      "2 Private balconies with panoramic valley views",
      "Thoughtfully designed compact kitchenette",
      "2 Washrooms with hot tub & bath options",
      "Hot & cold climate control",
      "2x 50-inch smart TVs",
      "Premium minibar & espresso coffee station",
      "In-room safe & dedicated dining table",
      "Luxury toiletries & bathrobes",
    ],
  },
];

export default function RoomAndTariffPage() {
  const shouldReduceMotion = useReducedMotion();

  // Typewriter effect that writes and erases "Luxurious Rooms" properly on loop
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        // Typing forward
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 85);
      } else {
        // Hold on full phrase for 2.4s
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (charIndex > 0) {
        // Erasing backward
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 45);
      } else {
        // Pause briefly before typing again
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  const currentHeadingText = TYPEWRITER_TEXT.slice(0, charIndex);

  return (
    <div className="relative min-h-screen w-full bg-[#faf9f6] text-neutral-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sleek, Compact Top Hero Banner with Background Image (room.jpg) — Matching Gallery Top */}
      <section className="relative h-[200px] sm:h-[230px] md:h-[260px] flex items-center justify-center pt-16 sm:pt-20 md:pt-22 pb-4 sm:pb-6 px-4 overflow-hidden border-b border-neutral-100">
        {/* Background room.jpg with Dark Atmospheric Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/room.jpg"
            alt="Oren Kasauli Luxurious Rooms"
            fill
            priority
            className="object-cover object-center filter brightness-[0.72]"
          />
          {/* Overlay: Sleek dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/80" />
        </div>

        {/* Hero Content — Strictly ONLY Typewriter effect (same sleek styling as gallery) */}
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-2">
          <h1
            className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] leading-tight min-h-[1.25em] flex items-center justify-center break-words drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span>{currentHeadingText}</span>
            <span
              className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.8em] bg-[#c59737] ml-2 animate-pulse align-middle"
              aria-hidden="true"
            />
          </h1>
        </div>
      </section>

      {/* Main Ladder-Type Cardless Showcase Section */}
      <section className="relative w-full pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* 8 Rooms in a Proper Cardless Ladder Layout (Alternating Staggered Steps) */}
          <div className="space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-40">
            {ROOMS_TARIFF_DATA.map((room, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={room.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center"
                >
                  {/* Text & Amenities Column (Appears Slowly on Scroll / Refresh) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 1.2,
                      delay: shouldReduceMotion ? 0 : 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`lg:col-span-6 xl:col-span-6 flex flex-col items-start ${
                      isEven
                        ? "order-2 lg:order-2 lg:col-start-7 xl:col-start-7 lg:pl-2 xl:pl-6"
                        : "order-2 lg:order-1 lg:pr-2 xl:pr-6"
                    }`}
                  >
                    {/* Room Title in Pure Editorial Typography (Cardless) */}
                    <h2
                      className="font-serif text-neutral-900 text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-wide leading-tight mb-2 uppercase break-words"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      {room.title}
                    </h2>

                    {/* Total Rooms Count in Gold */}
                    <div className="text-sm sm:text-base font-semibold text-[#a87d24] tracking-wide mb-3 sm:mb-4">
                      Total Rooms: {room.totalRooms}
                    </div>

                    {/* Description Paragraph */}
                    <p className="font-sans text-xs sm:text-sm md:text-[15px] text-neutral-600 leading-relaxed font-normal mb-5 sm:mb-6">
                      {room.description}
                    </p>

                    {/* Key Amenities Title */}
                    <h3 className="font-sans text-sm sm:text-base md:text-lg font-semibold text-neutral-900 mb-3 tracking-tight">
                      Key Amenities:
                    </h3>

                    {/* Amenities Checklist with Gold Checkmark Circles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-2.5 w-full mb-6 sm:mb-8">
                      {room.amenities.map((amenity, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700"
                        >
                          <span
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#b5882b] text-white flex items-center justify-center flex-shrink-0 shadow-sm"
                            aria-hidden="true"
                          >
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                          </span>
                          <span className="leading-snug">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Book Your Room Now CTA Button */}
                    <div className="w-full sm:w-auto">
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_16px_rgba(168,125,36,0.32)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_6px_22px_rgba(168,125,36,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.14em] cursor-pointer select-none w-full sm:w-auto text-center"
                        aria-label={`Book ${room.title} (opens booking engine)`}
                      >
                        <span>BOOK YOUR ROOM NOW</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Floating Image: Cardless Architecture with Botanical Background (Appears Slowly) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 35, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 1.25,
                      delay: shouldReduceMotion ? 0 : 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`lg:col-span-6 xl:col-span-6 w-full ${
                      isEven
                        ? "order-1 lg:order-1 lg:col-start-1 xl:col-start-1"
                        : "order-1 lg:order-2"
                    }`}
                  >
                    <div className="relative group w-full">
                      {/* Delicate Botanical Watercolor Watermark Accent Layer */}
                      <div
                        className={`absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-44 sm:w-64 md:w-72 h-44 sm:h-64 md:h-72 pointer-events-none opacity-25 select-none transition-transform duration-1000 ease-out group-hover:scale-105 hidden sm:block ${
                          isEven ? "-left-6 -bottom-6 sm:-left-8 sm:-bottom-8 right-auto" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 300 300"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full object-contain"
                        >
                          <circle
                            cx="150"
                            cy="150"
                            r="110"
                            stroke="#a87d24"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />
                          <path
                            d="M90 230C130 190 160 130 130 80C100 40 50 40 30 70C10 100 30 160 70 200"
                            stroke="#a87d24"
                            strokeWidth="2"
                          />
                          <path
                            d="M170 180C220 150 250 110 240 60C230 20 180 20 150 40"
                            stroke="#a87d24"
                            strokeWidth="1.5"
                          />
                          <circle cx="130" cy="110" r="8" fill="#a87d24" fillOpacity="0.3" />
                          <circle cx="180" cy="80" r="5" fill="#a87d24" fillOpacity="0.3" />
                        </svg>
                      </div>

                      {/* Cardless Floating Photograph with Soft Atmospheric Shadow */}
                      <div
                        className="relative w-full aspect-[16/10] sm:aspect-[16/10] min-h-[200px] sm:min-h-[240px] md:min-h-[280px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] sm:shadow-[0_18px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition-shadow duration-700 bg-neutral-200"
                        style={{ position: "relative", minHeight: "200px" }}
                      >
                        <Image
                          src={room.image}
                          alt={room.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                        />

                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST SERVICES & ROOM FACILITIES WITH AUTOMATIC GALLERY CAROUSEL */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0a09] text-white overflow-hidden border-t border-neutral-800">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-10 h-[1.5px] bg-[#c59737]" />
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] text-[#c59737] uppercase font-sans">
                BEST SERVICES FROM OREN KASAULI HOTEL
              </span>
              <span className="w-6 sm:w-10 h-[1.5px] bg-[#c59737]" />
            </div>
            <h2
              className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Room Facilities
            </h2>
          </div>

          {/* 8 Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 mb-14 sm:mb-18 max-w-6xl mx-auto">
            {ROOM_FACILITIES.map((facility, idx) => {
              const IconComp = facility.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#c59737]/60 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(197,151,55,0.18)] transition-all duration-300 flex items-start gap-3 sm:gap-3.5"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#c59737]/25 to-[#886216]/15 border border-[#c59737]/40 flex items-center justify-center flex-shrink-0 text-[#f3d999] group-hover:scale-105 group-hover:border-[#ffe8a8] transition-all duration-300">
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-[#f3d999]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-100 text-xs sm:text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                      {facility.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Automatic Gallery Carousel (no manual buttons) */}
          <div className="relative w-full">
            <GalleryAutoCarousel />
          </div>

          {/* Booking CTA */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_18px_rgba(168,125,36,0.38)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_6px_22px_rgba(168,125,36,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.16em] text-center"
            >
              <span>BOOK YOUR STAY NOW</span>
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto relative inline-flex items-center justify-center rounded-full font-medium uppercase whitespace-nowrap text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300 px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.16em] text-center"
            >
              <span>BACK TO HOME</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
