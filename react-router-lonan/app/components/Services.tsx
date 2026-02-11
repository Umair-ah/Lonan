import { useState } from "react";
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

const iconMap: Record<string, React.ReactNode> = {
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  // Reset active image when service changes
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setActiveImageIndex(0);
  };

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

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service._id}
              className={`card group cursor-pointer hover:border-[var(--color-gold)] border-2 border-transparent card-hover-lift image-shine transition-all duration-700 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.15 + 0.2}s` }}
              onClick={() => handleSelectService(service)}
            >
              <div className="service-icon group-hover:bg-black group-hover:text-[var(--color-gold)]">
                {service.image ? (
                  <img src={service.image} alt={t(service.title, service.titleEn)} className="w-18 h-18 object-contain" />
                ) : (
                  iconMap[service.icon || "default"] || iconMap["default"]
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 text-black">{t(service.title, service.titleEn) || (isRTL ? "خدمة" : "Service")}</h3>
              <p className="text-sm text-[var(--color-gold)] mb-3">{isRTL ? service.titleEn : service.title}</p>
              <p className="text-[var(--color-gray-dark)] mb-4">{t(service.description, service.descriptionEn)}</p>

              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-gray-dark)]">
                      <svg className="w-4 h-4 text-[var(--color-gold)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="line-clamp-1">{t(feature.text, feature.textEn)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button className="btn btn-secondary w-full group-hover:bg-[var(--color-black)] group-hover:text-black group-hover:border-[var(--color-black)]">
                {getText("learnMore")}
                <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
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

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn shadow-2xl border border-[var(--color-gold)]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-gold)] via-[#e6c555] to-[var(--color-gold)] p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-[var(--color-gold)] shadow-lg">
                  {selectedService.image ? (
                    <img src={selectedService.image} alt={t(selectedService.title, selectedService.titleEn)} className="w-10 h-10 object-contain" />
                  ) : (
                    iconMap[selectedService.icon || "default"] || iconMap["default"]
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">{t(selectedService.title, selectedService.titleEn)}</h3>
                  <p className="text-sm text-black/60 font-medium">{isRTL ? selectedService.titleEn : selectedService.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-all hover:scale-110"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Gallery Section */}
            {selectedService.gallery && selectedService.gallery.length > 0 && (
              <div className="p-6 bg-black/40">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden mb-4 group">
                  <img
                    src={selectedService.gallery[activeImageIndex]}
                    alt={`${t(selectedService.title, selectedService.titleEn)} - ${activeImageIndex + 1}`}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{height: "35rem"}}
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Navigation Arrows */}
                  {selectedService.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedService.gallery!.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[var(--color-gold)] hover:text-black transition-all hover:scale-110"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev === selectedService.gallery!.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[var(--color-gold)] hover:text-black transition-all hover:scale-110"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image counter badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {activeImageIndex + 1} / {selectedService.gallery.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {selectedService.gallery.length > 1 && (
                  <div className="flex gap-3 justify-center">
                    {selectedService.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                          activeImageIndex === idx
                            ? "ring-3 ring-[var(--color-gold)] scale-105 shadow-lg shadow-[var(--color-gold)]/30"
                            : "opacity-60 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${t(selectedService.title, selectedService.titleEn)} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {activeImageIndex === idx && (
                          <div className="absolute inset-0 border-2 border-[var(--color-gold)] rounded-xl" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="p-8">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t(selectedService.description, selectedService.descriptionEn)}</p>
              
              {selectedService.features && selectedService.features.length > 0 && (
                <>
                  <h4 className="font-bold text-[var(--color-gold)] mb-6 text-xl flex items-center gap-3">
                    <span className="w-8 h-1 bg-[var(--color-gold)] rounded-full"></span>
                    {getText("whatWeOffer")}
                  </h4>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {selectedService.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-[var(--color-gold)]/50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-[var(--color-gold)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-200">{t(feature.text, feature.textEn)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/966570157777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-[#25D366]/30"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {getText("whatsappContact")}
                </a>
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-white/20 hover:border-white/40"
                >
                  {getText("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
