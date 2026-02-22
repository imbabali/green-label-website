'use client'

import Image from 'next/image'

interface Partner {
  src: string
  alt: string
}

export default function LogoMarquee({ partners }: { partners: Partner[] }) {
  // Double the items for seamless infinite loop
  const items = [...partners, ...partners]

  return (
    <div
      className="group relative overflow-hidden"
      role="region"
      aria-label="Our partners and clients"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-gray-50 to-transparent sm:w-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-gray-50 to-transparent sm:w-20" aria-hidden="true" />

      <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
        {items.map((partner, i) => (
          <div
            key={`${partner.alt}-${i}`}
            className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={100}
              height={40}
              className="object-contain opacity-70"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
