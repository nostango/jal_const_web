'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from "@/components/contact-form";
import Header from "@/components/header";
import ZoomSplash from "@/components/ZoomSplash";
import '../i18n';

import HorizontalGallery from "@/components/horizontal-gallery";

import Services from "@/components/Services";

export default function Home() {
  const { t } = useTranslation('common');
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (showSplash) {
    return (
      <ZoomSplash
        imgSrc="/gallery/business-card.png"
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  return (
    <main>
      <Header />
      <Services />
      <HorizontalGallery />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('description')}
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}