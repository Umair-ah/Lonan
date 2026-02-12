import { useState, useEffect, useRef } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface CompanyInfo {
  companyName?: string;
  companyNameEn?: string;
  about?: string;
  aboutEn?: string;
  vision?: string;
  visionEn?: string;
  mission?: string;
  missionEn?: string;
  logo?: string;
  logoLight?: string;
}

interface AboutProps {
  companyInfo?: CompanyInfo | null;
}

/* Animated counter hook */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return count;
}

export function About({ companyInfo }: AboutProps) {
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.05 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal({ threshold: 0.3 });
  const [activeCard, setActiveCard] = useState<"vision" | "mission" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);

  const aboutText = t(companyInfo?.about, companyInfo?.aboutEn);
  const visionText = t(companyInfo?.vision, companyInfo?.visionEn);
  const missionText = t(companyInfo?.mission, companyInfo?.missionEn);
  const companyName = t(companyInfo?.companyName, companyInfo?.companyNameEn);

  const hasContent = aboutText || visionText || missionText;

  const yearsCount = useCounter(20, 2000, statsVisible);
  const clientsCount = useCounter(500, 2500, statsVisible);
  const projectsCount = useCounter(1000, 3000, statsVisible);

  // Close modals on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isVisionModalOpen) setIsVisionModalOpen(false);
        else if (isMissionModalOpen) setIsMissionModalOpen(false);
        else if (isModalOpen) setIsModalOpen(false);
      }
    };
    
    const isAnyModalOpen = isModalOpen || isVisionModalOpen || isMissionModalOpen;
    
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isVisionModalOpen, isMissionModalOpen]);

  if (!hasContent) {
    return (
      <section id="about" className="section bg-[#1E1E1E]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="section-title">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getText("whoWeAre")}
            </span>
            <div className="mt-8 p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-400">
                {getText("addFromDashboard")}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative overflow-hidden bg-[var(--color-black-pure)]" ref={sectionRef}>

      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal gold gradient stripe */}
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#F4D03F]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#F4D03F]/[0.02] rounded-full blur-[100px]" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#F4D03F 1px, transparent 1px), linear-gradient(90deg, #F4D03F 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
      </div>

      {/* ── Top Gold Accent Strip ── */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent opacity-40" />

      <div className="relative z-10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

          {/* ── Section Header ── */}
          <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Top decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#F4D03F]/40 to-[#F4D03F]/40 rounded-full" />
              <div className="w-2 h-2 bg-[#F4D03F] rounded-full shadow-[0_0_12px_rgba(244,208,63,0.5)]" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#F4D03F]/40 to-[#F4D03F]/40 rounded-full" />
            </div>

            {/* Main Title */}
            <div className="relative inline-block">
              {/* Icon badge */}
              {/* <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#F4D03F] to-[#C49000] flex items-center justify-center shadow-lg shadow-[#F4D03F]/30 z-10">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div> */}

              {/* Title text with background - Clickable */}
              <div 
                className="relative px-8 pt-6 pb-4 bg-black/60 backdrop-blur-sm rounded-2xl border border-[#F4D03F]/20 cursor-pointer hover:border-[#F4D03F]/40 hover:bg-black/80 transition-all duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                <h2 className="text-3xl lg:text-4xl font-black text-[#F4D03F] tracking-tight">
                  {getText("whoWeAre")}
                </h2>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent rounded-full" />
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#F4D03F]/30 rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#F4D03F]/30 rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#F4D03F]/30 rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#F4D03F]/30 rounded-br-lg" />
            </div>

            {/* Subtitle/Description */}
            <p className="mt-6 text-sm text-gray-400 font-medium uppercase tracking-[0.2em]">
              {isRTL ? "انقر للتعرف علينا" : "Click to Discover More"}
            </p>
          </div>

          {/* ── Vision & Mission Buttons ── */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Vision Button */}
            <button
              onClick={() => setIsVisionModalOpen(true)}
              className="group relative px-8 py-4 bg-gradient-to-br from-[#F4D03F] to-[#C49000] text-black font-bold text-lg rounded-2xl shadow-lg shadow-[#F4D03F]/20 hover:shadow-[#F4D03F]/40 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {getText("ourVision")}
            </button>

            {/* Mission Button */}
            <button
              onClick={() => setIsMissionModalOpen(true)}
              className="group relative px-8 py-4 bg-gradient-to-br from-[#F4D03F] to-[#C49000] text-black font-bold text-lg rounded-2xl shadow-lg shadow-[#F4D03F]/20 hover:shadow-[#F4D03F]/40 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {getText("ourMission")}
            </button>
          </div>

        </div>
      </div>

      {/* ── Bottom Gold Accent Strip ── */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent opacity-40" />

      {/* ── About Content Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F4D03F]/20 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#F4D03F] via-[#e6c555] to-[#F4D03F] p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-20">
              <h3 className="text-2xl font-bold text-black">{getText("whoWeAre")}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 lg:p-12">
              {/* ── Main Content: Logo + About Text ── */}
              <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-20">
                {/* Logo Side (2 cols) */}
                <div className={`lg:col-span-2 flex justify-center ${isRTL ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative group">
                    {/* Animated ring */}
                    <div className="absolute -inset-4 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 rounded-3xl border-2 border-[#F4D03F]/20 animate-[spin_20s_linear_infinite]"
                        style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} />
                      <div className="absolute inset-0 rounded-3xl border-2 border-[#F4D03F]/10 animate-[spin_25s_linear_infinite_reverse]"
                        style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }} />
                    </div>

                    {/* Logo container */}
                    <div className="relative w-56 h-56 lg:w-72 lg:h-72">
                      {companyInfo?.logo ? (
                        <img
                          src={companyInfo.logoLight}
                          alt={companyName || "Logo"}
                          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(244,208,63,0.15)] group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-5xl lg:text-6xl font-black text-[#F4D03F]">
                          {(companyName || "L").charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Glow effect behind */}
                    <div className="absolute inset-0 rounded-3xl bg-[#F4D03F]/5 blur-2xl -z-10 group-hover:bg-[#F4D03F]/10 transition-all duration-500" />
                  </div>
                </div>

                {/* About Text Side (3 cols) */}
                <div className={`lg:col-span-3 ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-6">
                    {/* Company name as heading */}
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-black text-white mb-2 leading-tight">
                        {companyName || (isRTL ? "لونان" : "Lonan")}
                      </h2>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-12 h-1 bg-[#F4D03F] rounded-full" />
                        <span className="text-[#F4D03F] text-sm font-semibold uppercase tracking-widest">
                          {isRTL ? "للدعاية والإعلان" : "Advertising Agency"}
                        </span>
                      </div>
                    </div>

                    {/* About paragraph */}
                    {aboutText && (
                      <p className="text-gray-400 text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                        {aboutText}
                      </p>
                    )}

                    {/* Quick highlights */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {[
                        { icon: "⚡", textKey: "fastExecution" as const },
                        { icon: "💎", textKey: "highQuality" as const },
                        { icon: "🎯", textKey: "localExpertise" as const },
                      ].map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-[#F4D03F]/30 hover:bg-[#F4D03F]/5 transition-all duration-300"
                        >
                          <span>{item.icon}</span>
                          {getText(item.textKey)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Vision Modal ── */}
      {isVisionModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsVisionModalOpen(false)}
        >
          <div
            className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F4D03F]/20 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#F4D03F] via-[#e6c555] to-[#F4D03F] p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">{getText("ourVision")}</h3>
              </div>
              <button
                onClick={() => setIsVisionModalOpen(false)}
                className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 lg:p-12">
              <div className="group relative max-w-3xl mx-auto">
                {/* Animated border glow */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#F4D03F]/40 via-transparent to-[#F4D03F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                <div className="relative bg-[#1a1a1a] rounded-3xl p-8 lg:p-10 border border-white/[0.06] group-hover:border-transparent transition-all duration-500 overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#F4D03F]/[0.03] rounded-full blur-3xl" />

                  {/* Number watermark */}
                  <div className={`absolute ${isRTL ? "left-6" : "right-6"} top-4 text-8xl font-black text-white/[0.03] select-none`}>
                    01
                  </div>

                  <div className="relative z-10">
                    {/* Icon row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F4D03F] to-[#C49000] flex items-center justify-center shadow-lg shadow-[#F4D03F]/20">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-[#F4D03F]">
                          {getText("ourVision")}
                        </h4>
                        <div className="w-full h-0.5 bg-[#F4D03F]/40 rounded-full mt-1" />
                      </div>
                    </div>

                    {/* Text */}
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {visionText || (isRTL
                        ? "أن نكون الخيار الأول للحلول الإعلانية والتسويق الإلكتروني في المملكة، بمعايير عالمية وهوية سعودية راسخة."
                        : "To be the first choice for advertising and digital marketing solutions in the Kingdom, with global standards and a strong Saudi identity."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mission Modal ── */}
      {isMissionModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsMissionModalOpen(false)}
        >
          <div
            className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F4D03F]/20 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#F4D03F] via-[#e6c555] to-[#F4D03F] p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">{getText("ourMission")}</h3>
              </div>
              <button
                onClick={() => setIsMissionModalOpen(false)}
                className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 lg:p-12">
              <div className="group relative max-w-3xl mx-auto">
                {/* Animated border glow */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#F4D03F]/20 via-transparent to-[#F4D03F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                <div className="relative bg-[#1a1a1a] rounded-3xl p-8 lg:p-10 border border-white/[0.06] group-hover:border-transparent transition-all duration-500 overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F4D03F]/[0.03] rounded-full blur-3xl" />

                  {/* Number watermark */}
                  <div className={`absolute ${isRTL ? "left-6" : "right-6"} top-4 text-8xl font-black text-white/[0.03] select-none`}>
                    02
                  </div>

                  <div className="relative z-10">
                    {/* Icon row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F4D03F] to-[#C49000] flex items-center justify-center shadow-lg shadow-[#F4D03F]/20">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-[#F4D03F]">
                          {getText("ourMission")}
                        </h4>
                        <div className="w-full h-0.5 bg-[#F4D03F]/40 rounded-full mt-1" />
                      </div>
                    </div>

                    {/* Text */}
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {missionText || (isRTL
                        ? "أن نصنع لكل عميل بصمة إعلانية مميزة تجمع بين الإبداع والجودة والسرعة، وتواكب الفعاليات والمناسبات المحلية بروح سعودية أصيلة."
                        : "To create a distinctive advertising footprint for each client that combines creativity, quality, and speed, keeping up with local events and occasions with an authentic Saudi spirit."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
