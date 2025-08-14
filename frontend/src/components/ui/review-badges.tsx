"use client"
import Image from "next/image"
import Link from "next/link"

const reviewSites = [
  {
    name: "Yelp",
    logo: "/placeholder.svg?height=40&width=40&text=Y",
    hoverText: "Check us out on Yelp!",
    url: "https://yelp.com/biz/your-construction-company",
    color: "bg-red-600",
  },
  {
    name: "Google",
    logo: "/placeholder.svg?height=40&width=40&text=G",
    hoverText: "See our Google Reviews!",
    url: "https://google.com/maps/place/your-construction-company",
    color: "bg-blue-600",
  },
  {
    name: "Angi",
    logo: "/placeholder.svg?height=40&width=40&text=A",
    hoverText: "Find us on Angi!",
    url: "https://www.angi.com/companylist/us/ct/bridgeport/j-a-l-construction-reviews-1.htm",
    color: "bg-orange-600",
  },
  {
    name: "BBB",
    logo: "/placeholder.svg?height=40&width=40&text=BBB",
    hoverText: "Better Business Bureau",
    url: "https://bbb.org/us/your-construction-company",
    color: "bg-blue-800",
  },
]

export default function ReviewBadges() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-6">
      {reviewSites.map((site) => (
        <Link key={site.name} href={site.url} target="_blank" rel="noopener noreferrer" className="group relative">
          <div className="relative overflow-hidden rounded-full transition-all duration-300 ease-in-out group-hover:rounded-full group-hover:px-6 group-hover:w-auto w-16 h-16 flex items-center justify-center bg-white shadow-lg border-2 border-gray-200 group-hover:shadow-xl">
            {/* Logo - visible by default, hidden on hover */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
              <Image
                src={site.logo || "/placeholder.svg"}
                alt={`${site.name} logo`}
                width={32}
                height={32}
                className="rounded"
              />
            </div>

            {/* Text - hidden by default, visible on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-sm font-medium text-gray-800 px-2">
              {site.hoverText}
            </div>
          </div>

          {/* Colored background that appears on hover */}
          <div
            className={`absolute inset-0 ${site.color} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
          />
        </Link>
      ))}
    </div>
  )
}