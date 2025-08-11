"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Certificates from "../../_components/about/Certificate";

export default function About() {
  const t = useTranslations("About");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full min-h-[70vh] md:min-h-screen flex items-center justify-center">
        <img
          src="/backgroundAboutUs.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div
          className={`relative z-10 text-white text-center px-6 transition-opacity duration-1000 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold">{t("who")}</h1>
        </div>
      </div>

      <div className="mt-0 w-full flex flex-col items-center px-6 bg-[#2F2E35] py-16">
        <p className="text-white text-center text-sm md:text-base max-w-5xl leading-relaxed">
          {t("title")}
        </p>
        <button className="bg-[#B9A14C] rounded-md px-6 py-3 mt-6 text-white font-semibold shadow-md hover:opacity-80 transition duration-300 hover:bg-white hover:text-[#ebcd61]">
          {t("button")}
        </button>

        <div className="mt-12 w-full">
          <Certificates />
        </div>
      </div>
    </div>
  );
}
