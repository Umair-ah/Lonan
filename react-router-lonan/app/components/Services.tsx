import type { ReactNode } from "react";
import { Link } from "react-router";
import { useLanguage, useTranslation } from "~/context/LanguageContext";
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface ServiceFeature {
  text?: string;
  textEn?: string;
}

interface Service {
  _id: string;
  title?: string;
  titleEn?: string;
  slug?: string;
  description?: string;
  descriptionEn?: string;
  icon?: string;
  image?: string;
  gallery?: string[];
  features?: ServiceFeature[];
}

interface ServicesProps {
  services?: Service[];
}

const iconMap: Record<string, ReactNode> = {
  "digital-marketing": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
      <path d="M21 21l-4.35-4.35"/>
      <path d="M8 13l2-2 1.5 1.5 2.5-2.5"/>
    </svg>
  ),
  "outdoor-signage": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="12" rx="2" ry="2"/>
      <path d="M8 15v6"/>
      <path d="M16 15v6"/>
      <path d="M6 3V1"/>
      <path d="M12 3V1"/>
      <path d="M18 3V1"/>
    </svg>
  ),
  "printing": (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  "trophies-gifts": (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  "events": (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "laser-cutting": (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "default": (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
};

export function Services({ services = [] }: ServicesProps) {
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  if (services.length === 0) {
    return (
      <section id="services" className="section bg-[var(--color-gray-light)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="section-title">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              {getText("services")}
            </span>
            <h2 className="heading-lg text-black mt-4">{getText("integratedSolutions")}</h2>
            <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg">
              <p className="text-[var(--color-gray-dark)]">{getText("addFromDashboard")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section bg-[var(--color-gray-light)] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-3xl -z-10" />

      <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#F4D03F 1px, transparent 1px), linear-gradient(90deg, #F4D03F 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
      
      <div className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* <div className="text-center mb-16">
          <span className="section-title">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            {getText("services")}
          </span>
          <h2 className="heading-lg text-black mt-4">{getText("integratedSolutions")}</h2>
          <p className="text-[var(--color-gray-dark)] mt-4 max-w-2xl mx-auto">
            {getText("serviceDescription")}
          </p>
        </div> */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={service._id}
              to={service.slug ? `/services/${service.slug}` : "/#services"}
              className={`card group border-2 border-transparent hover:border-[var(--color-gold)] card-hover-lift image-shine transition-all duration-700 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.15 + 0.2}s` }}
            >
              <div className="w-full rounded-2xl bg-[var(--color-gold)] text-black flex items-center justify-center h-20 mb-4 overflow-hidden transition-colors duration-300 group-hover:text-[var(--color-gold)]">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={t(service.title, service.titleEn)}
                      className="w-24 h-24 object-contain"
                    />
                  ) : (
                    iconMap[service.icon || "default"] || iconMap["default"]
                  )}
                </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold mb-2 text-black line-clamp-1">
                  {t(service.title, service.titleEn) || (isRTL ? "خدمة" : "Service")}
                </h3>
                <p className="text-[var(--color-gray-dark)] mb-4 line-clamp-3">
                  {t(service.description, service.descriptionEn)}
                </p>
              </div>

              <div className="mt-auto">
                <span className="btn btn-secondary w-full group-hover:bg-[var(--color-black)] group-hover:text-black group-hover:border-[var(--color-black)] inline-flex items-center justify-center gap-2">
                  {getText("learnMore")}
                  <svg
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Target Audience */}
        {/* <div className="mt-20 bg-[var(--color-gold)] rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-black text-center mb-8">{getText("targetAudience")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🏪", title: getText("businessOwners"), desc: getText("businessDesc") },
              { icon: "🎓", title: getText("educational"), desc: getText("educationalDesc") },
              { icon: "🏢", title: getText("companies"), desc: getText("companiesDesc") },
              { icon: "🎉", title: getText("individuals"), desc: getText("individualsDesc") },
            ].map((item, index) => (
              <div key={index} className="bg-[var(--color-gold)]/90 border-2 border-[var(--color-black)] backdrop-blur rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h4 className="font-bold text-black mb-1">{item.title}</h4>
                <p className="text-sm text-[var(--color-gray-dark)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div className="relative h-1 mt-9 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent opacity-40" />
    </section>
  );
}
