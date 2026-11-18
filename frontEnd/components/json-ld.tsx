export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Clepsydra Technologies",
    url: "https://clepsydratechnologies.com",
    logo: "https://clepsydratechnologies.com/images/logo-icon-transparent.png",
    slogan: "Timeless Precision, Modern Solutions",
    description:
      "Clepsydra Technologies delivers timeless precision through custom software engineering and owns ORVOPS, an ERP and management software suite for hospitals, mess kitchens, hotels, and inventory teams.",
    subOrganization: {
      "@type": "Organization",
      name: "ORVOPS",
      url: "https://www.orvops.com",
      description:
        "Operations, ERP, and management software suite owned and built by Clepsydra Technologies — covering ORVOPS HMS, Dabbik, ORVOPS Hospitality, and StockLink.",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9474448909",
      email: "clepsydratechnologies@gmail.com",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.facebook.com/clepsydratechnologies/",
      "https://www.instagram.com/clepsydra_technologies",
      "https://www.linkedin.com/company/clepsydra-technologies/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    ...(image ? { image } : {}),
    datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Clepsydra Technologies",
      logo: {
        "@type": "ImageObject",
        url: "https://clepsydratechnologies.com/images/logo-icon-transparent.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
