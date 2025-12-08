import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Red_Hat_Display } from "next/font/google";
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
    default: "N0HACKS | Offensive Security, Red Team & Pentesting",
    template: "%s | N0HACKS",
  },
  description:
    "N0HACKS es un equipo de hacking ético, red team y pentesting ofensivo especializado en proteger startups, fintech y empresas de alto riesgo frente a ciberataques reales.",
  keywords: [
    "hacking ético",
    "red team",
    "pentesting",
    "seguridad ofensiva",
    "ciberseguridad",
    "N0HACKS",
    "pruebas de intrusión",
    "seguridad para startups",
    "fintech security",
  ],
  authors: [{ name: "N0HACKS", url: "https://n0hacks.com" }],
  openGraph: {
    type: "website",
    url: "https://n0hacks.com",
    siteName: "N0HACKS",
    title: "N0HACKS | Offensive Security, Red Team & Pentesting",
    description:
      "Equipo ofensivo de ciberseguridad que piensa como el atacante para proteger tus activos críticos.",
    locale: "es_ES",
    images: [
      {
        url: "/og/n0hacks-og.jpg", // crea este asset en /public/og/
        width: 1200,
        height: 630,
        alt: "N0HACKS - Offensive Security & Red Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@n0hacks", // si no tienes usuario, bórralo
    creator: "@n0hacks",
    title: "N0HACKS | Offensive Security, Red Team & Pentesting",
    description:
      "Red team ofensivo y pentesting para empresas que no pueden permitirse fallar en ciberseguridad.",
    images: ["/og/n0hacks-og.jpg"],
  },
  alternates: {
    canonical: "https://n0hacks.com/",
  },
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
