import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";



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
        className={`text-right bg-[#D4AF37] ${cairo.className} antialiased`}
      >
        <div className="flex min-h-screen">
          <div className="flex-1 flex flex-col">
            {/* Header with luxurious styling */}
          

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
