"use client";

import { useState, useCallback, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { Book } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getQuarterPages } from "@/types/quran_hizb_pages";

import Image from "next/image";
import ShowInBookStyle from "@/components/ui/ShowInBookStyle";

export const ThumnSelector = () => {
  //const router = useRouter();
  const [selectedHizbRange, setSelectedHizbRange] = useState<[number, number]>([
    1, 60,
  ]);
  const [currentThumn, setCurrentThumn] = useState<number | null>(null);
  const [startHizb, setStartHizb] = useState<number>(1);
  const [endHizb, setEndHizb] = useState<number>(60);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showThumnImage, setShowThumnImage] = useState<boolean>(false);
  const [showTajweedImage, setShowTajweedImage] = useState<boolean>(false);
  const [randomHizb, setRandomHizb] = useState<number>(0);
  const [randomThumn, setRandomThumn] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    { name: "الحزب ١-١٠", minHizb: 1, maxHizb: 10 },
    { name: "الحزب ١١-٢٠", minHizb: 11, maxHizb: 20 },
    { name: "الحزب ٢١-٤٠", minHizb: 21, maxHizb: 40 },
    { name: "الحزب ٤١-٦٠", minHizb: 41, maxHizb: 60 },
  ];

  // تحديث نطاق الحزب عند تغيير القيم
  const handleRangeChange = (start: number, end: number) => {
    if (start > 0 && end <= 60 && start <= end) {
      setSelectedHizbRange([start, end]);
      setStartHizb(start);
      setEndHizb(end);
    }
  };

  // اختيار ثمن عشوائي من فئة محددة
  const handleRandomSelection = async (minHizb: number, maxHizb: number) => {
    try {
      setLoading(true);
      setSelectedCategory(`${minHizb}-${maxHizb}`);
      
      // اختيار حزب عشوائي ضمن النطاق المحدد
      const randomHizbNumber =
        Math.floor(Math.random() * (maxHizb - minHizb + 1)) + minHizb;
      
      // اختيار ثمن عشوائي (1-8)
      const randomThumnNumber = Math.floor(Math.random() * 8) + 1;
      
      setRandomHizb(randomHizbNumber);
      setRandomThumn(randomThumnNumber);
      
      // حساب رقم الثمن الكلي (من 1 إلى 480)
      const thumnNumber = (randomHizbNumber - 1) * 8 + randomThumnNumber;
      setCurrentThumn(thumnNumber);
      
      // إعادة ضبط حالة عرض الصور
      setShowThumnImage(false);
      setShowTajweedImage(false);
    } catch (error) {
      console.error("Error in selection:", error);
      alert(
        error instanceof Error
          ? error.message
          : "حدث خطأ في اختيار الثمن. الرجاء المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  // استخدام useEffect لتحديث النطاق عند تغيير الفئة
  useEffect(() => {
    if (randomHizb && randomThumn) {
      // إظهار معلومات الثمن المختار في الواجهة
      const thumnNumber = (randomHizb - 1) * 8 + randomThumn;
      setCurrentThumn(thumnNumber);
    }
  }, [randomHizb, randomThumn]);

  // الدالة الأصلية لاختيار ثمن عشوائي من النطاق المحدد يدويًا
  const selectRandomThumn = useCallback(() => {
    setIsLoading(true);
    setShowThumnImage(false);
    setShowTajweedImage(false);
    setTimeout(() => {
      const [start, end] = selectedHizbRange;
      const randomHizb = Math.floor(Math.random() * (end - start + 1)) + start;
      const randomThumn = Math.floor(Math.random() * 8) + 1;
      const thumnNumber = (randomHizb - 1) * 8 + randomThumn;

      setCurrentThumn(thumnNumber);
      setIsLoading(false);
    }, 700);
  }, [selectedHizbRange]);

  const handleViewVerses = useCallback(() => {
    if (currentThumn) {
      setShowThumnImage((prev) => !prev);
    }
  }, [currentThumn]);

  const handleViewTajweed = useCallback(() => {
    if (currentThumn) {
      setShowTajweedImage((prev) => !prev);
    }
  }, [currentThumn]);

  const getThumnImageName = (thumnNumber: number) => {
    return thumnNumber.toString().padStart(3, "0"); // تحويل الرقم إلى تنسيق 3 أرقام
  };

  return (
    <div className="flex flex-col w-full p-4 md:p-8 items-center justify-center min-h-screen bg-white">
      <Card className="w-full  bg-white shadow-lg">
        <CardHeader className="bg-emerald-500 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl md:text-3xl font-bold">
            اختيار الأثمان العشوائي
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 p-6">
          {/* قسم الفئات */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              اختر فئة الأحزاب
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleRandomSelection(category.minHizb, category.maxHizb)}
                  disabled={loading}
                  className={`p-4 rounded-lg text-lg transition-all duration-300 ${
                    selectedCategory === `${category.minHizb}-${category.maxHizb}`
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
  
          {/* خط فاصل */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-lg text-gray-500">أو</span>
            </div>
          </div>
  
          {/* قسم اختيار النطاق يدويًا */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              اختيار نطاق محدد
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-4">
                <Label htmlFor="startHizb" className="text-lg font-medium">من الحزب</Label>
                <Input
                  id="startHizb"
                  type="number"
                  min={1}
                  max={60}
                  value={startHizb}
                  onChange={(e) => handleRangeChange(parseInt(e.target.value), endHizb)}
                  className="w-24 text-center text-lg"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="endHizb" className="text-lg font-medium">إلى الحزب</Label>
                <Input
                  id="endHizb"
                  type="number"
                  min={1}
                  max={60}
                  value={endHizb}
                  onChange={(e) => handleRangeChange(startHizb, parseInt(e.target.value))}
                  className="w-24 text-center text-lg"
                />
              </div>
            </div>
  
            <Button
              onClick={selectRandomThumn}
              className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-4 text-lg rounded-lg shadow-md transition duration-300"             
              disabled={isLoading}
            >
              {isLoading ? "جاري الاختيار..." : "اختيار ثُمن عشوائي"}
            </Button>
          </div>
  
          {/* عرض نتيجة الاختيار */}
          {currentThumn && (
            <div className="mt-8 p-6 border-2 border-emerald-200 rounded-lg bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-600 mb-4 text-center">
                الثمن المختار
              </h3>
              <p className="text-4xl font-bold text-gray-800 text-center mb-6">
                الحزب {Math.ceil(currentThumn / 8)} - الثمن {currentThumn % 8 || 8}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center gap-2"
                  onClick={handleViewVerses}
                >
                  <Book className="h-5 w-5" /> {showThumnImage ? "إخفاء" : "عرض"} آيات الثمن
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center gap-2"
                  onClick={handleViewTajweed}
                >
                  <Book className="h-5 w-5" /> {showTajweedImage ? "إخفاء" : "عرض"} التجويد
                </Button>
              </div>
  
              {/* عرض الصور */}
              {(showThumnImage || showTajweedImage) && (
                <div className="mt-8 space-y-6">
                  {showThumnImage && (
                    <div className="flex justify-center">
                      <Image
                        src={`/thumns/thumn-${getThumnImageName(currentThumn + 1)}.png`}
                        alt={`ثمن ${currentThumn}`}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl border-2 border-gray-200"
                        priority
                      />
                    </div>
                  )}
                  
                  {showTajweedImage && (
                    <div className="flex flex-wrap justify-center gap-4">
                      <ShowInBookStyle
                        pageNumbers={getQuarterPages(
                          Math.ceil(currentThumn / 8),
                          currentThumn % 8 || 8
                        )?.pages || []}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};