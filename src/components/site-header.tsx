import { useEffect, useState } from "react";
import { ArrowUpRight, Shield } from "lucide-react";
import { SolarLogo } from "@/src/components/solar-logo";

interface SiteHeaderProps {
  onOpenAdmin?: () => void;
}

const navLinks = [
  { label: "Início", href: "#top" },
  { label: "Galeria", href: "#portfolio" },
  { label: "Área do Cliente", href: "#area-cliente" },
  { label: "Experiência", href: "#experiencia" },
];

export function SiteHeader({ onOpenAdmin }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 pointer-events-none ${
        scrolled
          ? "top-4 sm:top-6 translate-y-0 opacity-100"
          : "top-0 -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="pointer-events-auto flex items-center justify-between rounded-full border border-white/20 bg-black/75 px-5 py-2.5 sm:px-8 sm:py-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[#d4af37]/50">
          <a
            href="#top"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Solar Estúdio Fotográfico - Início"
          >
            <SolarLogo size="sm" />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 lg:gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-wider text-zinc-300 transition-colors hover:text-[#f3e5ab] font-semibold"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contato"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f5df9e] transition-all hover:bg-gradient-to-r hover:from-[#f3d789] hover:via-[#d4af37] hover:to-[#be9032] hover:text-black hover:border-[#d4af37] shadow-md hover:shadow-[#d4af37]/20"
            >
              <span>Contato</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#area-cliente"
              className="rounded-full border border-[#d4af37]/60 bg-gradient-to-r from-[#f3d789] via-[#d4af37] to-[#be9032] px-3.5 py-1 text-xs font-bold text-black transition-all hover:brightness-110 shadow-sm"
            >
              Meu Ensaio
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
