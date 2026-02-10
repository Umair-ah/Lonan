import { useState } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";

interface CompanyInfo {
  companyName?: string;
  phone1?: string;
  phone2?: string;
  whatsapp?: string;
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

interface ContactProps {
  companyInfo?: CompanyInfo | null;
}

export function Contact({ companyInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t, isRTL } = useLanguage();
  const { getText } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    }, 3000);
  };

  const services = isRTL 
    ? ["التسويق الإلكتروني", "اللوحات والإعلانات الخارجية", "الطباعة والتغليف", "الهدايا والدروع", "تجهيز الفعاليات", "قص الليزر والأكريليك", getText("other")]
    : ["Digital Marketing", "Outdoor Signage", "Printing & Packaging", "Trophies & Gifts", "Events", "Laser Cutting", getText("other")];

  const whatsappNumber = companyInfo?.whatsapp || "966570157777";
  const addressText = t(companyInfo?.address, companyInfo?.addressEn);

  return (
    <section id="contact" className="section bg-[var(--color-gray-light)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5B800' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-title">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {getText("contact")}
          </span>
          <h2 className="heading-lg text-black mt-4">
            {isRTL ? "نسعد بخدمتكم" : "We're Happy to Serve You"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[var(--color-gold)] rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-6">{getText("sendMessage")}</h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-green-600 mb-2">{getText("messageSent")}</h4>
                <p className="text-[var(--color-gray-dark)]">{getText("willContactYou")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">{getText("fullName")} *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder={getText("enterName")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">{getText("phone")} *</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">{getText("email")}</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">{getText("serviceRequired")} *</label>
                  <select
                    required
                    className="form-input"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">{getText("selectService")}</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">{getText("requestDetails")}</label>
                  <textarea
                    rows={4}
                    className="form-input resize-none"
                    placeholder={getText("writeDetails")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {getText("sending")}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {getText("sendRequest")}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[var(--color-gold)] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-black mb-6">{getText("contactInfo")}</h3>
              
              <div className="space-y-4">
                {addressText && (
                  <div className="flex items-start gap-4 bg-[var(--color-black)] rounded-2xl p-4">
                    <div className="w-12 h-12 bg-[var(--color-gold)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[var(--color-black)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-gold)]">{getText("location")}</h4>
                      <p className="text-[var(--color-gold)] whitespace-pre-line">{addressText}</p>
                    </div>
                  </div>
                )}

                {(companyInfo?.phone1 || companyInfo?.phone2) && (
                  <div className="flex items-start gap-4 bg-[var(--color-black)] rounded-2xl p-4">
                    <div className="w-12 h-12 bg-[var(--color-gold)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[var(--color-black)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-gold)]">{getText("phone")}</h4>
                      {companyInfo.phone1 && <p className="text-[var(--color-gold)] font-medium" dir="ltr">{companyInfo.phone1}</p>}
                      {companyInfo.phone2 && <p className="text-[var(--color-gold)] font-medium" dir="ltr">{companyInfo.phone2}</p>}
                    </div>
                  </div>
                )}

                {(companyInfo?.email || companyInfo?.website) && (
                  <div className="flex items-start gap-4 bg-[var(--color-black)] rounded-2xl p-4">
                    <div className="w-12 h-12 bg-[var(--color-gold)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[var(--color-black)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-gold)]">{getText("emailWebsite")}</h4>
                      {companyInfo.email && <p className="text-[var(--color-gold)]">{companyInfo.email}</p>}
                      {companyInfo.website && <p className="text-[var(--color-gold)]">{companyInfo.website}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-3xl p-6 hover:bg-[#128C7E] transition-colors"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">{getText("whatsappMessage")}</h4>
                <p className="text-white/80">{getText("quickResponse")}</p>
              </div>
              <svg className={`w-6 h-6 ${isRTL ? "mr-auto rotate-180" : "ml-auto"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>

            {companyInfo?.socialLinks && (
              <div className="bg-[var(--color-gold)] rounded-3xl p-6">
                <h4 className="font-bold text-black mb-4">{getText("followUs")}</h4>
                <div className="flex gap-3">
                  {companyInfo.socialLinks.snapchat && (
                    <a href={companyInfo.socialLinks.snapchat} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#FFFC00]">
                      <span className="text-black font-bold">S</span>
                    </a>
                  )}
                  {companyInfo.socialLinks.instagram && (
                    <a href={companyInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#E4405F]">
                      <span className="text-white font-bold">I</span>
                    </a>
                  )}
                  {companyInfo.socialLinks.twitter && (
                    <a href={companyInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-black">
                      <span className="text-white font-bold">X</span>
                    </a>
                  )}
                  {companyInfo.socialLinks.facebook && (
                    <a href={companyInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#1877F2]">
                      <span className="text-white font-bold">F</span>
                    </a>
                  )}
                  {companyInfo.socialLinks.linkedin && (
                    <a href={companyInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#0A66C2]">
                      <span className="text-white font-bold">L</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
