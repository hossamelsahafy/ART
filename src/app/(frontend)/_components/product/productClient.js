"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const ProductClient = ({ product }) => {
  const { locale } = useParams();
  const t = useTranslations("SingleProduct");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex mb-10 flex-col md:flex-row items-center justify-between w-screen max-w-5xl px- gap-5 mt-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="md:w-1/2 max-w-[92vw] cursor-grab rounded-md"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.image.url}
                alt={`Product Image ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="md:w-1/2 text-center mx-5 md:text-start">
          <h1
            className={`text-2xl font-bold text-white mb-3 ${
              locale === "en" ? "text-left" : "text-right"
            }`}
          >
            {t("Description")}
          </h1>
          <p
            className={`text-lg text-gray-200 mb-4 ${
              locale === "en" ? "text-left" : "text-right"
            }`}
          >
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>

          <button className="bg-[#d4af37] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#b89530] transition mb-5">
            {t("Button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
