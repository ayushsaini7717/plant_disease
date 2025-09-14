"use client";
import { useState } from "react";
import { useLanguage, Language } from "./LanguageContext";
import { ChevronDown } from "lucide-react";

const options: { label: string; value: Language }[] = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Malayalam", value: "ml" },
];

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleSelect = (value: Language) => {
    setLanguage(value);
    setOpen(false);
  };

  const currentLabel = options.find((opt) => opt.value === language)?.label;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-40 px-4 py-2 bg-slate-800/50 text-white rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-colors"
      >
        {currentLabel}
        <ChevronDown className="ml-2 w-4 h-4 text-slate-300" />
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-slate-800/80 border border-slate-700 rounded-lg shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-white text-left px-4 py-2 hover:bg-green-500/20 transition-colors ${
                language === opt.value ? "bg-green-500/20" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
