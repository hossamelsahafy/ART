import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Certificates() {
  const certificates = [
    { image: "/CertOne.png", title: "ISO 45001:2018" },
    { image: "/CertTwo.png", title: "ISO 9001:2015" },
  ];
  const t = useTranslations("About");

  return (
    <div className="text-center text-white mt-10 md:mt-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("cert")}</h2>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 px-3">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="w-full md:w-[400px] lg:w-[450px] bg-[#3B3B47] rounded-xl overflow-hidden shadow-lg flex flex-col p-6 transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full relative flex-grow flex items-center justify-center">
              <Image
                src={cert.image}
                alt={cert.title}
                width={300}
                height={300}
                objectFit="contain"
                className="rounded-2xl w-auto max-w-full max-h-full"
              />
            </div>

            <div className="flex justify-center h-auto mt-4">
              <h3 className="text-lg font-semibold text-[#B9A14C]">
                {cert.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
