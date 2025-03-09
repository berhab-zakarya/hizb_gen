import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";


import Image from "next/image";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "منصة مسار الأثمان: اختيار عشوائي لأثمان القرآن برواية ورش عن نافع من طريق الأزرق",
  description:
    "قارئ قرآن تفاعلي مع ترجمات متعددة، تلاوات صوتية، وإمكانيات البحث. اقرأ واستمع إلى القرآن الكريم مع مختلف المقرئين.",
  keywords: "قرآن, قارئ القرآن, إسلامي, تلاوات القرآن, ترجمات القرآن",
  openGraph: {
    title:
      "منصة مسار الأثمان: اختيار عشوائي لأثمان القرآن برواية ورش عن نافع من طريق الأزرق",
    description: "قارئ قرآن تفاعلي مع ترجمات وتلاوات صوتية",
    type: "website",
    locale: "ar",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "منصة مسار الأثمان: اختيار عشوائي لأثمان القرآن برواية ورش عن نافع من طريق الأزرق",
    description: "قارئ قرآن تفاعلي مع ترجمات وتلاوات صوتية",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`text-right bg-[#FDF7E4] ${cairo.className} antialiased`}
      >
        <div className="flex min-h-screen">
          <div className="flex-1 flex flex-col">
            {/* Header with luxurious styling */}
            <header className="bg-gradient-to-b from-[#D4AF37] to-[#B08F26] shadow-lg py-4 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                  {/* Logo container with golden border */}
                  <div className="bg-white p-2 rounded-lg shadow-md border-2 border-[#D4AF37]">
                    <Image
                      src="/logo.png"
                      width={100}
                      height={50}
                      alt="شعار الجمعية"
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  {/* Title container */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white leading-tight">
                      جمعية القيم للتربية والثقافة والعلم-مغنية
                    </h1>
                    <p className="text-[#FDF7E4] text-lg mt-1 leading-relaxed">
                      برنامج المسابقات القرٱنية
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* Main content area with cream background */}
            <main className="flex-1 p-6 bg-gradient-to-b from-[#FDF7E4] to-[#F5E6CA]">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg border border-[#D4AF37]/20 p-6">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
