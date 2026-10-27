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
              <div className="relative h-16 sm:h-20 md:h-22 w-auto flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#c59737]/40 transition-colors">
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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Front Desk &amp; Concierge Available</span>
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

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center sm:text-left">
            © 2026 Oren Kasauli Hotel. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="text-neutral-400">Sanawar, Kasauli, Himachal Pradesh</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10 transition-colors ml-2"
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
