import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import QuickActions from "@/components/sections/QuickActions";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhySection from "@/components/sections/WhySection";
import HowItWorks from "@/components/sections/HowItWorks";
import BookingSection from "@/components/sections/BookingSection";
import ImmediateContact from "@/components/sections/ImmediateContact";
import ServiceAreaSection from "@/components/sections/ServiceAreaSection";
import PropertyNeedsCTA from "@/components/sections/PropertyNeedsCTA";
import ContactSection from "@/components/sections/ContactSection";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title:
    "Reyes Valley Property Management & Maintenance | Stockton & San Joaquin Valley",
  description:
    "Reyes Valley Property Management & Maintenance provides property management, maintenance, interior upkeep, perimeter maintenance, and property modification services throughout the San Joaquin Valley, with a special emphasis on Stockton, California.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <IntroSection />
      <ServicesSection />
      <WhySection />
      <HowItWorks />
      <BookingSection />
      <ImmediateContact />
      <ServiceAreaSection />
      <PropertyNeedsCTA />
      <ContactSection />
      <FaqSection />
    </>
  );
}
