import { useState } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";

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
}

interface AboutProps {
  companyInfo?: CompanyInfo | null;
}

export function About({ companyInfo }: AboutProps) {
  const [showVisionMission, setShowVisionMission] = useState(false);
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();

  const aboutText = t(companyInfo?.about, companyInfo?.aboutEn);
  const visionText = t(companyInfo?.vision, companyInfo?.visionEn);
  const missionText = t(companyInfo?.mission, companyInfo?.missionEn);
  const companyName = t(companyInfo?.companyName, companyInfo?.companyNameEn);

  const hasContent = aboutText || visionText || missionText;

  if (!hasContent) {
    return (
      <section id="about" className="section bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="section-title">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getText("whoWeAre")}
            </span>
            <div className="mt-8 p-8 bg-[var(--color-gray-light)] rounded-2xl">
              <p className="text-[var(--color-gray-dark)]">
                {getText("addFromDashboard")}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section relative overflow-hidden" style={{ backgroundColor: "#F4D03F" }}>
      {/* Background decoration */}
      <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-1/3 h-full bg-[var(--color-gray-light)] ${isRTL ? "rounded-l-[100px]" : "rounded-r-[100px]"} -z-10`} />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center font-bold">
          <span className="section-title">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {getText("whoWeAre")}
          </span>
        </div>

        <div className="grid lg:grid-cols-1 mt-7 place-items-center">
          {/* Content */}
          
          
          <div className={`${isRTL ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
            <div className="space-y-6">
              {aboutText && (
                <div className="text-lg text-[var(--color-gray-dark)] leading-relaxed whitespace-pre-line">
                  <span className="font-bold text-2xl">
                    {companyName || (isRTL ? "لونان" : "Lonan")}
                  </span>{" "}
                  {aboutText}
                </div>
              )}
            </div>
          </div>

          

       
        </div>
        <div className="p-8 grid md:grid-cols-2 gap-8 bg-[var(--color-gold)]">
              <div className="bg-[var(--color-gray-light)] rounded-2xl p-6">
                <div className="w-16 h-16 bg-[var(--color-gold)] rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-[var(--color-gold)]">{getText("ourVision")}</h4>
                <p className="text-[var(--color-gold)] leading-relaxed">
                  {visionText || (isRTL 
                    ? "أن نكون الخيار الأول للحلول الإعلانية والتسويق الإلكتروني في المملكة، بمعايير عالمية وهوية سعودية راسخة."
                    : "To be the first choice for advertising and digital marketing solutions in the Kingdom, with global standards and a strong Saudi identity."
                  )}
                </p>
              </div>

              <div className="bg-[var(--color-gray-light)] rounded-2xl p-6">
                <div className="w-16 h-16 bg-[var(--color-gold)] rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-[var(--color-gold)]">{getText("ourMission")}</h4>
                <p className="text-[var(--color-gold)] leading-relaxed">
                  {missionText || (isRTL
                    ? "أن نصنع لكل عميل بصمة إعلانية مميزة تجمع بين الإبداع والجودة والسرعة، وتواكب الفعاليات والمناسبات المحلية بروح سعودية أصيلة."
                    : "To create a distinctive advertising footprint for each client that combines creativity, quality, and speed, keeping up with local events and occasions with an authentic Saudi spirit."
                  )}
                </p>
              </div>
            </div>
      </div>

  
    </section>
  );
}
