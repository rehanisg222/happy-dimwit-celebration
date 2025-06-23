
import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface PoemsSectionProps {
  onBack: () => void;
}

const PoemsSection = ({ onBack }: PoemsSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Generate 53 placeholder images
  const images = Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/400/600?random=${i + 1}`,
    alt: `Poem ${i + 1}`,
  }));

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-pink-girly hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-inter font-medium">Back</span>
        </button>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">
          Poems for You
        </h2>
        <p className="text-gray-300 font-inter">
          53 beautiful pieces written with love
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover-lift bg-gradient-to-br from-pink-girly/20 to-purple-girly/20"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-pink-girly transition-colors duration-300"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-girly transition-colors duration-300"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-girly transition-colors duration-300"
          >
            <ArrowLeft className="w-8 h-8 rotate-180" />
          </button>

          <div className="max-w-4xl max-h-full">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PoemsSection;
