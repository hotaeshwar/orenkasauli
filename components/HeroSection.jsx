"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [containerHeight, setContainerHeight] = useState("100vh");

  useEffect(() => {
    // Check if screen is small or iPad and calculate responsive container height
    const calculateLayout = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Detect iPad devices by common resolutions or user agent
      const isIPad =
        (width === 768 && height === 1024) ||
        (width === 820 && height === 1180) ||
        (width === 834 && height === 1194) ||
        (width === 1024 && height === 1366) ||
        (height === 768 && width === 1024) ||
        (height === 820 && width === 1180) ||
        (height === 834 && width === 1194) ||
        (height === 1024 && width === 1366) ||
        navigator.userAgent.includes("iPad") ||
        (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);

      setIsSmallScreen(width < 768 && !isIPad);

      // Height based on screen type to maintain optimal video aspect ratio & prevent stretching
      if (width < 768 && !isIPad) {
        // Mobile phones (portrait)
        setContainerHeight(`${Math.min(height * 0.6, 500)}px`);
      } else if (isIPad) {
        // iPads: fixed height based on width to maintain proper 16:9 aspect ratio without stretching
        setContainerHeight(`${Math.min(width * 0.5625, height * 0.6)}px`);
      } else if (width < 1024) {
        // Other tablets and small laptops
        setContainerHeight(`${Math.min(height * 0.7, 600)}px`);
      } else {
        // Desktop
        setContainerHeight("100vh");
      }
    };

    // iPad-specific and aspect ratio video positioning adjustments
    const adjustVideoFit = () => {
      const video = videoRef.current;
      if (!video || typeof window === "undefined") return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const isIPad =
        (width === 768 && height === 1024) ||
        (width === 820 && height === 1180) ||
        (width === 834 && height === 1194) ||
        (width === 1024 && height === 1366) ||
        (height === 768 && width === 1024) ||
        (height === 820 && width === 1180) ||
        (height === 834 && width === 1194) ||
        (height === 1024 && width === 1366) ||
        navigator.userAgent.includes("iPad") ||
        (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);

      const screenRatio = width / height;
      const videoRatio = 16 / 9;

      video.style.objectFit = "cover";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.position = "absolute";
      video.style.top = "0";
      video.style.left = "0";
      video.style.transform = "translateZ(0)";

      if (isIPad) {
        video.style.objectPosition = "center center";
        video.style.minWidth = "100%";
        video.style.minHeight = "100%";
      } else if (screenRatio > videoRatio) {
        video.style.objectPosition = "center center";
      } else {
        video.style.objectPosition = "center 40%";
      }
    };

    calculateLayout();
    adjustVideoFit();

    // Optimized video handling with performance improvements
    const video = videoRef.current;
    if (video) {
      // Essential settings for smooth autoplay playback
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");

      // Performance optimizations for zero lag
      video.preload = "auto";
      video.poster = "";
      video.loading = "eager";
      video.crossOrigin = "anonymous";

      video.style.transition = "none";
      video.style.animation = "none";
      video.style.willChange = "auto";
      video.style.backfaceVisibility = "hidden";
      video.style.perspective = "1000px";
      video.style.transformStyle = "preserve-3d";

      // Slight blur on slow connections
      if ("connection" in navigator) {
        const connection = navigator.connection;
        if (connection && (connection.effectiveType === "2g" || connection.effectiveType === "3g")) {
          video.style.filter = "blur(0.5px)";
        }
      }

      // Minimal resize handling to reduce lag
      let resizeTimeout;
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          calculateLayout();
          adjustVideoFit();
        }, 300);
      };

      const handleOrientationChange = () => {
        setTimeout(() => {
          calculateLayout();
          adjustVideoFit();
        }, 500);
      };

      window.addEventListener("resize", throttledResize, { passive: true });
      window.addEventListener("orientationchange", handleOrientationChange, { passive: true });

      // Force video load before playback
      const forceVideoLoad = () => {
        return new Promise((resolve) => {
          if (video.readyState >= 3) {
            resolve();
            return;
          }
          const checkLoad = () => {
            if (video.readyState >= 3) {
              resolve();
            } else {
              setTimeout(checkLoad, 50);
            }
          };
          video.addEventListener("canplaythrough", resolve, { once: true });
          video.addEventListener("loadeddata", checkLoad, { once: true });
          video.load();
        });
      };

      // Play video with autoplay fallback for user gesture requirements
      const playVideo = async () => {
        try {
          await forceVideoLoad();
          await new Promise((resolve) => setTimeout(resolve, 150));
          await video.play();
        } catch {
          const enableVideo = async () => {
            try {
              await forceVideoLoad();
              await video.play();
              document.removeEventListener("click", enableVideo);
              document.removeEventListener("touchstart", enableVideo);
              document.removeEventListener("scroll", enableVideo);
            } catch (err) {
              console.log("Video play fallback:", err);
            }
          };
          document.addEventListener("click", enableVideo, { once: true });
          document.addEventListener("touchstart", enableVideo, { once: true });
          document.addEventListener("scroll", enableVideo, { once: true });
        }
      };

      const playTimer = setTimeout(playVideo, 400);

      return () => {
        window.removeEventListener("resize", throttledResize);
        window.removeEventListener("orientationchange", handleOrientationChange);
        clearTimeout(resizeTimeout);
        clearTimeout(playTimer);
      };
    }
  }, []);

  return (
    <section
      id="hero-viewport"
      className="relative w-full overflow-hidden bg-black flex flex-col justify-between"
      style={{
        height: containerHeight,
        minHeight: isSmallScreen ? "300px" : "400px",
      }}
    >
      {/* Optimized Video Background with Performance Attributes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/home.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster=""
          controls={false}
          crossOrigin="anonymous"
          loading="eager"
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "auto",
            WebkitTransform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            imageRendering: "optimizeSpeed",
            transformStyle: "preserve-3d",
            perspective: "1000px",
            transition: "none",
            animation: "none",
          }}
        >
          <source src="/videos/home.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Transparent Fixed Header / Navbar */}
      <Navbar />
    </section>
  );
}
