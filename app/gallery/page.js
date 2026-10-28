"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowUpRight,
  Footprints,
  Gamepad2,
  Utensils,
  PartyPopper,
  Flame,
  MapPin,
  Play,
  Film,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-27&checkout=2026-10-28&adults=2&children=0";

const TYPEWRITER_TEXT = "Gallery";
const VIDEO_HEADING_TEXT = "Video Shoot By Guest";

const GUEST_VIDEOS = [
  {
    id: "bindra",
    src: "/videos/guests/bindra.mp4",
    title: "Mr Sandeep bindal from Gurgaon",
    city: "Gurgaon",
    tag: "Guest Story",
  },
  {
    id: "panchkula",
    src: "/videos/guests/panchkula.mp4",
    title: "Our guest from Panchkula",
    city: "Panchkula",
    tag: "Guest Story",
  },
  {
    id: "guest2",
    src: "/videos/guests/guest2.mp4",
    title: "Scenic Balcony & Valley Memories",
    city: "Oren Kasauli",
    tag: "Guest Shoot",
  },
  {
    id: "guest1",
    src: "/videos/guests/guest1.mp4",
    title: "Unwinding in the Hills",
    city: "Oren Kasauli",
    tag: "Guest Shoot",
  },
  {
    id: "guest",
    src: "/videos/guests/guest.mp4",
    title: "Serene Mountain Getaway",
    city: "Oren Kasauli",
    tag: "Guest Shoot",
  },
];

const ACTIVITIES_DATA = [
  {
    title: "Nature Walks",
    icon: Footprints,
  },
  {
    title: "Variety of Games",
    icon: Gamepad2,
  },
  {
    title: "Outdoor BBQ (On Request)",
    icon: Utensils,
  },
  {
    title: "Celebrations",
    icon: PartyPopper,
  },
  {
    title: "Bonfire (On Request)",
    icon: Flame,
  },
  {
    title: "Visit to Nearby Places",
    icon: MapPin,
  },
];

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/gallery/galler1.jpeg",
    alt: "Oren Kasauli Experience 1",
    width: 1030,
    height: 773,
    caption: "Luxury Mountain Architecture",
  },
  {
    id: 2,
    src: "/images/gallery/galler2.jpeg",
    alt: "Oren Kasauli Experience 2",
    width: 1030,
    height: 773,
    caption: "Scenic Valley Balcony Horizon",
  },
  {
    id: 3,
    src: "/images/gallery/gallaer3.jpeg",
    alt: "Oren Kasauli Experience 3",
    width: 1030,
    height: 773,
    caption: "Warm Wooden Suite Interiors",
  },
  {
    id: 4,
    src: "/images/gallery/galler4.jpeg",
    alt: "Oren Kasauli Experience 4",
    width: 1030,
    height: 773,
    caption: "Himalayan Hillside Vistas",
  },
  {
    id: 5,
    src: "/images/gallery/galler6.jpeg",
    alt: "Oren Kasauli Experience 5",
    width: 1030,
    height: 761,
    caption: "Private Balcony Valley Panoramas",
  },
  {
    id: 6,
    src: "/images/gallery/galler7.jpeg",
    alt: "Oren Kasauli Experience 6",
    width: 1030,
    height: 773,
    caption: "Sunset Over Pine Forest Valleys",
  },
  {
    id: 7,
    src: "/images/gallery/galler8.jpg",
    alt: "Oren Kasauli Experience 7",
    width: 1030,
    height: 773,
    caption: "Elegantly Crafted Bedroom Spaces",
  },
  {
    id: 8,
    src: "/images/gallery/galler9.jpg",
    alt: "Oren Kasauli Experience 8",
    width: 1030,
    height: 773,
    caption: "Sophisticated Living & Seating",
  },
  {
    id: 9,
    src: "/images/gallery/galler10.jpg",
    alt: "Oren Kasauli Experience 9",
    width: 1030,
    height: 773,
    caption: "Private Outdoor Hot Tub Serenity",
  },
  {
    id: 10,
    src: "/images/gallery/galler11.jpg",
    alt: "Oren Kasauli Experience 10",
    width: 1030,
    height: 773,
    caption: "Panoramic Resort Terraces",
  },
  {
    id: 11,
    src: "/images/gallery/galler12.jpg",
    alt: "Oren Kasauli Experience 11",
    width: 1030,
    height: 773,
    caption: "Cozy All-Wooden Ambiance",
  },
  {
    id: 12,
    src: "/images/gallery/galler13.jpg",
    alt: "Oren Kasauli Experience 12",
    width: 1030,
    height: 773,
    caption: "Hygienic Modern Bathroom Design",
  },
  {
    id: 13,
    src: "/images/gallery/gallar14.jpg",
    alt: "Oren Kasauli Experience 13",
    width: 1030,
    height: 773,
    caption: "Intimate Dining & Mountain Breezes",
  },
  {
    id: 14,
    src: "/images/gallery/galler15.jpg",
    alt: "Oren Kasauli Experience 14",
    width: 1030,
    height: 773,
    caption: "Sunlit Mountain Balcony Haven",
  },
  {
    id: 15,
    src: "/images/gallery/galler16.jpg",
    alt: "Oren Kasauli Experience 15",
    width: 1030,
    height: 773,
    caption: "Exclusive Suite Luxury Details",
  },
  {
    id: 16,
    src: "/images/gallery/galler18.jpg",
    alt: "Oren Kasauli Experience 16",
    width: 1000,
    height: 750,
    caption: "Atmospheric Evening Hill Lights",
  },
  {
    id: 17,
    src: "/images/gallery/gallar19.jpg",
    alt: "Oren Kasauli Experience 17",
    width: 1030,
    height: 773,
    caption: "Himalayan Ridge Line Perspectives",
  },
  {
    id: 18,
    src: "/images/gallery/galler20.jpg",
    alt: "Oren Kasauli Experience 18",
    width: 750,
    height: 1000,
    caption: "Vertical Perspective of Kasauli Hills",
  },
  {
    id: 19,
    src: "/images/gallery/galler21.jpg",
    alt: "Oren Kasauli Experience 19",
    width: 783,
    height: 953,
    caption: "Architectural Wood & Glass Elements",
  },
  {
    id: 20,
    src: "/images/gallery/galler22.jpg",
    alt: "Oren Kasauli Experience 20",
    width: 1030,
    height: 773,
    caption: "Peaceful Morning Mist & Valley Views",
  },
  {
    id: 21,
    src: "/images/gallery/galler23.jpg",
    alt: "Oren Kasauli Experience 21",
    width: 1000,
    height: 462,
    caption: "Wide Himalayan Horizon Panorama",
  },
];

