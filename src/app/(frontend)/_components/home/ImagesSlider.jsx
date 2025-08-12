'use client'
import React, { useState, useEffect } from 'react'
import Slider from 'react-infinite-logo-slider'

const ImagesSlider = ({ images }) => {
  const [slideWidth, setSlideWidth] = useState(150)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 480) {
        setSlideWidth(130)
      } else if (window.innerWidth < 768) {
        setSlideWidth(145)
      } else if (window.innerWidth < 1024) {
        setSlideWidth(200)
      } else {
        setSlideWidth(270)
      }
    }
    console.log('###############################', images)

    updateWidth()
    window.addEventListener('resize', updateWidth)
    setMounted(true) // Now we are on the client

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  if (!mounted) return null

  return (
    <div className="-rotate-6 mt-8 md:mt-20 w-[112vw] md:w-[105vw] -translate-x-10">
      <Slider width={`${slideWidth}px`} duration={80} blurBorders={false} blurBorderColor={'#fff'}>
        {images.map((image, index) => (
          <Slider.Slide className="p-2" key={index}>
            <img src={image.url} alt="slider_image" className="aspect-square rounded-[30px] mx-5" />
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  )
}

export default ImagesSlider
