import LetterGlitch from "@/components/LetterGlitch";
import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center w-full h-full min-h-screen overflow-hidden bg-black">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-bold tracking-widest text-white mb-6">
          N0HACKS
        </h1>
        <Button size="lg" className="bg-green-400 hover:bg-green-500 text-black">Let's Start</Button>
      </div>
    </section>
  );
};

export default HeroSection;
