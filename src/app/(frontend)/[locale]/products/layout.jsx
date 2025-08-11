"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IoHomeOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import Link from "next/link";

const layout = ({ children }) => {
  const t = useTranslations("SingleProduct");
  const { locale } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCategory = localStorage.getItem("category");
      if (storedCategory) {
        setCategory(JSON.parse(storedCategory));
      }
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mx-auto flex w-full justify-center mt-28 items-center gap-2 md:gap-5 cursor-pointer text-white text-lg md:text-lg mb-18">
        <Link
          href={`/${locale}`}
          className="hover:text-[#d4af37] text-sm md:text-md font-semibold flex items-center gap-1 mb-[1px]"
        >
          <IoHomeOutline className="text-xl mr-2 mt-[1px] font-semibold" />
          <span className="font-semibold">{t("Home")}</span>
        </Link>
        <span>{">"}</span>
        <Link
          href={`/${locale}#products`}
          className="hover:text-[#d4af37] text-sm md:text-md font-semibold"
        >
          {t("Product")}
        </Link>
        <span>{">"}</span>
        <Link
          href={`/${locale}/products`}
          className="font-semibold text-sm md:text-md hover:text-[#d4af37]"
        >
          {locale == "ar" ? category.titleAr : category.titleEn}
        </Link>
      </div>
      {children}
    </div>
  );
};

export default layout;
