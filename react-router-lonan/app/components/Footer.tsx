import { useLanguage, useTranslation } from "~/context/LanguageContext";

interface CompanyInfo {
  companyName?: string;
  companyNameEn?: string;
  about?: string;
  aboutEn?: string;
  logo?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  website?: string;
  address?: string;
  addressEn?: string;
  socialLinks?: {
    snapchat?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
  };
}

interface FooterProps {
  companyInfo?: CompanyInfo | null;
}

export function Footer({ companyInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();

  const companyName = t(companyInfo?.companyName, companyInfo?.companyNameEn) || (isRTL ? "لونان" : "Lonan");
  const aboutText = t(companyInfo?.about, companyInfo?.aboutEn);
  const addressText = t(companyInfo?.address, companyInfo?.addressEn);

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              {companyInfo?.logo ? (
                <img 
                  src={companyInfo.logo} 
                  alt={companyName} 
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 border-2 border-[var(--color-gold)] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10">
                    <rect x="5" y="5" width="90" height="90" fill="none" stroke="#F5B800" strokeWidth="4" rx="8"/>
                    <rect x="15" y="15" width="35" height="35" fill="#F5B800" rx="4"/>
                    <circle cx="32" cy="60" r="12" fill="#F5B800"/>
                    <rect x="55" y="15" width="30" height="70" fill="none" stroke="#F5B800" strokeWidth="3" rx="4"/>
                    <circle cx="70" cy="45" r="8" fill="#F5B800"/>
                    <ellipse cx="70" cy="70" rx="10" ry="8" fill="none" stroke="#F5B800" strokeWidth="3"/>
                  </svg>
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">{companyName}</h3>
                <p className="text-[var(--color-gold)]">{isRTL ? "للدعاية والإعلان" : "Advertising"}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {aboutText 
                ? aboutText.substring(0, 150) + (aboutText.length > 150 ? "..." : "")
                : (isRTL 
                    ? "شركة سعودية متكاملة متخصصة في تقديم حلول إبداعية وواقعية تجمع بين الدعاية والإعلان والتسويق الإلكتروني منذ أكثر من 20 عاماً."
                    : "A comprehensive Saudi company specializing in creative and realistic solutions combining advertising and digital marketing for over 20 years."
                  )
              }
            </p>
            {companyInfo?.socialLinks && (
              <div className="flex gap-3">
                {companyInfo.socialLinks.snapchat && (
                  <a href={companyInfo.socialLinks.snapchat} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#FFFC00]">
                    <span className="font-bold text-sm">S</span>
                  </a>
                )}
                {companyInfo.socialLinks.instagram && (
                  <a href={companyInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#E4405F]">
                    <span className="font-bold text-sm">I</span>
                  </a>
                )}
                {companyInfo.socialLinks.twitter && (
                  <a href={companyInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-white/20">
                    <span className="font-bold text-sm">X</span>
                  </a>
                )}
                {companyInfo.socialLinks.facebook && (
                  <a href={companyInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#1877F2]">
                    <span className="font-bold text-sm">F</span>
                  </a>
                )}
                {companyInfo.socialLinks.linkedin && (
                  <a href={companyInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#0A66C2]">
                    <span className="font-bold text-sm">L</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[var(--color-gold)]">{getText("quickLinks")}</h4>
            <ul className="space-y-3">
              {[
                { label: getText("home"), href: "#home" },
                { label: getText("about"), href: "#about" },
                { label: getText("services"), href: "#services" },
                { label: getText("partners"), href: "#partners" },
                { label: getText("contact"), href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--color-gold)] transition-colors inline-flex items-center gap-2"
                  >
                    <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[var(--color-gold)]">{getText("contact")}</h4>
            <ul className="space-y-4">
              {addressText && (
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-gold)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400 whitespace-pre-line">{addressText}</span>
                </li>
              )}
              {(companyInfo?.phone1 || companyInfo?.phone2) && (
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400" dir="ltr">
                    {[companyInfo.phone1, companyInfo.phone2].filter(Boolean).join(" - ")}
                  </span>
                </li>
              )}
              {companyInfo?.email && (
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">{companyInfo.email}</span>
                </li>
              )}
              {companyInfo?.website && (
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-gray-400">{companyInfo.website}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} {companyName}. {getText("allRightsReserved")}
            </p>
            <p className="text-gray-500 text-sm">
              {getText("madeWith")} <span className="text-red-500">❤</span> {getText("inSaudi")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
