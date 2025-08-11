"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleService = ({ service, onClose }) => {
  console.log(service);

  const { locale } = useParams();
  const t = useTranslations("Service");

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50"
    >
      <div className="bg-[#424245] rounded-xl p-6 shadow-lg text-white max-w-lg relative">
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 border-[#B9A14C] rounded-full text-[#B9A14C] text-2xl font-bold hover:bg-[#B9A14C] hover:text-white transition-all duration-300"
          onClick={() => {
            onClose();
          }}
        >
          <p className="relative -top-[2px]">x</p>
        </button>
        <Image
          src={service.icon.url}
          alt={""}
          width={200}
          height={200}
          className="mx-auto rounded-md object-cover"
        />
        <h3 className="text-2xl mt-4 font-bold text-[#B9A14C]">
          {locale === "en" ? service.titleEn : service.titleAr}
        </h3>
        <p className="text-sm text-start text-gray-300 mt-2 font-semibold leading-[26px]">
          {locale === "en" ? service.descriptionEn : service.descriptionAr}
        </p>
      </div>
    </motion.section>
  );
};

export default SingleService;
