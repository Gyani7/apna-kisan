import { Metadata } from "next"

export const siteConfig = {
  name: "Apna Kisan X",
  description: "India's Agricultural Intelligence Network. Digital infrastructure for the next 20 years of Indian farming.",
  url: "https://apnakisan.in",
  ogImage: "https://apnakisan.in/og.jpg",
  links: {
    twitter: "https://twitter.com/apnakisan",
    github: "https://github.com/apnakisan",
  },
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@apnakisan",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

/**
 * Generates JSON-LD for a Village (Digital Twin Identity)
 */
export function generateVillageSchema(village: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": village.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": village.district,
      "addressRegion": village.state,
      "addressCountry": "IN"
    },
    "description": `Agricultural profile and real-time intelligence for ${village.name} village.`,
    "identifier": village.village_code,
    "hasMap": `${siteConfig.url}/village/${village.slug}`
  }
}