import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SessionProvider } from "@/src/context/session-context";
import { SiteHeader } from "@/src/components/site-header";
import { HeroSection } from "@/src/components/hero-section";
import { ManifestoSection } from "@/src/components/manifesto-section";
import { PortfolioSection } from "@/src/components/portfolio-section";
import { ClientGallerySection } from "@/src/components/client-gallery-section";
import { CtaFooter } from "@/src/components/cta-footer";
import { AdminDashboardPage } from "@/src/components/admin-dashboard-page";
import { FullGalleryPage } from "@/src/components/full-gallery-page";

export default function App() {
  const [currentView, setCurrentView] = useState<"site" | "admin" | "gallery">(() => {
    if (window.location.hash === "#admin") return "admin";
    if (window.location.hash === "#galeria" || window.location.hash === "#galeria-completa") return "gallery";
    return "site";
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setCurrentView("admin");
      } else if (window.location.hash === "#galeria" || window.location.hash === "#galeria-completa") {
        setCurrentView("gallery");
      } else {
        setCurrentView("site");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView !== "site") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [currentView]);

  return (
    <SessionProvider>
      {currentView === "admin" ? (
        <AdminDashboardPage
          onBackToSite={() => {
            window.location.hash = "";
            setCurrentView("site");
          }}
        />
      ) : currentView === "gallery" ? (
        <FullGalleryPage
          onBackToSite={() => {
            window.location.hash = "";
            setCurrentView("site");
          }}
        />
      ) : (
        <div className="min-h-screen bg-[#000000] text-foreground selection:bg-amber-400 selection:text-black">
          <SiteHeader
            onOpenAdmin={() => {
              window.location.hash = "admin";
              setCurrentView("admin");
            }}
          />
          <main>
            <HeroSection />
            <ManifestoSection />
            <PortfolioSection
              onOpenFullGallery={() => {
                window.location.hash = "galeria";
                setCurrentView("gallery");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <ClientGallerySection />
            <CtaFooter
              onOpenAdmin={() => {
                window.location.hash = "admin";
                setCurrentView("admin");
              }}
            />
          </main>
        </div>
      )}
    </SessionProvider>
  );
}
