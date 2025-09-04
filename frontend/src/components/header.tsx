'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from './navbar'; // Import Navbar
import '../i18n';

// --- Configuration ---
const heroImage = { src: '/gallery/hero-1.jpg', alt: 'Patio Image' };

export default function Header() {
  const { t } = useTranslation('header');
  const [isMounted, setIsMounted] = useState(false);

  // Effect for mounting the component
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-[900px]" />;
  }

  return (
    <header className="relative flex flex-col items-center justify-between min-h-[875px] overflow-hidden text-white py-8 px-10">
      <Navbar />
      {/* --- Background --- */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* --- Content --- */}
      <div className="z-10 flex flex-col items-start justify-end h-full w-full">
        {/* Main Text with transparent dark background */}
        <div className="max-w-2xl text-left bg-gray-800/60 p-6">
          <h2 className="text-xl md:text-2xl font-bold leading-tight">
            {t('mainHeading')}
          </h2>
          <p className="text-xl md:text-lg text-white leading-relaxed mt-4">
            {t('description')}
          </p>
        </div>
      </div>
    </header>
  );
}
