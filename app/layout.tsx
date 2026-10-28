import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Thanesh Nagarajan — Cloud Engineer", template: "%s — Thanesh Nagarajan" },
  description: "Cloud engineer specializing in secure AWS architecture, infrastructure automation, CI/CD and cost optimization.",
  applicationName: "Thanesh Nagarajan Portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Thanesh Nagarajan — Cloud Engineer",
    description: "Secure cloud architecture, automation and full-stack systems.",
    url: "/",
    siteName: "Thanesh Nagarajan Portfolio",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Thanesh Nagarajan — Cloud Engineer" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f5f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#experience">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
