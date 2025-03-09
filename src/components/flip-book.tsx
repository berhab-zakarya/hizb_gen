"use client"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, Minimize, Shuffle, X } from "lucide-react"
import { useFlipBook } from "@/hooks/use-flip-book"
import { ControlPanel } from "./quran/control-panel"
import { QuranPage } from "./quran/quran-page"
import { ThumnPanel } from "./quran/thumn-panel"
import { hizbData, totalPages } from "@/lib/quran-data"

// Define proper types for the HTMLFlipBook component and its instance
interface PageFlip {
  flip: (pageIndex: number) => void
  flipNext: () => void
  flipPrev: () => void
  turnToPage: (pageIndex: number) => void
  getCurrentPageIndex: () => number
  totalPages: number
  getFlipType: () => string
}

// Define interface for the HTMLFlipBook component's ref
interface HTMLFlipBookRef {
  pageFlip: () => PageFlip
}

const VISIBLE_PAGES = 4
const PRELOAD_PAGES = 2

const FlipBook = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const flipBookRef = useRef<HTMLFlipBookRef>({} as HTMLFlipBookRef)
  const bookContainerRef = useRef<HTMLDivElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showThumnPanel, setShowThumnPanel] = useState(false)
  const [bookSize, setBookSize] = useState({ width: 400, height: 600 })

  const {
    pageNumber,
    setPageNumber,
    selectedHizb,
    isLoading,
    reversedImages,
 //   loadingStates,
    handleImageLoad,
    handlePageFlip,
    goToPrevPage,
    goToNextPage,
    goToPage,
    goToHizb,
    handleRandomSelection,
    selectedThumn,
    currentThumn,
    showThumnImage,
    setShowThumnImage,
    selectedCategory,
    customRange,
    setCustomRange,
    goToThumnPage,
    getThumnImageName,
    handleCustomRangeSelect,
  } = useFlipBook(flipBookRef)

  // Calculate responsive book size
  useEffect(() => {
    const updateBookSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const containerHeight = window.innerHeight * 0.7 // 70% of viewport height

        // Adjust width based on whether thumn panel is shown
        const availableWidth = showThumnPanel ? containerWidth * 0.7 : containerWidth * 0.9

        // Maintain aspect ratio (3:4)
        const aspectRatio = 3 / 4
        let width = Math.min(availableWidth / 2, 400) // Max width of 400px per page (800px for the spread)
        let height = width / aspectRatio

        // If height is too tall, adjust based on height
        if (height > containerHeight) {
          height = containerHeight
          width = height * aspectRatio
        }

        setBookSize({ width, height })
      }
    }

    updateBookSize()
    window.addEventListener("resize", updateBookSize)
    return () => window.removeEventListener("resize", updateBookSize)
  }, [showThumnPanel])

  // Toggle fullscreen mode specifically for the book
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (bookContainerRef.current?.requestFullscreen) {
        bookContainerRef.current
          .requestFullscreen()
          .then(() => setIsFullScreen(true))
          .catch((err) => console.error(`Error attempting to enable fullscreen: ${err.message}`))
      }
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => setIsFullScreen(false))
          .catch((err) => console.error(`Error attempting to exit fullscreen: ${err.message}`))
      }
    }
  }

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Toggle thumn panel
  const toggleThumnPanel = () => {
    setShowThumnPanel(!showThumnPanel)
  }

  return (
    <div ref={containerRef} dir="rtl" className="flex flex-col items-center p-4 bg-white min-h-screen relative">
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-emerald-700 font-medium">جاري تحميل المصحف...</p>
          </div>
        </div>
      )}

      <div className="flex w-full max-w-7xl justify-between items-start gap-4">
        {/* Thumn Panel - Integrated directly into the layout */}
        {showThumnPanel && (
          <div className="thumn-panel bg-white border border-emerald-100 rounded-xl shadow-lg p-4 w-80 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-emerald-700">اختيار ثُمن</h3>
              <button onClick={toggleThumnPanel} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <ThumnPanel
              selectedThumn={selectedThumn}
              currentThumn={currentThumn}
              showThumnImage={showThumnImage}
              setShowThumnImage={setShowThumnImage}
              selectedCategory={selectedCategory}
              customRange={customRange}
              setCustomRange={setCustomRange}
              handleRandomSelection={handleRandomSelection}
              handleCustomRangeSelect={handleCustomRangeSelect}
              goToThumnPage={goToThumnPage}
              getThumnImageName={getThumnImageName}
              onClose={toggleThumnPanel}
            />
          </div>
        )}

        {/* Flipbook Container */}
        <div
          ref={bookContainerRef}
          className={`flipbook-container flex-grow flex justify-center ${isFullScreen ? "bg-gray-900 p-8" : ""}`}
          style={{ direction: "rtl" }}
        >
          <HTMLFlipBook
            ref={flipBookRef as React.RefObject<any>}
            width={isFullScreen ? Math.min(window.innerWidth * 0.4, 600) : bookSize.width}
            height={isFullScreen ? window.innerHeight * 0.8 : bookSize.height}
            className="quran-flipbook shadow-xl rounded-lg"
            showCover={true}
            size="fixed"
            minWidth={0}
            maxWidth={0}
            minHeight={0}
            maxHeight={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            useMouseEvents={true}
            swipeDistance={0}
            mobileScrollSupport={true}
            clickEventForward={false}
            onFlip={handlePageFlip}
            disableFlipByClick={false}
            style={{}}
            startPage={0}
          >
            {reversedImages.map((image, index) => {
              const actualPageNumber = totalPages - index
              const isNearCurrent = Math.abs(index - (totalPages - pageNumber)) <= VISIBLE_PAGES
              const shouldPreload = Math.abs(index - (totalPages - pageNumber)) <= PRELOAD_PAGES

              return (
                <QuranPage
                  key={index}
                  image={image}
                  index={index}
                  actualPageNumber={actualPageNumber}
                  isNearCurrent={isNearCurrent}
                  shouldPreload={shouldPreload}
                  onLoad={() => handleImageLoad(index)}
                  width={isFullScreen ? Math.min(window.innerWidth * 0.4, 600) : bookSize.width}
                  height={isFullScreen ? window.innerHeight * 0.8 : bookSize.height}
                />
              )
            })}
          </HTMLFlipBook>

          {/* Fullscreen Controls */}
          {isFullScreen && (
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={toggleFullScreen}
                className="p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all"
                title="إنهاء ملء الشاشة"
              >
                <Minimize className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ControlPanel
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        goToPage={goToPage}
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}
        handleRandomSelection={handleRandomSelection}
        selectedHizb={selectedHizb}
        goToHizb={goToHizb}
        hizbData={hizbData}
        toggleThumnPanel={toggleThumnPanel}
        showThumnPanel={showThumnPanel}
      />

      {/* Quick Navigation Floating Buttons */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-2">
        <button
          onClick={goToPrevPage}
          className="p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextPage}
          className="p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all"
          aria-label="الصفحة التالية"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Thumn Panel Toggle Button */}
      <button
        onClick={toggleThumnPanel}
        className={`fixed bottom-24 left-6 p-3 ${showThumnPanel ? "bg-emerald-700" : "bg-emerald-600"} text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all`}
        aria-label="اختيار ثمن عشوائي"
      >
        <Shuffle className="h-6 w-6" />
      </button>
    </div>
  )
}

export default FlipBook

