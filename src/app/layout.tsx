import type { Metadata } from "next";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
// @ts-ignore CSS side-effect imports are handled by Next.js.
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "vietnamese"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Phim Mới Nhất`,
    template: `%s | ${SITE_NAME}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html
      suppressHydrationWarning
      lang="vi"
      className={`${beVietnam.variable} ${oswald.variable}`}
    >
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        {adsenseClient && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
