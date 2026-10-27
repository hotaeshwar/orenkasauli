"use client";

import { useEffect, useRef } from "react";
import Navbar from "./Navbar";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure autoplay policies on Chrome/Safari/Edge are fully satisfied
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video autoplay notice:", err?.message || err);
        });
      }
    }
  }, []);

  return (
    <section
      id="hero-viewport"
      className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between"
    >
      {/* 1. Full-Screen Looping Background Video (/videos/home.mp4) without any dark overlay */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/home.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/home.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Transparent Navbar (Original Logo ~60% larger, Nav Links with Pill Animation & BOOK NOW button) */}
      <Navbar />
    </section>
  );
}
