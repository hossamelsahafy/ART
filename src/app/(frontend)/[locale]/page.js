import ImageSliderSection from '../_components/home/ImageSliderSection'
import LetsWork from '../_components/home/LetsWork'
import SuccessPartners from '../_components/home/SuccessPartners'
import Speach from '../_components/home/speach'
import OurService from '../_components/home/OurService'
import OurProduct from '../_components/home/OurProduct'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function Home({ params }) {
  const { locale } = await params
  if (!['en', 'ar'].includes(locale)) {
    notFound()
  }
  return (
    <>
      <ImageSliderSection locale={locale} />
      <OurService locale={locale} />
      <OurProduct locale={locale} />
      <Speach locale={locale} />
      <SuccessPartners locale={locale} />
      <LetsWork locale={locale} />
    </>
  )
}
