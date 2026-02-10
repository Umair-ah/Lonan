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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: companyInfo?.heroImage 
          ? `#F4D03F;, url(${companyInfo.heroImage}) center/cover`
          : "#F4D03F",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-black/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 border-4 border-black/20 rounded-lg animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-black/10 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 right-1/3 w-20 h-20 border-4 border-white/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid gap-12 place-items-center">
          {/* Content */}
          <div className={`text-center ${isRTL ? "lg:text-right" : "lg:text-left"} animate-fadeInRight`}>
            <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span className="text-sm font-medium text-black">{getText("since20Years")}</span>
            </div>
            
            {/* <h1 className="heading-xl text-black mb-6">
              <span className="block">
                {t(companyInfo?.companyName, companyInfo?.companyNameEn) || (isRTL ? "لونان" : "Lonan")}
              </span>
              <span className="block text-black">
                {isRTL ? "للدعاية والإعلان" : "Advertising"}
              </span>
            </h1> */}

            <img src={companyInfo?.logo} alt={t(companyInfo?.companyName, companyInfo?.companyNameEn) || "Logo"} className="w-full h-auto object-contain" />
            
            {/* <p className="text-xl lg:text-2xl text-black/80 mb-8 max-w-xl mx-auto lg:mx-0">
              {t(companyInfo?.tagline, companyInfo?.taglineEn) || getText("oneStopShop")}
            </p> */}
            
            {/* <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-3 ${isRTL ? "lg:justify-start" : "lg:justify-start"}`}>
              <button
                onClick={() => scrollToSection("services")}
                className="btn btn-secondary text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {getText("exploreServices")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="btn btn-secondary text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {getText("contactUs")}
              </button>
            </div> */}

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-black/20">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-black">+20</div>
                <div className="text-sm text-black/70">{getText("yearsExperience")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-black">+500</div>
                <div className="text-sm text-black/70">{getText("happyClients")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-black">+1000</div>
                <div className="text-sm text-black/70">{getText("completedProjects")}</div>
              </div>
            </div> */}
          </div>

          {/* Logo/Visual */}
          <div className={`flex justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} animate-fadeInLeft`}>
            <div className="relative">
              {/* <div className="w-72 h-80 lg:w-96 lg:h-[28rem] transform hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full border-4 border-[var(--color-gold)] rounded-2xl flex flex-col items-center justify-center p-6">
                  {companyInfo?.logo ? (
                    <img 
                      src={companyInfo.logo} 
                      alt={t(companyInfo.companyName, companyInfo.companyNameEn) || "Logo"} 
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <svg viewBox="0 0 120 140" className="w-full h-auto max-w-[200px]">
                      <rect x="5" y="5" width="110" height="110" fill="none" stroke="#F5B800" strokeWidth="5" rx="10"/>
                      <rect x="15" y="15" width="40" height="40" fill="#F5B800" rx="5"/>
                      <circle cx="35" cy="80" r="15" fill="#F5B800"/>
                      <rect x="65" y="15" width="40" height="90" fill="none" stroke="#F5B800" strokeWidth="4" rx="5"/>
                      <circle cx="85" cy="50" r="12" fill="#F5B800"/>
                      <ellipse cx="85" cy="85" rx="14" ry="10" fill="none" stroke="#F5B800" strokeWidth="4"/>
                      <text x="115" y="70" fill="#F5B800" fontSize="8" fontFamily="Arial" transform="rotate(90, 115, 70)" textAnchor="middle">Advertising</text>
                    </svg>
                  )}
                  
                  <p className="text-[var(--color-gold)] text-xl font-bold mt-4 text-center">
                    {isRTL ? "للدعاية والإعلان" : "Advertising"}
                  </p>
                </div>
              </div> */}
              
              {/* Decorative circles */}
              {/* <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--color-gold)] rounded-full opacity-50 blur-xl" /> */}
              {/* <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-full opacity-30 blur-xl" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center text-black/70 hover:text-black transition-colors"
        >
          <span className="text-sm mb-2">{getText("discoverMore")}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
