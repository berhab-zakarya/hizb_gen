import { useState } from 'react';
import Image from 'next/image';

interface ImageLoaderProps {
  src: string;
  priority?: boolean;
  actualPageNumber: number;
  onLoad?: () => void;
}

const ImageLoader = ({ src, priority = false, actualPageNumber, onLoad }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={`صفحة ${actualPageNumber}`}
        width={800}
        height={1200}
        className="w-full h-full object-contain"
        loading={priority ? "eager" : "lazy"}
        onLoadingComplete={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  );
};

export default ImageLoader;