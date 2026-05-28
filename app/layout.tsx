import type { Metadata } from "next";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const literary = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-literary",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bokhyllan",
    template: "%s | Bokhyllan",
  },
  description: "En stillsam svensk plats för varsamt valda bokrekommendationer.",
  openGraph: {
    title: "Bokhyllan",
    description: "Varsamt valda bokrekommendationer med svensk litterär värme.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${literary.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
