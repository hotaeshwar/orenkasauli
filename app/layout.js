import { Cormorant_Garamond, Montserrat, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Oren Kasauli — Luxury Resort in the Lap of Nature",
  description:
    "Experience luxury in the lap of nature at Oren Kasauli hotel. High-end accommodation with breathtaking views of the Himalayan range in Himachal Pradesh.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/images/orenkasauli-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }, { url: "/images/orenkasauli-logo.png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${montserrat.variable} antialiased`}
    >
      <head>
        <link rel="preload" href="/images/deep-teal-logo.png" as="image" type="image/png" fetchPriority="high" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen w-full overflow-x-hidden font-sans bg-[#FFF6F6] text-[#103430] selection:bg-[#103430] selection:text-[#FFF6F6] flex flex-col justify-between"
      >
        <SmoothScroll>
          <div suppressHydrationWarning className="flex-1 w-full">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
