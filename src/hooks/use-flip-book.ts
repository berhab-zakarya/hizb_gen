"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { getQuarterPages } from "@/types/quran_hizb_pages"
import { hizbData, images, totalPages } from "@/lib/quran-data"

interface PageFlip {
  flip: (pageIndex: number) => void
  flipNext: () => void
  flipPrev: () => void
  turnToPage: (pageIndex: number) => void
  getCurrentPageIndex: () => number
  totalPages: number
  getFlipType: () => string
}

interface HTMLFlipBookRef {
  pageFlip: () => PageFlip
}

const PRELOAD_WINDOW = 5

export const useFlipBook = (flipBookRef: React.RefObject<HTMLFlipBookRef>) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [selectedHizb, setSelectedHizb] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const reversedImages = [...images].reverse()
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 10])
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({})

  const [selectedThumn, setSelectedThumn] = useState<{ name: string; page: number; hizb: string } | null>(null)
  const [currentThumn, setCurrentThumn] = useState<number | null>(null)
  const [showThumnImage, setShowThumnImage] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [customRange, setCustomRange] = useState({ min: 1, max: 60 })

  // Preload images around the current page
  const preloadImages = useCallback(
    (currentPage: number) => {
      const pagesToPreload = []
      const preloadWindow = 2

      for (let i = -preloadWindow; i <= preloadWindow; i++) {
        const pageToLoad = currentPage + i
        if (pageToLoad >= 1 && pageToLoad <= totalPages) {
          const imgSrc = images[pageToLoad - 1]
          if (!loadedImages.has(imgSrc)) {
            pagesToPreload.push(imgSrc)
          }
        }
      }

      pagesToPreload.forEach((src) => {
        const img = new window.Image()
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(src))
        }
        img.src = src
      })
    },
    [loadedImages],
  )

  // Update visible range when page changes
  useEffect(() => {
    const updateVisibleRange = () => {
      const start = Math.max(0, pageNumber - PRELOAD_WINDOW)
      const end = Math.min(totalPages - 1, pageNumber + PRELOAD_WINDOW)
      setVisibleRange([start, end])
    }

    updateVisibleRange()
    preloadImages(pageNumber)
  }, [pageNumber, preloadImages])

  // Preload all images initially
  useEffect(() => {
    const preloadInitialImages = async () => {
      setIsLoading(true)

      // Preload first few pages immediately
      const initialPages = images.slice(0, 10)
      const preloadPromises = initialPages.map((imgSrc) => {
        return new Promise<void>((resolve) => {
          if (!loadedImages.has(imgSrc)) {
            const img = new window.Image()
            img.onload = () => {
              setLoadedImages((prev) => new Set(prev).add(imgSrc))
              resolve()
            }
            img.onerror = () => {
              console.error(`Failed to load image: ${imgSrc}`)
              resolve()
            }
            img.src = imgSrc
          } else {
            resolve()
          }
        })
      })

      await Promise.all(preloadPromises)

      // Then load the rest in the background
      images.slice(10).forEach((imgSrc) => {
        if (!loadedImages.has(imgSrc)) {
          const img = new window.Image()
          img.onload = () => {
            setLoadedImages((prev) => new Set(prev).add(imgSrc))
          }
          img.src = imgSrc
        }
      })

      // Set loading to false after initial pages are loaded
      setIsLoading(false)
    }

    preloadInitialImages()
  }, [])

  // Update loading state when all images are loaded
  useEffect(() => {
    if (loadedImages.size === images.length) {
      setIsLoading(false)
    }
  }, [loadedImages])

  // Navigation functions - adjusted for proper book navigation
  const goToPrevPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev()
    }
  }, [flipBookRef])

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext()
    }
  }, [flipBookRef])

  // Go to specific page
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setPageNumber(page)
        // Calculate the correct page index for the book
        // In a book view, we need to calculate which spread contains our target page
        const pageIndex = Math.floor((totalPages - page) / 2)
        safeFlip(pageIndex)
      }
    },
    [totalPages],
  )

  // Go to specific Hizb
  const goToHizb = useCallback(
    (hizbNumber: number) => {
      const hizb = hizbData.find((h) => h.hizb === hizbNumber)

      if (hizb) {
        setSelectedHizb(hizbNumber)
        const startPage = hizb.startPage
        setPageNumber(startPage)
        // Calculate the correct page index for the book
        const pageIndex = Math.floor((totalPages - startPage) / 2)
        safeFlip(pageIndex)
      }
    },
    [totalPages],
  )

  // Handle page flip event
  const handlePageFlip = useCallback(
    (e: any) => {
      // The current page index from the event
      const currentPageIndex = e.data

      // Calculate the actual page number from the page index
      // In a book view with two pages per spread, we need to convert the index to a page number
      const calculatedPage = totalPages - currentPageIndex * 2

      // Set the page number
      setPageNumber(calculatedPage)

      // Update the visible range for preloading
      const start = Math.max(0, currentPageIndex - PRELOAD_WINDOW)
      const end = Math.min(totalPages / 2, currentPageIndex + PRELOAD_WINDOW)
      setVisibleRange([start, end])
    },
    [totalPages],
  )

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      [index]: true,
    }))
  }, [])

  // Safe flip function with fallbacks
  const safeFlip = useCallback(
    (index: number) => {
      const safeIndex = Math.round(index)
      const maxIndex = Math.floor(reversedImages.length / 2)
      const boundedIndex = Math.max(0, Math.min(safeIndex, maxIndex))

      if (flipBookRef.current) {
        try {
          flipBookRef.current.pageFlip().turnToPage(boundedIndex)
          return true
        } catch (error) {
          console.error("Error during turnToPage operation:", error)
          try {
            flipBookRef.current.pageFlip().flip(boundedIndex)
            return true
          } catch (flipError) {
            console.error("Error during fallback flip operation:", flipError)
            return false
          }
        }
      }
      return false
    },
    [reversedImages.length, flipBookRef],
  )

  // Go to Thumn page
  const goToThumnPage = useCallback(() => {
    if (selectedThumn && selectedThumn.page) {
      const pageIndex = Math.floor((totalPages - selectedThumn.page) / 2)
      setPageNumber(selectedThumn.page)
      safeFlip(pageIndex)
    }
  }, [selectedThumn, totalPages, safeFlip])

  // Handle random selection within a range
  const handleRandomSelection = useCallback((minHizb: number, maxHizb: number) => {
    setIsLoading(true)
    setShowThumnImage(false)
    setSelectedCategory(`${minHizb}-${maxHizb}`)

    setTimeout(() => {
      const randomHizb = Math.floor(Math.random() * (maxHizb - minHizb + 1)) + minHizb
      const randomThumn = Math.floor(Math.random() * 8) + 1
      const thumnNumber = (randomHizb - 1) * 8 + randomThumn

      const page = getQuarterPages(randomHizb, randomThumn)?.pages[0] || 1

      setSelectedThumn({
        name: randomThumn.toString(),
        page: page,
        hizb: randomHizb.toString(),
      })
      setCurrentThumn(thumnNumber)
      setIsLoading(false)
    }, 300)
  }, [])

  // Handle custom range selection
  const handleCustomRangeSelect = useCallback(() => {
    if (customRange.min > 0 && customRange.max <= 60 && customRange.min <= customRange.max) {
      handleRandomSelection(customRange.min, customRange.max)
    }
  }, [customRange, handleRandomSelection])

  // Get Thumn image name
  const getThumnImageName = useCallback((thumnNumber: number) => {
    return thumnNumber.toString().padStart(3, "0")
  }, [])

  return {
    pageNumber,
    setPageNumber,
    selectedHizb,
    isLoading,
    reversedImages,
    loadingStates,
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
  }
}

