import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string | undefined, en: string | undefined) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("lonan-language") as Language;
    if (saved && (saved === "ar" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  // Save language preference and update document direction
  useEffect(() => {
    localStorage.setItem("lonan-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.style.direction = language === "ar" ? "rtl" : "ltr";
    document.body.style.textAlign = language === "ar" ? "right" : "left";
  }, [language]);

  // Translation helper - returns Arabic or English based on current language
  const t = (ar: string | undefined, en: string | undefined): string => {
    if (language === "ar") {
      return ar || en || "";
    }
    return en || ar || "";
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Static translations for UI elements
export const translations = {
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    partners: "شركاؤنا",
    contact: "تواصل معنا",
    getQuote: "احصل على عرض",
    learnMore: "المزيد من التفاصيل",
    yearsExperience: "سنة خبرة",
    happyClients: "عميل سعيد",
    completedProjects: "مشروع منجز",
    discoverMore: "اكتشف المزيد",
    exploreServices: "استكشف خدماتنا",
    contactUs: "تواصل معنا",
    whoWeAre: "من نحن؟",
    ourVision: "رؤيتنا",
    ourMission: "رسالتنا",
    visionMission: "رؤيتنا ورسالتنا",
    whyChooseUs: "لماذا تختار",
    clickToShowVision: "اضغط لعرض الرؤية والرسالة",
    integratedSolutions: "حلول إعلانية متكاملة",
    serviceDescription: "نقدم مجموعة شاملة من الخدمات الإعلانية والتسويقية لتلبية جميع احتياجاتك",
    whatWeOffer: "ما نقدمه في هذه الخدمة:",
    whatsappContact: "تواصل عبر واتساب",
    close: "إغلاق",
    targetAudience: "عملاؤنا المستهدفون",
    businessOwners: "أصحاب المشاريع التجارية",
    businessDesc: "مطاعم - مقاهي - محلات - عيادات",
    educational: "المؤسسات التعليمية",
    educationalDesc: "مدارس - جامعات",
    companies: "الشركات والجهات الحكومية",
    companiesDesc: "قطاع خاص وحكومي",
    individuals: "الأفراد",
    individualsDesc: "المناسبات والاحتفالات",
    successPartners: "شركاء النجاح",
    proudClients: "عملاء نفتخر بهم",
    partnersDescription: "نفخر بثقة عملائنا من مختلف القطاعات الحكومية والخاصة",
    clients: "عميل",
    projects: "مشروع",
    satisfaction: "رضا العملاء",
    previousWork: "من سابقة أعمالنا",
    sendMessage: "أرسل لنا رسالة",
    messageSent: "تم إرسال رسالتك بنجاح!",
    willContactYou: "سنتواصل معك في أقرب وقت",
    fullName: "الاسم الكامل",
    enterName: "أدخل اسمك",
    phone: "رقم الجوال",
    email: "البريد الإلكتروني",
    serviceRequired: "الخدمة المطلوبة",
    selectService: "اختر الخدمة",
    requestDetails: "تفاصيل الطلب",
    writeDetails: "اكتب تفاصيل مشروعك هنا...",
    sending: "جاري الإرسال...",
    sendRequest: "إرسال الطلب",
    contactInfo: "معلومات التواصل",
    location: "الموقع",
    emailWebsite: "البريد والموقع",
    whatsappMessage: "تواصل معنا عبر واتساب",
    quickResponse: "رد سريع ومباشر",
    followUs: "تابعنا على",
    quickLinks: "روابط سريعة",
    allRightsReserved: "جميع الحقوق محفوظة",
    madeWith: "صُنع بـ",
    inSaudi: "في المملكة العربية السعودية",
    addFromDashboard: "يرجى إضافة المحتوى من لوحة التحكم",
    diverseServices: "تنوع خدماتنا",
    integratedSolutionsShort: "حلول متكاملة",
    highQuality: "جودة عالية",
    premiumMaterials: "خامات مميزة",
    fastExecution: "سرعة التنفيذ",
    highPrecision: "دقة عالية",
    localExpertise: "خبرة محلية",
    understandMarket: "نفهم السوق",
    since20Years: "منذ عشرين عاماً من الإبداع",
    oneStopShop: "البيت الواحد الذي يجمع كل ما يحتاجه العميل لإبراز نشاطه التجاري بشكل احترافي",
    other: "أخرى",
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    partners: "Partners",
    contact: "Contact Us",
    getQuote: "Get a Quote",
    learnMore: "Learn More",
    yearsExperience: "Years Experience",
    happyClients: "Happy Clients",
    completedProjects: "Completed Projects",
    discoverMore: "Discover More",
    exploreServices: "Explore Services",
    contactUs: "Contact Us",
    whoWeAre: "Who We Are?",
    ourVision: "Our Vision",
    ourMission: "Our Mission",
    visionMission: "Vision & Mission",
    whyChooseUs: "Why Choose",
    clickToShowVision: "Click to show vision & mission",
    integratedSolutions: "Integrated Advertising Solutions",
    serviceDescription: "We offer a comprehensive range of advertising and marketing services to meet all your needs",
    whatWeOffer: "What we offer in this service:",
    whatsappContact: "Contact via WhatsApp",
    close: "Close",
    targetAudience: "Our Target Audience",
    businessOwners: "Business Owners",
    businessDesc: "Restaurants - Cafes - Shops - Clinics",
    educational: "Educational Institutions",
    educationalDesc: "Schools - Universities",
    companies: "Companies & Government",
    companiesDesc: "Private & Public Sector",
    individuals: "Individuals",
    individualsDesc: "Events & Celebrations",
    successPartners: "Success Partners",
    proudClients: "Clients We're Proud Of",
    partnersDescription: "We are proud of our clients' trust from various governmental and private sectors",
    clients: "Clients",
    projects: "Projects",
    satisfaction: "Client Satisfaction",
    previousWork: "Our Previous Work",
    sendMessage: "Send us a message",
    messageSent: "Message sent successfully!",
    willContactYou: "We will contact you soon",
    fullName: "Full Name",
    enterName: "Enter your name",
    phone: "Phone Number",
    email: "Email",
    serviceRequired: "Required Service",
    selectService: "Select Service",
    requestDetails: "Request Details",
    writeDetails: "Write your project details here...",
    sending: "Sending...",
    sendRequest: "Send Request",
    contactInfo: "Contact Information",
    location: "Location",
    emailWebsite: "Email & Website",
    whatsappMessage: "Contact us via WhatsApp",
    quickResponse: "Quick & Direct Response",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    allRightsReserved: "All Rights Reserved",
    madeWith: "Made with",
    inSaudi: "in Saudi Arabia",
    addFromDashboard: "Please add content from the dashboard",
    diverseServices: "Diverse Services",
    integratedSolutionsShort: "Integrated Solutions",
    highQuality: "High Quality",
    premiumMaterials: "Premium Materials",
    fastExecution: "Fast Execution",
    highPrecision: "High Precision",
    localExpertise: "Local Expertise",
    understandMarket: "We Understand the Market",
    since20Years: "20 Years of Creativity",
    oneStopShop: "The one-stop-shop that provides everything a client needs to highlight their business professionally",
    other: "Other",
  },
};

export type TranslationKey = keyof typeof translations.ar;

export function useTranslation() {
  const { language } = useLanguage();
  
  const getText = (key: TranslationKey): string => {
    return translations[language][key] || translations.ar[key] || key;
  };
  
  return { getText, language };
}

