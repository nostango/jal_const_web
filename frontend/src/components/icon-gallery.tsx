"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface IconGalleryProps {
  columns?: number // Number of columns in the grid
}

const galleries = [
  {
    id: 1,
    name: "Patio",
    thumbnail: "/gallery/horizontal-scroll/image-1.jpg",
    images: [
      {
        src: "/gallery/horizontal-scroll/image-1.jpg",
        alt: "Beautiful landscape view",
      },
      {
        src: "/gallery/horizontal-scroll/image-2.jpg",
        alt: "Mountain scenery",
      },
      {
        src: "/gallery/horizontal-scroll/image-3.jpg",
        alt: "Forest pathway",
      },
    ],
  },
  {
    id: 2,
    name: "Porch",
    thumbnail: "/gallery/horizontal-scroll/image-2.jpg",
    images: [
      {
        src: "/gallery/horizontal-scroll/image-2.jpg",
        alt: "City skyline at night",
      },
      {
        src: "/gallery/horizontal-scroll/image-4.jpg",
        alt: "Street photography",
      },
      {
        src: "/gallery/horizontal-scroll/image-5.jpg",
        alt: "Architecture details",
      },
    ],
  },
  {
    id: 3,
    name: "Portrait Series",
    thumbnail: "/gallery/horizontal-scroll/image-3.jpg",
    images: [
      {
        src: "/gallery/horizontal-scroll/image-3.jpg",
        alt: "Portrait photography",
      },
      {
        src: "/gallery/horizontal-scroll/image-1.jpg",
        alt: "Creative portraits",
      },
    ],
  },
  {
    id: 4,
    name: "Abstract Art",
    thumbnail: "/gallery/horizontal-scroll/image-4.jpg",
    images: [
      {
        src: "/gallery/horizontal-scroll/image-4.jpg",
        alt: "Abstract composition",
      },
      {
        src: "/gallery/horizontal-scroll/image-5.jpg",
        alt: "Color studies",
      },
      {
        src: "/gallery/horizontal-scroll/image-1.jpg",
        alt: "Geometric patterns",
      },
    ],
  },
  {
    id: 5,
    name: "Travel Memories",
    thumbnail: "/gallery/horizontal-scroll/image-5.jpg",
    images: [
      {
        src: "/gallery/horizontal-scroll/image-5.jpg",
        alt: "Travel destination",
      },
      {
        src: "/gallery/horizontal-scroll/image-2.jpg",
        alt: "Cultural landmarks",
      },
      {
        src: "/gallery/horizontal-scroll/image-3.jpg",
        alt: "Local experiences",
      },
    ],
  },
  {
    id: 6,
    name: "Minimalist",
    thumbnail: "/gallery/horizontal-scroll/image-1.jpg",
    images: [
      {
        src: "/gallery/horizontal-scroll/image-1.jpg",
        alt: "Clean compositions",
      },
      {
        src: "/gallery/horizontal-scroll/image-4.jpg",
        alt: "Simple elegance",
      },
    ],
  },
]

export default function IconGallery({ columns = 3 }: IconGalleryProps) {
  const [selectedGallery, setSelectedGallery] = useState<(typeof galleries)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { t } = useTranslation('icon-gallery')

  const openGallery = (gallery: (typeof galleries)[0]) => {
    setSelectedGallery(gallery)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedGallery(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev === selectedGallery.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedGallery.images.length - 1 : prev - 1))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeGallery()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  return (
    <>
      <div className={`grid gap-6 p-10`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => openGallery(gallery)}
          >
            <Image
              src={gallery.thumbnail || "/placeholder.svg"}
              alt={gallery.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg text-balance transition-colors">
                {gallery.name}
              </h3>
              <p className="text-white/80 text-sm">
                {gallery.images.length} {gallery.images.length === 1 ? "image" : "images"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedGallery && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Gallery title */}
          <div className="absolute top-4 left-4 z-10">
            <h2 className="text-white text-2xl font-bold">{selectedGallery.name}</h2>
            <p className="text-white/70">
              {currentImageIndex + 1} of {selectedGallery.images.length}
            </p>
          </div>

          {/* Navigation buttons */}
          {selectedGallery.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Main image */}
          <div className="relative w-full h-full flex items-center justify-center p-16">
            <Image
              src={selectedGallery.images[currentImageIndex].src || "/placeholder.svg"}
              alt={selectedGallery.images[currentImageIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image thumbnails */}
          {selectedGallery.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
              {selectedGallery.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-16 rounded overflow-hidden transition-all ${
                    index === currentImageIndex ? "ring-2 ring-white scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
