import Image from 'next/image'
import ImagesSlider from './ImagesSlider'

const ImageSliderSection = async ({ locale }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders-images`)
      const data = await response.json()
      console.log('Full API response:', data)

      // دمج كل الـ partners من كل doc في مصفوفة واحدة
      const allPartners = data.docs.flatMap((doc) => doc.partners || [])
      return allPartners
    } catch (error) {
      console.error('Fetch error:', error)
      return []
    }
  }

  // Await the promise here
  const images = await fetchData()
  console.log(images)

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
