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
    <div className="relative min-h-screen w-full bg-[#ffffff] text-neutral-900 overflow-x-hidden selection:bg-[#a87d24] selection:text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sleek, Compact Top Hero Banner with Background, Dark Overlay & Typewriter Heading */}
      <section className="relative h-[200px] sm:h-[230px] md:h-[260px] flex items-center justify-center pt-16 sm:pt-20 md:pt-22 pb-4 sm:pb-6 px-4 overflow-hidden border-b border-neutral-100">
        {/* Atmospheric Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/gallery/topimage.jpg"
            alt="Oren Kasauli Blog Banner"
            fill
            priority
            className="object-cover object-center filter brightness-[0.70]"
          />
          {/* Sleek dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/80" />
        </div>

        {/* Hero Content — Strictly the Typewriter Heading */}
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

      {/* Main Blog Section Content (Background #ffffff) */}
      <main className="relative w-full bg-[#ffffff]">
        <BlogSection />
      </main>
    </div>
  );
}
