const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Giải Bài Tập 247",
    alternateName: "giaibaitap247",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "lienhe@giaibaitap247.com",
      contactType: "customer service",
      availableLanguage: "Vietnamese",
    },
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
    knowsLanguage: "vi",
    description:
      "Website giải bài tập SGK, soạn văn, đề thi từ lớp 1 đến lớp 12, biên soạn bám sát sách giáo khoa hiện hành (Kết nối tri thức, Chân trời sáng tạo, Cánh Diều). Miễn phí cho học sinh Việt Nam.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
