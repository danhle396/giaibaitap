const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com";

/**
 * WebSite schema + SearchAction: giúp Google hiển thị ô tìm kiếm sitelinks
 * và các AI engine (ChatGPT, Gemini, Perplexity) hiểu chức năng tìm kiếm của site.
 */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Giải Bài Tập 247",
    url: SITE_URL,
    inLanguage: "vi",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tim-kiem?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
