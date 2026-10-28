"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

// Navigation items
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Room & Tariff", href: "/room-and-tariff" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const BOOKING_URL =
  "https://letsbook.me/booking/orenkasauli?checkin=2026-10-26&checkout=2026-10-27&adults=2&children=0";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredHref, setHoveredHref] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle background darkening when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler for anchor links and routing
  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        setMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setMobileMenuOpen(false);
        router.push("/" + href);
      }
    } else if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
      {/* Main Always-Transparent Navbar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 xl:h-28">
          {/* Logo — Displayed ~60% larger, scaled responsively for mobile, iPad Mini/Air/Pro, and desktop */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="relative flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a87d24] rounded-full"
              aria-label="Oren Kasauli Homepage"
            >
              <div className="relative h-14 sm:h-16 md:h-20 lg:h-[72px] xl:h-[84px] w-auto flex items-center">
                <Image
                  src="/images/orenkasauli-logo.png"
                  alt="Oren Kasauli Logo"
                  width={278}
                  height={176}
                  priority
                  loading="eager"
                  className="h-full w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links — #f8f9f7 */}
          <nav
            className="hidden lg:flex items-center gap-0.5 lg:gap-1 xl:gap-2"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  className={`relative px-2 lg:px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-[11px] lg:text-xs xl:text-[13px] uppercase tracking-[0.06em] lg:tracking-[0.08em] xl:tracking-[0.14em] font-semibold transition-colors duration-200 z-10 whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] ${
                    isActive
                      ? "text-[#a87d24] font-bold"
                      : "text-[#f8f9f7] hover:text-[#c59737]"
                  }`}
                >
                  {/* Shared animated pill highlight using Motion for React */}
                  {isHovered && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.35)] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* BOOK NOW CTA Button in Desktop Navbar (Pure Tailwind CSS, Rounded-Full Small) */}
            <a
              id="navbar-book-now-button"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_16px_rgba(168,125,36,0.38)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_6px_22px_rgba(168,125,36,0.65)] hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-95 transition-all duration-300 ml-1.5 lg:ml-2.5 xl:ml-5 px-3 lg:px-3.5 xl:px-5 py-1.5 xl:py-2 text-[10px] lg:text-[11px] xl:text-xs tracking-[0.1em] xl:tracking-[0.16em]"
              aria-label="Book Now (opens reservation system)"
            >
              <span>BOOK NOW</span>
            </a>
          </nav>

          {/* Mobile / Tablet Controls (Phones, iPad Mini 768px, iPad Air 820px, iPad Pro 11" 834px portrait) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:hidden">
            {/* Direct Book Now Button on Mobile/Tablet */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_3px_12px_rgba(168,125,36,0.35)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_4px_18px_rgba(168,125,36,0.55)] active:scale-95 transition-all duration-300 px-3 sm:px-4 md:px-5 py-1.5 md:py-2 text-[10px] sm:text-[11px] md:text-xs tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.16em]"
              aria-label="Book Now"
            >
              <span>BOOK NOW</span>
            </a>

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-full text-[#f8f9f7] hover:text-[#a87d24] bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#f8f9f7]" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#f8f9f7]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer / Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed inset-x-0 top-20 md:top-24 bottom-0 bg-[#0c0a09]/95 backdrop-blur-2xl border-t border-white/10 z-40 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 flex flex-col justify-between shadow-2xl"
          >
            <div className="flex flex-col space-y-4 max-w-md w-full mx-auto">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#a87d24] font-bold">
                Menu
              </span>
              <nav className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between py-3 px-4 rounded-full text-sm sm:text-base uppercase tracking-[0.16em] font-medium transition-colors ${
                        isActive
                          ? "bg-white/15 text-[#a87d24] font-bold border border-white/10"
                          : "text-[#f8f9f7] hover:bg-white/10 hover:text-[#a87d24]"
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Contact Reference */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col space-y-2 text-xs text-[#f8f9f7]/70 max-w-md w-full mx-auto">
              <p className="hidden md:block font-semibold text-[#f8f9f7]">Oren Kasauli, Himachal Pradesh</p>
              <p>Direct: +91 9816155576 | +91 9816255576</p>
              <p>Email: booking@oren.co.in</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
