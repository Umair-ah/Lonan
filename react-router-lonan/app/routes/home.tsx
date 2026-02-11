import { useState } from "react";
import type { Route } from "./+types/home";
import { client } from "~/sanity/client";
import {
  Header,
  Hero,
  About,
  Services,
  Partners,
  Contact,
  Footer,
  WhatsAppButton,
  LoadingScreen,
} from "~/components";

// GROQ Queries
const COMPANY_INFO_QUERY = `*[_type == "companyInfo"][0] {
  companyName,
  companyNameEn,
  tagline,
  taglineEn,
  about,
  aboutEn,
  vision,
  visionEn,
  mission,
  missionEn,
  "logo": logo.asset->url,
  "logoLight": logoLight.asset->url,
  "heroImage": heroImage.asset->url,
  phone1,
  phone2,
  whatsapp,
  email,
  website,
  address,
  addressEn,
  socialLinks
}`;

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  titleEn,
  "slug": slug.current,
  description,
  descriptionEn,
  icon,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  "features": features[]{text, textEn}
}`;

const PARTNERS_QUERY = `*[_type == "partner"] | order(order asc) {
  _id,
  name,
  "logo": logo.asset->url,
  website
}`;

const PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc)[0...8] {
  _id,
  title,
  titleEn,
  description,
  "images": images[].asset->url,
  client
}`;

const TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...6] {
  _id,
  clientName,
  company,
  quote,
  quoteEn,
  "avatar": avatar.asset->url,
  rating
}`;

export async function loader() {
  const [companyInfo, services, partners, projects, testimonials] = await Promise.all([
    client.fetch(COMPANY_INFO_QUERY),
    client.fetch(SERVICES_QUERY),
    client.fetch(PARTNERS_QUERY),
    client.fetch(PROJECTS_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
  ]);

  return {
    companyInfo,
    services,
    partners,
    projects,
    testimonials,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const companyInfo = data?.companyInfo;
  return [
    { 
      title: companyInfo?.companyName 
        ? `${companyInfo.companyName} | ${companyInfo.companyNameEn || "Lonan Advertising"}` 
        : "لونان للدعاية والإعلان | Lonan Advertising" 
    },
    {
      name: "description",
      content: companyInfo?.about || 
        "لونان للتسويق والدعاية والإعلان - شركة سعودية متكاملة متخصصة في تقديم حلول إبداعية وواقعية تجمع بين الدعاية والإعلان والتسويق الإلكتروني. بريدة - القصيم",
    },
    {
      name: "keywords",
      content: "لونان, دعاية, إعلان, تسويق, القصيم, بريدة, السعودية, تصميم, لوحات, طباعة, هوية بصرية, سوشيال ميديا",
    },
    { 
      property: "og:title", 
      content: companyInfo?.companyName 
        ? `${companyInfo.companyName} | ${companyInfo.companyNameEn || "Lonan Advertising"}`
        : "لونان للدعاية والإعلان | Lonan Advertising" 
    },
    {
      property: "og:description",
      content: companyInfo?.tagline || "شركة سعودية متكاملة متخصصة في تقديم حلول إبداعية للدعاية والإعلان والتسويق الإلكتروني",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "ar_SA" },
  ];
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { companyInfo, services, partners, projects, testimonials } = loaderData;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} companyInfo={companyInfo} services={services} />
      )}
      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Header companyInfo={companyInfo} />
        <main>
          <Hero companyInfo={companyInfo} />
          <About companyInfo={companyInfo} />
          <Services services={services} />
          {/* <Partners partners={partners} projects={projects} /> */}
          <Contact companyInfo={companyInfo} />
        </main>
        <Footer companyInfo={companyInfo} />
        <WhatsAppButton whatsapp={companyInfo?.whatsapp} />
      </div>
    </>
  );
}
