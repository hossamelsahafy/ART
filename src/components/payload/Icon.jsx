import React from 'react'
import logo from '@/assets/logo_transparent.png'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image className="w-40" src={logo} alt="" />
    </div>
  )
}
