"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaWhatsapp, FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import ContactUsForm from "../../_components/contactUs/ContactUs";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useParams();

  const contactItems = [
    {
      icon: <FaLocationDot className="text-[#B9A14C]" />,
      text: "Riyadh, Saudi Arabia",
      link: "https://www.google.com/maps?q=Art+Packaging+Factory,+Riyadh,+Saudi+Arabia",
    },
    {
      icon: <MdEmail className="text-[#B9A14C]" />,
      text: "contact@artpackaging.com.sa",
      link: "mailto:contact@artpackaging.com.sa",
    },
    {
      icon: <MdEmail className="text-[#B9A14C]" />,
      text: "info@artpackaging.com.sa",
      link: "mailto:info@artpackaging.com.sa",
    },
    {
      icon: <FaPhone className="text-[#B9A14C]" />,
      text: "+966-541024824",
      link: "tel:+966541024824",
    },
    {
      icon: <FaPhone className="text-[#B9A14C]" />,
      text: "+966-540828347",
      link: "tel:+966540828347",
    },
    {
      icon: <FaWhatsapp className="text-[#B9A14C]" />,
      text: "+966-540828347",
      link: "https://api.whatsapp.com/send?phone=966541024824",
    },
    {
      icon: <BsInstagram className="text-[#B9A14C]" />,
      text: "@artpackaging",
      link: "https://www.instagram.com/artpackaging/",
    },
    {
      icon: <FaLinkedin className="text-[#B9A14C]" />,
      text: "in/art-packaging",
      link: "https://www.linkedin.com/company/artpackaging/",
    },
    {
      icon: <FaYoutube className="text-[#B9A14C]" />,
      text: "@artpackagingfactoryfordupl7609",
      link: "https://www.youtube.com/@artpackagingfactory",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-6">
      <div className="flex flex-col items-start text-left gap-4 w-full max-w-sm">
        <h1 className={`text-3xl font-extrabold text-white mb-4 ml-10`}>
          {t("letsOne")} <span className="text-[#B9A14C]">{t("letsTwo")}</span>
        </h1>
        {contactItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-2 rounded-lg opacity-75 hover:opacity-100 
            transition-opacity duration-300 w-full cursor-pointer border-2 border-transparent hover:border-[#B9A14C]
            }`}
            onClick={() => {
              if (!item.link.startsWith("mailto:")) {
                window.open(item.link);
              }
            }}
          >
            <div className="text-xl flex-shrink-0">{item.icon}</div>
            {item.link.startsWith("mailto:") ? (
              <a href={item.link} className="text-white hover:underline">
                {item.text}
              </a>
            ) : (
              <p dir="ltr" className="text-white">
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
      <ContactUsForm />
    </div>
  );
}
