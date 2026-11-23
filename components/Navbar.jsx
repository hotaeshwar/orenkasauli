"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SlidingLantern from "./SlidingLantern";

// Navigation items
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
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
  const [activeSection, setActiveSection] = useState("/");
  const [slideDirection, setSlideDirection] = useState(0); // -1 (moving left), 0 (idle), 1 (moving right)

  // Determine active item: subpage pathname or homepage active section
  const activeHref =
    pathname === "/"
      ? activeSection.startsWith("#")
        ? `/${activeSection}`
        : activeSection
      : pathname;

  // Instant background appearance when user begins scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to browser URL hash changes for direct deep linking (e.g. /#about)
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    const onHashChange = () => {
      const hash = window.location.hash;
      if (NAV_ITEMS.some((item) => item.href === hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  // On homepage, track scroll position to gracefully update active section between #about and #services
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // When near page top, Home is active
      if (scrollY < 260) {
        setActiveSection("/");
        return;
      }

      const servicesEl = document.getElementById("services");
      const aboutEl = document.getElementById("about");

      const servicesTop = servicesEl ? servicesEl.offsetTop - 220 : Infinity;
      const aboutTop = aboutEl ? aboutEl.offsetTop - 220 : Infinity;

      if (scrollY >= servicesTop) {
        setActiveSection("#services");
      } else if (scrollY >= aboutTop) {
        setActiveSection("#about");
      } else {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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

  // Smooth scroll handler for anchor links, routing, and directional lantern swing
  const handleNavClick = (e, href) => {
    const currentIndex = NAV_ITEMS.findIndex((item) => item.href === activeHref);
    const newIndex = NAV_ITEMS.findIndex((item) => item.href === href);
    if (currentIndex !== -1 && newIndex !== -1 && currentIndex !== newIndex) {
      setSlideDirection(newIndex > currentIndex ? 1 : -1);
      setTimeout(() => setSlideDirection(0), 800);
    }

    setMobileMenuOpen(false);

    if (href.includes("#")) {
      const hash = href.substring(href.indexOf("#"));
      if (pathname === "/") {
        e.preventDefault();
        setActiveSection(hash);
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    } else if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        setActiveSection("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    }
  };

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(16, 52, 48,0.08)] border-b border-[#103430]/10"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      {/* Main Always-Transparent Navbar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 xl:h-28">
          {/* Logo — Displayed ~60% larger, scaled responsively for mobile, iPad Mini/Air/Pro, and desktop */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="relative flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#103430] rounded-full"
              aria-label="Oren Kasauli Homepage"
            >
              <div className="relative h-14 sm:h-16 md:h-20 lg:h-[72px] xl:h-[84px] w-auto flex items-center">
                <Image
                  src="/images/deep-teal-logo.png"
                  alt="Oren Kasauli Logo"
                  width={278}
                  height={186}
                  priority
                  loading="eager"
                  style={{ width: "auto" }}
                  className="h-full w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links — with Sliding Lantern Indicator */}
          <nav
            className="hidden lg:flex items-center gap-0.5 lg:gap-1 xl:gap-2 relative"
            onMouseLeave={() => setHoveredHref(null)}
          >


            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;
              const isHovered = hoveredHref === item.href;
              const shouldShowLantern = isActive;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-2 lg:px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-[11px] lg:text-xs xl:text-[13px] uppercase tracking-[0.06em] lg:tracking-[0.08em] xl:tracking-[0.14em] font-medium transition-colors duration-200 z-10 whitespace-nowrap ${
                    scrolled
                      ? isActive
                        ? "text-[#103430] font-bold"
                        : "text-[#103430] hover:text-[#0b2421]"
                      : isActive
                      ? "text-white font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]"
                      : "text-white hover:text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {/* Sliding Lantern Navigation Indicator — Active on Room, Gallery, Blog, Contact & upon Scroll */}
                  <AnimatePresence>
                    {shouldShowLantern && (
                      <motion.div
                        key="active-lantern-indicator"
                        initial={{ opacity: 0, y: -12, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.85 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute -top-[34px] lg:-top-[36px] xl:-top-[38px] left-0 right-0 flex justify-center pointer-events-none z-30"
                      >
                        <motion.div
                          layoutId="desktop-sliding-lantern"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                            mass: 0.8,
                          }}
                        >
                          <SlidingLantern
                            slideDirection={slideDirection}
                            isScrolled={scrolled}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shared animated pill highlight on hover */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="navbar-pill"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        scrolled
                          ? "bg-[#103430]/10 border border-[#103430]/20 shadow-sm"
                          : "bg-white/15 backdrop-blur-sm border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                      }`}
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

            {/* BOOK NOW CTA Button in Desktop Navbar with Forest Green & Hover Animation */}
            <a
              id="navbar-book-now-button"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.35)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.55)] hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-95 transition-all duration-300 ml-1.5 lg:ml-2.5 xl:ml-5 px-3 lg:px-4 xl:px-5 py-1.5 xl:py-2 text-[10px] lg:text-[11px] xl:text-xs tracking-[0.1em] xl:tracking-[0.16em] overflow-hidden"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              aria-label="Book Now (opens reservation system)"
            >
              {/* Shimmer sweep effect */}
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">BOOK NOW</span>
            </a>
          </nav>

          {/* Mobile / Tablet Controls (Phones, iPhone Air/Pro, iPad Mini/Air/Pro) */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            {/* Direct Book Now Button on Mobile/Tablet */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center rounded-full font-semibold uppercase whitespace-nowrap text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_3px_12px_rgba(16, 52, 48,0.35)] hover:shadow-[0_6px_20px_rgba(16, 52, 48,0.55)] active:scale-95 transition-all duration-300 px-2.5 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-[11px] md:text-xs tracking-[0.1em] sm:tracking-[0.14em] md:tracking-[0.16em] overflow-hidden"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              aria-label="Book Now"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">BOOK NOW</span>
            </a>

            {/* Architectural Luxury Morphing Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`relative z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#103430] active:scale-90 cursor-pointer ${
                scrolled
                  ? "bg-white/95 hover:bg-white text-[#103430] border-[#103430]/25 shadow-sm"
                  : "bg-black/40 hover:bg-black/60 text-white border-white/25 backdrop-blur-md"
              }`}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-5 h-5 flex flex-col justify-center items-center"
              >
                {/* Top / Diagonal 1 Bar */}
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: 45, y: 0, width: "18px" }
                      : { rotate: 0, y: -4, width: "20px" }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute h-[2px] rounded-full bg-current origin-center"
                />

                {/* Center Accent Dot (Fades out when open) */}
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { scale: 0, opacity: 0 }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.15 }}
                  className="absolute w-1 h-1 rounded-full bg-[#C5A77B]"
                />

                {/* Bottom / Diagonal 2 Bar */}
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: 0, width: "18px" }
                      : { rotate: 0, y: 4, width: "14px" }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute h-[2px] rounded-full bg-current origin-center"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer / Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden fixed inset-x-0 top-20 md:top-24 h-[calc(100dvh-5rem)] md:h-[calc(100dvh-6rem)] bg-[#FFF6F6]/98 backdrop-blur-2xl border-t border-[#103430]/15 z-[100] overflow-y-auto px-5 sm:px-8 py-8 flex flex-col justify-center shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col space-y-4 max-w-md w-full mx-auto my-auto">
              <span
                className="text-[11px] uppercase tracking-[0.25em] text-[#103430] font-semibold text-center"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Menu
              </span>
              <nav className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative flex items-center justify-between py-3 px-5 rounded-full text-xs sm:text-sm uppercase tracking-[0.16em] font-medium transition-colors ${
                        isActive
                          ? "bg-[#103430]/12 text-[#103430] font-bold border border-[#103430]/25 shadow-sm"
                          : "text-[#103430] hover:bg-[#103430]/8 hover:text-[#0b2421]"
                      }`}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="relative flex items-center pr-1 pointer-events-none">
                          <SlidingLantern isMobile />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
