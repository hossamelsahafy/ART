"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import SingleService from "../home/SingleService";
import { useTranslations } from "next-intl";

const ServiceCards = ({ services }) => {
  const params = useParams();
  const locale = params?.locale || "en"; // Ensure locale has a default value
  const t = useTranslations("Service");
  const maxLength = 138;
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-12 max-w-6xl mx-5 md:mx-16">
      {services.map((s, index) => (
        <div
          key={index}
          className="bg-[#424245] rounded-xl px-4 py-12 pt-0  shadow-lg cursor-pointer text-white text-center lg:mx-0"
          onClick={() => setSelectedService(s)}
        >
          <Image
            src={s.icon.url}
            alt={s[`title${locale === "en" ? "En" : "Ar"}`]}
            width={145}
            height={145}
            className="mx-auto rounded-md mt-8 object-cover"
          />
          <h3 className="text-3xl mt-6 font-bold text-[#B9A14C]">
            {s[`title${locale === "en" ? "En" : "Ar"}`]}
          </h3>
          <p className="text-sm text-start text-gray-300 mt-6 font-semibold leading-[26px] tracking-wider">
            {s[`description${locale === "en" ? "En" : "Ar"}`].length >
            maxLength ? (
              <>
                {s[`description${locale === "en" ? "En" : "Ar"}`].slice(
                  0,
                  maxLength
                )}
                <span className="">... </span>
                <span className="text-[#B9A14C] cursor-pointer font-semibold">
                  {t("Read")}
                </span>
              </>
            ) : (
              s[`description${locale === "en" ? "En" : "Ar"}`]
            )}
          </p>
        </div>
      ))}
      {selectedService && (
        <SingleService
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default ServiceCards;
