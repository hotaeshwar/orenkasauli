"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const TYPEWRITER_TEXT = "Contact Us";

export default function ContactPage() {
  // Typewriter effect that writes and erases "Contact Us" on loop
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charIndex < TYPEWRITER_TEXT.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 120);
      } else {
        // Hold on "Contact Us" for 2.2 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 65);
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

  return (
    <div className="relative min-h-screen w-full bg-[#FFF6F6] text-[#165823] overflow-x-hidden selection:bg-[#C5A77B] selection:text-[#165823]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sleek, Compact Top Hero Banner with contacttop.jpg & Light Backdrop */}
      <section className="relative min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 overflow-hidden border-b border-[#e5dccf] bg-[#FFF6F6]">
        {/* Background contacttop.jpg with Luminous Light Backdrop */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none" aria-hidden="true">
          <Image
            src="/images/contacttop.jpg"
            alt="Oren Kasauli Contact Us Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Luminous soft scrim: preserves contact photography while ensuring crisp text contrast */}
          <div className="absolute inset-0 bg-[#FFF6F6]/80 backdrop-blur-[2px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-2 flex flex-col items-center">
          <h1
            className="font-serif text-[#165823] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-[0.04em] leading-tight min-h-[1.25em] flex items-center justify-center break-words"
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

      {/* Main Contact Section — Warm Ivory Background with galler12.jpg & White Light Overlay */}
      <main className="relative w-full bg-[#FFF6F6] pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-[#e5dccf] overflow-hidden">
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

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span
                className="w-10 sm:w-14 h-[2px] bg-[#C5A77B] rounded-full flex-shrink-0"
                aria-hidden="true"
              />
              <span
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#C5A77B]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                GET IN TOUCH
              </span>
              <span
                className="w-10 sm:w-14 h-[2px] bg-[#C5A77B] rounded-full flex-shrink-0"
                aria-hidden="true"
              />
            </div>
            <h2
              className="font-serif text-[#165823] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight text-center select-none"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              We Are Here To Assist You
            </h2>
            <p
              className="font-sans text-xs sm:text-sm md:text-base text-[#165823]/80 font-normal max-w-xl mx-auto leading-relaxed text-center mt-2.5 sm:mt-3"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Reach out directly for customized valley stays, corporate getaways, and authentic mountain dining experiences in Kasauli.
            </p>
          </div>

          {/* 1. TOP ROW: 4 Equal-Height Luxury Resort Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
            {/* Card 1: Phone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="group p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#e2d8c7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(197,167,123,0.22)] hover:border-[#C5A77B]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A77B]/20 border border-[#C5A77B]/40 flex items-center justify-center flex-shrink-0 text-[#165823] group-hover:scale-110 group-hover:border-[#C5A77B] transition-all duration-300 shadow-sm">
                  <Phone className="w-4 h-4 text-[#165823]" />
                </div>
                <div>
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A77B] block"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Call Direct
                  </span>
                  <h3
                    className="font-serif text-[#165823] text-base sm:text-lg font-normal leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Phone Reservations
                  </h3>
                </div>
              </div>
              <div className="flex flex-col space-y-1 text-xs sm:text-[13px] text-[#165823]/85 pt-1">
                <a
                  href="tel:+919816155576"
                  className="hover:text-[#C5A77B] transition-colors font-medium tracking-wide"
                >
                  +91 98161 55576
                </a>
                <a
                  href="tel:+919816255576"
                  className="hover:text-[#C5A77B] transition-colors font-medium tracking-wide"
                >
                  +91 98162 55576
                </a>
                <a
                  href="tel:01792298076"
                  className="hover:text-[#C5A77B] transition-colors font-medium tracking-wide"
                >
                  01792 298076
                </a>
              </div>
            </motion.div>

            {/* Card 2: Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="group p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#e2d8c7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(197,167,123,0.22)] hover:border-[#C5A77B]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A77B]/20 border border-[#C5A77B]/40 flex items-center justify-center flex-shrink-0 text-[#165823] group-hover:scale-110 group-hover:border-[#C5A77B] transition-all duration-300 shadow-sm">
                  <Mail className="w-4 h-4 text-[#165823]" />
                </div>
                <div>
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A77B] block"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Email Inquiries
                  </span>
                  <h3
                    className="font-serif text-[#165823] text-base sm:text-lg font-normal leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Direct Messaging
                  </h3>
                </div>
              </div>
              <div className="flex flex-col space-y-1 text-xs sm:text-[13px] text-[#165823]/85 pt-1">
                <a
                  href="mailto:booking@oren.co.in"
                  className="hover:text-[#C5A77B] transition-colors font-medium tracking-wide truncate"
                >
                  booking@oren.co.in
                </a>
                <a
                  href="mailto:orenkasauli@gmail.com"
                  className="hover:text-[#C5A77B] transition-colors font-medium tracking-wide truncate"
                >
                  orenkasauli@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Card 3: Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="group p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#e2d8c7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(197,167,123,0.22)] hover:border-[#C5A77B]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A77B]/20 border border-[#C5A77B]/40 flex items-center justify-center flex-shrink-0 text-[#165823] group-hover:scale-110 group-hover:border-[#C5A77B] transition-all duration-300 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#165823]" />
                </div>
                <div>
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A77B] block"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Resort Location
                  </span>
                  <h3
                    className="font-serif text-[#165823] text-base sm:text-lg font-normal leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Kasauli, Himachal
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-[#165823]/75 leading-relaxed pt-1 font-light">
                Dharampur - Kasauli Road, V.P.O. Sanawar, Solan - 173202
              </p>
            </motion.div>

            {/* Card 4: 24/7 Concierge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="group p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#e2d8c7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(197,167,123,0.22)] hover:border-[#C5A77B]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#165823]/10 border border-[#165823]/25 flex items-center justify-center flex-shrink-0 text-[#165823] group-hover:scale-110 group-hover:border-[#165823] transition-all duration-300 shadow-sm">
                  <Clock className="w-4 h-4 text-[#165823]" />
                </div>
                <div>
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A77B] block"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Front Desk
                  </span>
                  <h3
                    className="font-serif text-[#165823] text-base sm:text-lg font-normal leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    24/7 Assistance
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-[#165823]/75 leading-relaxed pt-1 font-light">
                Assisting guests round-the-clock for bookings, check-ins, and local travel.
              </p>
            </motion.div>
          </div>

          {/* 2. MAIN SECTION: Symmetrical 2-Column Grid (Form on Left, Interactive Map on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 items-stretch">
            {/* Left Column: FormSubmit Contact Form (6 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col"
            >
              <div className="p-6 sm:p-8 md:p-9 rounded-2xl sm:rounded-3xl bg-white/90 border border-[#e2d8c7] shadow-[0_6px_28px_rgba(0,0,0,0.06)] h-full flex flex-col justify-between">
                <div>
                  <div className="mb-5 sm:mb-6">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A77B] block mb-1.5"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      SEND A MESSAGE
                    </span>
                    <h3
                      className="font-serif text-[#165823] text-2xl sm:text-3xl font-normal leading-tight"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      Leave Us An Inquiry
                    </h3>
                    <p
                      className="text-xs sm:text-sm text-[#165823]/75 mt-1 font-light tracking-wide"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      Fill out the form below and our team will get back to you promptly.
                    </p>
                  </div>

                  {/* FormSubmit.co Integration */}
                  <form
                    action="https://formsubmit.co/booking@oren.co.in"
                    method="POST"
                    className="space-y-4"
                  >
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input
                      type="hidden"
                      name="_subject"
                      value="New Inquiry from Oren Kasauli Website"
                    />

                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs sm:text-[13px] font-medium text-[#165823] uppercase tracking-wider mb-1.5"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          Name <span className="text-[#C5A77B]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Your Full Name"
                          className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-[#FAF7F0] border border-[#e2d8c7] text-[#165823] placeholder-neutral-400 focus:outline-none focus:border-[#C5A77B] focus:ring-2 focus:ring-[#C5A77B]/20 transition-all duration-200 shadow-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs sm:text-[13px] font-medium text-[#165823] uppercase tracking-wider mb-1.5"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          E-Mail <span className="text-[#C5A77B]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-[#FAF7F0] border border-[#e2d8c7] text-[#165823] placeholder-neutral-400 focus:outline-none focus:border-[#C5A77B] focus:ring-2 focus:ring-[#C5A77B]/20 transition-all duration-200 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone Number and Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs sm:text-[13px] font-medium text-[#165823] uppercase tracking-wider mb-1.5"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          Phone Number <span className="text-[#C5A77B]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-[#FAF7F0] border border-[#e2d8c7] text-[#165823] placeholder-neutral-400 focus:outline-none focus:border-[#C5A77B] focus:ring-2 focus:ring-[#C5A77B]/20 transition-all duration-200 shadow-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs sm:text-[13px] font-medium text-[#165823] uppercase tracking-wider mb-1.5"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          Subject <span className="text-[#C5A77B]">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          placeholder="Reservation / Tariff / Inquiry"
                          className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-[#FAF7F0] border border-[#e2d8c7] text-[#165823] placeholder-neutral-400 focus:outline-none focus:border-[#C5A77B] focus:ring-2 focus:ring-[#C5A77B]/20 transition-all duration-200 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-[13px] font-medium text-[#165823] uppercase tracking-wider mb-1.5"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        Message <span className="text-[#C5A77B]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Please share your dates, room requirements, or special requests..."
                        className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl bg-[#FAF7F0] border border-[#e2d8c7] text-[#165823] placeholder-neutral-400 focus:outline-none focus:border-[#C5A77B] focus:ring-2 focus:ring-[#C5A77B]/20 transition-all duration-200 shadow-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap text-[#FFF6F6] bg-[#165823] hover:bg-[#12481c] border border-[#165823] shadow-[0_4px_18px_rgba(22,88,35,0.38)] hover:shadow-[0_8px_24px_rgba(22,88,35,0.6)] hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-95 transition-all duration-300 px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm tracking-[0.18em] cursor-pointer overflow-hidden"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        <span
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                          aria-hidden="true"
                        />
                        <span className="relative z-10">SEND MESSAGE</span>
                        <Send className="relative z-10 w-4 h-4 ml-1 text-[#FFF6F6] transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Google Maps & Directions (6 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col"
            >
              <div className="relative w-full h-full min-h-[460px] sm:min-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e2d8c7] shadow-[0_6px_28px_rgba(0,0,0,0.06)] bg-white/90 flex flex-col">
                {/* Sleek Floating Location Pill */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 pointer-events-none bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#165823]" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#165823] tracking-wider uppercase">
                    OREN KASAULI
                  </span>
                </div>

                {/* Sleek Floating Directions Link */}
                <a
                  href="https://maps.google.com/?q=OREN+KASAULI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 bg-white/95 hover:bg-white backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#165823] hover:text-[#C5A77B] transition-all group"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#C5A77B]" />
                </a>

                {/* Google Maps Responsive Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.6415761520307!2d76.9917987757623!3d30.89668627769017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f896fcb6937ff%3A0x95d8c9e48306a790!2sOREN%20KASAULI!5e0!3m2!1sen!2sin!4v1793081456739!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="OREN KASAULI Google Maps Embed"
                  className="w-full flex-1 min-h-[360px] block filter contrast-[1.02]"
                />

                {/* Bottom Route & Transit Highlights */}
                <div className="p-3.5 sm:p-4 bg-white/95 border-t border-[#e2d8c7] flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-[#165823]/80">
                  <span className="font-medium text-[#165823]">
                    • Dharampur: 10 km
                  </span>
                  <span>• Kalka Rly Stn: 35 km</span>
                  <span>• Chandigarh Airport: 65 km</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
