import ReviewBadges from "./ui/review-badges"
import ReviewWidgets from "./ui/review-widgets"

export default function TrustBadges() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Online Reviews</h1>
          <p className="text-gray-600">See what our customers are saying about us</p>
        </div>

        <div className="space-y-16">
          {/* Circular Hover Badges 
          <section>
            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Hover Review Badges</h2>
            <ReviewBadges />
          </section>
          */}

          {/* Widget Style */}
          <section>
            <ReviewWidgets />
          </section>
        </div>
      </div>
    </div>
  )
}
