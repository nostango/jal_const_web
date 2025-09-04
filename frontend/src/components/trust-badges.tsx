import ReviewWidgets from "./ui/review-widgets"
import { useTranslation } from "react-i18next"

export default function TrustBadges() {
  console.log("--- Rendering TrustBadges component ---");
  const { t } = useTranslation('trust-badges')
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
  )
}
