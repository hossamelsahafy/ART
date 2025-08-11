"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
const LetsWork = () => {
  const t = useTranslations("LetsWork");
  const { locale } = useParams();
  const handleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=966541024824");
  };
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className=" text-5xl text-center font-black text-white leading-snug">
        LET'S WORK{" "}
        <span className="text-[#8c8c8f] font-[900]">TOGETHER</span>{" "}
      </h1>
      <button
        onClick={() => handleClick()}
        className="text-white text-xl rounded-3xl px-6 py-3 mt-5 md:mt-10 bg-[#B9A14C] hover:opacity-90 hover:transition-all mb-20 "
      >
        {t("Button")}
      </button>
    </div>
  );
};

export default LetsWork;
