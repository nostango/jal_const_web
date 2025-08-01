"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface HorizontalGalleryProps {
  height?: number // Height in pixels
}

const photos = [
  {
    id: 1,
    src: "/gallery/horizontal-scroll/image-1.jpg",
    alt: "Description of image 1",
    width: 600,
    height: 400,
  },
  {
    id: 2,
    src: "/gallery/horizontal-scroll/image-2.jpg",
    alt: "Description of image 2",
    width: 300,
    height: 400,
  },
  {
    id: 3,
    src: "/gallery/horizontal-scroll/image-3.jpg",
    alt: "Description of image 3",
    width: 700,
    height: 400,
  },
  {
    id: 4,
    src: "/gallery/horizontal-scroll/image-4.jpg",
    alt: "Description of image 4",
    width: 500,
    height: 400,
  },
  {
    id: 5,
    src: "/gallery/horizontal-scroll/image-5.jpg",
    alt: "Description of image 5",
    width: 800,
    height: 400,
  },
  {
    id: 6,
    src: "/gallery/horizontal-scroll/image-6.jpg",
    alt: "Description of image 6",
    width: 450,
    height: 400,
  },
  {
    id: 7,
    src: "/gallery/horizontal-scroll/image-7.jpg",
    alt: "Description of image 7",
    width: 900,
    height: 400,
  },
  {
    id: 8,
    src: "/gallery/horizontal-scroll/image-8.jpg",
    alt: "Description of image 8",
    width: 600,
    height: 400,
  },
]

export default function HorizontalGallery({ height = 400 }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || isDragging) return

    const container = containerRef.current
    if (!container) return

    const scrollSpeed = 0.5 // pixels per frame
    let animationFrame: number

    const scroll = () => {
      container.scrollLeft += scrollSpeed

      // Reset to beginning when reaching the end
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0
      }

      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [autoScroll, isDragging])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoScroll(false)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    e.preventDefault()
    const x = e.pageX - (containerRef.current.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Resume auto-scroll after a delay
    setTimeout(() => setAutoScroll(true), 2000)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setTimeout(() => setAutoScroll(true), 2000)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setAutoScroll(false)
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const x = e.touches[0].pageX - (containerRef.current.offsetLeft || 0)
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setAutoScroll(true), 2000)
  }

  // Duplicate photos for seamless infinite scroll
  const duplicatedPhotos = [...photos, ...photos, ...photos]

  return (
    <div className="w-screen overflow-hidden" style={{ height: `${height}px` }}>
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          height: `${height}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {duplicatedPhotos.map((photo, index) => {
          // Calculate width to maintain aspect ratio with fixed height
          const aspectRatio = photo.width / photo.height
          const displayWidth = Math.round(height * aspectRatio)

          return (
            <div
              key={`${photo.id}-${index}`}
              className="flex-shrink-0"
              style={{ width: `${displayWidth}px`, height: `${height}px` }}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-full object-cover"
                quality={95}
                priority={index < 5}
                sizes="(max-width: 768px) 50vw, 33vw"
                draggable={false}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
