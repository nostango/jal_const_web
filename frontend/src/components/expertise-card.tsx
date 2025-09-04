'use client';

import { useTranslation } from 'react-i18next';
import '../i18n';

export default function Services() {
  const { t } = useTranslation('header');

  return (
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto relative z-20">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">{t('expertiseHeading')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{t('service1')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{t('service2')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{t('service3')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{t('service4')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{t('service5')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{t('service6')}</span>
            </div>
          </div>
        </div>
      </div>
  );
}
