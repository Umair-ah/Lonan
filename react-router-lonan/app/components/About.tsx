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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aboutText = t(companyInfo?.about, companyInfo?.aboutEn);
  const visionText = t(companyInfo?.vision, companyInfo?.visionEn);
  const missionText = t(companyInfo?.mission, companyInfo?.missionEn);
  const companyName = t(companyInfo?.companyName, companyInfo?.companyNameEn);

  const hasContent = aboutText || visionText || missionText;

  const yearsCount = useCounter(20, 2000, statsVisible);
  const clientsCount = useCounter(500, 2500, statsVisible);
  const projectsCount = useCounter(1000, 3000, statsVisible);

  // Close modal on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

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

      <div className="relative pt-2 z-10 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

          {/* ── Section Header ── */}
          <div className={`text-center mb-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
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
              {/* <div 
                className="relative px-8 pt-6 pb-4 bg-black/60 backdrop-blur-sm rounded-2xl border border-[#F4D03F]/20 cursor-pointer hover:border-[#F4D03F]/40 hover:bg-black/80 transition-all duration-300"
                onClick={() => setIsModalOpen(true)}
              > */}
                {/* <h2 className="text-3xl lg:text-4xl font-black text-[#F4D03F] tracking-tight">
                  {getText("whoWeAre")}
                </h2> */}
                
                {/* Bottom accent line */}
                {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent rounded-full" /> */}
              {/* </div> */}

            {/* About Us Card */}
            <div
              className={`card group cursor-pointer hover:border-[var(--color-gold)] border-2 border-transparent card-hover-lift image-shine transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.2s" }}
              onClick={() => setIsModalOpen(true)}
            >
              <div className="service-icon-about group-hover:bg-black group-hover:text-[var(--color-gold)]">
                <img src={'/about-us.png'} alt={companyName} className="w-full h-full object-contain" />
                 <h3 className="text-xl font-bold mb-2 text-black">{getText("whoWeAre")}</h3>
              </div>

              <p className="text-[var(--color-gray-dark)] mb-4">
                {aboutText ? (aboutText.length > 120 ? aboutText.substring(0, 120) + "..." : aboutText) : (isRTL
                  ? "نبني العلامات التجارية رقمياً وواقعياً. من التسويق والتصميم إلى الكلادينج وتجهيز الفعاليات، نقدم التميز في كل تفصيل"
                  : "We build brands from the ground up—online and offline. From marketing and design to industrial cladding and grand events, we deliver excellence in every detail."
                )}
              </p>

              <button className="btn btn-secondary w-full group-hover:bg-[var(--color-black)] group-hover:text-black group-hover:border-[var(--color-black)]">
                {getText("learnMore")}
                <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#F4D03F]/30 rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#F4D03F]/30 rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#F4D03F]/30 rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#F4D03F]/30 rounded-br-lg" />
            </div>

       
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

              {/* ── Gold Separator ── */}
              <div className="flex items-center justify-center gap-4 my-20">
                <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-transparent to-[#F4D03F]/30" />
                <div className="w-2 h-2 bg-[#F4D03F] rounded-full shadow-[0_0_10px_rgba(244,208,63,0.5)]" />
                <div className="flex-1 max-w-[200px] h-px bg-gradient-to-l from-transparent to-[#F4D03F]/30" />
              </div>

              {/* ── Vision & Mission Cards ── */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                {/* Vision Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#F4D03F] via-[#e6c555] to-[#C49000] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                  <div className="relative bg-gradient-to-br from-[#F4D03F] via-[#e6c555] to-[#C49000] rounded-3xl p-8 lg:p-10 h-full border-2 border-[#F4D03F] group-hover:border-[#C49000] group-hover:shadow-2xl group-hover:shadow-[#F4D03F]/50 transition-all duration-500 overflow-hidden">
                    {/* Background pattern/glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F4D03F]/90 to-[#C49000]/90 opacity-100 group-hover:opacity-90 transition-opacity duration-700" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Number watermark */}
                    <div className={`absolute ${isRTL ? "left-6" : "right-6"} top-4 text-8xl font-black text-black/10 select-none group-hover:text-black/15 transition-colors duration-700`}>
                      01
                    </div>

                    <div className="relative z-10">
                      {/* Icon row */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center shadow-lg shadow-black/20 group-hover:shadow-black/40 group-hover:scale-110 transition-all duration-500">
                          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-black transition-colors duration-300">
                            {getText("ourVision")}
                          </h4>
                          <div className="w-full h-0.5 bg-black/30 rounded-full mt-1" />
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-black/80 leading-relaxed text-[1.05rem] group-hover:text-black transition-colors duration-300 font-medium">
                        {visionText || (isRTL
                          ? "أن نكون الخيار الأول للحلول الإعلانية والتسويق الإلكتروني في المملكة، بمعايير عالمية وهوية سعودية راسخة."
                          : "To be the first choice for advertising and digital marketing solutions in the Kingdom, with global standards and a strong Saudi identity."
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#C49000] via-[#e6c555] to-[#F4D03F] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                  <div className="relative bg-gradient-to-br from-[#C49000] via-[#e6c555] to-[#F4D03F] rounded-3xl p-8 lg:p-10 h-full border-2 border-[#C49000] group-hover:border-[#F4D03F] group-hover:shadow-2xl group-hover:shadow-[#F4D03F]/50 transition-all duration-500 overflow-hidden">
                    {/* Background pattern/glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C49000]/90 to-[#F4D03F]/90 opacity-100 group-hover:opacity-90 transition-opacity duration-700" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Number watermark */}
                    <div className={`absolute ${isRTL ? "left-6" : "right-6"} top-4 text-8xl font-black text-black/10 select-none group-hover:text-black/15 transition-colors duration-700`}>
                      02
                    </div>

                    <div className="relative z-10">
                      {/* Icon row */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center shadow-lg shadow-black/20 group-hover:shadow-black/40 group-hover:scale-110 transition-all duration-500">
                          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-black transition-colors duration-300">
                            {getText("ourMission")}
                          </h4>
                          <div className="w-full h-0.5 bg-black/30 rounded-full mt-1" />
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-black/80 leading-relaxed text-[1.05rem] group-hover:text-black transition-colors duration-300 font-medium">
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
        </div>
      )}
    </section>
  );
}
