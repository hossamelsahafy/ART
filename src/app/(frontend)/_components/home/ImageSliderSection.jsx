import Image from "next/image";

import ImagesSlider from "./ImagesSlider";

const ImageSliderSection = async ({ locale }) => {
  const fetchData = async () => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/globals/sliders-images`
      )
        .then((res) => res.json())
        .then((data) => data.partners);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const images = await fetchData();

  return (
    <section
      dir="ltr"
      className="mt-12 w-screen h-[40vh] md:h-screen max-h-[700px] overflow-x-hidden"
    >
      <Image
        alt="we care so we create"
        src={`/logos/slider_logo_${locale}.svg`}
        width={550}
        height={550}
        className="mx-auto"
      />
      <ImagesSlider images={images} />
    </section>
  );
};

export default ImageSliderSection;
