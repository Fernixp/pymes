import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/hows-it-works-section";
import { TheorySection } from "@/components/home/theory-section";

export const HomePage = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
      <HeroSection />
      <div id="features" className="w-full">
        <FeaturesSection />
      </div>
      <div id="how-it-works" className="w-full">
        <HowItWorksSection />
      </div>
      <div id="theory" className="w-full">
        <TheorySection />
      </div>
    </div>
  );