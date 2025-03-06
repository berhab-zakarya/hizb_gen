import { useState } from 'react';
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  onLoad?: () => void;
}

const LazyImage = ({ src, alt, width, height, priority = false, onLoad }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
      />
    </div>
  );
};

export default LazyImage;