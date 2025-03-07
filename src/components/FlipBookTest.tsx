/* eslint-disable */
"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import LazyImage from "./LazyImage";
import { getQuarterPages } from "@/types/quran_hizb_pages";
import { Book, ChevronLeft, ChevronRight, Maximize, Minimize, Search, SkipBack, SkipForward, Shuffle } from "lucide-react";

// Define proper types for the HTMLFlipBook component and its instance
interface PageFlip {
  flip: (pageIndex: number) => void;
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (pageIndex: number) => void;
  getCurrentPageIndex: () => number;
  totalPages: number;
  getFlipType: () => string;
}

// Define interface for the HTMLFlipBook component's ref
interface HTMLFlipBookRef {
  pageFlip: () => PageFlip;
}

const images = Array.from(
  { length: 604 },
  (_, i) => `/images/__02.01.05.Masahif-Qira'at-Nafe_removed-${i + 1}.webp`
);

const hizbData = [
  { hizb: 1, startPage: 1 },
  { hizb: 2, startPage: 11 },
  { hizb: 3, startPage: 22 },
  { hizb: 4, startPage: 32 },
  { hizb: 5, startPage: 42 },
  { hizb: 6, startPage: 51 },
  { hizb: 7, startPage: 62 },
  { hizb: 8, startPage: 71 },
  { hizb: 9, startPage: 82 },
  { hizb: 10, startPage: 92 },
  { hizb: 11, startPage: 102 },
  { hizb: 12, startPage: 111 },
  { hizb: 13, startPage: 121 },
  { hizb: 14, startPage: 132 },
  { hizb: 15, startPage: 142 },
  { hizb: 16, startPage: 151 },
  { hizb: 17, startPage: 162 },
  { hizb: 18, startPage: 173 },
  { hizb: 19, startPage: 182 },
  { hizb: 20, startPage: 192 },
  { hizb: 21, startPage: 201 },
  { hizb: 22, startPage: 212 },
  { hizb: 23, startPage: 222 },
  { hizb: 24, startPage: 231 },
  { hizb: 25, startPage: 242 },
  { hizb: 26, startPage: 252 },
  { hizb: 27, startPage: 262 },
  { hizb: 28, startPage: 272 },
  { hizb: 29, startPage: 282 },
  { hizb: 30, startPage: 292 },
  { hizb: 31, startPage: 302 },
  { hizb: 32, startPage: 312 },
  { hizb: 33, startPage: 322 },
  { hizb: 34, startPage: 332 },
  { hizb: 35, startPage: 342 },
  { hizb: 36, startPage: 352 },
  { hizb: 37, startPage: 362 },
  { hizb: 38, startPage: 371 },
  { hizb: 39, startPage: 382 },
  { hizb: 40, startPage: 392 },
  { hizb: 41, startPage: 402 },
  { hizb: 42, startPage: 413 },
  { hizb: 43, startPage: 422 },
  { hizb: 44, startPage: 431 },
  { hizb: 45, startPage: 442 },
  { hizb: 46, startPage: 451 },
  { hizb: 47, startPage: 462 },
  { hizb: 48, startPage: 472 },
  { hizb: 49, startPage: 482 },
  { hizb: 50, startPage: 491 },
  { hizb: 51, startPage: 502 },
  { hizb: 52, startPage: 513 },
  { hizb: 53, startPage: 522 },
  { hizb: 54, startPage: 531 },
  { hizb: 55, startPage: 542 },
  { hizb: 56, startPage: 553 },
  { hizb: 57, startPage: 562 },
  { hizb: 58, startPage: 572 },
  { hizb: 59, startPage: 582 },
  { hizb: 60, startPage: 591 },
];

const athmanData = [
  { name: "الأول", page: 1 },
  { name: "الثاني", page: 6 },
  { name: "الثالث", page: 11 },
  { name: "الرابع", page: 16 },
  { name: "الخامس", page: 21 },
  { name: "السادس", page: 26 },
  { name: "السابع", page: 31 },
  { name: "الثامن", page: 36 },
];

