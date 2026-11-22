"use client";

import Image from "next/image";

/**
 * ArchitecturalDoor Component
 *
 * Cinematic 3D double-leaf architectural door reveal with:
 * - Rich Forest Green (#183B32) lacquered panels
 * - Classical boiserie mouldings with champagne gold (#C5A77B) pinstripes
 * - Bespoke champagne gold brass pull handles and escutcheons
 * - Grand architectural stone/ivory architrave and transom header
 * - Smooth 3D hinged rotateY perspective animation
 */
export default function ArchitecturalDoor({
  currentRoom,
  doorState, // "closed" | "opening" | "open" | "closing"
  shouldReduceMotion = false,
  onDoorClick,
}) {
  const isOpen = doorState === "open" || doorState === "opening";
  const isClosing = doorState === "closing";

  // Dynamic transform angles for the hinged double doors:
  // -86deg for left, +86deg for right keeps the doors visibly framing the scene in luxurious 3D perspective
  const leftDoorTransform = shouldReduceMotion
    ? "none"
    : isOpen
    ? "rotateY(-86deg)"
    : "rotateY(0deg)";

  const rightDoorTransform = shouldReduceMotion
    ? "none"
    : isOpen
    ? "rotateY(86deg)"
    : "rotateY(0deg)";

  // Synchronized cubic-bezier transitions
  const transitionClass = shouldReduceMotion
    ? "transition-none"
    : isClosing
    ? "transition-transform duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    : "transition-transform duration-[1250ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      {/* 3D Perspective Doorway Container */}
      <div
        className="relative w-full aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/9] min-h-[340px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#183B32] shadow-[0_20px_50px_rgba(24,59,50,0.25),_0_8px_20px_rgba(38,40,36,0.1)] border-2 border-[#C5A77B]/40"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
          boxShadow:
            "inset 0 0 50px rgba(0, 0, 0, 0.75), 0 20px 50px rgba(24, 59, 50, 0.22)",
        }}
        onClick={onDoorClick}
      >
        {/* Inner Door Jamb Casing (Architectural Depth Framing) */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl sm:rounded-3xl border-[6px] sm:border-[10px] md:border-[12px] border-[#1d2320]"
          style={{
            boxShadow:
              "inset 0 0 35px rgba(0,0,0,0.85), 0 0 0 1px rgba(197, 167, 123, 0.35)",
          }}
        />

          {/* ======================================================== */}
          {/* ROOM VIEWPORT (BEHIND THE DOORS)                        */}
          {/* ======================================================== */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-900">
            {/* Active Room Image with Cinematic Settle Zoom */}
            <div
              className={`relative w-full h-full transition-transform duration-[1250ms] ease-out ${
                isOpen && !shouldReduceMotion ? "scale-100" : "scale-105"
              }`}
            >
              <Image
                src={currentRoom.image}
                alt={currentRoom.alt}
                fill
                priority
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 1100px"
                className="object-cover"
              />

              {/* Atmospheric Gradient Overlays for High Contrast & Depth */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* LEFT ARCHITECTURAL DOOR LEAF                             */}
          {/* ======================================================== */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full z-20 ${transitionClass}`}
            style={{
              transformOrigin: "left center",
              transform: leftDoorTransform,
              transformStyle: "preserve-3d",
              backfaceVisibility: "visible",
            }}
          >
            {/* Forest Green Wood-Panel Body */}
            <div
              className="relative w-full h-full p-2.5 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden shadow-[10px_0_25px_rgba(0,0,0,0.55)]"
              style={{
                backgroundColor: "#183B32",
                backgroundImage:
                  "linear-gradient(145deg, #1f4d41 0%, #183B32 45%, #102922 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 6px)",
                borderRight: "1px solid rgba(197, 167, 123, 0.45)",
                boxShadow:
                  "inset 0 0 0 1px rgba(197, 167, 123, 0.25), inset 2px 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              {/* Dynamic Sunlight / Ambient Shadow Sweep */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                  isOpen ? "opacity-50" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 85%)",
                }}
              />

              {/* Boiserie Upper Moulded Panel */}
              <div
                className="relative w-full h-[46%] rounded-md sm:rounded-lg border border-[#C5A77B]/40 transition-colors duration-500 hover:border-[#C5A77B]/80 flex items-center justify-center p-2 sm:p-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,41,34,0.7) 0%, rgba(24,59,50,0.4) 100%)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.06)",
                }}
              >
                {/* Inner Pinstripe Inset */}
                <div className="w-full h-full rounded border border-[#C5A77B]/20 flex items-center justify-center">
                  <div className="w-6 sm:w-8 h-[1px] bg-[#C5A77B]/30" />
                </div>
              </div>

              {/* Boiserie Middle Decorative Band Panel */}
              <div
                className="relative w-full h-[12%] my-1.5 sm:my-2 rounded-md sm:rounded-lg border border-[#C5A77B]/40 flex items-center justify-center px-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,41,34,0.8) 0%, rgba(24,59,50,0.5) 100%)",
                  boxShadow:
                    "inset 2px 2px 5px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A77B]/40 to-transparent" />
              </div>

              {/* Boiserie Lower Moulded Panel */}
              <div
                className="relative w-full h-[36%] rounded-md sm:rounded-lg border border-[#C5A77B]/40 transition-colors duration-500 hover:border-[#C5A77B]/80 flex items-center justify-center p-2 sm:p-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,41,34,0.7) 0%, rgba(24,59,50,0.4) 100%)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-full h-full rounded border border-[#C5A77B]/20 flex items-center justify-center">
                  <div className="w-6 sm:w-8 h-[1px] bg-[#C5A77B]/30" />
                </div>
              </div>

              {/* Bespoke Brass Handle (Left Door, positioned at right meeting edge) */}
              <div
                className="absolute right-2 sm:right-3.5 md:right-5 top-[52%] -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center"
                aria-hidden="true"
              >
                {/* Brass Escutcheon Backplate */}
                <div
                  className="relative w-2.5 sm:w-3.5 md:w-4 h-16 sm:h-22 md:h-26 rounded-full flex flex-col items-center justify-between py-1.5 shadow-[2px_4px_8px_rgba(0,0,0,0.65)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #f0dfc5 0%, #C5A77B 40%, #8c6c39 100%)",
                    border: "1px solid #dfc69f",
                  }}
                >
                  {/* Top Mounting Screw */}
                  <span className="w-1 h-1 rounded-full bg-[#523d1d] shadow-[inset_0_0.5px_0.5px_rgba(0,0,0,0.8)]" />

                  {/* Vertical Solid Pull Handle Bar with Standoffs */}
                  <div
                    className="w-1.5 sm:w-2 md:w-2.5 h-10 sm:h-14 md:h-16 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                    style={{
                      background:
                        "linear-gradient(90deg, #dfc69f 0%, #C5A77B 50%, #7d5e2e 100%)",
                      border: "0.5px solid #dfc69f",
                    }}
                  />

                  {/* Classical Keyhole Detail at Bottom */}
                  <div className="w-1 h-1.5 bg-[#3a2911] rounded-sm shadow-inner" />
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT ARCHITECTURAL DOOR LEAF                            */}
          {/* ======================================================== */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full z-20 ${transitionClass}`}
            style={{
              transformOrigin: "right center",
              transform: rightDoorTransform,
              transformStyle: "preserve-3d",
              backfaceVisibility: "visible",
            }}
          >
            {/* Forest Green Wood-Panel Body */}
            <div
              className="relative w-full h-full p-2.5 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden shadow-[-10px_0_25px_rgba(0,0,0,0.55)]"
              style={{
                backgroundColor: "#183B32",
                backgroundImage:
                  "linear-gradient(145deg, #1f4d41 0%, #183B32 45%, #102922 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 6px)",
                borderLeft: "1px solid rgba(197, 167, 123, 0.45)",
                boxShadow:
                  "inset 0 0 0 1px rgba(197, 167, 123, 0.25), inset -2px 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              {/* Dynamic Sunlight / Ambient Shadow Sweep */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                  isOpen ? "opacity-50" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(to left, rgba(0,0,0,0.65) 0%, transparent 85%)",
                }}
              />

              {/* Astragal Overlap Bead on Meeting Seam */}
              <div
                className="absolute top-0 left-0 w-[2.5px] sm:w-[3px] h-full pointer-events-none z-30"
                style={{
                  background:
                    "linear-gradient(180deg, #dfc69f 0%, #C5A77B 50%, #9e7f52 100%)",
                  boxShadow: "0 0 5px rgba(197,167,123,0.4)",
                }}
              />

              {/* Boiserie Upper Moulded Panel */}
              <div
                className="relative w-full h-[46%] rounded-md sm:rounded-lg border border-[#C5A77B]/40 transition-colors duration-500 hover:border-[#C5A77B]/80 flex items-center justify-center p-2 sm:p-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,41,34,0.7) 0%, rgba(24,59,50,0.4) 100%)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.06)",
                }}
              >
                {/* Inner Pinstripe Inset */}
                <div className="w-full h-full rounded border border-[#C5A77B]/20 flex items-center justify-center">
                  <div className="w-6 sm:w-8 h-[1px] bg-[#C5A77B]/30" />
                </div>
              </div>

              {/* Boiserie Middle Decorative Band Panel */}
              <div
                className="relative w-full h-[12%] my-1.5 sm:my-2 rounded-md sm:rounded-lg border border-[#C5A77B]/40 flex items-center justify-center px-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,41,34,0.8) 0%, rgba(24,59,50,0.5) 100%)",
                  boxShadow:
                    "inset 2px 2px 5px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A77B]/40 to-transparent" />
              </div>

              {/* Boiserie Lower Moulded Panel */}
              <div
                className="relative w-full h-[36%] rounded-md sm:rounded-lg border border-[#C5A77B]/40 transition-colors duration-500 hover:border-[#C5A77B]/80 flex items-center justify-center p-2 sm:p-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,41,34,0.7) 0%, rgba(24,59,50,0.4) 100%)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-full h-full rounded border border-[#C5A77B]/20 flex items-center justify-center">
                  <div className="w-6 sm:w-8 h-[1px] bg-[#C5A77B]/30" />
                </div>
              </div>

              {/* Bespoke Brass Handle (Right Door, positioned at left meeting edge) */}
              <div
                className="absolute left-2 sm:left-3.5 md:left-5 top-[52%] -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center"
                aria-hidden="true"
              >
                {/* Brass Escutcheon Backplate */}
                <div
                  className="relative w-2.5 sm:w-3.5 md:w-4 h-16 sm:h-22 md:h-26 rounded-full flex flex-col items-center justify-between py-1.5 shadow-[2px_4px_8px_rgba(0,0,0,0.65)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #f0dfc5 0%, #C5A77B 40%, #8c6c39 100%)",
                    border: "1px solid #dfc69f",
                  }}
                >
                  {/* Top Mounting Screw */}
                  <span className="w-1 h-1 rounded-full bg-[#523d1d] shadow-[inset_0_0.5px_0.5px_rgba(0,0,0,0.8)]" />

                  {/* Vertical Solid Pull Handle Bar with Standoffs */}
                  <div
                    className="w-1.5 sm:w-2 md:w-2.5 h-10 sm:h-14 md:h-16 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                    style={{
                      background:
                        "linear-gradient(90deg, #dfc69f 0%, #C5A77B 50%, #7d5e2e 100%)",
                      border: "0.5px solid #dfc69f",
                    }}
                  />

                  {/* Classical Keyhole Detail at Bottom */}
                  <div className="w-1 h-1.5 bg-[#3a2911] rounded-sm shadow-inner" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Architectural Threshold Sill */}
          <div
            className="absolute bottom-0 inset-x-0 h-2 sm:h-3 z-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, #C5A77B 0%, #1d211e 40%, #0d100e 100%)",
              boxShadow: "0 -2px 6px rgba(0,0,0,0.5)",
            }}
          />
        </div>
    </div>
  );
}

