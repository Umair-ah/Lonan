import { useState, useEffect, useRef } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface Partner {
  _id: string;
  name?: string;
  logo?: string;
  website?: string;
}

interface Project {
  _id: string;
  title?: string;
  titleEn?: string;
  description?: string;
  images?: string[];
  client?: string;
}

interface PartnersProps {
  partners?: Partner[];
  projects?: Project[];
}

export function Partners({ partners = [], projects = [] }: PartnersProps) {
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  const hasContent = partners.length > 0 || projects.length > 0;

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (!partners.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = isRTL 
          ? (prev === 0 ? partners.length - 1 : prev - 1)
          : (prev === partners.length - 1 ? 0 : prev + 1);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length, isRTL, isPaused]);

  // Scroll to current index and center it
  useEffect(() => {
    if (!scrollContainerRef.current || !partners.length) return;

    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[data-partner-index]');
    
    if (cards[currentIndex]) {
      const card = cards[currentIndex] as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const cardLeft = cardRect.left - containerRect.left + scrollLeft;
      const cardWidth = cardRect.width;
      const containerWidth = containerRect.width;
      const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, partners.length, isRTL]);

  // Handle scroll to update current index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !partners.length) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsPaused(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cards = container.querySelectorAll('[data-partner-index]');
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardRect = (card as HTMLElement).getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setCurrentIndex((prev) => prev !== closestIndex ? closestIndex : prev);
        setTimeout(() => setIsPaused(false), 4000);
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [partners.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        handleNext();
      } else {
        // Swipe right - previous
        handlePrevious();
      }
    }
  };

  const handlePrevious = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => 
      isRTL 
        ? (prev === partners.length - 1 ? 0 : prev + 1)
        : (prev === 0 ? partners.length - 1 : prev - 1)
    );
    setTimeout(() => setIsPaused(false), 4000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => 
      isRTL 
        ? (prev === 0 ? partners.length - 1 : prev - 1)
        : (prev === partners.length - 1 ? 0 : prev + 1)
    );
    setTimeout(() => setIsPaused(false), 4000);
  };

  if (!hasContent) {
    return (
      <section id="partners" className="section bg-[var(--color-gray-light)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="section-title">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getText("successPartners")}
            </span>
            <h2 className="heading-lg text-black mt-4">{getText("proudClients")}</h2>
            <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg">
              <p className="text-[var(--color-gray-dark)]">{getText("addFromDashboard")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partners" className="section bg-[var(--color-gray-light)] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-3xl -z-10" />

      <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#F4D03F 1px, transparent 1px), linear-gradient(90deg, #F4D03F 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
      
      <div className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {partners.length > 0 && (
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
                isRTL ? 'right-4' : 'left-4'
              }`}
              aria-label={isRTL ? "Next" : "Previous"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
                isRTL ? 'left-4' : 'right-4'
              }`}
              aria-label={isRTL ? "Previous" : "Next"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex items-center justify-start gap-6 overflow-x-auto py-8 px-8 scrollbar-hide"
              style={{ 
                direction: isRTL ? 'rtl' : 'ltr',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                justifyContent: 'center'
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Spacer for centering */}
              <div className="flex-shrink-0" style={{ width: 'calc(50% - 160px)' }} />
              
              {partners.map((partner, index) => {
                const isCenter = currentIndex === index;
                
                return (
                  <a
                    key={partner._id}
                    data-partner-index={index}
                    href={partner.website || "#"}
                    target={partner.website ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`card group cursor-pointer hover:border-[var(--color-gold)] border-2 border-transparent card-hover-lift image-shine flex-shrink-0 ${
                      sectionVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ 
                      scrollSnapAlign: 'center',
                      width: isCenter ? '320px' : '280px',
                      minWidth: isCenter ? '320px' : '280px',
                      transform: isCenter ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.3s ease, width 0.3s ease, min-width 0.3s ease',
                      zIndex: isCenter ? 10 : 1,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full min-h-[280px]">
                      <div className="service-icon group-hover:bg-black group-hover:text-[var(--color-gold)] flex items-center justify-center bg-transparent w-full h-56 mb-4">
                        {partner.logo ? (
                          <img 
                            src={partner.logo} 
                            alt={partner.name || "Partner"} 
                            className="max-w-full max-h-full object-contain mx-auto"
                            style={{ 
                              mixBlendMode: 'multiply',
                              filter: 'contrast(1.1) brightness(1.05)'
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-lg flex items-center justify-center text-black font-bold text-3xl group-hover:scale-110 transition-transform">
                            {partner.name?.charAt(0) || "؟"}
                          </div>
                        )}
                      </div>

                      {partner.website && (
                        <div className="mt-auto w-full">
                          <div className="btn btn-secondary w-full group-hover:bg-[var(--color-black)] group-hover:text-black group-hover:border-[var(--color-black)] flex items-center justify-center gap-2">
                            {isRTL ? "زيارة الموقع" : "Visit Website"}
                            <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </a>
                );
              })}
              
              {/* Spacer for centering */}
              <div className="flex-shrink-0" style={{ width: 'calc(50% - 160px)' }} />
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-black mb-2">{getText("previousWork")}</h3>
              <p className="text-[var(--color-gray-dark)]">{isRTL ? "مشاريعنا السابقة" : "Our Previous Projects"}</p>
            </div>
            <div className="services-grid">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className={`card group cursor-pointer hover:border-[var(--color-gold)] border-2 border-transparent card-hover-lift image-shine transition-all duration-700 overflow-hidden relative ${
                    sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(partners.length + index) * 0.15 + 0.2}s` }}
                >
                  {project.images && project.images[0] ? (
                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-transparent">
                      <img 
                        src={project.images[0]} 
                        alt={t(project.title, project.titleEn)} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ 
                          mixBlendMode: 'multiply',
                          filter: 'contrast(1.1) brightness(1.05)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="h-48 mb-4 bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-[var(--color-gold)] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2 text-black">{t(project.title, project.titleEn) || (isRTL ? "مشروع" : "Project")}</h3>
                  {project.client && (
                    <p className="text-sm text-[var(--color-gold)] mb-3">{project.client}</p>
                  )}
                  {project.description && (
                    <p className="text-[var(--color-gray-dark)] mb-4 line-clamp-2">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative h-1 mt-9 bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent opacity-40" />
    </section>
  );
}
