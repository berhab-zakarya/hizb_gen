"use client"

import type React from "react"
import { X } from "lucide-react"

interface AboutDialogProps {
  isOpen: boolean
  onClose: () => void
}

const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center p-4">
      <div className="bg-[#F5E6CA] rounded-lg shadow-xl w-full max-w-2xl relative border-2 border-[#D4AF37]">
        {/* Header Bar */}
        <div className="bg-[#D4AF37] text-white py-3 px-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center">حول البرنامج</h2>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo.png"
              alt="شعار الجمعية"
              className="h-24 w-24 object-contain mb-4 border-2 border-[#D4AF37] p-1 rounded-full bg-white"
            />
            <h2 className="text-2xl font-bold text-[#8B4513] text-center">جمعية القيم للتربية والثقافة والعلم-مغنية</h2>
            <h3 className="text-xl font-bold text-[#D4AF37] mt-2">برنامج المسابقات القرٱنية</h3>
          </div>

          {/* Description */}
          <div className="space-y-4 text-right bg-white p-4 rounded-lg border-2 border-[#D4AF37] shadow-md">
            <p className="text-[#8B4513] font-bold text-lg">هذا البرنامج مخصص للمسابقات القرآنية، يتيح للمتسابقين:</p>
            <ul className="list-disc list-inside space-y-2 text-[#8B4513] mr-4 font-medium">
              <li>تصفح القرآن الكريم بطريقة سهلة وسلسة</li>
              <li>اختيار الأحزاب والأثمان بشكل عشوائي للمسابقات</li>
              <li>إمكانية التكبير والتصغير للقراءة المريحة</li>
              <li>خاصية ملء الشاشة للعرض الأمثل</li>
              <li>واجهة سهلة الاستخدام ومناسبة للجميع</li>
            </ul>

            <div className="mt-6 pt-4 border-t-2 border-[#D4AF37]">
              <p className="text-[#8B4513] text-sm font-medium">
                تم تطوير هذا البرنامج خصيصاً لجمعية القيم للتربية والثقافة والعلم-مغنية لتسهيل عملية إجراء المسابقات
                القرآنية وتنظيمها.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t-2 border-[#D4AF37] text-center">
            <p className="text-sm font-bold text-[#8B4513]">
              © {new Date().getFullYear()} جمعية القيم للتربية والثقافة والعلم-مغنية
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutDialog

