'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from "@/components/contact-form";
import Header from "@/components/header";
import TrustBadges from "@/components/trust-badges";
import ExpertiseCard from "@/components/expertise-card";
import '../i18n';

import HorizontalGallery from "@/components/horizontal-gallery";

import Services from "@/components/expertise-card";

export default function Home() {
  const { t } = useTranslation('common');
  const [isMounted, setIsMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Start navbar animation immediately
    const navbarTimer = setTimeout(() => {
      setShowNavbar(true);
    }, 100);

    // Start content animation after navbar
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 700);

    return () => {
      clearTimeout(navbarTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main>
      <div className={`transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Header />
        <ExpertiseCard />
        <TrustBadges />
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
      </div>
    </main>
  );
}