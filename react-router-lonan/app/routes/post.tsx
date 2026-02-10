import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router";
import { client } from "~/sanity/client";
import type { Route } from "./+types/post";
import { Header, Footer, WhatsAppButton } from "~/components";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, {
    slug: params.slug,
  });
  return { post };
}

export function meta({ data }: Route.MetaArgs): Route.MetaFunction {
  const post = data?.post;
  return [
    { title: post?.title ? `${post.title} | لونان` : "المدونة | لونان" },
    {
      name: "description",
      content: post?.excerpt || "مدونة لونان للدعاية والإعلان",
    },
  ];
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="heading-lg text-black mb-4">المقال غير موجود</h1>
            <p className="text-[var(--color-gray-dark)] mb-8">
              عذراً، لم نتمكن من العثور على المقال المطلوب.
            </p>
            <Link to="/" className="btn btn-primary">
              العودة للرئيسية
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:underline mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة للرئيسية
          </Link>

          {/* Featured Image */}
          {post.image && (
            <div className="rounded-3xl overflow-hidden mb-8">
              <img
                src={urlFor(post.image).width(1200).height(600).url()}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="heading-lg text-black mb-4">{post.title}</h1>
            {post.publishedAt && (
              <time className="text-[var(--color-gray-dark)]">
                {new Date(post.publishedAt).toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.body && (
              <PortableText
                value={post.body}
                components={{
                  block: {
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
                    ),
                    normal: ({ children }) => (
                      <p className="text-[var(--color-gray-dark)] mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-r-4 border-[var(--color-gold)] pr-4 my-6 text-[var(--color-gray-dark)] italic">
                        {children}
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 text-[var(--color-gray-dark)]">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 text-[var(--color-gray-dark)]">
                        {children}
                      </ol>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => <em className="italic">{children}</em>,
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        className="text-[var(--color-gold)] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-[var(--color-gold)] rounded-3xl text-center">
            <h3 className="text-xl font-bold text-black mb-4">
              هل تحتاج مساعدة في مشروعك؟
            </h3>
            <p className="text-black/70 mb-6">
              تواصل معنا الآن للحصول على استشارة مجانية
            </p>
            <a
              href="https://wa.me/966570157777"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              تواصل معنا
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
