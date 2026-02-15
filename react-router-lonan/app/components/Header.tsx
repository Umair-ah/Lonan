import { useState, useEffect } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface CompanyInfo {
  companyName?: string;
  companyNameEn?: string;
  logo?: string;
  logoLight?: string;
}

interface HeaderProps {
  companyInfo?: CompanyInfo | null;
}

export function Header({ companyInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();

  const navItems = [
    { 
      id: "home", 
      label: getText("home"), 
      href: "#home",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: "about", 
      label: getText("about"), 
      href: "#about",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: "services", 
      label: getText("services"), 
      href: "#services",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: "partners", 
      label: getText("partners"), 
      href: "#partners",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: "contact", 
      label: getText("contact"), 
      href: "#contact",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-gold)] backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="flex items-center gap-3"
          >
            {companyInfo?.logo ? (
              <img 
                src={companyInfo.logo} 
                alt={t(companyInfo.companyName, companyInfo.companyNameEn)} 
                className="w-14 h-14 object-contain"
              />
            ) : (
              <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center p-2 transition-transform hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="5" y="5" width="90" height="90" fill="none" stroke="#F5B800" strokeWidth="4" rx="8"/>
                  <rect x="15" y="15" width="35" height="35" fill="#F5B800" rx="4"/>
                  <circle cx="32" cy="60" r="12" fill="#F5B800"/>
                  <rect x="55" y="15" width="30" height="70" fill="none" stroke="#F5B800" strokeWidth="3" rx="4"/>
                  <circle cx="70" cy="45" r="8" fill="#F5B800"/>
                  <ellipse cx="70" cy="70" rx="10" ry="8" fill="none" stroke="#F5B800" strokeWidth="3"/>
                </svg>
              </div>
            )}
            <div className={`transition-colors ${isScrolled ? "text-black" : "text-black"}`}>
              <h1 className="text-xl font-bold leading-tight">
                {t(companyInfo?.companyName, companyInfo?.companyNameEn) || (isRTL ? "لونان" : "Lonan")}
              </h1>
              <p className="text-xs text-[var(--color-gold)]">
                {isRTL ? "للدعاية والإعلان" : "Advertising"}
              </p>
            </div>
          </a> */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`nav-link hover-underline ${activeSection === item.id ? "active" : ""}`}
              >
                <span className={`${activeSection === item.id ? "text-[var(--color-black)]" : "text-[var(--color-black)]"}`}>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="btn btn-primary btn-magnetic"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {getText("getQuote")}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              className="p-2 rounded-lg bg-[var(--color-black)] text-[var(--color-gold)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0)" }}
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <nav className="bg-[var(--color-gold)] rounded-2xl shadow-lg p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-colors ${
                  activeSection === item.id
                    ? "bg-[var(--color-black)] text-[var(--color-gold)] font-bold"
                    : "hover:bg-[var(--color-gray-light)] text-gray-700"
                }`}
              >
                <span className={`${activeSection === item.id ? "text-[var(--color-gold)]" : "text-[var(--color-black)]"}`}>
                  {item.icon}
                </span>
                <span className={`${activeSection === item.id ? "text-[var(--color-gold)]" : "text-[var(--color-black)]"}`}>{item.label}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="btn btn-secondary w-full mt-4"
            >
              {getText("getQuote")}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
