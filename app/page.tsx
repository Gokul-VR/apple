import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import UnibodySection from "@/components/UnibodySection";
import BentoGrid from "@/components/BentoGrid";
import BatterySection from "@/components/BatterySection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSequence />
      <UnibodySection />
      <BentoGrid />
      <BatterySection />

      {/* Simple footer for completeness */}
      <footer className="py-4 text-center text-sm text-neutral-600 bg-black ">
        <p>&copy; {new Date().getFullYear()} Apple Inc. All rights reserved.</p>
      </footer>
    </main>
  );
}
