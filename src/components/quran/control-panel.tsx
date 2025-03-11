"use client"

import type React from "react"
import { ChevronLeft, ChevronRight, Maximize, Minimize, Search, SkipBack, SkipForward, Shuffle } from "lucide-react"

interface ControlPanelProps {
  pageNumber: number
  setPageNumber: (page: number) => void
  totalPages: number
  goToPrevPage: () => void
  goToNextPage: () => void
  goToPage: (page: number) => void
  toggleFullScreen: () => void
  isFullScreen: boolean
  handleRandomSelection: (min: number, max: number) => void
  selectedHizb: number
  goToHizb: (hizbNumber: number) => void
  hizbData: Array<{ hizb: number; startPage: number }>
  toggleThumnPanel: () => void
  showThumnPanel: boolean
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  pageNumber,
  setPageNumber,
  totalPages,
  goToPrevPage,
  goToNextPage,
  goToPage,
  toggleFullScreen,
  isFullScreen,
  selectedHizb,
  goToHizb,
  hizbData,
  toggleThumnPanel,
  showThumnPanel,
}) => {
  return (
    <div className="control-panel sticky bottom-0 w-full max-w-3xl mx-auto bg-[#FDF7E4] p-4 rounded-t-xl shadow-lg border border-[#D4AF37] mt-4 z-10">
      {/* Current Page Indicator */}
      <div className="text-center mb-4">
        <p className="text-xl font-semibold text-[#B08F26]">
          صفحة <span className="text-2xl font-bold text-[#D4AF37]">{pageNumber} </span> من {totalPages}
        </p>
      </div>
  
      {/* Main Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {/* Navigation Buttons */}
        <div className="flex items-center bg-[#FFF8E1] rounded-lg p-1 shadow-sm">
          <button
            onClick={() => goToPage(1)}
            className="p-2 text-[#D4AF37] hover:bg-[#F5E6CA] rounded-lg transition-all"
            title="الصفحة الأولى"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={goToPrevPage}
            className="p-2 text-[#D4AF37] hover:bg-[#F5E6CA] rounded-lg transition-all"
            title="الصفحة السابقة"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
  
          <div className="mx-2 flex items-center">
            <input
              type="number"
              value={pageNumber}
              onChange={(e) => setPageNumber(Number(e.target.value))}
              className="w-16 p-2 text-center border border-[#D4AF37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              min="1"
              max={totalPages}
            />
            <button
              onClick={() => goToPage(pageNumber)}
              className="ml-1 p-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#B08F26] transition-all"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
  
          <button
            onClick={goToNextPage}
            className="p-2 text-[#D4AF37] hover:bg-[#F5E6CA] rounded-lg transition-all"
            title="الصفحة التالية"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            className="p-2 text-[#D4AF37] hover:bg-[#F5E6CA] rounded-lg transition-all"
            title="الصفحة الأخيرة"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
  
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullScreen}
          className="flex items-center gap-1 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5736] transition-all"
        >
          {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          <span>{isFullScreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}</span>
        </button>
  
        {/* Random Thumn Button */}
        <button
          onClick={toggleThumnPanel}
          className={`flex items-center gap-1 px-4 py-2 ${
            showThumnPanel ? "bg-[#B08F26]" : "bg-[#D4AF37]"
          } text-white rounded-lg hover:bg-[#B08F26] transition-all`}
        >
          <Shuffle className="h-4 w-4" />
          <span>{showThumnPanel ? "إخفاء لوحة الأثمان" : "اختيار ثُمن"}</span>
        </button>
      </div>
  
      {/* Hizb Selection - Collapsible */}
      <details className="bg-[#FFF8E1] rounded-lg p-3 shadow-sm">
        <summary className="cursor-pointer font-medium text-[#B08F26] flex items-center">
          <span>الانتقال إلى الحزب</span>
          <ChevronLeft className="h-4 w-4 ml-2 transform transition-transform duration-200" />
        </summary>
  
        <div className="mt-3">
          <div className="relative mb-4">
            <select
              value={selectedHizb}
              onChange={(e) => goToHizb(Number(e.target.value))}
              className="w-full p-3 border border-[#D4AF37] bg-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              {hizbData.map((hizb) => (
                <option key={hizb.hizb} value={hizb.hizb}>
                  الحزب {hizb.hizb} - صفحة {hizb.startPage}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-[#D4AF37]">
              <ChevronLeft className="h-4 w-4" />
            </div>
          </div>
  
          {/* Quick Navigation - Visual Hizb Grid */}
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 60 }, (_, i) => i + 1).map((hizbNum) => (
              <button
                key={hizbNum}
                onClick={() => goToHizb(hizbNum)}
                className={`p-1 text-xs rounded ${
                  selectedHizb === hizbNum
                    ? "bg-[#D4AF37] text-white"
                    : "bg-[#FFF8E1] hover:bg-[#F5E6CA] text-[#B08F26] border border-[#D4AF37]"
                }`}
              >
                {hizbNum}
              </button>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}