// Define props for HTMLFlipBook component
interface FlipBookProps {
  width: number;
  height: number;
  className?: string;
  showCover?: boolean;
  startPage?: number;
  // Add the direction prop explicitly
  direction?: "rtl" | "ltr";
  onFlip?: (e: any) => void;
  flippingTime?: number;
  usePortrait?: boolean;
  maxShadowOpacity?: number;
  children?: React.ReactNode;
}

const VISIBLE_PAGES = 4;
const PRELOAD_PAGES = 2;
const PRELOAD_WINDOW = 5;

const FlipBook = () => {
  // Use the properly typed ref
  const flipBookRef = useRef<HTMLFlipBookRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedHizb, setSelectedHizb] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = images.length;
  const reversedImages = [...images].reverse();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 10]);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {}
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedThumn, setSelectedThumn] = useState<{ name: string; page: number,hizb:string } | null>(null);
  const [currentThumn, setCurrentThumn] = useState<number | null>(null);
  const [showThumnImage, setShowThumnImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customRange, setCustomRange] = useState({ min: 1, max: 60 });
  
  
  const categories = [
    { name: "الحزب ١-١٠", minHizb: 1, maxHizb: 10 },
    { name: "الحزب ١١-٢٠", minHizb: 11, maxHizb: 20 },
    { name: "الحزب ٢١-٤٠", minHizb: 21, maxHizb: 40 },
    { name: "الحزب ٤١-٦٠", minHizb: 41, maxHizb: 60 },
  ];


  
  const selectRandomThumn = useCallback(() => {
    setIsLoading(true);
    setShowThumnImage(false);
    setTimeout(() => {
      const randomHizb = Math.floor(Math.random() * 60) + 1; // اختيار حزب عشوائي من 1 إلى 60
      const randomThumn = Math.floor(Math.random() * 8) + 1; // اختيار ثمن عشوائي من 1 إلى 8
      const thumnNumber = (randomHizb - 1) * 8 + randomThumn;
      // حساب رقم الثمن الكلي

      // الحصول على صفحة البدء للثمن
      const page = getQuarterPages(randomHizb, randomThumn)?.pages[0] || 1;

      // تحديث الحالة
      setSelectedThumn({
        name: randomThumn.toString(),
        page: page,
        hizb:randomHizb.toString()
      });
      setCurrentThumn(thumnNumber);
      console.log(`Hizb: ${randomHizb}, Thumn: ${randomThumn}, Calculated ThumnNumber: ${thumnNumber}`);
      setIsModalOpen(true);
      setIsLoading(false);
    }, 700);
  }, []);

  // دالة للانتقال إلى صفحة الثمن المختار
  const goToThumnPage = () => {
    if (selectedThumn && selectedThumn.page) {
      // Calculate the correct flip index
      const flipToIndex = totalPages - selectedThumn.page;
      console.log(`Going to page ${selectedThumn.page}, flip index: ${flipToIndex}`);
  
      // Update the page number state
      setPageNumber(selectedThumn.page);
  
      // Try to flip using safeFlip
      if (safeFlip(flipToIndex)) {
        console.log('Successfully flipped to page');
      } else {
        console.log('Failed to flip, trying alternative method');
        // Fallback to direct page set
        if (flipBookRef.current) {
          try {
            flipBookRef.current.pageFlip().turnToPage(flipToIndex);
          } catch (error) {
            console.error('Failed to turn to page:', error);
          }
        }
      }
  
      // Close the modal
      setIsModalOpen(false);
      setShowThumnImage(false);
    } else {
      console.error('No valid thumn page selected');
    }
  };

  // دالة لإنشاء اسم صورة الثمن
  const getThumnImageName = (thumnNumber: number) => {
    return (thumnNumber ).toString().padStart(3, "0"); // تحويل الرقم إلى تنسيق ثلاثي الأرقام
  };
   

  const handleCustomRangeSelect = () => {
    if (customRange.min > 0 && customRange.max <= 60 && customRange.min <= customRange.max) {
      handleRandomSelection(customRange.min, customRange.max);
    }
  };

  const handleRandomSelection = (minHizb: number, maxHizb: number) => {
    setIsLoading(true);
    setShowThumnImage(false);
    setSelectedCategory(`${minHizb}-${maxHizb}`);
  
    setTimeout(() => {
      const randomHizb = Math.floor(Math.random() * (maxHizb - minHizb + 1)) + minHizb;
      const randomThumn = Math.floor(Math.random() * 8) + 1;
      const thumnNumber = (randomHizb - 1) * 8 + randomThumn;
  
      const page = getQuarterPages(randomHizb, randomThumn)?.pages[0] || 1;
  
      setSelectedThumn({
        name: randomThumn.toString(),
        page: page,
        hizb: randomHizb.toString()
      });
      setCurrentThumn(thumnNumber);
      setIsModalOpen(true);
      setIsLoading(false);
    }, 700);
  };
    
    

  const preloadImages = (currentPage: number) => {
    const pagesToPreload = [];
    const preloadWindow = 2;

    for (let i = -preloadWindow; i <= preloadWindow; i++) {
      const pageToLoad = currentPage + i;
      if (pageToLoad >= 1 && pageToLoad <= totalPages) {
        const imgSrc = images[pageToLoad - 1];
        if (!loadedImages.has(imgSrc)) {
          pagesToPreload.push(imgSrc);
        }
      }
    }

    pagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };
      img.src = src;
    });
  };

  // أضف هذا Effect
  useEffect(() => {
    preloadImages(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const updateVisibleRange = () => {
      const start = Math.max(0, pageNumber - PRELOAD_WINDOW);
      const end = Math.min(totalPages - 1, pageNumber + PRELOAD_WINDOW);
      setVisibleRange([start, end]);
    };

    updateVisibleRange();
  }, [pageNumber, totalPages]);

  useEffect(() => {
    images.forEach((imgSrc) => {
      // تحقق إذا كانت الصورة قد تم تحميلها مسبقًا
      if (!loadedImages.has(imgSrc)) {
        const img = new window.Image();
        img.src = imgSrc;
        img.onload = () => {
          // أضف الصورة إلى Set
          setLoadedImages((prev) => new Set(prev).add(imgSrc));
        };
      }
    });
  }, [images, loadedImages]);

  useEffect(() => {
    // تحقق إذا تم تحميل جميع الصور
    if (loadedImages.size === images.length) {
      setIsLoading(false);
    }
  }, [loadedImages]);

  // تنقل بين الصفحات
  const goToPrevPage = () => flipBookRef.current?.pageFlip().flipNext();
  const goToNextPage = () => flipBookRef.current?.pageFlip().flipPrev();

  // الانتقال لصفحة محددة
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);

      const flipToIndex = totalPages - page;
      flipBookRef.current?.pageFlip().flip(flipToIndex);
    }
  };

  const goToHizb = (hizbNumber: number) => {
    console.log(`goToHizb called with hizbNumber: ${hizbNumber}`);

    const hizb = hizbData.find((h) => h.hizb === hizbNumber);
    console.log(`Found hizb data:`, hizb);

    if (hizb) {
      setSelectedHizb(hizbNumber);
      const startPage = hizb.startPage;
      setPageNumber(startPage);

      const flipToIndex = totalPages - startPage;
      console.log(`Target flip index: ${flipToIndex}`);

      // Try the testNavigationMethods with the calculated index
      testNavigationMethods(flipToIndex);

      // Also try with the original safeFlip for comparison
      safeFlip(flipToIndex);
    }
  };

  // وضع ملء الشاشة
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handlePageFlip = (e: any) => {
    console.log(`handlePageFlip called with full event:`, e);
    console.log(`e.data: ${e.data}, typeof e.data: ${typeof e.data}`);

    // Check if we have access to the current page from the event
    const currentPageFromEvent = e.data;
    const calculatedPage = totalPages - currentPageFromEvent + 1;

    console.log(`Current page from event: ${currentPageFromEvent}`);
    console.log(`Calculated page: ${calculatedPage}`);

    // Get the current page directly from the flipBook ref as a cross-check
    const currentPageFromRef = flipBookRef.current
      ?.pageFlip()
      .getCurrentPageIndex();
    console.log(`Current page from ref: ${currentPageFromRef}`);

    // Calculate what page number this should be
    const pageNumberFromRef = totalPages - (currentPageFromRef || 0) + 1;
    console.log(`Page number from ref: ${pageNumberFromRef}`);

    // Set the page number based on the ref (might be more reliable)
    setPageNumber(pageNumberFromRef);

    const start = Math.max(0, currentPageFromEvent - PRELOAD_WINDOW);
    const end = Math.min(totalPages - 1, currentPageFromEvent + PRELOAD_WINDOW);
    setVisibleRange([start, end]);
  };

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Add this debugging function to test different navigation methods
  const testNavigationMethods = (targetIndex: number) => {
    console.log(`Testing navigation methods to index: ${targetIndex}`);

    if (flipBookRef.current) {
      const pageFlip = flipBookRef.current.pageFlip();

      // Try different methods based on what's available in the library
      console.log("Available methods:", Object.keys(pageFlip));

      try {
        console.log("Trying method: turnToPage");
        pageFlip.turnToPage(targetIndex);
      } catch (e) {
        console.error("turnToPage failed:", e);
      }
    }
  };

  const safeFlip = (index: number) => {
    console.log(`safeFlip called with index: ${index}`);

    // Ensure the index is an integer
    const safeIndex = Math.round(index);

    // Ensure it's within bounds
    const maxIndex = reversedImages.length - 1;
    const boundedIndex = Math.max(0, Math.min(safeIndex, maxIndex));
    console.log(`Attempting to turn to page index: ${boundedIndex}`);

    if (flipBookRef.current) {
      try {
        // Try turnToPage instead of flip
        flipBookRef.current.pageFlip().turnToPage(boundedIndex);
        return true;
      } catch (error) {
        console.error("Error during turnToPage operation:", error);

        // Fallback to the original flip method
        try {
          console.log(
            `Falling back to flip method with index: ${boundedIndex}`
          );
          flipBookRef.current.pageFlip().flip(boundedIndex);
          return true;
        } catch (flipError) {
          console.error("Error during fallback flip operation:", flipError);
          return false;
        }
      }
    }
    return false;
  };

  const directPageSet = (index: number) => {
    console.log(`Attempting direct page set to index: ${index}`);

    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      try {
        // Some implementations might allow this - worth a try
        const pageFlip = flipBookRef.current.pageFlip();
        if (typeof (pageFlip as any).currentPageIndex !== "undefined") {
          console.log("Trying to set currentPageIndex directly");
          (pageFlip as any).currentPageIndex = index;
          return true;
        }
      } catch (e) {
        console.error("Direct page set failed:", e);
      }
    }
    return false;
  };

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="flex flex-col items-center p-4 bg-white min-h-screen"
    >
      <div className="flipbook-container" style={{ direction: "rtl" }}>
        {/* Use the component with the proper casting to satisfy TypeScript */}
        <HTMLFlipBook
          ref={flipBookRef as React.RefObject<any>}
          width={400}
          height={600}
          className="quran-flipbook shadow-lg"
          showCover={true}
          startPage={images.length - 1}
          onFlip={handlePageFlip}
          flippingTime={500}
          usePortrait={false}
          maxShadowOpacity={0.5}
          style={{}}
          size="fixed"
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
          drawShadow={false}
          startZIndex={0}
          autoSize={false}
          mobileScrollSupport={true}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={0}
          showPageCorners={false}
          disableFlipByClick={true}
        >
          {reversedImages.map((image, index) => {
            const actualPageNumber = totalPages - index;
            const isNearCurrent =
              Math.abs(index - (totalPages - pageNumber)) <= VISIBLE_PAGES;
            const shouldPreload =
              Math.abs(index - (totalPages - pageNumber)) <= PRELOAD_PAGES;

            if (!isNearCurrent && !shouldPreload) {
              return (
                <div
                  key={index}
                  className="quran-page bg-cream"
                  data-page-number={actualPageNumber}
                />
              );
            }

            return (
              <div
                key={index}
                className="quran-page bg-cream"
                data-page-number={actualPageNumber}
              >
                <LazyImage
                  src={image}
                  alt={`صفحة ${actualPageNumber}`}
                  width={400}
                  height={600}
                  priority={shouldPreload}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            );
          })}
        </HTMLFlipBook>
      </div>

      {/* لوحة التحكم */}
      <div className="control-panel mt-6 w-full max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-md border border-emerald-100">
        {/* Current Page Indicator */}
        <div className="text-center mb-4">
          <p className="text-xl font-semibold text-emerald-700">
            صفحة <span className="text-2xl font-bold">{pageNumber}</span> من {totalPages}
          </p>
        </div>

        {/* Main Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {/* Navigation Buttons */}
          <div className="flex items-center bg-gray-50 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => goToPage(1)}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              title="الصفحة الأولى"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={goToPrevPage}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              title="الصفحة السابقة"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <div className="mx-2 flex items-center">
              <input
                type="number"
                value={pageNumber}
                onChange={(e) => setPageNumber(Number(e.target.value))}
                className="w-16 p-2 text-center border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="1"
                max={totalPages}
              />
              <button
                onClick={() => goToPage(pageNumber)}
                className="ml-1 p-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={goToNextPage}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              title="الصفحة التالية"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              title="الصفحة الأخيرة"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            <span>{isFullScreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}</span>
          </button>
          
          {/* Random Thumn Button */}
          <button
            onClick={() => handleRandomSelection(1, 60)}
            className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
          >
            <Shuffle className="h-4 w-4" />
            <span>ثُمن عشوائي</span>
          </button>
        </div>
        
        {/* Hizb Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">الانتقال إلى الحزب</label>
          <div className="relative">
            <select
              value={selectedHizb}
              onChange={(e) => goToHizb(Number(e.target.value))}
              className="w-full p-3 border border-gray-200 bg-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {hizbData.map((hizb) => (
                <option key={hizb.hizb} value={hizb.hizb}>
                  الحزب {hizb.hizb} - صفحة {hizb.startPage}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <ChevronLeft className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* Quick Navigation - Visual Hizb Grid */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">انتقال سريع للأحزاب</h3>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 60 }, (_, i) => i + 1).map((hizbNum) => (
              <button
                key={hizbNum}
                onClick={() => goToHizb(hizbNum)}
                className={`p-1 text-xs rounded ${
                  selectedHizb === hizbNum
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 hover:bg-emerald-100 text-gray-700"
                }`}
              >
                {hizbNum}
              </button>
            ))}
          </div>
        </div>
      </div>
        {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-arabic text-emerald-600">
          اختيار ثُمن عشوائي
        </h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* تصفية حسب النطاق */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">اختر نطاق الأحزاب:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleRandomSelection(category.minHizb, category.maxHizb)}
              className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                selectedCategory === `${category.minHizb}-${category.maxHizb}`
                  ? "bg-emerald-600 text-white"
                  : "bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* نطاق مخصص */}
        <div className="flex justify-center gap-4 items-center mt-10">
          <div className="flex items-center gap-2">
            <label className="text-sm">من الحزب:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={customRange.min}
              onChange={(e) => setCustomRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
              className="w-20 p-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">إلى الحزب:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={customRange.max}
              onChange={(e) => setCustomRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-20 p-2 border rounded"
            />
          </div>
          <button
            onClick={handleCustomRangeSelect}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            اختيار
          </button>
        </div>
      </div>

      {/* عرض الثمن المختار */}
      {selectedThumn && (
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-gray-800 mb-4">
            الحزب {selectedThumn.hizb} - الثمن {selectedThumn.name}
          </p>
          <p className="text-xl text-gray-600 mb-4">
            الصفحة {selectedThumn.page}
          </p>
          
          <button
            onClick={() => setShowThumnImage(!showThumnImage)}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            <Book className="h-5 w-5" />
            {showThumnImage ? "إخفاء" : "عرض"} آيات الثمن
          </button>
        </div>
      )}

      {/* عرض صورة الثمن */}
      {showThumnImage && currentThumn && (
        <div className="mt-6">
          <Image
            src={`/thumns/thumn-${getThumnImageName(currentThumn+1)}.png`}
            alt={`ثمن ${currentThumn}`}
            width={600}
            height={400}
            className="rounded-lg shadow-xl border-2 border-gray-200 mx-auto"
            priority
          />
        </div>
      )}

      {/* أزرار التحكم */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={goToThumnPage}
          className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          انتقال للصفحة
        </button>
      </div>
    </div>
  </div>
)}
      </div>
  
  );
};

export default FlipBook;
