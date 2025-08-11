"use client";

import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Footer({ locale }) {
  const t = useTranslations("Footer"); // استخدام الترجمة للروابط

  const links = [
    { label: t("home"), href: `/${locale}/` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("services"), href: `/${locale}#services` },
    { label: t("products"), href: `/${locale}#products` },
  ];

  const handleWhatsAppClick = () => {
    window.open("https://api.whatsapp.com/send?phone=966541024824");
  };

  const handleMapClick = () => {
    window.open(
      "https://www.google.com/maps?q=%D8%B4%D8%B1%D9%83%D8%A9+%D9%85%D8%B5%D9%86%D8%B9+%D9%81%D9%86+%D8%A7%D9%84%D8%AA%D8%BA%D9%84%D9%8A%D9%81%D8%8C+Unnamed+Road%D8%8C%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+14543%D8%8C,+Riyadh+11437&ftid=0x3e2f9f970852105d:0x60ca99981f970d83&hl=en-US&gl=us&entry=gps&coh=179581&lucs=,47068306&g_ep=CAISBjYuNTguMRgAINeCAyoJLDQ3MDY4MzA2QgJTQQ%3D%3D&g_st=iw"
    );
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@artpackaging.com.sa";
  };

  return (
    <footer className="bg-[#2F2E35] text-white pb-3 px-8 mt-auto block relative border-t border-white pt-10">
      <div className="container mx-auto flex flex-col items-center text-center space-y-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-md font-semibold md:text-lg">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-[#d4af37] transition-colorssss duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 md:gap-8 text-3xl mt-6 mb-12">
          {[
            { icon: FaWhatsapp, onClick: handleWhatsAppClick },
            { icon: FaEnvelope, onClick: handleEmailClick },
            { icon: FaMapMarkerAlt, onClick: handleMapClick },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-[#999] rounded-full p-3 md:p-4 text-[20px] text-[#999] hover:bg-[#E7E7E7] duration-200 cursor-pointer"
            >
              <item.icon onClick={item.onClick} />
            </div>
          ))}
        </div>

        <p className="text-white pt-10 text-lg md:text-xl  font-semibold opacity-80">
          Copyright @2024 <br />
          <a
            href="https://bcoit.com/"
            target="_blank"
            className="font-normal text-[16px] mt-5"
          >
            Powered by Bcoit
          </a>
        </p>
      </div>
    </footer>
  );
}
