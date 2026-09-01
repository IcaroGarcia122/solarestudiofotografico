import React from "react";

interface SolarLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showSubtitle?: boolean;
  className?: string;
  variant?: "horizontal" | "stacked" | "icon-only";
}

export function SolarLogo({
  size = "md",
  showSubtitle = true,
  className = "",
  variant = "horizontal",
}: SolarLogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
    xl: "text-3xl sm:text-4xl",
  };

  const subtitleSizes = {
    sm: "text-[0.55rem] tracking-[0.2em]",
    md: "text-[0.62rem] sm:text-[0.68rem] tracking-[0.25em]",
    lg: "text-[0.72rem] tracking-[0.3em]",
    xl: "text-xs tracking-[0.35em]",
  };

  const IconSvg = (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#f5df9e] via-[#d4af37] to-[#aa771c] p-0.5 shadow-lg shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-shadow ${iconSizes[size]}`}
    >
      <div className="h-full w-full rounded-[14px] bg-[#0c0d10] flex items-center justify-center relative overflow-hidden">
        {/* Glow center */}
        <div className="absolute inset-0 bg-radial from-[#d4af37]/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Solar Sun / Aperture Geometry SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3/4 w-3/4 text-[#e5c07b] drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]"
        >
          {/* Central Sun Circle */}
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
          
          {/* Sun Rays / Shutter Aperture Blades */}
          <path
            d="M12 2.5V5.5M12 18.5V21.5M2.5 12H5.5M18.5 12H21.5M5.28 5.28L7.4 7.4M16.6 16.6L18.72 18.72M5.28 18.72L7.4 16.6M16.6 7.4L18.72 5.28"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="7.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );

  if (variant === "icon-only") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {IconSvg}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        {IconSvg}
        <div className="flex flex-col items-center">
          <span
            className={`font-serif font-bold text-white tracking-tight ${titleSizes[size]} leading-none`}
          >
            Solar
          </span>
          {showSubtitle && (
            <span
              className={`font-sans font-semibold uppercase text-[#e5c07b] mt-1 ${subtitleSizes[size]}`}
            >
              Estúdio Fotográfico
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 group text-left ${className}`}>
      {IconSvg}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-bold tracking-tight text-white group-hover:text-[#f3e5ab] transition-colors leading-tight ${titleSizes[size]}`}
        >
          Solar
        </span>
        {showSubtitle && (
          <span
            className={`font-sans font-semibold uppercase text-zinc-400 group-hover:text-[#e5c07b] transition-colors ${subtitleSizes[size]}`}
          >
            Estúdio Fotográfico
          </span>
        )}
      </div>
    </div>
  );
}
