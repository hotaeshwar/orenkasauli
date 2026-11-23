"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BlogSection from "@/components/BlogSection";

const TYPEWRITER_TEXT = "Kasauli Travel Blog";

export default function BlogPage() {
  // Looping Typewriter Effect for the top section (writes, pauses, erases, and repeats)
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 110);
      } else {
        // Hold full title for 2.4 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
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
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  const currentHeadingText = TYPEWRITER_TEXT.slice(0, charIndex);

  return (
    <div className="relative min-h-screen w-full bg-[#FFF6F6] text-[#103430] overflow-x-hidden selection:bg-[#C5A77B] selection:text-[#103430]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sleek, Compact Top Hero Banner with Background, Light Backdrop & Typewriter Heading */}
      <section className="relative min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 overflow-hidden border-b border-[#e5dccf] bg-[#FFF6F6]">
        {/* Atmospheric Background Image with Luminous Light Backdrop */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none" aria-hidden="true">
          <Image
            src="/images/gallery/topimage.jpg"
            alt="Oren Kasauli Blog Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Luminous soft scrim: preserves blog photography while ensuring crisp text contrast */}
          <div className="absolute inset-0 bg-[#FFF6F6]/80 backdrop-blur-[2px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-2 flex flex-col items-center">
          <h1
            className="font-serif text-[#103430] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-[0.04em] leading-tight min-h-[1.25em] flex items-center justify-center break-words"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span>{currentHeadingText}</span>
            <span
              className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.8em] bg-[#C5A77B] ml-2 animate-pulse align-middle"
              aria-hidden="true"
            />
          </h1>
        </div>
      </section>

      {/* Main Blog Section Content */}
      <main className="relative w-full bg-transparent">
        <BlogSection />
      </main>
    </div>
  );
}
