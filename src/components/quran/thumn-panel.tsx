"use client"

import type React from "react"
import Image from "next/image"
import { Book, Shuffle } from "lucide-react"

interface ThumnPanelProps {
  selectedThumn: { name: string; page: number; hizb: string } | null
  currentThumn: number | null
  showThumnImage: boolean
  setShowThumnImage: (show: boolean) => void
  selectedCategory: string
  customRange: { min: number; max: number }
  setCustomRange: (range: { min: number; max: number }) => void
  handleRandomSelection: (min: number, max: number) => void
  handleCustomRangeSelect: () => void
  goToThumnPage: () => void
  getThumnImageName: (thumnNumber: number) => string
  onClose: () => void
}

export const ThumnPanel: React.FC<ThumnPanelProps> = ({
  selectedThumn,
  currentThumn,
  showThumnImage,
  setShowThumnImage,
  selectedCategory,
  customRange,
  setCustomRange,
  handleRandomSelection,
  handleCustomRangeSelect,
  goToThumnPage,
  getThumnImageName,
}) => {
  const categories = [
    { name: "الحزب ١-١٠", minHizb: 1, maxHizb: 10 },
    { name: "الحزب ١١-٢٠", minHizb: 11, maxHizb: 20 },
    { name: "الحزب ٢١-٤٠", minHizb: 21, maxHizb: 40 },
    { name: "الحزب ٤١-٦٠", minHizb: 41, maxHizb: 60 },
  ]

  return (
    <div className="space-y-4 bg-[#F5E6CA] p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <button
          onClick={() => handleRandomSelection(1, 60)}
          className="w-full py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#C0A080] transition-all flex items-center justify-center gap-2"
        >
          <Shuffle className="h-5 w-5" />
          <span className="font-medium">ثُمن عشوائي من كل المصحف</span>
        </button>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-[#3D3D3D]">اختر نطاق الأحزاب:</h4>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleRandomSelection(category.minHizb, category.maxHizb)}
              className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                selectedCategory === `${category.minHizb}-${category.maxHizb}`
                  ? "bg-[#D4AF37] text-white"
                  : "bg-white border border-[#D4AF37] text-[#D4AF37] hover:bg-[#F5E6CA]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-[#FFF8E1] rounded-lg">
        <h4 className="font-medium text-[#3D3D3D] mb-2">نطاق مخصص:</h4>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <label className="text-xs text-[#6F6F6F] block mb-1">من الحزب:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={customRange.min}
              onChange={(e) => setCustomRange((prev) => ({ ...prev, min: Number.parseInt(e.target.value) }))}
              className="w-full p-2 border rounded text-center bg-white"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-[#6F6F6F] block mb-1">إلى الحزب:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={customRange.max}
              onChange={(e) => setCustomRange((prev) => ({ ...prev, max: Number.parseInt(e.target.value) }))}
              className="w-full p-2 border rounded text-center bg-white"
            />
          </div>
        </div>
        <button
          onClick={handleCustomRangeSelect}
          className="w-full py-2 bg-[#D4AF37] text-white rounded hover:bg-[#C0A080]"
        >
          اختيار
        </button>
      </div>

      {selectedThumn && (
        <div className="bg-[#FFF8E1] p-4 rounded-lg border border-[#D4AF37]">
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold text-[#3D3D3D]">
              الحزب {selectedThumn.hizb} - الثمن {selectedThumn.name}
            </h3>
            <p className="text-[#6F6F6F]">الصفحة {selectedThumn.page}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={goToThumnPage}
              className="py-2 bg-[#D4AF37] text-white rounded hover:bg-[#C0A080] transition-all"
            >
              انتقال للصفحة {selectedThumn.page}
            </button>
            
            <button
              onClick={() => setShowThumnImage(!showThumnImage)}
              className="flex items-center justify-center gap-2 py-2 bg-[#FFF8E1] text-[#3D3D3D] rounded hover:bg-[#F5E6CA] transition-all"
            >
              <Book className="h-4 w-4" />
              {showThumnImage ? "إخفاء" : "عرض"} آيات الثمن
            </button>
          </div>

          {showThumnImage && currentThumn && (
            <div className="mt-3 bg-white p-2 rounded border border-gray-200">
              <Image
                src={`/thumns/thumn-${getThumnImageName(currentThumn+1)}.png`}
                alt={`ثمن ${currentThumn}`}
                width={300}
                height={200}
                className="rounded-lg mx-auto"
                priority
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

