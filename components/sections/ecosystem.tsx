"use client";

import React from "react";
import { FormattedMessage } from "@/components/ui/formatted-message";

// Client logos data - using transparent PNG files
const clients = [
  { name: "Ecoadvance", src: "/portfolio-n0hacks/Ecoadvance.png" },
  { name: "DataHarvx", src: "/portfolio-n0hacks/DataHarvx.png" },
  { name: "TradingBacktesting", src: "/portfolio-n0hacks/TradingBacktesting.png" },
  { name: "Prozeus", src: "/portfolio-n0hacks/Prozeus.png" },
  { name: "Govern D'Andorra", src: "/portfolio-n0hacks/GovernAndorra.png" },
  { name: "Algorim", src: "/portfolio-n0hacks/Algorim.png" },
  { name: "ESG", src: "/portfolio-n0hacks/ESG.png" },
];

const partners = [
  { name: "Nuxia", src: "/portfolio-n0hacks/Nuxia.png" },
  { name: "DigitalWay", src: "/portfolio-n0hacks/DigitalWay.png" },
  { name: "Blixel", src: "/portfolio-n0hacks/Blixel.png" },
  { name: "Gesprodat", src: "/portfolio-n0hacks/Gesprodat.png" },
  { name: "SpectraSec", src: "/portfolio-n0hacks/SpectraSec.png" },
];

const collaborators = [
  { name: "Marina Innova Hub", src: "/portfolio-n0hacks/MarinaInnovaHub.png" },
  { name: "ESIC", src: "/portfolio-n0hacks/ESIC.png" },
];

const LogoCard = ({ logo }: { logo: (typeof clients)[0] }) => (
  <div className="group relative">
    {/* Card container with gradient border */}
    <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-emerald-500/30 bg-gradient-to-br from-[#020712]/60 via-[#000000]/40 to-[#03140d]/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-500 hover:shadow-[0_0_45px_rgba(16,185,129,0.35)] overflow-hidden">

      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      {/* Corner accents */}
      <span className="pointer-events-none absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-400/60 rounded-tl-md" />
      <span className="pointer-events-none absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400/60 rounded-tr-md" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-400/60 rounded-bl-md" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-400/60 rounded-br-md" />

      {/* Logo container with image */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100px] gap-3">
        <img
          src={logo.src}
          alt={logo.name}
          className="w-40 h-40 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
        />
        <p className="text-sm text-emerald-200/80 text-center font-medium tracking-wide">
          {logo.name}
        </p>
      </div>

      {/* Hover underline */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </div>
);

export const EcosystemSection = () => {
  return (
    <section id="ecosystem" className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 py-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[40vh] h-[40vh] rounded-full bg-emerald-500/15 blur-[110px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-[35vh] h-[35vh] rounded-full bg-emerald-400/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <div className="mb-20 text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400/70">
          <FormattedMessage id="ecosystem.badge" defaultMessage="ECOSYSTEM" />
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
          <FormattedMessage id="ecosystem.title" defaultMessage="Who trust n0hacks" />
        </h2>

        <p className="text-emerald-200/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          <FormattedMessage
            id="ecosystem.subtitle"
            defaultMessage="Companies, institutions and organizations that have chosen to work with us."
          />
        </p>
      </div>

      {/* Clients Section */}
      <div className="mb-32">
        <h3 className="text-2xl font-semibold text-emerald-300 mb-8 tracking-wide text-center">
          <FormattedMessage id="ecosystem.clients_title" defaultMessage="Clients" />
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {clients.map((client, idx) => (
            <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex justify-center">
              <LogoCard logo={client} />
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="mb-32">
        <h3 className="text-2xl font-semibold text-cyan-300 mb-8 tracking-wide text-center">
          <FormattedMessage id="ecosystem.partners_title" defaultMessage="Partners" />
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, idx) => (
            <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex justify-center">
              <LogoCard logo={partner} />
            </div>
          ))}
        </div>
      </div>

      {/* Collaborators Section */}
      <div>
        <h3 className="text-2xl font-semibold text-purple-300 mb-8 tracking-wide text-center">
          <FormattedMessage id="ecosystem.collaborators_title" defaultMessage="Collaborators" />
        </h3>
        <div className="flex justify-center gap-6">
          {collaborators.map((collab, idx) => (
            <LogoCard key={idx} logo={collab} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-24 pt-24 border-t border-emerald-400/20">
        <div className="text-center text-emerald-300/60 text-sm">
          <FormattedMessage
            id="ecosystem.footer"
            defaultMessage="More organizations joining every quarter"
          />
        </div>
      </div>
    </section>
  );
};
