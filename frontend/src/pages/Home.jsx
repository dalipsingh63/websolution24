
import useSEO from "../utils/useSEO";

import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import FeaturedWork from "../components/FeaturedWork";
import GrowthSection from "../components/GrowthSection";
import WhyChooseMe from "../components/WhyChooseMe";
import ProcessSection from "../components/ProcessSection";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  useSEO({
    title: "Website Designer in Jaipur | DS Digital Studio",
    description:
      "DS Digital Studio offers professional website design, e-commerce development, website redesign and digital marketing services in Jaipur, Rajasthan.",
    path: "/",
  });

  return (
    <div className="home-page [&>section:not(:first-child)]:py-2 sm:[&>section:not(:first-child)]:py-3 lg:[&>section:not(:first-child)]:py-0">
      <Hero />
      <ServicesSection />
      <FeaturedWork />
      <GrowthSection />
      <WhyChooseMe />
      <ProcessSection />
      <FinalCTA />
    </div>
  );
}
