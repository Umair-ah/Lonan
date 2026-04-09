import { useEffect, useState, type ReactNode } from "react";
import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { client } from "~/sanity/client";
import { Header, Footer, WhatsAppButton } from "~/components";
import { useLanguage } from "~/context/LanguageContext";

type CompanyInfo = {
  companyName?: string;
  companyNameEn?: string;
  tagline?: string;
  taglineEn?: string;
  logo?: string;
  phone1?: string;
  phone2?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  address?: string;
  addressEn?: string;
};

type ServiceFeature = { text?: string; textEn?: string };

type Service = {
  _id: string;
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  gallery?: string[];
  features?: ServiceFeature[];
};

const COMPANY_INFO_QUERY = `*[_type == "companyInfo"][0] {
  companyName,
  companyNameEn,
  tagline,
  taglineEn,
  "logo": logo.asset->url,
  phone1,
  phone2,
  whatsapp,
  email,
  website,
  address,
  addressEn
}`;

const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  titleEn,
  description,
  descriptionEn,
  "gallery": gallery[].asset->url,
  "features": features[]{text, textEn}
}`;

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  const [companyInfo, service] = await Promise.all([
    client.fetch<CompanyInfo>(COMPANY_INFO_QUERY),
    client.fetch<Service | null>(SERVICE_BY_SLUG_QUERY, { slug }),
  ]);

  if (!service) {
    throw new Response("Not Found", { status: 404 });
  }

  return { companyInfo, service, slug };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.service?.title || data?.service?.titleEn || data?.slug || "Service";
  return [
    { title: `${title} | لونان للدعاية والإعلان` },
    {
      name: "description",
      content:
        data?.service?.description ||
        data?.service?.descriptionEn ||
        "خدمات لونان للدعاية والإعلان - حلول متكاملة لنجاح أعمالك",
    },
  ];
};

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[var(--color-gold)]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] tracking-widest text-white/60 font-bold">{label}</div>
        <div className="text-sm text-white break-words">{value}</div>
      </div>
    </div>
  );
}

export default function ServiceSlugPage() {
  const { companyInfo, service } = useLoaderData<typeof loader>();
  const { t, isRTL } = useLanguage();

  const title = t(service.title, service.titleEn);
  const subtitle = isRTL ? service.titleEn : service.title;
  const description = t(service.description, service.descriptionEn);

  const gallery = (service.gallery || []).filter(Boolean);
  const heroImage = gallery[0];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
        return;
      }
      if (!gallery.length) return;
      if (event.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, gallery.length]);

  return (
    <>
      <Header companyInfo={companyInfo} />
      <main className="min-h-screen pt-24 pb-16 bg-[var(--color-gray-light)]">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:underline mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isRTL ? "العودة للخدمات" : "Back to services"}
          </Link>

          {/* Flyer-like frame */}
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/30 shadow-2xl">
            {/* Top title band (like the orange band in the screenshot) */}
            <div className="bg-[var(--color-gold)] text-black px-6 py-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold truncate">{title || (isRTL ? "خدمة" : "Service")}</h1>
                {subtitle ? <p className="text-sm text-black/70 truncate">{subtitle}</p> : null}
              </div>
              <div className="hidden sm:flex items-center gap-3">
                {companyInfo?.logo ? (
                  <img src={companyInfo.logo} alt={companyInfo.companyNameEn || "Lonan"} className="h-12 w-12 object-contain bg-black/10 rounded-xl p-2" />
                ) : null}
                <div className="text-right">
                  <div className="font-extrabold leading-tight">{companyInfo?.companyName || "لونان"}</div>
                  <div className="text-xs text-black/70">{companyInfo?.companyNameEn || "Lonan Advertising"}</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_360px]">
              {/* Main visuals */}
              <div className="p-6">
                <div className="grid gap-4">
                  {/* Gallery */}
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[var(--color-gold)] font-extrabold">
                        {isRTL ? "معرض الصور" : "Gallery"}
                      </h2>
                      {gallery.length > 0 ? (
                        <span className="text-xs text-white/60">
                          {gallery.length} {isRTL ? "صورة" : "photos"}
                        </span>
                      ) : null}
                    </div>

                    {heroImage ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex(0)}
                          className="w-full rounded-2xl overflow-hidden border border-white/10 mb-4 group"
                        >
                          <img
                            src={heroImage}
                            alt={title}
                            className="w-full h-[260px] sm:h-[380px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </button>

                        {gallery.length > 1 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {gallery.slice(1).map((image, index) => (
                              <button
                                type="button"
                                key={`${image}-${index}`}
                                onClick={() => setActiveImageIndex(index + 1)}
                                className="rounded-xl overflow-hidden border border-white/10 bg-black/30 group"
                              >
                                <img
                                  src={image}
                                  alt={`${title} ${index + 2}`}
                                  className="w-full h-28 sm:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <div className="w-full h-[260px] sm:h-[360px] bg-black/20 rounded-2xl flex items-center justify-center text-white/60">
                        {isRTL ? "أضف صور المعرض لهذه الخدمة" : "Add gallery images for this service"}
                      </div>
                    )}
                  </div>

                  {/* Text block */}
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-white/85 leading-relaxed">{description}</p>
                  </div>

                  {/* Features */}
                  {service.features && service.features.length > 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <h2 className="text-[var(--color-gold)] font-extrabold mb-4">
                        {isRTL ? "ماذا نقدم" : "What we offer"}
                      </h2>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                            <span className="text-white/85">{t(f.text, f.textEn)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Right sidebar (dark contact panel like the screenshot) */}
              <aside className="bg-[#1f1f1f] border-t lg:border-t-0 lg:border-r border-white/10 p-6">
                <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-black/30 p-5">
                  <div className="flex items-center gap-3">
                    {companyInfo?.logo ? (
                      <img
                        src={companyInfo.logo}
                        alt={companyInfo.companyNameEn || "Lonan"}
                        className="h-14 w-14 object-contain bg-black/20 rounded-2xl p-2"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-2xl bg-black/20 border border-white/10" />
                    )}
                    <div className="min-w-0">
                      <div className="text-white font-extrabold truncate">{companyInfo?.companyName || "لونان"}</div>
                      <div className="text-white/60 text-sm truncate">
                        {companyInfo?.companyNameEn || "Lonan Advertising Company"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="text-[var(--color-gold)] font-extrabold">
                      {isRTL ? "تواصل معنا" : "Contact"}
                    </div>

                    <ContactRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                      label={isRTL ? "العنوان" : "ADDRESS"}
                      value={t(companyInfo?.address, companyInfo?.addressEn)}
                    />

                    <ContactRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m0 4v12m0 0l-3-3m3 3l3-3" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h6m-3-3v6" />
                        </svg>
                      }
                      label={isRTL ? "الموقع" : "WEB"}
                      value={companyInfo?.website}
                    />

                    <ContactRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v10a2 2 0 002 2h14a2 2 0 002-2V8" />
                        </svg>
                      }
                      label={isRTL ? "البريد" : "EMAIL"}
                      value={companyInfo?.email}
                    />

                    <ContactRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      }
                      label={isRTL ? "الهاتف" : "PHONE"}
                      value={[companyInfo?.phone1, companyInfo?.phone2].filter(Boolean).join(" / ")}
                    />
                  </div>

                  <div className="mt-6">
                    <a
                      href={`https://wa.me/${(companyInfo?.whatsapp || "966570157777").replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-4 px-5 rounded-2xl transition-all"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                        <path d="M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                      </svg>
                      {isRTL ? "تواصل واتساب" : "WhatsApp"}
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer companyInfo={companyInfo} />
      <WhatsAppButton whatsapp={companyInfo?.whatsapp} />

      {/* Fullscreen image preview */}
      {activeImageIndex !== null && gallery[activeImageIndex] ? (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImageIndex((prev) =>
                    prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
                  );
                }}
                className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImageIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % gallery.length
                  );
                }}
                className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : null}

          <div className="max-w-6xl w-full" onClick={(event) => event.stopPropagation()}>
            <img
              src={gallery[activeImageIndex]}
              alt={`${title} ${activeImageIndex + 1}`}
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
            <div className="mt-3 text-center text-white/70 text-sm">
              {activeImageIndex + 1} / {gallery.length}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

