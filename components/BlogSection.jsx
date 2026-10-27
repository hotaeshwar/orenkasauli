"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export const BLOG_POSTS = [
  {
    id: "christ-church",
    title: "CHRIST CHURCH",
    category: "Kasauli",
    categoryUrl: "https://oren.co.in/category/kasauli/",
    image: "/images/blog/chistchurch.jpg",
    alt: "Christ Church Kasauli Himachal Pradesh",
    year: "Est. 1853",
    readTime: "3 min read",
    excerpt:
      "Located in the center of the city, the Christ Church is one of the famous churches of Himachal Pradesh. It was built in 1853 by the British and is a prime attraction in the town.",
    fullContent: [
      "Located in the center of the city, the Christ Church is one of the famous churches of Himachal Pradesh. It was built in 1853 by the British and is a prime attraction in the town. The Church exemplifies an artistic blend of Indian and Gothic style of architecture.",
      "Surrounded in a tranquil ambience with endless rows of pine trees, the Christ Church offers a rejuvenating escape amidst serenity of forests and lush meadows. For the convenience of the tourists, a number of transport facilities are available to reach the church.",
    ],
    highlights: [
      { label: "Built In", value: "1853 by British Colonial Rule" },
      { label: "Architecture", value: "Indian & Gothic Blend" },
      { label: "Setting", value: "Endless Pine Groves & Meadows" },
      { label: "Accessibility", value: "Centrally located with ample transport" },
    ],
  },
  {
    id: "cri-vaccination",
    title: "CRI VACCINATION RESEARCH CENTER KASAULI",
    category: "Kasauli",
    categoryUrl: "https://oren.co.in/category/kasauli/",
    image: "/images/blog/crivacination.jpg",
    alt: "CRI Vaccination Research Center Kasauli",
    year: "Est. 1905",
    readTime: "4 min read",
    excerpt:
      "Established in 1905 by the British colonial rule, the captivating campus of CRI is associated with active research and formulation of life-saving vaccines working in close partnership with WHO.",
    fullContent: [
      "This institute was established in the year 1905 by the British colonial rule and since then the captivating ambience and beautiful campus of the building attracts a number of visitors every year.",
      "The institute is associated with the active research and formulation of various vaccines which are supposed to be quite effective in the treatment. CRI also offers graduate and post graduate courses in the field of immunology and virology.",
      "Not only this, the serious effort of the institute has been appreciated universally and is also working with WHO.",
    ],
    highlights: [
      { label: "Founded", value: "1905" },
      { label: "Global Partner", value: "World Health Organization (WHO)" },
      { label: "Academic Courses", value: "Graduate & Post Graduate in Virology & Immunology" },
      { label: "Key Impact", value: "Universal formulation of essential vaccines" },
    ],
  },
  {
    id: "toy-train-kasauli",
    title: "TOY TRAIN KASAULI",
    category: "Kasauli",
    categoryUrl: "https://oren.co.in/category/kasauli/",
    image: "/images/blog/shimlatoytrain.jpg",
    alt: "Kasauli Toy Train Kalka-Shimla UNESCO World Heritage",
    year: "UNESCO Heritage",
    readTime: "5 min read",
    excerpt:
      "A trip on the historic UNESCO World Heritage declared in 2008, Kalka-Shimla toy train is like traveling back in time through rugged mountain tracks, pine forests, and long tunnels.",
    fullContent: [
      "Location: Kasauli Railway Station",
      "Start Point/End Point: The train leaves from Dharampur Railway station and drop at Barog Railway station which is a 1 hour memorable journey amidst Pine Forest and long tunnels. Depending on the variant selected taking a trip on the historic UNESCO World Heritage declared in 2008, Kalka-Shimla toy train is like traveling back in time.",
      "The railway built by the British in 1903 to provide access to the summer capital of Shimla and is one of the most scenic train journeys in India. It enlivens passengers as it gradually winds its way steeply upwards along the narrow track, through the rugged mountain and pine forests. This toy train Kasauli is one of the three such trains still functioning, the other two in Ooty and Darjeeling. When you are in Kasauli you must not miss the toy train ride.",
      "How to Reach Kasauli Toy Train Boarding Point?\nDharampur Railway Station is around 10 km away from Oren Kasauli. Either public or private transportation can be availed to reach the location.",
    ],
    highlights: [
      { label: "Built In", value: "1903 by the British" },
      { label: "UNESCO Status", value: "World Heritage Inscribed in 2008" },
      { label: "Journey Route", value: "Dharampur to Barog (~1 Hour)" },
      { label: "Distance from Oren", value: "Approx. 10 km to Dharampur Station" },
    ],
  },
  {
    id: "gilbert-trail",
    title: "GILBERT TRAIL KASAULI HIMACHAL PRADESH",
    category: "Kasauli",
    categoryUrl: "https://oren.co.in/category/kasauli/",
    image: "/images/blog/gilberttrail.jpg",
    alt: "Gilbert Trail Kasauli Nature Hike Himachal Pradesh",
    year: "Nature Hike",
    readTime: "3 min read",
    excerpt:
      "The perfect taste of paradise for nature lovers, Gilbert Trail stretches along a kilometer and a half that you can hike through to witness the most breathtaking panoramic landscapes.",
    fullContent: [
      "Beautiful and lush, Kasauli is one of the most sought travel destinations of the country, so it is no surprise that there are several locations to captivate you with their beauty.",
      "The perfect taste of paradise for nature lovers the Gilbert Trail is one such picturesque place. An all-time favorite for bird watchers; it beckons you with its pleasant landscape.",
      "The Gilbert Trail stretches along a kilometer and a half that you can hike through to witness the most breathtaking view; the panoramic landscapes of the surrounding valleys.",
    ],
    highlights: [
      { label: "Trail Distance", value: "1.5 Kilometers hike" },
      { label: "Best For", value: "Bird watching, walking & nature photography" },
      { label: "Terrain", value: "Gentle mountain trail with pine foliage" },
      { label: "Experience", value: "Panoramic valley & cloud vistas" },
    ],
  },
  {
    id: "sunset-point",
    title: "SUNSET POINT KASAULI",
    category: "Kasauli",
    categoryUrl: "https://oren.co.in/category/kasauli/",
    image: "/images/blog/sunsetkasauli.jpg",
    alt: "Sunset Point Kasauli Lover's Lane Valley View",
    year: "Scenic Viewpoint",
    readTime: "3 min read",
    excerpt:
      "Sunset Point in Kasauli is a popular yet very quiet spot to enjoy golden twilights, pine-laid landscapes, and the famed Lover's Lane mountain trail.",
    fullContent: [
      "Sunset Point in Kasauli is a popular yet a very quiet spot to enjoy the sunset, pine-laid landscapes, valleys and sceneries.",
      "Nearby to the Sunset point, is a trail or a path known as the Lover’s Lane which is an only more quiet walk through the valleys and some of Kasauli’s most calm and breath-taking sceneries.",
    ],
    highlights: [
      { label: "Highlight", value: "Unobstructed Himalayan sunset panoramas" },
      { label: "Lover's Lane", value: "Quiet, romantic pine-shaded walk" },
      { label: "Best Time", value: "5:00 PM – 7:00 PM (Sunset Hours)" },
      { label: "Ambiance", value: "Calm, serene & pine-scented breeze" },
    ],
  },
  {
    id: "baba-balak-nath-temple",
    title: "BABA BALAK NATH TEMPLE",
    category: "Kasauli",
    categoryUrl: "https://oren.co.in/category/kasauli/",
    image: "/images/blog/balaknath.jpg",
    alt: "Baba Balak Nath Temple Graner Hill Kasauli",
    year: "Cave Shrine",
    readTime: "3 min read",
    excerpt:
      "Located on the Graner Hill, this sacred cave temple is dedicated to Baba Balak Nath, an ardent follower of Lord Shiva, offering divine tranquility and valley views.",
    fullContent: [
      "The Baba Balak Nath Temple is located on the Graner Hill. This cave temple is dedicated to Baba Balak Nath, an ardent follower of Lord Shiva.",
      "Locals believe that if childless couple visit and pray here, they will be blessed with children. Beautiful views of Kasauli can be captured from the temple compound.",
    ],
    highlights: [
      { label: "Location", value: "Graner Hill, Kasauli" },
      { label: "Deity", value: "Baba Balak Nath (Devotee of Lord Shiva)" },
      { label: "Spiritual Belief", value: "Blessing for childless couples" },
      { label: "Vistas", value: "Sweeping views of Kasauli hills from compound" },
    ],
  },
];

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };
    if (selectedPost) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedPost]);

  return (
    <section className="relative w-full bg-[#ffffff] text-neutral-900 pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Blog Post Grid: Responsive 1, 2, or 3 columns with same animation style as in Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {BLOG_POSTS.map((post, index) => {
            const columnDelay = (index % 3) * 0.12;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{
                  duration: 0.85,
                  delay: columnDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(168,125,36,0.18)] hover:border-[#c59737]/70 transition-all duration-300 flex flex-col overflow-hidden will-change-transform"
              >
                {/* 1. Image on Top with Subtle Zoom on Hover */}
                <div
                  className="relative w-full aspect-[16/10] sm:aspect-[16/10] min-h-[190px] sm:min-h-[220px] overflow-hidden bg-neutral-900 select-none"
                  style={{ position: "relative", minHeight: "190px" }}
                >
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300" />
                </div>

                {/* 2. Content & Name Below to Identify */}
                <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Read time and Category line */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#a87d24] font-semibold tracking-wider uppercase mb-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c59737]" />
                        {post.category}
                      </span>
                      <span className="text-neutral-500 font-normal lowercase tracking-normal">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Attraction / Blog Name */}
                    <h3
                      className="font-serif text-neutral-900 group-hover:text-[#a87d24] text-xl sm:text-2xl font-medium leading-snug tracking-normal transition-colors duration-200 mb-3"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bottom "Read Story" CTA Button */}
                  <div className="pt-5 sm:pt-6 mt-4 border-t border-neutral-200/80 flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-semibold text-[#a87d24] group-hover:text-[#886216] inline-flex items-center gap-1.5 tracking-wider uppercase transition-colors">
                      <span>READ FULL STORY</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#a87d24] group-hover:text-white flex items-center justify-center text-neutral-600 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Interactive Full Details Modal (Media-Responsive Dialog) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 25 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-neutral-200 overflow-hidden flex flex-col"
            >
              {/* Modal Top Header with Close Button */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="overflow-y-auto w-full flex-1">
                {/* Hero Image Inside Modal */}
                <div
                  className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] bg-neutral-950"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.alt}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />

                  {/* Title overlay in image for cinematic feel */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-10">
                    <h2
                      className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-normal leading-tight drop-shadow-md"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                {/* Article Body Content */}
                <div className="p-5 sm:p-7 md:p-9 space-y-6">
                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                    {selectedPost.highlights.map((h, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#a87d24]">
                          {h.label}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-neutral-800 mt-0.5">
                          {h.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {selectedPost.fullContent.map((paragraph, pIdx) => {
                      // Format "How to Reach Kasauli Toy Train Boarding Point?" or "Location:" sections with bold styling
                      if (paragraph.includes("\n")) {
                        const parts = paragraph.split("\n");
                        return (
                          <div
                            key={pIdx}
                            className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2 mt-4"
                          >
                            <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">
                              {parts[0]}
                            </h4>
                            <p className="text-neutral-700 text-xs sm:text-sm">
                              {parts.slice(1).join(" ")}
                            </p>
                          </div>
                        );
                      }

                      if (paragraph.startsWith("Location:") || paragraph.startsWith("Start Point/End Point:")) {
                        return (
                          <p key={pIdx} className="font-medium text-neutral-800 bg-neutral-100/70 p-3 sm:p-4 rounded-xl border border-neutral-200/70">
                            {paragraph}
                          </p>
                        );
                      }

                      return (
                        <p key={pIdx} className="text-neutral-700">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Modal Footer / Close Action - Media-Responsive */}
                  <div className="pt-5 sm:pt-6 border-t border-neutral-200 flex justify-end">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="w-full sm:w-auto px-8 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 text-center"
                    >
                      Close Story
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
