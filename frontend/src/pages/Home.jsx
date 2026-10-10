import useSEO from "../utils/useSEO";

import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import FeaturedWork from "../components/FeaturedWork";
import GrowthSection from "../components/GrowthSection";
import WhyChooseMe from "../components/WhyChooseMe";
import ProcessSection from "../components/ProcessSection";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  useSEO({ title: 'Dalip Singh Web Solutions | Website Developer in Jaipur', description: 'Professional business websites, website redesign, e-commerce development and digital advertising services in Jaipur, Rajasthan. Discuss your project with Dalip Singh.', path: '/' });

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
