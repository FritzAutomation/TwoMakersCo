"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  mainImage: string | null;
  images: string[] | null;
  productName: string;
}

export default function ImageGallery({ mainImage, images, productName }: ImageGalleryProps) {
  // Combine main image with additional images
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...(images || []),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10">
        <div className="h-full w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-transparent" />
          <div className="absolute top-8 left-16 w-32 h-12 bg-white/80 rounded-full blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 h-3/4">
            <div className="absolute bottom-0 left-[-20%] w-[70%] h-full bg-green-400 rounded-t-full" />
            <div className="absolute bottom-0 right-[-10%] w-[60%] h-[90%] bg-green-500 rounded-t-full" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-white/50 text-lg font-medium">
            Product Image
          </span>
        </div>
      </div>
    );
  }

  const selectedImage = allImages[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10 relative group">
        <Image
          src={selectedImage}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          width={600}
          height={600}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full object-cover"
          priority
        />

        {/* Navigation arrows for multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brown"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brown"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-14 px-3 py-1 rounded-full">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === selectedIndex
                  ? "border-brown"
                  : "border-transparent hover:border-brown/30"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
