'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from "@/components/contact-form";
import Header from "@/components/header";
import TrustBadges from "@/components/trust-badges";
import ExpertiseCard from "@/components/expertise-card";
import '../i18n';

import IconGallery from "@/components/icon-gallery";

export default function Home() {
  const { t } = useTranslation('common');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main>
      <div className={`relative transition-all duration-1000 ease-out opacity-100 translate-y-0`}>
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale -z-10"
          // style={{ backgroundImage: "url('/gallery/background/brick-wall.png')", backgroundSize: '300px'  }}
        />
        <div className="absolute inset-0 bg-white/50 -z-10" />
        <Header />
        <ExpertiseCard />
        <TrustBadges />
        <IconGallery />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('description')}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}