"use client";

import React from "react";
import { useLanguage } from "@/hooks/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import us_flag from "@/public/flags/us.png";
import es_flag from "@/public/flags/sp.png";

const languages = [
  { code: "en", label: "English", flag: us_flag },
  { code: "es", label: "Español", flag: es_flag },
] as const;

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="
            bg-black/70 backdrop-blur-md
            hover:bg-black/80
            flex items-center gap-2 px-4 py-2 border-none
            text-white font-semibold
            hover:text-[#00ff85]
            rounded-xl shadow-[0_0_12px_#00ff85]
            hover:shadow-[0_0_20px_#00ff85]
            transition-all duration-300
          "
        >
          {currentLang && (
            <Image
              src={currentLang.flag}
              alt={currentLang.label}
              width={20}
              height={20}
              className="rounded-sm"
            />
          )}
          <span className="capitalize drop-shadow-sm">
            {currentLang?.label}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          bg-[#0e0e0e]/90 backdrop-blur-md border border-[#00ff85]/20
          shadow-[0_0_18px_#00ff85] rounded-xl
        "
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              flex items-center gap-2 cursor-pointer
              hover:bg-[#00ff85]/20 transition-colors
              ${language === lang.code ? "text-[#00ff85] font-semibold" : "text-white"}
            `}
          >
            <Image
              src={lang.flag}
              alt={lang.label}
              width={20}
              height={20}
              className="rounded-sm"
            />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
