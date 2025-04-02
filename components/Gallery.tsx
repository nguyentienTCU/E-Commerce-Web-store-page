"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  productMedia: string[];
}

const Gallery = ({ productMedia }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? productMedia.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === productMedia.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={productMedia[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        {productMedia.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {productMedia.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {productMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                currentIndex === index
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={media}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
