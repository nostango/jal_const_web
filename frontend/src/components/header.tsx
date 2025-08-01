'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import '../i18n';

// --- Configuration ---
const images = [
  { src: '/gallery/hero-1.jpg', alt: 'Kitchen remodel' },
  { src: '/gallery/hero-2.jpg', alt: 'Walkway towards sun' },
  { src: '/gallery/hero-3.jpg', alt: 'Walkway with basketball hoop in the background ' },
];
const DURATION = 5000; // 5 seconds per image

export default function Header() {
  const { t, i18n } = useTranslation('header');
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect for mounting the component
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect for cycling through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, DURATION);

    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!isMounted) {
    return <div className="min-h-[600px]" />;
  }

  return (
    <header className="relative flex flex-col items-center justify-center shadow-2xl min-h-[600px] overflow-hidden text-white text-center p-6">
      {/* --- Background --- */}
      <div className="absolute inset-0 -z-10">
        {
          images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className={`
                object-cover transition-opacity duration-1000 ease-in-out
                ${currentIndex === index ? 'opacity-100' : 'opacity-0'}
                ${currentIndex === index ? 'scale-110' : 'scale-100'}
                transition-transform duration-[${DURATION}ms] ease-in-out
              `}
            />
          ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-green-600/95" />
      </div>

      {/* --- Language Switcher (Top Right) --- */}
      <div className="absolute top-4 right-4 z-20">
        <button onClick={() => changeLanguage('en')} className="px-3 py-1 text-sm font-medium text-white bg-white/10 rounded-l-md hover:bg-white/20 transition-colors">EN</button>
        <button onClick={() => changeLanguage('es')} className="px-3 py-1 text-sm font-medium text-white bg-white/10 rounded-r-md hover:bg-white/20 transition-colors">ES</button>
      </div>

      {/* --- Content --- */}
      <div className="z-10 flex flex-col items-center gap-y-50"> {/* Apply flexbox and gap here */}
        
        {/* Section 1: Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
            <div className="relative h-16 w-16">
              <Image
                src="/gallery/logo.png"
                alt={t('companyName') + ' logo'}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold">{t('companyName')}</h1>
            </div>
          </div>
        </div>

        {/* Section 2: Main Text */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t('mainHeading')}
          </h2>
          <p className="text-xl md:text-2xl text-green-50 leading-relaxed mt-4">
            {t('description')}
          </p>
        </div>

      </div>
    </header>
  );
}
