"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import CoverageSection from "@/components/CoverageSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/booking/BookingContext";
import BookingModal from "@/components/booking/BookingModal";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <HeroSection />
        <PricingSection />
        <CoverageSection />
        <ContactSection />
      </main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
