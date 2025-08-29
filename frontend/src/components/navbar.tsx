'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import '../i18n';

export default function Navbar() {
  const { t, i18n } = useTranslation('header');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-transparent w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start h-24">
          {/* Logo Section */}
          <div className="flex items-center gap-4"> 
            <div>
              <Image src="/gallery/logo.png" alt={`${t('companyName')} logo`} width={128} height={128} />
            </div>
            {/*
            <div className="text-left">
              <h1 className="text-xl md:text-2xl font-bold text-white">{t('companyName')}</h1>
              <p className="text-sm text-gray-200">{t('tagline')}</p>
            </div>
            */}
          </div>

          {/* Language Switcher */}
          <div className="flex">
            <button
              onClick={() => changeLanguage("en")}
              className="px-3 py-1 text-sm font-medium text-white bg-white/20 rounded-l-md hover:bg-white/30 transition-colors border border-white/30"
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className="px-3 py-1 text-sm font-medium text-white bg-white/20 rounded-r-md hover:bg-white/30 transition-colors border border-white/30 border-l-0"
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
