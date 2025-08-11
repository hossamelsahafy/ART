import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Cairo } from 'next/font/google'
import Navbar from '../_components/Navbar'
import '../globals.css'
import Footer from '../_components/footer'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
})

export const generateMetadata = () => {
  return {
    title: 'Art Packaging',
    description: 'This is the description of your page.',
    icons: {
      icon: '/icon.png',
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!['en', 'ar'].includes(locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`antialiased bg-[#2F2E35] w-screen overflow-x-hidden flex flex-col min-h-screen ${cairo.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
