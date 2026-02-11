import { useState } from "react";
import { useLanguage, useTranslation } from "~/context/LanguageContext";
import { useScrollReveal } from "~/hooks/useScrollReveal";

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
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

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
    <section id="contact" className="section bg-[var(--color-gray-light)] relative overflow-hidden" ref={contactRef}>
      \<div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#F4D03F 1px, transparent 1px), linear-gradient(90deg, #F4D03F 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

      <div className={`container mx-auto px-4 lg:px-8 relative z-10 transition-all duration-700 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-16">
          <span className="section-title">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {getText("contact")}
          </span>
          <h2 className="heading-lg text-[var(--color-gold)] mt-4">
            {isRTL ? "نسعد بخدمتكم" : "We're Happy to Serve You"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`bg-[var(--color-gold)] rounded-3xl p-8 shadow-lg transition-all duration-700 delay-200 ${contactVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
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
                  className="btn btn-secondary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className={`space-y-6 transition-all duration-700 delay-400 ${contactVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
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
                      {companyInfo.phone2 && <p className="text-[var(--color-gold)] font-medium" dir="ltr">{companyInfo.phone2}</p>}
                      {companyInfo.phone1 && <p className="text-[var(--color-gold)] font-medium" dir="ltr">{companyInfo.phone1}</p>}
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{background: "white"}} fill="currentColor" className="bi bi-snapchat" viewBox="0 0 16 16">
                        <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.4.4 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a1 1 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464"/>
                      </svg>
                    </a>
                  )}
                  {companyInfo.socialLinks.instagram && (
                    <a href={companyInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#E4405F]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                    </a>
                  )}
                  {companyInfo.socialLinks.twitter && (
                    <a href={companyInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-black">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                      </svg>
                    </a>
                  )}
                  {companyInfo.socialLinks.facebook && (
                    <a href={companyInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#1877F2]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                      </svg>
                    </a>
                  )}
                  {companyInfo.socialLinks.linkedin && (
                    <a href={companyInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-[#0A66C2]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: 'white'}} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                      </svg>
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
