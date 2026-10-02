import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "Phim Ảnh";
export const DEFAULT_OG_IMAGE = "/1200x630.jpg";

interface Options {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  imageAlt = title,
}: Options): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const clip = (text: string, max = 160) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;
