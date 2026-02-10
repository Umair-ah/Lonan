import { Link } from "react-router";
import type { Route } from "./+types/service";
import { Header, Footer, WhatsAppButton } from "~/components";

export function meta({ params }: Route.MetaArgs): Route.MetaFunction {
  return [
    { title: `${params.slug} | لونان للدعاية والإعلان` },
    {
      name: "description",
      content: "خدمات لونان للدعاية والإعلان - حلول متكاملة لنجاح أعمالك",
    },
  ];
}

export default function ServicePage({ params }: Route.ComponentProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:underline mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة للخدمات
          </Link>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h1 className="heading-lg text-black mb-6">
              {decodeURIComponent(params.slug || "")}
            </h1>
            <p className="text-[var(--color-gray-dark)]">
              صفحة الخدمة قيد الإنشاء. يمكنك التواصل معنا للحصول على مزيد من المعلومات.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/966570157777"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                تواصل معنا عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

