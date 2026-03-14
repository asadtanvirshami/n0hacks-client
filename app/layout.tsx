import type { Metadata } from "next";
import { Orbitron, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/language";

const redhat = Red_Hat_Display({
  variable: "--font-red",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://n0hacks.com"),
  title: {
    default: "n0hacks | Offensive Security, Red Team & Pentesting",
    template: "%s | n0hacks",
  },
  description:
    "n0hacks is an ethical hacking team specializing in offensive red teaming and pentesting to protect high-risk startups, fintech, and enterprises from real cyber attacks.",
  keywords: [
    "ethical hacking",
    "red team",
    "pentesting",
    "offensive security",
    "cybersecurity",
    "n0hacks",
    "penetration testing",
    "startup security",
    "fintech security",
  ],
  authors: [{ name: "n0hacks Team", url: "https://n0hacks.com" }],
  creator: "n0hacks",
  publisher: "n0hacks",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    url: "https://n0hacks.com",
    siteName: "n0hacks",
    title: "n0hacks | Offensive Security, Red Team & Pentesting",
    description:
      "Offensive cybersecurity team that thinks like attackers to protect your critical assets.",
    locale: "en_US",
    images: [
      {
        url: "/og/n0hacks-og.jpg", // crea este asset en /public/og/
        width: 1200,
        height: 630,
        alt: "n0hacks - Offensive Security & Red Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@n0hacks", // si no tienes usuario, bórralo
    creator: "@n0hacks",
    title: "n0hacks | Offensive Security, Red Team & Pentesting",
    description:
      "Red team offensive and pentesting for companies that cannot afford to fail in cybersecurity.",
    images: ["/og/n0hacks-og.jpg"],
  },
  alternates: {
    canonical: 'https://n0hacks.com',
    languages: {
      'es': 'https://n0hacks.com',
      'en': 'https://n0hacks.com',
      'x-default': 'https://n0hacks.com'
    }
  },
};

export const viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${redhat.variable} ${orbitron.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
