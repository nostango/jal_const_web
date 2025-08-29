import ReviewWidgets from "./ui/review-widgets"
import { useTranslation } from 'react-i18next';

export default function TrustBadges() {
  const { t } = useTranslation('trust-badges');
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-gray-600">{t('description')}</p>
        </div>

        <div className="space-y-16">

          {/* Widget Style */}
          <section>
            <ReviewWidgets />
          </section>
        </div>
      </div>
    </div>
  )
}
