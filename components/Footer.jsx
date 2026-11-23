"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronUp,
  Sparkles,
} from "lucide-react";

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-27&checkout=2026-10-28&adults=2&children=0";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/orenkasauli",
    label: "Follow Oren Kasauli on Facebook",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/orenkasauli?exln=dW9mdWV4OXN6OWU3",
    label: "Follow Oren Kasauli on Instagram",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ORENKASAULI",
    label: "Subscribe to Oren Kasauli on YouTube",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      suppressHydrationWarning
      className="relative w-full bg-[#FFF6F6] text-[#103430] overflow-hidden border-t border-[#103430]/15 selection:bg-[#103430] selection:text-[#FFF6F6]"
    >
      {/* Ambient Resort Background with White Light Overlay — Exclusively using galler23.jpg */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/gallery/galler23.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#FFF6F6]/82 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 pointer-events-none" />
      </div>

      {/* Decorative Golden Ambient Glow on Top Center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-32 bg-gradient-to-b from-[#C5A77B]/15 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-start mb-12 sm:mb-16">
          {/* Column 1: Brand & Logo (Properly Visible across all devices) */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start">
            {/* Logo Wrapper — High visibility with drop shadow & glow */}
            <Link
              href="/"
              onClick={scrollToTop}
              className="group relative inline-flex items-center mb-5 sm:mb-6 focus:outline-none"
              aria-label="Oren Kasauli Homepage"
            >
              <div suppressHydrationWarning className="relative h-16 sm:h-20 md:h-24 w-auto flex items-center">
                <Image
                  src="/images/deep-teal-logo.png"
                  alt="Oren Kasauli Luxury Hotel Logo"
                  width={278}
                  height={186}
                  loading="eager"
                  style={{ width: "auto" }}
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-[#103430]/85 leading-relaxed mb-6 max-w-sm sm:max-w-md lg:max-w-sm">
              OREN Kasauli brings together comfortable mountain stays, valley-facing rooms, authentic vegetarian dining and warm hospitality in the beautiful surroundings of Kasauli, Himachal Pradesh.
            </p>

            {/* 24/7 Front Desk Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#103430]/5 border border-[#103430]/15 text-[11px] sm:text-xs text-[#103430] mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>24/7 Front Desk &amp; Concierge Available</span>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-start">
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#103430] mb-3 font-sans">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.name}
                      className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 border border-[#103430]/15 text-[#103430] hover:text-[#FFF6F6] hover:border-[#103430] hover:bg-[#103430] hover:shadow-[0_4px_12px_rgba(14,57,56,0.25)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                    >
                      <Icon className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links with 3D Immersive Animation & Hotel Cormorant Font */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-col">
            <span
              className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#103430] mb-4 sm:mb-5 font-sans flex items-center gap-2"
            >
              <span>Navigation</span>
              <span className="w-6 h-[1.5px] bg-[#C5A77B] rounded-full" aria-hidden="true" />
            </span>
            <ul
              className="flex flex-col space-y-1 sm:space-y-1.5"
              style={{ perspective: 1000 }}
            >
              {[
                { name: "Home", href: "/" },
                { name: "About Hotel", href: "/#about" },
                { name: "Amenities & Dining", href: "/#services" },
                { name: "Rooms & Tariff", href: "/room-and-tariff" },
                { name: "Guest Gallery", href: "/gallery" },
                { name: "Kasauli Travel Blog", href: "/blog" },
                { name: "Contact & Location", href: "/contact" },
              ].map((item, idx) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotateY: 8,
                      rotateX: -2,
                      z: 20,
                      x: 6,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 24 }}
                    className="relative group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Link
                      href={item.href}
                      className="relative inline-flex items-center py-1.5 px-2.5 -mx-2.5 rounded-xl transition-all duration-300"
                    >
                      {/* 3D Floating Frosted Ambient Pill on Hover */}
                      <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/95 via-[#C5A77B]/15 to-transparent border border-[#C5A77B]/30 shadow-[0_8px_20px_-4px_rgba(16, 52, 48,0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                        aria-hidden="true"
                      />

                      {/* 3D Elevated Pin / Dot in Z-Space */}
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#C5A77B] shadow-[0_0_8px_#C5A77B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out mr-2 flex-shrink-0"
                        style={{ transform: "translateZ(15px)" }}
                        aria-hidden="true"
                      />

                      {/* Editorial Hotel Serif Font Text with 3D Depth */}
                      <span
                        className="font-serif text-base sm:text-lg lg:text-[19px] tracking-wide text-[#103430]/80 group-hover:text-[#103430] group-hover:font-medium transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.04)] group-hover:drop-shadow-[0_4px_8px_rgba(16, 52, 48,0.18)]"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          transform: "translateZ(12px)",
                        }}
                      >
                        {item.name}
                      </span>

                      {/* 3D Elevated Micro-Arrow */}
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-[#C5A77B] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-out ml-1.5 flex-shrink-0"
                        style={{ transform: "translateZ(16px)" }}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resort Experiences */}
          <div className="sm:col-span-1 lg:col-span-3 flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#103430] mb-4 sm:mb-5 font-sans">
              Experiences
            </span>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-[#103430]/80">
              <li className="hover:text-[#103430] transition-colors">
                Panoramic Valley Balconies
              </li>
              <li className="hover:text-[#103430] transition-colors">
                Private Hot Tub &amp; Jacuzzi
              </li>
              <li className="hover:text-[#103430] transition-colors">
                Infinity Plunge Pool Suites
              </li>
              <li className="hover:text-[#103430] transition-colors">
                Open to Sky Pure Veg Dining
              </li>
              <li className="hover:text-[#103430] transition-colors">
                Private Forest Trails &amp; Bonfire
              </li>
              <li className="hover:text-[#103430] transition-colors">
                UNESCO Toy Train (10 km away)
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information & Direct Booking */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#103430] mb-4 sm:mb-5 font-sans">
              Contact &amp; Reservations
            </span>

            <div className="flex flex-col space-y-3 text-xs sm:text-sm text-[#103430]/85 mb-6">
              {/* Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A77B] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5">
                  <a
                    href="tel:+919816155576"
                    className="hover:text-[#103430] transition-colors"
                  >
                    +91 98161 55576
                  </a>
                  <a
                    href="tel:+919816255576"
                    className="hover:text-[#103430] transition-colors"
                  >
                    +91 98162 55576
                  </a>
                  <a
                    href="tel:01792298076"
                    className="hover:text-[#103430] transition-colors"
                  >
                    01792 298076
                  </a>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A77B] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5">
                  <a
                    href="mailto:booking@oren.co.in"
                    className="hover:text-[#103430] transition-colors"
                  >
                    booking@oren.co.in
                  </a>
                  <a
                    href="mailto:orenkasauli@gmail.com"
                    className="hover:text-[#103430] transition-colors"
                  >
                    orenkasauli@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A77B] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[#103430]/80 text-xs">
                  Dharampur–Kasauli Road, V.P.O. Sanawar, Tehsil Kasauli, District Solan, Himachal Pradesh – 173202.
                </p>
              </div>
            </div>

            {/* Direct Booking CTA Button with Forest Green & Hover Animation */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full font-semibold uppercase whitespace-nowrap text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.35)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.55)] hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-95 transition-all duration-300 px-6 py-3 text-xs tracking-[0.16em] text-center overflow-hidden"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {/* Shimmer sweep effect */}
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">BOOK YOUR STAY</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#FFF6F6]" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials & Back to Top */}
        <div suppressHydrationWarning className="pt-8 border-t border-[#103430]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#103430]/70">
          <p className="text-center md:text-left text-[#103430]/75">
            © 2026 Oren Kasauli Hotel. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            <span className="hidden sm:inline text-[#103430]/30">|</span>
            <span className="text-[#103430]/75 text-center">Sanawar, Kasauli, Himachal Pradesh</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-[#103430] text-[#103430] hover:text-[#FFF6F6] border border-[#103430]/15 transition-colors ml-1 sm:ml-2 shadow-sm"
              aria-label="Back to top of page"
            >
              <span>Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
