import type { Metadata } from 'next';

const SITE_URL = 'https://apnakisan.in';
const SITE_NAME = 'Apna Kisan';

export function generatePageMeta(options: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = options.path ? `${SITE_URL}${options.path}` : SITE_URL;
  return {
    title: `${options.title} | ${SITE_NAME}`,
    description: options.description,
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: SITE_NAME,
      type: options.type ?? 'website',
      images: options.image ? [{ url: options.image, width: 1200, height: 630 }] : [],
      locale: 'hi_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: options.image ? [options.image] : [],
    },
    alternates: { canonical: url },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  authorName: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    author: { '@type': 'Person', name: article.authorName },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt ?? article.publishedAt,
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/community?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
