import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Two Makers Co | Handcrafted 3D Printed Products",
    template: "%s | Two Makers Co",
  },
  description: "Discover unique handcrafted 3D printed products. From planters to desk organizers, we make functional art for your home and office.",
  keywords: ["3D printing", "handmade", "planters", "desk organizer", "home decor", "gifts"],
  authors: [{ name: "Two Makers Co" }],
  creator: "Two Makers Co",
  metadataBase: new URL("https://two-makers-co.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://two-makers-co.vercel.app",
    siteName: "Two Makers Co",
    title: "Two Makers Co | Handcrafted 3D Printed Products",
    description: "Discover unique handcrafted 3D printed products. From planters to desk organizers, we make functional art for your home and office.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Two Makers Co Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Makers Co | Handcrafted 3D Printed Products",
    description: "Discover unique handcrafted 3D printed products.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Two Makers Co",
  url: "https://two-makers-co.vercel.app",
  logo: "https://two-makers-co.vercel.app/logo.png",
  description: "Handcrafted 3D printed products for your home and office.",
  sameAs: ["https://www.instagram.com/twomakersco"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Two Makers Co",
  url: "https://two-makers-co.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://two-makers-co.vercel.app/shop?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
