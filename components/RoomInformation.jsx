"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Maximize2,
  Bed,
  Mountain,
  Wind,
  Coffee,
  Sparkles,
  ShieldCheck,
  Tv,
  Bath,
  Waves,
  Eye,
  X,
  Check,
} from "lucide-react";

/**
 * Helper to pick an elegant Lucide icon for each amenity type
 */
function getAmenityIcon(type) {
  switch (type) {
    case "size":
      return Maximize2;
    case "bed":
      return Bed;
    case "view":
    case "balcony":
      return Mountain;
    case "climate":
      return Wind;
    case "coffee":
      return Coffee;
    case "bath":
      return Bath;
    case "pool":
      return Waves;
    case "shield":
      return ShieldCheck;
    case "tv":
      return Tv;
    case "sparkles":
    default:
      return Sparkles;
  }
}

/**
 * RoomInformation Component
 *
 * Cardless, streamlined controls directly below the automatic architectural doorway:
 * - Pure cardless design with zero extra clutter text
 * - Suite Number & Title
 * - Side-by-side "BOOK NOW" and "VIEW MORE" action buttons
 * - Subtle live suite progression indicators (no manual buttons)
 * - Cinematic Suite Details Modal with full amenities, descriptions, and photography
 */
export default function RoomInformation({
  currentRoom,
  currentIndex,
  totalRooms,
  doorState,
  bookingUrl,
  isDetailsOpen,
  setIsDetailsOpen,
}) {
  const isContentVisible = doorState === "open" || doorState === "opening";

  // Manage modal open state: lock background scroll and handle Escape key dismiss
  useEffect(() => {
    if (!isDetailsOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsDetailsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDetailsOpen, setIsDetailsOpen]);

  return (
    <>
      {/* ======================================================== */}
      {/* CARDLESS SUITE CONTROLS (DIRECTLY BELOW ARCHITECTURAL DOOR) */}
      {/* ======================================================== */}
      <div
        className={`w-full max-w-5xl mx-auto mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 transition-all duration-700 ease-out ${
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-40 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Pure Room Title (No extra text on top) */}
        <h3
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#262824] font-medium tracking-wide text-center sm:text-left"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {currentRoom.title}
        </h3>

        {/* TWO BUTTONS STRICTLY SIDE BY SIDE */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          {/* Button 1: BOOK NOW */}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold uppercase text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.3)] hover:shadow-[0_8px_24px_rgba(16, 52, 48,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[11px] sm:text-xs md:text-[13px] tracking-[0.12em] sm:tracking-[0.14em] cursor-pointer select-none overflow-hidden text-center"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            aria-label={`Book ${currentRoom.title} now (opens booking engine)`}
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
              aria-hidden="true"
            />
            <span className="relative z-10 whitespace-nowrap">BOOK NOW</span>
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF6F6] flex-shrink-0" />
          </a>

          {/* Button 2: VIEW MORE */}
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="group/more relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold uppercase text-[#103430] hover:text-[#FFF6F6] bg-white hover:bg-[#103430] hover:border-[#103430] border-2 border-[#103430] shadow-sm hover:shadow-[0_4px_16px_rgba(16, 52, 48,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[11px] sm:text-xs md:text-[13px] tracking-[0.12em] sm:tracking-[0.14em] cursor-pointer select-none text-center"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            aria-label={`View more details for ${currentRoom.title}`}
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#103430] group-hover/more:text-[#FFF6F6] transition-colors flex-shrink-0" />
            <span className="whitespace-nowrap">VIEW MORE</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CINEMATIC SUITE DETAILS MODAL DIALOG                     */}
      {/* ======================================================== */}
      {isDetailsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsDetailsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-room-title"
        >
          <div
            className="relative w-full max-w-2xl lg:max-w-3xl bg-[#FFF6F6] text-[#103430] rounded-2xl sm:rounded-3xl border border-[#103430]/20 shadow-[0_25px_60px_-15px_rgba(16, 52, 48,0.4)] overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#e5dccf] bg-white/70">
              <div className="flex items-center gap-3">
                <span
                  className="font-serif text-2xl sm:text-3xl text-[#103430] font-semibold"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#103430]/60 font-semibold">
                  / {String(totalRooms).padStart(2, "0")}
                </span>
                <span className="h-3.5 w-[1px] bg-[#103430]/20 mx-1 hidden sm:block" />
                <h4
                  id="modal-room-title"
                  className="font-serif text-xl sm:text-2xl text-[#103430] font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {currentRoom.title}
                </h4>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#103430]/20 hover:border-[#103430] bg-white hover:bg-[#103430]/10 text-[#103430] flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close suite details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1">
              {/* High-res Room Preview Banner */}
              <div className="relative w-full aspect-[16/9] min-h-[190px] sm:min-h-[240px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-[#e5dccf] shadow-md">
                <Image
                  src={currentRoom.image}
                  alt={currentRoom.alt}
                  fill
                  sizes="(max-width: 768px) 95vw, 750px"
                  className="object-cover"
                />
              </div>

              {/* Narrative Description */}
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#103430] font-semibold block mb-1.5">
                  ABOUT THIS RETREAT
                </span>
                <p
                  className="text-sm sm:text-base text-[#262824]/80 font-normal leading-relaxed tracking-wide"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {currentRoom.description}
                </p>
              </div>

              {/* Signature Amenities Grid (All 6 Items) */}
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#103430] font-semibold block mb-3">
                  SIGNATURE SUITE AMENITIES
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {currentRoom.amenities.map((item, idx) => {
                    const IconComponent = getAmenityIcon(item.type);
                    return (
                      <div
                        key={`modal-amenity-${item.name}-${idx}`}
                        className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-[#e5dccf] shadow-sm"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#103430]/10 text-[#103430] flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className="text-xs text-[#103430] font-semibold leading-snug line-clamp-1"
                          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Inclusions Callout */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#103430]/[0.05] border border-[#103430]/20 flex items-start gap-2.5 text-xs text-[#103430]">
                <Check className="w-4 h-4 text-[#103430] mt-0.5 flex-shrink-0" />
                <span className="font-medium">
                  Includes daily housekeeping, complimentary Wi-Fi, 24/7 mountain assistance, and access to all resort amenities.
                </span>
              </div>
            </div>

            {/* Modal Footer: Action CTAs */}
            <div className="p-4 sm:p-6 border-t border-[#e5dccf] bg-white/80 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={currentRoom.tariffUrl || "/room-and-tariff"}
                className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#103430] hover:text-[#0b2421] underline underline-offset-4 transition-colors"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                View Full Tariff & Policies
              </Link>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#103430]/25 text-xs font-semibold uppercase tracking-[0.12em] text-[#103430] hover:bg-[#103430]/10 transition-colors flex-1 sm:flex-initial"
                >
                  Close
                </button>

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-6 sm:px-7 py-2.5 rounded-full font-semibold uppercase text-[#FFF6F6] bg-[#103430] hover:bg-[#0b2421] border border-[#103430] shadow-[0_4px_16px_rgba(16, 52, 48,0.35)] text-xs tracking-[0.14em] transition-all flex-1 sm:flex-initial text-center"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  <span>Book Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
