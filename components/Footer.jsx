"use client";

import Image from "next/image";
import Link from "next/link";
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
    <footer className="relative w-full bg-[#121110] text-neutral-300 overflow-hidden border-t border-neutral-800 selection:bg-[#a87d24] selection:text-white">
      {/* Decorative Golden Ambient Glow on Top Center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-32 bg-gradient-to-b from-[#a87d24]/20 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12">
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
              <div className="relative h-16 sm:h-20 md:h-24 w-auto flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#c59737]/40 transition-colors">
                <Image
                  src="/images/orenkasauli-logo.png"
                  alt="Oren Kasauli Luxury Hotel Logo"
                  width={278}
                  height={176}
                  loading="eager"
                  className="h-full w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(168,125,36,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm sm:max-w-md lg:max-w-sm">
              Where luxury meets nature in the serene Shivalik Hills of Kasauli. High-end accommodation with breathtaking Himalayan views, private hot tubs, and pure tranquility.
            </p>

            {/* 24/7 Front Desk Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs text-neutral-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Front Desk &amp; Concierge Available</span>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-start">
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#c59737] mb-3 font-sans">
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
                      className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:border-[#c59737]/70 hover:bg-[#c59737]/15 hover:shadow-[0_0_16px_rgba(197,151,55,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#c59737] mb-4 sm:mb-5 font-sans">
              Navigation
            </span>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  About Hotel
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Amenities &amp; Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/room-and-tariff"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Rooms &amp; Tariff
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Guest Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Kasauli Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resort Experiences */}
          <div className="sm:col-span-1 lg:col-span-3 flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#c59737] mb-4 sm:mb-5 font-sans">
              Experiences
            </span>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li className="hover:text-neutral-200 transition-colors">
                Panoramic Valley Balconies
              </li>
              <li className="hover:text-neutral-200 transition-colors">
                Private Hot Tub &amp; Jacuzzi
              </li>
              <li className="hover:text-neutral-200 transition-colors">
                Infinity Plunge Pool Suites
              </li>
              <li className="hover:text-neutral-200 transition-colors">
                Open to Sky Pure Veg Dining
              </li>
              <li className="hover:text-neutral-200 transition-colors">
                Private Forest Trails &amp; Bonfire
              </li>
              <li className="hover:text-neutral-200 transition-colors">
                UNESCO Toy Train (10 km away)
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information & Direct Booking */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#c59737] mb-4 sm:mb-5 font-sans">
              Contact &amp; Reservations
            </span>

            <div className="flex flex-col space-y-3 text-xs sm:text-sm text-neutral-400 mb-6">
              {/* Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#c59737] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a
                    href="tel:+919816155576"
                    className="hover:text-white transition-colors"
                  >
                    +91 98161 55576
                  </a>
                  <a
                    href="tel:+919816255576"
                    className="hover:text-white transition-colors"
                  >
                    +91 98162 55576
                  </a>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#c59737] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a
                    href="mailto:booking@oren.co.in"
                    className="hover:text-white transition-colors"
                  >
                    booking@oren.co.in
                  </a>
                  <a
                    href="mailto:orenkasauli@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    orenkasauli@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c59737] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed text-neutral-400 text-xs">
                  Dharampur - Kasauli Road, V.P.O. Sanawar, Tehsil Kasauli, District Solan, Himachal Pradesh - 173202
                </p>
              </div>
            </div>

            {/* Direct Booking CTA Button */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_16px_rgba(168,125,36,0.35)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:scale-[1.02] active:scale-95 transition-all duration-300 px-6 py-3 text-xs tracking-[0.16em] text-center"
            >
              <span>BOOK YOUR STAY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials & Back to Top */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center md:text-left">
            © 2026 Oren Kasauli Hotel. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={`bottom-${item.name}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.name}
                  className="p-1 text-neutral-400 hover:text-[#c59737] transition-colors"
                >
                  <Icon className="w-4 h-4 fill-current" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="text-neutral-400 text-center">Sanawar, Kasauli, Himachal Pradesh</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10 transition-colors ml-1 sm:ml-2"
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
