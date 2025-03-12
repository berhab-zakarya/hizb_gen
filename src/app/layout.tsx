import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";



const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "برنامج المسابقات القرآنية - جمعية القيم للتربية والثقافة والعلم - مغنية",
  description:
    "منصة تفاعلية لاختيار عشوائي لأثمان القرآن الكريم برواية ورش عن نافع من طريق الأزرق، مع تلاوات صوتية وترجمات متعددة.",
  keywords:
    "قرآن, قارئ القرآن, تلاوات القرآن, مسابقة قرآنية, جمعية القيم, مغنية",
  openGraph: {
    title:
      "برنامج المسابقات القرآنية - جمعية القيم للتربية والثقافة والعلم - مغنية",
    description:
      "منصة تفاعلية لاختيار عشوائي لأثمان القرآن الكريم مع تلاوات وترجمات متعددة.",
    type: "website",
    locale: "ar",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "برنامج المسابقات القرآنية - جمعية القيم للتربية والثقافة والعلم - مغنية",
    description:
      "منصة تفاعلية لاختيار عشوائي لأثمان القرآن الكريم مع تلاوات وترجمات متعددة.",
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
