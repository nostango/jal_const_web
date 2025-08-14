import { ExternalLink, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const reviewSites = [
  {
    name: "Yelp",
    logo: "/gallery/yelp.svg",
    rating: 4.8,
    reviewCount: 127,
    url: "https://yelp.com/biz/your-construction-company",
    description: "See what our customers say about our construction services",
    bgColor: "bg-red-50",
    accentColor: "text-red-600",
  },
  {
    name: "Google Reviews",
    logo: "/gallery/google.svg",
    rating: 4.9,
    reviewCount: 89,
    url: "https://www.google.com/search?sca_esv=55a910f019e63594&sxsrf=AE3TifOQRx_Q42i0csrLclwB4cnOoIm-2A:1755120208527&q=JAL+Construction+Reviews&sa=X&ved=2ahUKEwjX3sSk3IiPAxUBFVkFHdWsHkMQ0bkNegQIHhAC&biw=1258&bih=876&dpr=2",
    description: "Check out our Google business profile and reviews",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
  },
  {
    name: "Angi",
    logo: "/gallery/angi.svg",
    rating: 4.7,
    reviewCount: 156,
    url: "https://angi.com/companydetails/your-construction-company",
    description: "Trusted by homeowners for quality construction work",
    bgColor: "bg-orange-50",
    accentColor: "text-orange-600",
  },/* 
  {
    name: "Better Business Bureau",
    logo: "/gallery/bbb.svg",
    rating: null,
    reviewCount: null,
    accreditation: "A+",
    url: "https://bbb.org/us/your-construction-company",
    description: "BBB Accredited Business with A+ rating",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-800",
  }, */
]

export default function ReviewWidgets() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {reviewSites.map((site) => (
        <Card
          key={site.name}
          className={`${site.bgColor} border-0 shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 min-w-xs max-w-sm`}
        >
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4 h-16 w-16 mx-auto">
              <Image
                src={site.logo || "/placeholder.svg"}
                alt={`${site.name} logo`}
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
            </div>

            <h3 className="font-semibold text-lg mb-2">{site.name}</h3>

            {/* {site.rating ? ( */}
            {/*   <div className="flex items-center justify-center gap-2 mb-2"> */}
            {/*     <div className="flex"> */}
            {/*       {[...Array(5)].map((_, i) => ( */}
            {/*         <Star */}
            {/*           key={i} */}
            {/*           className={`w-4 h-4 ${ */}
            {/*             i < Math.floor(site.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300" */}
            {/*           }`} */}
            {/*         /> */}
            {/*       ))} */}
            {/*     </div> */}
            {/*     <span className="font-medium">{site.rating}</span> */}
            {/*   </div> */}
            {/* ) : ( */}
            {/*   <div className={`${site.accentColor} font-bold text-xl mb-2`}>{site.accreditation}</div> */}
            {/* )} */}

            {/* {site.reviewCount && <p className="text-sm text-gray-600 mb-3">{site.reviewCount} reviews</p>} */}

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{site.description}</p>

            <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
              <Link href={site.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit {site.name}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}