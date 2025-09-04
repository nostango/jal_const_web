"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
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
  console.log("--- Rendering IconGallery component ---");
  const [selectedGallery, setSelectedGallery] = useState<(typeof galleries)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

      {/* This is where the popup is, I would like to perfect the logic for the positioning of the popup and everything */}
      {selectedGallery && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-end justify-center p-4 py-160"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onClick={closeGallery}
        >
          <div
            className="relative bg-white/10 rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeGallery}
              className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Gallery title */}
            <div className="absolute top-4 left-4 z-20">
              <h2 className="text-white text-2xl font-bold">{selectedGallery.name}</h2>
              <p className="text-white/70">
                {currentImageIndex + 1} of {selectedGallery.images.length}
              </p>
            </div>

            {/* Navigation buttons */}
            {selectedGallery.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            {/* Main image */}
            <div className="relative flex-1 w-full h-full">
              <Image
                src={selectedGallery.images[currentImageIndex].src || "/placeholder.svg"}
                alt={selectedGallery.images[currentImageIndex].alt}
                fill
                className="object-contain p-12"
                sizes="(max-width: 1024px) 90vw, 80vw"
                priority
              />
            </div>

            {/* Image thumbnails */}
            {selectedGallery.images.length > 1 && (
              <div className="flex-shrink-0 p-4 bg-black/50">
                <div className="flex justify-center gap-2">
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
