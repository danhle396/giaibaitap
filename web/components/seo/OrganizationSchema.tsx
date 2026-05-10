const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Giải Bài Tập",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/giaibaitap",
      "https://youtube.com/@giaibaitap",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "lienhe@giaibaitap247.com",
      contactType: "customer service",
      availableLanguage: "Vietnamese",
    },
    description:
      "Website giải bài tập SGK, SBT, soạn văn, đề thi tất cả các môn học từ lớp 1 đến lớp 12. Miễn phí, dễ hiểu.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
