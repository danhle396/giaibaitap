const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com";
const SITE_NAME = "Giải Bài Tập 247";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
}: ArticleSchemaProps) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const image = imageUrl || `${SITE_URL}/og-default.png`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url: fullUrl,
      datePublished,
      dateModified,
      inLanguage: "vi-VN",
      image,
      mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 600, height: 60 },
      },
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: title,
      description,
      url: fullUrl,
      datePublished,
      dateModified,
      inLanguage: "vi-VN",
      educationalLevel: "secondary",
      learningResourceType: "Solution",
      audience: { "@type": "EducationalAudience", educationalRole: "student" },
      image,
      isAccessibleForFree: true,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
