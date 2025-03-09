"use client"

import type React from "react"
import Image from "next/image"
import { Book } from "lucide-react"

interface ThumnModalProps {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
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
}

export const ThumnModal: React.FC<ThumnModalProps> = ({
  isModalOpen,
  setIsModalOpen,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-arabic text-emerald-600">اختيار ثُمن عشوائي</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                onChange={(e) => setCustomRange((prev) => ({ ...prev, min: Number.parseInt(e.target.value) }))}
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
                onChange={(e) => setCustomRange((prev) => ({ ...prev, max: Number.parseInt(e.target.value) }))}
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
            <p className="text-xl text-gray-600 mb-4">الصفحة {selectedThumn.page}</p>

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
              src={`/thumns/thumn-${getThumnImageName(currentThumn + 1)}.png`}
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
          <button onClick={goToThumnPage} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
            انتقال للصفحة
          </button>
        </div>
      </div>
    </div>
  )
}

