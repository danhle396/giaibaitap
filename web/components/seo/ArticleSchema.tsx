const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap.com.vn";
const SITE_NAME = "Giải Bài Tập";

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
  const schema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified,
    inLanguage: "vi",
    educationalLevel: "secondary",
    image: imageUrl || `${SITE_URL}/og-default.png`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
