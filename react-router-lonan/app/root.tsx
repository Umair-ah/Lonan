import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { LanguageProvider } from "./context/LanguageContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Cairo:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="لونان للتسويق والدعاية والإعلان - شركة سعودية متكاملة متخصصة في تقديم حلول إبداعية وواقعية تجمع بين الدعاية والإعلان والتسويق الإلكتروني" />
        <meta name="keywords" content="لونان, دعاية, إعلان, تسويق, القصيم, بريدة, السعودية, تصميم, لوحات, طباعة" />
        <Meta />
        <Links />
      </head>
      <body>
        <LanguageProvider>
        {children}
        </LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "عذراً!";
  let details = "حدث خطأ غير متوقع.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "خطأ";
    details =
      error.status === 404
        ? "الصفحة المطلوبة غير موجودة."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-gray-light)]">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-[var(--color-gold)] mb-4">{message}</h1>
        <p className="text-xl text-[var(--color-gray-dark)] mb-8">{details}</p>
        <a href="/" className="btn btn-primary">
          العودة للرئيسية
        </a>
      {stack && (
          <pre className="mt-8 p-4 bg-[var(--color-black)] text-white rounded-lg overflow-x-auto text-left text-sm">
          <code>{stack}</code>
        </pre>
      )}
      </div>
    </main>
  );
}
