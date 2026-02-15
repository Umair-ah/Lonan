import { useLanguage, useTranslation } from "~/context/LanguageContext";

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
  
  const hasContent = partners.length > 0 || projects.length > 0;

  if (!hasContent) {
    return (
      <section id="partners" className="section bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="section-title">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getText("successPartners")}
            </span>
            <h2 className="heading-lg text-black mt-4">{getText("proudClients")}</h2>
            <div className="mt-8 p-8 bg-[var(--color-gray-light)] rounded-2xl">
              <p className="text-[var(--color-gray-dark)]">{getText("addFromDashboard")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partners" className="section bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-gold)]">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-title">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getText("successPartners")}
          </span>
          <h2 className="heading-lg text-black mt-4">{getText("proudClients")}</h2>
          <p className="text-[var(--color-gray-dark)] mt-4 max-w-2xl mx-auto">
            {getText("partnersDescription")}
          </p>
        </div>

        {partners.length > 0 && (
          <div className="bg-[var(--color-gray-light)] rounded-3xl p-8 lg:p-12">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-6 lg:gap-8">
              {partners.map((partner) => (
                <a
                  key={partner._id}
                  href={partner.website || "#"}
                  target={partner.website ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group bg-[var(--color-black)] rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-lg hover:border-[var(--color-gold)] border-2 border-transparent transition-all duration-300"
                >
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name || "Partner"} 
                      className="max-h-16 max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-lg flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform">
                        {partner.name?.charAt(0) || "؟"}
                      </div>
                    </div>
                  )}
                </a>
              ))}
            </div>
{/* 
            <div className="mt-12 pt-8 border-t border-[var(--color-gray)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "+500", label: getText("clients") },
                  { value: "+1000", label: getText("projects") },
                  { value: "+20", label: getText("yearsExperience") },
                  { value: "100%", label: getText("satisfaction") },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl lg:text-4xl font-bold text-[var(--color-gold)]">{stat.value}</div>
                    <div className="text-[var(--color-gold)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">{getText("previousWork")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="aspect-square bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 rounded-2xl overflow-hidden group hover:from-[var(--color-gold)]/30 hover:to-[var(--color-gold)]/10 transition-all cursor-pointer relative"
                >
                  {project.images && project.images[0] ? (
                    <img 
                      src={project.images[0]} 
                      alt={t(project.title, project.titleEn)} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-[var(--color-gold)] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm text-[var(--color-gray-dark)]">{t(project.title, project.titleEn) || (isRTL ? "مشروع" : "Project")}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h4 className="font-bold">{t(project.title, project.titleEn)}</h4>
                      {project.client && <p className="text-sm opacity-80">{project.client}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
