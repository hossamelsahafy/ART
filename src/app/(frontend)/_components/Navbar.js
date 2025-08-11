"use client";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import SearchOverlay from "./SearchOverlay";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Navbar({ locale }) {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    router.push(newPath);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { label: t("home"), href: `/${locale}/` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("services"), href: `/${locale}/#services` },
    { label: t("products"), href: `/${locale}/#products` },
    { label: t("contact"), href: `/${locale}/contact` },
  ];

  return (
    <nav className="text-white p-4 bg-inherit relative bg-[#2F2E35]">
      <div className="container mx-auto px-0 md:px-12 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-2xl font-bold">
          <Image
            alt="Art_Packaging_Logo"
            src="/logo_transparent.png"
            width={175}
            height={90}
          />
        </Link>

        <div className={`hidden lg:flex gap-12`}>
          {links.map((link, index) => (
            <Link
              key={`navbar_link_${index}`}
              href={link.href}
              className="hover:text-primary mt-2 px-1 text-[20px]"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded-md ml-5 flex flex-row-reverse items-center space-x-1 ${
              locale === "en" ? "flex-row-reverse" : "mr-2"
            }`}
          >
            <img
              src={locale === "en" ? "/sa.svg" : "/us.svg"}
              alt="Language Icon"
              className="w-10 h-5 ml-2"
            />
            <span className="hover:text-[#d4af37] text-[16px]">
              {locale === "en" ? "العربية" : "English"}
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-x-10">
          <FaWhatsapp
            className="text-2xl cursor-pointer text-[#d4af37]"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=966541024824",
                "_blank"
              )
            }
          />

          <FiSearch
            className="text-2xl cursor-pointer text-[#d4af37]"
            onClick={() => setShowSearch(true)}
          />
        </div>
        <SearchOverlay
          locale={locale}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />

        <button className="lg:hidden text-2xl" onClick={toggleSidebar}>
          <HiOutlineBars3 />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full bg-[rgba(30,30,30,0.9)] backdrop-blur-sm transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden z-50 shadow-lg`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleSidebar}
        >
          <IoClose />
        </button>

        <div className="flex flex-col items-center space-y-6 pt-16 px-6">
          <Link
            href={`/${locale}/home`}
            className="text-3xl font-bold mb-16"
            onClick={toggleSidebar}
          >
            Logo
          </Link>

          {links.map((link, index) => (
            <Link
              key={`mobile_navbar_link_${index}`}
              href={link.href}
              className="hover:text-[#d4af37] font-bold text-2xl"
              onClick={toggleSidebar}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex space-x-6">
            <FaWhatsapp
              className="text-4xl cursor-pointer hover:text-[#d4af37]"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=966541024824",
                  "_blank"
                )
              }
            />
          </div>

          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded-md ml-5 flex items-center space-x-2 ${
              locale === "en" ? "flex-row-reverse" : "mr-2"
            }`}
          >
            <img
              src={locale === "en" ? "/sa.svg" : "/us.svg"}
              alt="Language Icon"
              className="w-10 h-5 ml-2"
            />
            <span className="text-2xl hover:text-[#d4af37]">
              {locale === "en" ? "العربية" : "English"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
