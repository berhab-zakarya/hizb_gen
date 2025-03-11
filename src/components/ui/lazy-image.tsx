import type React from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  onLoad?: () => void
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height, priority = false, onLoad }) => {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      onLoad={onLoad}
      className="w-full h-full object-contain"
      style={{ objectFit: "contain" }}
    />
  )
}

export default LazyImage

