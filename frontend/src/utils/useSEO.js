import { useEffect } from "react";

function setMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function useSEO({ title, description, path, noindex = false }) {
  useEffect(() => {
    const siteBase = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
    const canonical = `${siteBase}${path || window.location.pathname}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setLink("canonical", canonical);

    let structuredData = document.getElementById("website-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "website-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "DS Digital Studio",
      url: siteBase,
      description: "Business website development, e-commerce websites, website redesign, maintenance and digital advertising.",
      areaServed: [
        { "@type": "City", name: "Jaipur" },
        { "@type": "AdministrativeArea", name: "Rajasthan" },
        { "@type": "Country", name: "India" }
      ],
      serviceType: ["Website Development", "E-commerce Website Development", "Website Redesign", "Website Maintenance", "Digital Advertising"]
    });
  }, [title, description, path, noindex]);
}
