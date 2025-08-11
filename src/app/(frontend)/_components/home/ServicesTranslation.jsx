// TranslationWrapper.jsx (Client Component)
'use client'
import { useTranslations } from 'next-intl'

const ServicesTranslation = () => {
  const t = useTranslations('Service')

  return (
    <>
      <h2 className="text-3xl sm:text-3xl md:text-[43px] lg:text-[43px] font-bold text-white mb-10">
        {t('Title')}
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-[23px] text-[#939396] mx-5 lg:max-w-xl mb-5 md:mb-10">
        {t('Des')}
      </p>
    </>
  )
}

export default ServicesTranslation
