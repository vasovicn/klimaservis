import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import CoverageSection from "@/components/CoverageSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PricingSection />
        <CoverageSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
