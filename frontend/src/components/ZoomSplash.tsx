'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ZoomSplashProps {
  imgSrc: string;
  onComplete: () => void;
}

export default function ZoomSplash({ imgSrc, onComplete }: ZoomSplashProps) {
  const [isZooming, setIsZooming] = useState(false);

  const handleClick = () => {
    setIsZooming(true);
    // The original timeout before the breaking change
    setTimeout(onComplete, 1200);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        fixed inset-0 z-50 flex cursor-pointer items-center justify-center transition-colors duration-1000
        ${isZooming ? 'bg-transparent' : 'bg-black'}
      `}
    >
      <div
        className={`
          relative transition-transform duration-700 ease-in-out
          ${isZooming ? 'scale-150' : 'scale-100'}
        `}
      >
        <Image
          src={imgSrc}
          alt="Business Card Splash Screen"
          width={500}
          height={300}
          priority
          className="h-auto max-w-[80vw] rounded-lg shadow-2xl shadow-white/10 md:max-w-md"
        />
      </div>
    </div>
  );
}