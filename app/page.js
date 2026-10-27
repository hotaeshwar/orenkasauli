import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import RoomsSection from "@/components/RoomsSection";
import VacationSection from "@/components/VacationSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative overflow-x-hidden">
      <SplashScreen />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <RoomsSection />
      <VacationSection />
    </main>
  );
}
