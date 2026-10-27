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
    <div className="relative min-h-screen w-full bg-[#ffffff] text-neutral-900 overflow-x-hidden selection:bg-[#a87d24] selection:text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Sleek, Compact Top Hero Banner with contacttop.jpg & Overlay & Typewriter text "Contact Us" only */}
      <section className="relative h-[200px] sm:h-[230px] md:h-[260px] flex items-center justify-center pt-16 sm:pt-20 md:pt-22 pb-4 sm:pb-6 px-4 overflow-hidden border-b border-neutral-100">
        {/* Background contacttop.jpg with Dark Atmospheric Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/contacttop.jpg"
            alt="Oren Kasauli Contact Us Banner"
            fill
            priority
            className="object-cover object-center filter brightness-[0.72]"
          />
          {/* Overlay: Sleek dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/80" />
        </div>

        {/* Hero Content — Strictly ONLY "Contact Us" with typewriter effect */}
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

      {/* Main Contact Section — Background #ffffff with Scroll & Refresh "Stick from Bottom" Animation */}
      <main className="relative w-full bg-[#ffffff] pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* 2-Column Layout: Contact Information Left, FormSubmit Contact Form Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start mb-10 sm:mb-14">
            {/* Left Column: Contact Cards */}
            <motion.div
              initial={{ opacity: 0, y: 90, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6"
            >
              {/* Phone Card */}
              <div className="group p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(168,125,36,0.15)] hover:border-[#c59737]/60 transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c59737]/25 to-[#886216]/15 border border-[#c59737]/40 flex items-center justify-center flex-shrink-0 text-[#a87d24] group-hover:scale-110 group-hover:border-[#ffe8a8] transition-all duration-300 shadow-sm">
                    <Phone className="w-5 h-5 text-[#a87d24]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a87d24] block mb-1">
                      Call Direct
                    </span>
                    <h3 className="font-serif text-neutral-900 text-lg sm:text-xl font-medium mb-1">
                      Phone Reservations
                    </h3>
                    <div className="flex flex-col space-y-1 mt-2 text-sm sm:text-base text-neutral-700">
                      <a
                        href="tel:+919816155576"
                        className="hover:text-[#a87d24] transition-colors font-semibold tracking-wide"
                      >
                        +91 98161 55576
                      </a>
                      <a
                        href="tel:+919816255576"
                        className="hover:text-[#a87d24] transition-colors font-semibold tracking-wide"
                      >
                        +91 98162 55576
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(168,125,36,0.15)] hover:border-[#c59737]/60 transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c59737]/25 to-[#886216]/15 border border-[#c59737]/40 flex items-center justify-center flex-shrink-0 text-[#a87d24] group-hover:scale-110 group-hover:border-[#ffe8a8] transition-all duration-300 shadow-sm">
                    <Mail className="w-5 h-5 text-[#a87d24]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a87d24] block mb-1">
                      Email Inquiries
                    </span>
                    <h3 className="font-serif text-neutral-900 text-lg sm:text-xl font-medium mb-1">
                      Direct Messaging
                    </h3>
                    <div className="flex flex-col space-y-1 mt-2 text-sm sm:text-base text-neutral-700">
                      <a
                        href="mailto:booking@oren.co.in"
                        className="hover:text-[#a87d24] transition-colors font-semibold tracking-wide"
                      >
                        booking@oren.co.in
                      </a>
                      <a
                        href="mailto:orenkasauli@gmail.com"
                        className="hover:text-[#a87d24] transition-colors font-semibold tracking-wide"
                      >
                        orenkasauli@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="group p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(168,125,36,0.15)] hover:border-[#c59737]/60 transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c59737]/25 to-[#886216]/15 border border-[#c59737]/40 flex items-center justify-center flex-shrink-0 text-[#a87d24] group-hover:scale-110 group-hover:border-[#ffe8a8] transition-all duration-300 shadow-sm">
                    <MapPin className="w-5 h-5 text-[#a87d24]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a87d24] block mb-1">
                      Resort Address
                    </span>
                    <h3 className="font-serif text-neutral-900 text-lg sm:text-xl font-medium mb-1">
                      Location &amp; Directions
                    </h3>
                    <p className="text-sm sm:text-[15px] text-neutral-700 leading-relaxed mt-2 font-normal">
                      Dharampur - Kasauli Road, V.P.O. Sanawar, Tehsil Kasauli, District Solan, Himachal Pradesh(India) - 173202
                    </p>
                  </div>
                </div>
              </div>

              {/* Concierge & Front Desk Hours */}
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-900 text-white shadow-lg border border-neutral-800 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#f3d999]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    24/7 Front Desk &amp; Concierge
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Assisting guests round-the-clock for bookings, check-ins, and transport.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: FormSubmit Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 90, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200/90 shadow-[0_6px_28px_rgba(0,0,0,0.06)]">
                <div className="mb-6 sm:mb-8">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#a87d24] block mb-1.5">
                    SEND A MESSAGE
                  </span>
                  <h3
                    className="font-serif text-neutral-900 text-2xl sm:text-3xl md:text-4xl font-normal leading-tight"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Leave Us An Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Fill out the form below and our team will get back to you promptly.
                  </p>
                </div>

                {/* FormSubmit.co Integration */}
                <form
                  action="https://formsubmit.co/booking@oren.co.in"
                  method="POST"
                  className="space-y-4 sm:space-y-5"
                >
                  {/* FormSubmit Configuration Fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Inquiry from Oren Kasauli Website"
                  />

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs sm:text-[13px] font-semibold text-neutral-800 uppercase tracking-wider mb-2"
                      >
                        Name <span className="text-[#a87d24]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your Full Name"
                        className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#a87d24] focus:ring-2 focus:ring-[#a87d24]/20 transition-all duration-200 shadow-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-[13px] font-semibold text-neutral-800 uppercase tracking-wider mb-2"
                      >
                        E-Mail <span className="text-[#a87d24]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#a87d24] focus:ring-2 focus:ring-[#a87d24]/20 transition-all duration-200 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number and Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs sm:text-[13px] font-semibold text-neutral-800 uppercase tracking-wider mb-2"
                      >
                        Phone Number <span className="text-[#a87d24]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#a87d24] focus:ring-2 focus:ring-[#a87d24]/20 transition-all duration-200 shadow-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs sm:text-[13px] font-semibold text-neutral-800 uppercase tracking-wider mb-2"
                      >
                        Subject <span className="text-[#a87d24]">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder="Reservation / Tariff / Inquiry"
                        className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#a87d24] focus:ring-2 focus:ring-[#a87d24]/20 transition-all duration-200 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-[13px] font-semibold text-neutral-800 uppercase tracking-wider mb-2"
                    >
                      Message <span className="text-[#a87d24]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Please share your dates, room requirements, or any special requests..."
                      className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#a87d24] focus:ring-2 focus:ring-[#a87d24]/20 transition-all duration-200 shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap text-white bg-gradient-to-r from-[#c59737] via-[#a87d24] to-[#886216] border border-[#f3d999]/50 shadow-[0_4px_18px_rgba(168,125,36,0.38)] hover:from-[#d4a949] hover:via-[#ba8c2e] hover:to-[#9e7420] hover:border-[#ffe8a8] hover:shadow-[0_6px_24px_rgba(168,125,36,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 px-9 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.18em] cursor-pointer"
                    >
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Sleek, Media-Responsive Google Maps Section with Stick-from-Bottom Animation */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#c59737]/40 transition-all duration-300 bg-neutral-100"
          >
            {/* Sleek Floating Location Pill */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a87d24]" />
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-800 tracking-wider uppercase">
                OREN KASAULI
              </span>
            </div>

            {/* Sleek Floating Directions Link */}
            <a
              href="https://maps.google.com/?q=OREN+KASAULI"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/95 hover:bg-white backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#a87d24] hover:text-[#886216] transition-all group"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              className="w-full h-full block filter contrast-[1.02]"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
