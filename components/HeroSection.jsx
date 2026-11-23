"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import Navbar from "./Navbar";
import { ArrowUpRight } from "lucide-react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

const TYPEWRITER_TEXT = "A STAY ABOVE THE ORDINARY IN THE HEART OF KASAULI";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [containerHeight, setContainerHeight] = useState("100vh");

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
        }, 100);
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
        }, 50);
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

  useEffect(() => {
    // Check if screen is small or iPad and calculate responsive container height
    const calculateLayout = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Detect iPad devices by common resolutions or user agent
      const isIPad =
        (width === 768 && height === 1024) ||
        (width === 820 && height === 1180) ||
        (width === 834 && height === 1194) ||
        (width === 1024 && height === 1366) ||
        (height === 768 && width === 1024) ||
        (height === 820 && width === 1180) ||
        (height === 834 && width === 1194) ||
        (height === 1024 && width === 1366) ||
        navigator.userAgent.includes("iPad") ||
        (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);

      setIsSmallScreen(width < 768 && !isIPad);

      // Height based on screen type to maintain optimal video aspect ratio & prevent stretching
      if (width < 768 && !isIPad) {
        // Mobile phones (portrait)
        setContainerHeight(`${Math.min(height * 0.6, 500)}px`);
      } else if (isIPad) {
        // iPads: fixed height based on width to maintain proper 16:9 aspect ratio without stretching
        setContainerHeight(`${Math.min(width * 0.5625, height * 0.6)}px`);
      } else if (width < 1024) {
        // Other tablets and small laptops
        setContainerHeight(`${Math.min(height * 0.7, 600)}px`);
      } else {
        // Desktop
        setContainerHeight("100vh");
      }
    };

    // iPad-specific and aspect ratio video positioning adjustments
    const adjustVideoFit = () => {
      const video = videoRef.current;
      if (!video || typeof window === "undefined") return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const isIPad =
        (width === 768 && height === 1024) ||
        (width === 820 && height === 1180) ||
        (width === 834 && height === 1194) ||
        (width === 1024 && height === 1366) ||
        (height === 768 && width === 1024) ||
        (height === 820 && width === 1180) ||
        (height === 834 && width === 1194) ||
        (height === 1024 && width === 1366) ||
        navigator.userAgent.includes("iPad") ||
        (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);

      const screenRatio = width / height;
      const videoRatio = 16 / 9;

      video.style.objectFit = "cover";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.position = "absolute";
      video.style.top = "0";
      video.style.left = "0";
      video.style.transform = "translateZ(0)";

      if (isIPad) {
        video.style.objectPosition = "center center";
        video.style.minWidth = "100%";
        video.style.minHeight = "100%";
      } else if (screenRatio > videoRatio) {
        video.style.objectPosition = "center center";
      } else {
        video.style.objectPosition = "center 40%";
      }
    };

    calculateLayout();
    adjustVideoFit();

    // Optimized video handling with performance improvements
    const video = videoRef.current;
    if (video) {
      // Essential settings for smooth autoplay playback
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");

      // Performance optimizations for zero lag
      video.preload = "auto";
      video.poster = "";
      video.loading = "eager";
      video.crossOrigin = "anonymous";

      video.style.transition = "none";
      video.style.animation = "none";
      video.style.willChange = "auto";
      video.style.backfaceVisibility = "hidden";
      video.style.perspective = "1000px";
      video.style.transformStyle = "preserve-3d";

      // Slight blur on slow connections
      if ("connection" in navigator) {
        const connection = navigator.connection;
        if (connection && (connection.effectiveType === "2g" || connection.effectiveType === "3g")) {
          video.style.filter = "blur(0.5px)";
        }
      }

      // Minimal resize handling to reduce lag
      let resizeTimeout;
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          calculateLayout();
          adjustVideoFit();
        }, 300);
      };

      const handleOrientationChange = () => {
        setTimeout(() => {
          calculateLayout();
          adjustVideoFit();
        }, 500);
      };

      window.addEventListener("resize", throttledResize, { passive: true });
      window.addEventListener("orientationchange", handleOrientationChange, { passive: true });

      // Force video load before playback
      const forceVideoLoad = () => {
        return new Promise((resolve) => {
          if (video.readyState >= 3) {
            resolve();
            return;
          }
          const checkLoad = () => {
            if (video.readyState >= 3) {
              resolve();
            } else {
              setTimeout(checkLoad, 50);
            }
          };
          video.addEventListener("canplaythrough", resolve, { once: true });
          video.addEventListener("loadeddata", checkLoad, { once: true });
          video.load();
        });
      };

      // Play video with autoplay fallback for user gesture requirements
      const playVideo = async () => {
        try {
          await forceVideoLoad();
          await new Promise((resolve) => setTimeout(resolve, 150));
          await video.play();
        } catch {
          const enableVideo = async () => {
            try {
              await forceVideoLoad();
              await video.play();
              document.removeEventListener("click", enableVideo);
              document.removeEventListener("touchstart", enableVideo);
              document.removeEventListener("scroll", enableVideo);
            } catch (err) {
              console.log("Video play fallback:", err);
            }
          };
          document.addEventListener("click", enableVideo, { once: true });
          document.addEventListener("touchstart", enableVideo, { once: true });
          document.addEventListener("scroll", enableVideo, { once: true });
        }
      };

      const playTimer = setTimeout(playVideo, 400);

      return () => {
        window.removeEventListener("resize", throttledResize);
        window.removeEventListener("orientationchange", handleOrientationChange);
        clearTimeout(resizeTimeout);
        clearTimeout(playTimer);
      };
    }
  }, []);

  return (
    <>
      {/* Transparent Fixed Header / Navbar rendered outside overflow-hidden viewport */}
      <Navbar />

      {/* 1. Full-Viewport Cinematic Video Section */}
      <section
        id="hero-viewport"
        className="relative w-full overflow-hidden bg-black flex flex-col justify-between"
        style={{
          height: containerHeight,
          minHeight: isSmallScreen ? "320px" : "480px",
        }}
      >
        {/* Optimized Video Background with Performance Attributes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            src="/videos/home.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster=""
            controls={false}
            crossOrigin="anonymous"
            loading="eager"
            disablePictureInPicture
            disableRemotePlayback
            x-webkit-airplay="deny"
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              willChange: "auto",
              WebkitTransform: "translateZ(0)",
              WebkitBackfaceVisibility: "hidden",
              imageRendering: "optimizeSpeed",
              transformStyle: "preserve-3d",
              perspective: "1000px",
              transition: "none",
              animation: "none",
            }}
          >
            <source src="/videos/home.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 2. Hero Content Section (Positioned Directly Below Hero Video) */}
      <section
        id="hero-intro"
        className="relative w-full bg-[#FFF6F6] text-[#103430] py-14 sm:py-18 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#e2d8c7] z-10 overflow-hidden"
      >
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

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          {/* Eyebrow Accent */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-10 sm:w-14 h-[2px] bg-[#C5A77B]" aria-hidden="true" />
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#C5A77B]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              WELCOME TO OREN KASAULI
            </span>
            <span className="w-10 sm:w-14 h-[2px] bg-[#C5A77B]" aria-hidden="true" />
          </div>

          {/* H1 Main Heading with Zero-Layout-Shift Typewriter */}
          <h1
            className="font-serif text-[#103430] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide uppercase leading-tight mb-4 sm:mb-5 max-w-4xl select-none"
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
          </h1>

          {/* Hero Lead Paragraph - Reduced Font Size for Better Hierarchy */}
          <p
            className="font-sans text-xs sm:text-sm md:text-base text-[#103430] font-normal max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 tracking-normal"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Discover a mountain retreat where beautiful valley views, thoughtful comforts and warm hospitality come together. Experience the charm of Kasauli with a stay designed for relaxation, connection and memorable moments.
          </p>

          {/* Action Buttons: Primary (BOOK YOUR STAY) & Secondary (EXPLORE OREN) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            {/* Primary CTA: BOOK YOUR STAY */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase whitespace-nowrap text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border-2 border-[#103430] shadow-[0_4px_18px_rgba(16, 52, 48,0.35)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.16em] text-center overflow-hidden"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              aria-label="Book Your Stay at Oren Kasauli"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">BOOK YOUR STAY</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-[#FFF6F6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary CTA: EXPLORE OREN */}
            <a
              href="#about"
              className="w-full sm:w-auto relative inline-flex items-center justify-center rounded-full font-bold uppercase whitespace-nowrap text-[#103430] hover:text-[#FFF6F6] bg-transparent hover:bg-[#103430] border-2 border-[#103430] transition-all duration-300 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.16em] text-center hover:shadow-[0_4px_16px_rgba(16, 52, 48,0.25)] hover:-translate-y-0.5 active:translate-y-0"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              aria-label="Explore Oren Kasauli"
            >
              <span>EXPLORE OREN</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
