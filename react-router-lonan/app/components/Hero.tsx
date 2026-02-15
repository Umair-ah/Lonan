import { useState, useEffect, useRef } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";

interface CompanyInfo {
  companyName?: string;
  companyNameEn?: string;
  tagline?: string;
  taglineEn?: string;
  logo?: string;
  heroImage?: string;
}

interface HeroProps {
  companyInfo?: CompanyInfo | null;
}

export function Hero({ companyInfo }: HeroProps) {
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const companyName = t(companyInfo?.companyName, companyInfo?.companyNameEn) || (isRTL ? "لونان" : "Lonan");
  const tagline = t(companyInfo?.tagline, companyInfo?.taglineEn) || getText("oneStopShop");

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: companyInfo?.heroImage
          ? `linear-gradient(to bottom, rgba(244,208,63,0.3), rgba(244,208,63,0.5)), url(${companyInfo.heroImage}) center/cover no-repeat fixed`
          : "#F4D03F",
      }}
    >
      {/* ── Animated Background Gradient (follows mouse) ── */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.1), transparent 70%)`,
        }}
      />

      {/* ── Grid Pattern Overlay ── */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(#1E1E1E 1px, transparent 1px), linear-gradient(90deg, #1E1E1E 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* ── Animated Particles ── */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-black/20 rounded-full transition-opacity duration-1000 ${heroLoaded ? "opacity-40" : "opacity-0"}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* ── Large Ambient Glows ── */}
      <div className={`absolute top-1/4 ${isRTL ? "left-1/4" : "right-1/4"} w-96 h-96 bg-black/[0.08] rounded-full blur-[120px] transition-opacity duration-2000 ${heroLoaded ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute bottom-1/4 ${isRTL ? "right-1/4" : "left-1/4"} w-80 h-80 bg-black/[0.06] rounded-full blur-[100px] transition-opacity duration-2000 delay-500 ${heroLoaded ? "opacity-100" : "opacity-0"}`} />

      {/* ── Floating Geometric Shapes ── */}
      <div className={`absolute top-1/3 ${isRTL ? "right-1/3" : "left-1/3"} w-20 h-20 border-2 border-black/20 rounded-lg rotate-45 transition-all duration-2000 delay-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        style={{ animation: "float 6s ease-in-out infinite" }} />
      <div className={`absolute bottom-1/3 ${isRTL ? "left-1/4" : "right-1/4"} w-16 h-16 border-2 border-black/15 rounded-full transition-all duration-2000 delay-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ animation: "float 5s ease-in-out infinite 1s" }} />

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen py-20">

          {/* ── Badge (20 Years) ── */}
          {/* <div className={`mb-8 transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-5 py-2.5 border border-black/30 hover:border-black/50 transition-all duration-300">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
              <span className="text-sm font-semibold text-black tracking-wider">
                {getText("since20Years")}
              </span>
            </div>
          </div> */}

          {/* ── Logo with Animated Rings ── */}
          <div className={`relative mb-8 transition-all duration-1200 delay-500 ${heroLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            {/* Outer animated rings */}
            <div className="absolute inset-0 -m-8">
              <div className="absolute inset-0 rounded-full border-2 border-black/20" style={{ animation: "spin 20s linear infinite" }} />
              <div className="absolute inset-0 rounded-full border border-black/10" style={{ animation: "spin 25s linear infinite reverse" }} />
            </div>

            {/* Logo container with glow */}
            <div className="relative group">
              {/* Glow behind logo */}
              <div className="absolute inset-0 bg-black/10 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Logo image */}
              {companyInfo?.logo ? (
                <div className="relative">
                  <img
                    src={companyInfo.logo}
                    alt={companyName}
                    className="relative z-10 w-full max-w-[400px] lg:max-w-[500px] h-auto object-contain"
                  />
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              ) : (
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-[#F4D03F] to-[#C49000] flex items-center justify-center shadow-2xl shadow-[#F4D03F]/30">
                  <span className="text-6xl lg:text-7xl font-black text-black">
                    {companyName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Company Name & Tagline ── */}
          {/* <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-black mb-4 leading-tight">
              <span className="block bg-gradient-to-r from-black via-[#1E1E1E] to-black bg-clip-text text-transparent animate-gradient-x">
                {companyName}
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-black/40 rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.4)]" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-black/40 rounded-full" />
            </div>
            <p className="text-xl lg:text-2xl text-black/70 font-medium leading-relaxed">
              {tagline}
            </p>
          </div> */}

          {/* ── CTA Buttons ── */}
          {/* <div className={`flex flex-col mt-9 sm:flex-row gap-4 mb-16 transition-all duration-1000 delay-900 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button
              onClick={() => scrollToSection("services")}
              className="group relative px-8 py-4 bg-[#F4D03F] text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(244,208,63,0.5)] btn-magnetic"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {getText("exploreServices")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C49000] to-[#F4D03F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="group relative px-8 py-4 bg-transparent border-2 border-black/40 text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:border-black hover:bg-black/10 hover:scale-105 btn-magnetic"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {getText("contactUs")}
              </span>
            </button>
          </div> */}

          {/* ── Quick Stats (Optional) ── */}
          {/* <div className={`grid grid-cols-3 gap-8 max-w-2xl transition-all duration-1000 delay-1100 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { value: "20+", label: getText("yearsExperience") },
              { value: "500+", label: getText("happyClients") },
              { value: "1000+", label: getText("completedProjects") },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-black mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-black/60 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      {/* <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1300 ${heroLoaded ? "opacity-100" : "opacity-0"}`}>
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-black/60 hover:text-black transition-colors duration-300 group"
          aria-label={getText("discoverMore")}
        >
          <span className="text-xs font-medium uppercase tracking-widest">{getText("discoverMore")}</span>
          <div className="relative w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1.5 group-hover:border-black transition-colors">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </div>
        </button>
      </div> */}

      {/* ── Bottom Gold Accent Line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
    </section>
  );
}