export default function GalleryPage() {
  // Typewriter effect that writes and erases "Gallery" on loop
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        // Typing forward
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 130);
      } else {
        // Hold on full phrase for 2.2 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charIndex > 0) {
        // Erasing backward
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 75);
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

  // Typewriter effect that writes and erases "Video Shoot By Guest" on loop
  const [videoCharIndex, setVideoCharIndex] = useState(0);
  const [isVideoDeleting, setIsVideoDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isVideoDeleting) {
      if (videoCharIndex < VIDEO_HEADING_TEXT.length) {
        timer = setTimeout(() => {
          setVideoCharIndex((prev) => prev + 1);
        }, 110);
      } else {
        // Hold full phrase for 2.2s
        timer = setTimeout(() => {
          setIsVideoDeleting(true);
        }, 2200);
      }
    } else {
      if (videoCharIndex > 0) {
        timer = setTimeout(() => {
          setVideoCharIndex((prev) => prev - 1);
        }, 60);
      } else {
        timer = setTimeout(() => {
          setIsVideoDeleting(false);
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [videoCharIndex, isVideoDeleting]);

  const currentVideoHeading = VIDEO_HEADING_TEXT.slice(0, videoCharIndex);

  // Full-screen Lightbox & Video State
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePrev = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Keyboard navigation for Lightbox & Video Player
  useEffect(() => {
    if (selectedImageIndex === null && selectedVideo === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedVideo !== null) setSelectedVideo(null);
        if (selectedImageIndex !== null) handleClose();
      }
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, selectedVideo, handleClose, handlePrev, handleNext]);

  // Prevent body scroll when lightbox or video player is open
  useEffect(() => {
    if (selectedImageIndex !== null || selectedVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex, selectedVideo]);

  return (
    <div className="relative min-h-screen w-full bg-[#ffffff] text-neutral-900 overflow-x-hidden selection:bg-[#a87d24] selection:text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sleek, Compact Top Hero Banner with topimage.jpg & Overlay */}
      <section className="relative min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 overflow-hidden border-b border-neutral-100">
        {/* Background topimage.jpg with Dark Atmospheric Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/gallery/topimage.jpg"
            alt="Oren Kasauli Gallery Banner"
            fill
            priority
            className="object-cover object-center filter brightness-[0.72]"
          />
          {/* Overlay: Sleek dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/80" />
        </div>

        {/* Hero Content with Oren Logo Emblem */}
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-2 flex flex-col items-center">
          {/* Golden Circular Logo Emblem (oren1.png) */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3 select-none drop-shadow-md flex items-center justify-center">
            <Image
              src="/images/oren1.png"
              alt="Oren Kasauli Logo Emblem"
              width={81}
              height={79}
              priority={false}
              className="w-full h-full object-contain"
            />
          </div>

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

      {/* Main Gallery Section — Pure White Background (#fff) with Scroll & Refresh "Stick from Bottom" Animation */}
      <main className="relative w-full bg-[#ffffff] pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Uniform Responsive Grid (Aligned Rows and Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {GALLERY_IMAGES.map((item, index) => {
              // Stagger delay based on column to create a wave-like rise from the bottom
              const columnDelay = (index % 3) * 0.1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 110, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{
                    duration: 0.85,
                    delay: columnDelay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group cursor-pointer will-change-transform"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  {/* Uniform Aspect-Ratio Card Container with Soft Shadow and Rounded Corners */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_45px_rgba(168,125,36,0.22)] hover:border-[#c59737]/80 transition-all duration-500">
                    {/* Photograph with fill and smooth scale on hover */}
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Sleek Overlay with Maximize Icon on Hover (NO TEXT) */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Video Shoot By Guest Section — Positioned below image card grid with same stick-from-bottom animation effect */}
      <section className="relative w-full bg-[#ffffff] py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Typewriter Write & Erase Effect */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            {/* Golden Circular Logo Emblem (oren1.png) */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2.5 sm:mb-3 select-none drop-shadow-sm flex items-center justify-center">
              <Image
                src="/images/oren1.png"
                alt="Oren Kasauli Logo Emblem"
                width={81}
                height={79}
                priority={false}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3">
              <span className="w-8 sm:w-12 h-[1.5px] bg-[#c59737]" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.24em] text-[#a87d24] uppercase font-sans">
                AUTHENTIC MOMENTS &amp; EXPERIENCES
              </span>
              <span className="w-8 sm:w-12 h-[1.5px] bg-[#c59737]" />
            </div>

            {/* Heading with Typewriter Erase & Write Effect */}
            <h2
              className="font-serif text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.04em] leading-tight min-h-[1.25em] flex items-center justify-center break-words text-center"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              <span>{currentVideoHeading}</span>
              <span
                className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.8em] bg-[#c59737] ml-2 animate-pulse align-middle"
                aria-hidden="true"
              />
            </h2>
          </div>

          {/* 5 Clean, Tagless, Uniform Video Cards Grid with Same Stick from Bottom Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {GUEST_VIDEOS.map((video, index) => {
              const columnDelay = (index % 3) * 0.1;

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 110, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{
                    duration: 0.85,
                    delay: columnDelay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group cursor-pointer will-change-transform flex flex-col"
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Clean Uniform Video Card (Without Any Text or Tags) */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl bg-neutral-950 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_45px_rgba(168,125,36,0.22)] hover:border-[#c59737]/80 transition-all duration-500 overflow-hidden flex items-center justify-center">
                    {/* Video Preview */}
                    <video
                      src={`${video.src}#t=0.001`}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                    />

                    {/* Subtle Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 group-hover:from-black/40 group-hover:via-transparent transition-all duration-300" />

                    {/* Center Animated Gold Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border-2 border-white/90 shadow-[0_4px_24px_rgba(168,125,36,0.65)] flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-[0_6px_32px_rgba(168,125,36,0.9)] transition-all duration-300">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white ml-0.5 sm:ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST SERVICES FROM OREN KASAULI HOTEL - Activities & Vacation Booking Section with topimage.jpg Background */}
      <section className="relative w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden text-white border-t border-neutral-200">
        {/* Background topimage.jpg with Deep Contrast Atmospheric Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/gallery/topimage.jpg"
            alt="Oren Kasauli Activities Background"
            fill
            priority={false}
            className="object-cover object-center filter brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Golden Circular Logo Emblem (oren1.png) */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2.5 sm:mb-3 select-none drop-shadow-sm flex items-center justify-center">
            <Image
              src="/images/oren1.png"
              alt="Oren Kasauli Logo Emblem"
              width={81}
              height={79}
              priority={false}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Eyebrow: BEST SERVICES FROM OREN KASAULI HOTEL */}
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3.5 mb-3">
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#c59737]" />
            <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.24em] text-[#c59737] uppercase font-sans">
              BEST SERVICES FROM OREN KASAULI HOTEL
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#c59737]" />
          </div>

          {/* Section Title: Activities */}
          <h2
            className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-8 sm:mb-12"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Activities
          </h2>

          {/* 6 Activities Grid with Proper Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-14 sm:mb-16 md:mb-20 text-left">
            {ACTIVITIES_DATA.map((activity, idx) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-[#c59737]/70 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(197,151,55,0.22)] backdrop-blur-md transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#c59737]/30 to-[#886216]/15 border border-[#c59737]/50 flex items-center justify-center flex-shrink-0 text-[#f3d999] group-hover:scale-105 group-hover:border-[#ffe8a8] transition-all duration-300 shadow-sm">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#f3d999]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm sm:text-base font-medium leading-snug tracking-wide group-hover:text-[#f3d999] transition-colors duration-300">
                      {activity.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elegant Gold Divider */}
          <div className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#c59737]/50 to-transparent mb-10 sm:mb-14" />

          {/* CONTACT US TODAY & Book Your Next Vacation! */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#e8c67a] mb-2 sm:mb-2.5">
              CONTACT US TODAY
            </span>
            <h3
              className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-7 sm:mb-9"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Book Your Next Vacation!
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_18px_rgba(168,125,36,0.38)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_6px_24px_rgba(168,125,36,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 px-9 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.18em] text-center"
              >
                <span>BOOK NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto relative inline-flex items-center justify-center rounded-full font-medium uppercase whitespace-nowrap text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300 px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.16em] text-center"
              >
                <span>BACK TO HOME</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
            onClick={handleClose}
          >
            {/* Lightbox Top Bar */}
            <div
              className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white/80 text-xs sm:text-sm tracking-[0.2em] uppercase font-mono">
                {String(selectedImageIndex + 1).padStart(2, "0")} /{" "}
                {String(GALLERY_IMAGES.length).padStart(2, "0")}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c59737]"
                  aria-label="Close fullscreen gallery"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Stage */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-3 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Current Active Image with animated entrance */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative w-full h-full max-h-[75vh] sm:max-h-[82vh] flex items-center justify-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={GALLERY_IMAGES[selectedImageIndex].src}
                      alt={GALLERY_IMAGES[selectedImageIndex].alt}
                      fill
                      sizes="95vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Lightbox Caption Bottom Bar */}
            <div
              className="w-full max-w-4xl mx-auto text-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/90 text-xs sm:text-sm md:text-base font-serif tracking-wide">
                {GALLERY_IMAGES[selectedImageIndex].caption}
              </p>
              <p className="text-neutral-400 text-[11px] sm:text-xs mt-1">
                Use Left / Right arrow keys or buttons to navigate • Press Esc to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Player Modal with ALL CONTROLS available */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Top Header Bar */}
            <div
              className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 mb-2 sm:mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c59737] animate-pulse" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#f3d999]">
                  Guest Video
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-white/90 text-sm sm:text-base font-serif tracking-wide hidden sm:inline">
                  {selectedVideo.title}
                </span>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c59737]"
                aria-label="Close video player"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Video Display Area with Full Native HTML5 Video Controls */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={selectedVideo.src}
                src={selectedVideo.src}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] sm:max-h-[82vh] w-auto max-w-full rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] border border-white/15 bg-black object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Bottom Title Bar */}
            <div
              className="w-full max-w-4xl mx-auto text-center z-10 pt-2 sm:pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-white font-serif text-base sm:text-lg md:text-xl tracking-wide">
                {selectedVideo.title}
              </h4>
              <p className="text-neutral-400 text-[11px] sm:text-xs mt-0.5">
                Full video controls available (Play, Pause, Volume, Scrub, Fullscreen) • Press Esc or click outside to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
