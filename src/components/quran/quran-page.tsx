import type React from "react"
import LazyImage from "../ui/lazy-image"

interface QuranPageProps {
  image: string
  index: number
  actualPageNumber: number
  isNearCurrent: boolean
  shouldPreload: boolean
  onLoad: () => void
  width: number
  height: number
}

export const QuranPage: React.FC<QuranPageProps> = ({
  image,
  index,
  actualPageNumber,
  isNearCurrent,
  shouldPreload,
  onLoad,
  width,
  height,
}) => {
  if (!isNearCurrent && !shouldPreload) {
    return <div className="quran-page bg-cream" data-page-number={actualPageNumber} style={{ width, height }} />
  }

  return (
    <div
      className="quran-page bg-[#fcf9e9] rounded-lg overflow-hidden"
      data-page-number={actualPageNumber}
      style={{ width, height }}
    >
      <div className="relative w-full h-full">
        <LazyImage
          src={image}
          alt={`صفحة ${actualPageNumber}`}
          width={width}
          height={height}
          priority={shouldPreload}
          onLoad={onLoad}
        />
        <div className="absolute bottom-2 left-2 bg-white/70 text-emerald-800 px-2 py-1 rounded-md text-sm font-medium shadow-sm">
          {actualPageNumber}
        </div>
      </div>
    </div>
  )
}

