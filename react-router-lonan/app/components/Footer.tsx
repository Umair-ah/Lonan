import { useLanguage, useTranslation } from "~/context/LanguageContext";
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface CompanyInfo {
  companyName?: string;
  companyNameEn?: string;
  about?: string;
  aboutEn?: string;
  logo?: string;
  logoLight?: string;
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
  const { ref: footerRef, isVisible: footerVisible } = useScrollReveal();

  const companyName = t(companyInfo?.companyName, companyInfo?.companyNameEn) || (isRTL ? "لونان" : "Lonan");
  const aboutText = t(companyInfo?.about, companyInfo?.aboutEn);
  const addressText = t(companyInfo?.address, companyInfo?.addressEn);

  return (
    <footer className="bg-black text-white relative overflow-hidden" ref={footerRef}>
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      
      <div className={`container mx-auto px-4 lg:px-8 py-12 transition-all duration-700 ${footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              {companyInfo?.logo ? (
                <img 
                  src={companyInfo.logoLight} 
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
              {/* <div>
                <h3 className="text-2xl font-bold">{companyName}</h3>
                <p className="text-[var(--color-gold)]">{isRTL ? "للدعاية والإعلان" : "Advertising"}</p>
              </div> */}
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-snapchat" viewBox="0 0 16 16">
                        <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.4.4 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a1 1 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464"/>
                      </svg>

                  </a>
                )}
                {companyInfo.socialLinks.instagram && (
                  <a href={companyInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#E4405F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                  </a>
                )}
                {companyInfo.socialLinks.twitter && (
                  <a href={companyInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                      </svg>
                  </a>
                )}
                {companyInfo.socialLinks.facebook && (
                  <a href={companyInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#1877F2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                      </svg>
                  </a>
                )}
                {companyInfo.socialLinks.linkedin && (
                  <a href={companyInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-[#0A66C2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                      </svg>
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
                // { label: getText("partners"), href: "#partners" },
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
