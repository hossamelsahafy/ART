import Image from 'next/image'
import ImagesSlider from './ImagesSlider'

const ImageSliderSection = async ({ locale }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders-images`)
      const data = await response.json()
      return data.docs || []
    } catch (error) {
      console.error('Fetch error:', error)
      return []
    }
  }

  const docs = await fetchData()

  const images = docs
    .filter((doc) => Array.isArray(doc.sliderImages) && doc.sliderImages.length > 0)
    .flatMap((doc) => doc.sliderImages)

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
  )
}

export default ImageSliderSection
