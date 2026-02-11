import { useState, useEffect } from "react";
import { useLanguage } from "~/context/LanguageContext";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minDuration?: number;
  companyInfo?: CompanyInfo | null;
  services?: ServiceItem[];
}

interface CompanyInfo {
  companyName?: string;
  companyNameEn?: string;
  tagline?: string;
  taglineEn?: string;
  logo?: string;
  heroImage?: string;
}

interface ServiceItem {
  _id: string;
  title?: string;
  titleEn?: string;
  image?: string;
}

// Fallback SVG icon when service has no image
const fallbackIcon = (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export function LoadingScreen({ onLoadingComplete, minDuration = 2800, companyInfo, services = [] }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);
  const [phase, setPhase] = useState<"building" | "revealing" | "done">("building");
  const [isExiting, setIsExiting] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const { t } = useLanguage();

  // Number of items to orbit (use services from Sanity, or fallback to 5 placeholders)
  const orbitItems = services.length > 0 ? services : Array.from({ length: 5 }, (_, i) => ({
    _id: `fallback-${i}`,
    title: undefined,
    titleEn: undefined,
    image: undefined,
  }));


  // Show logo after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setLogoVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setPhase("done");
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 600);
        }, 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minDuration, onLoadingComplete]);

  // Cycle through service icons
  useEffect(() => {
    const count = orbitItems.length || 1;
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % count);
    }, 500);
    return () => clearInterval(interval);
  }, [orbitItems.length]);

  // Phase transitions
  useEffect(() => {
    if (progress > 40 && phase === "building") {
      setPhase("revealing");
    }
  }, [progress, phase]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-600 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="loading-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating orbit ring */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
        {/* Outer orbit */}
        <div className="absolute inset-0 rounded-full border border-[#F4D03F]/10 loading-orbit-spin" />
        <div className="absolute inset-4 rounded-full border border-[#F4D03F]/20 loading-orbit-spin-reverse" />

        {/* Service icon dots orbiting — uses Sanity images */}
        {orbitItems.map((service, i) => {
          const angle = (i / orbitItems.length) * 360 + progress * 2;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          const isActive = activeIcon === i;
          return (
            <div
              key={service._id}
              className={`absolute transition-all duration-500 ${
                isActive ? "scale-125 text-[#F4D03F]" : "scale-75 text-[#F4D03F]/40"
              }`}
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
              }}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 ${
                  isActive
                    ? "bg-[#F4D03F]/20 shadow-lg shadow-[#F4D03F]/30 backdrop-blur-sm"
                    : "bg-white/5"
                }`}
              >
                {service.image ? (
                  <img src={service.image} alt={t(service.title, service.titleEn) || ""} className="w-8 h-8 object-contain" />
                ) : (
                  fallbackIcon
                )}
              </div>
            </div>
          );
        })}

        {/* Center logo area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative transition-all duration-700 ${phase === "building" ? "scale-90 opacity-80" : "scale-100 opacity-100"}`}>
            {/* Pulsing gold ring */}
            <div className="absolute -inset-4 rounded-full bg-[#F4D03F]/10 loading-pulse-ring" />
            <div className="absolute -inset-8 rounded-full bg-[#F4D03F]/5 loading-pulse-ring" style={{ animationDelay: "0.5s" }} />
            
            {/* Center content */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#F4D03F] to-[#C49000] flex items-center justify-center shadow-2xl shadow-[#F4D03F]/30 loading-logo-breathe p-3">
              {companyInfo?.logo ? (
                <img 
                  src={companyInfo.logo} 
                  alt={t(companyInfo?.companyName, companyInfo?.companyNameEn) || "Logo"} 
                  className={`w-full h-full object-contain transition-all duration-1000 ${logoVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                />
              ) : (
                <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
                  <rect x="18" y="12" width="12" height="56" rx="3" fill="#1E1E1E" className="loading-bar-grow" />
                  <rect x="18" y="56" width="44" height="12" rx="3" fill="#1E1E1E" className="loading-bar-grow-h" />
                  <circle cx="56" cy="28" r="6" fill="none" stroke="#1E1E1E" strokeWidth="3" className="loading-circle-draw" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active service label */}
      <div className="h-8 flex items-center justify-center mb-6 overflow-hidden">
        {orbitItems[activeIcon] && (orbitItems[activeIcon].title || orbitItems[activeIcon].titleEn) ? (
          <div className="loading-text-slide" key={activeIcon}>
            <span className="text-[#F4D03F]/80 text-sm font-medium tracking-wider uppercase">
              {orbitItems[activeIcon].titleEn || orbitItems[activeIcon].title}
            </span>
            <span className="text-white/40 mx-3">•</span>
            <span className="text-[#F4D03F]/80 text-sm font-medium">
              {orbitItems[activeIcon].title || orbitItems[activeIcon].titleEn}
            </span>
          </div>
        ) : (
          <div className="loading-text-slide" key={activeIcon}>
            <span className="text-[#F4D03F]/80 text-sm font-medium tracking-wider">
              ●
            </span>
          </div>
        )}
      </div>

      {/* Company name */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 loading-text-reveal">
          <span className="text-[#F4D03F]">LONAN</span>
        </h1>
        <p className="text-white/50 text-sm tracking-[0.3em] uppercase loading-text-reveal" style={{ animationDelay: "0.3s" }}>
          Advertising & Marketing
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-80">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F4D03F] via-[#FFD54F] to-[#F4D03F] rounded-full transition-all duration-100 loading-progress-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-white/30 text-xs font-mono">{Math.round(progress)}%</span>
          <span className="text-white/30 text-xs">
            {phase === "building" && "Loading..."}
            {phase === "revealing" && "Almost ready..."}
            {phase === "done" && "✓"}
          </span>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent opacity-30" />
    </div>
  );
}

