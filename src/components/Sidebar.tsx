"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // For example: "/" becomes "" and "/book" becomes "book"
  const currentPage = pathname === "/" ? "" : pathname?.substring(1);

  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (pageName: string) => {
    // If already on the desired page, simply close the sidebar.
    if (currentPage === pageName) {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    router.push(`/${pageName}`);
  };

  // Close the sidebar when clicking outside.
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".sidebar-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="sidebar-container relative">
      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-64 bg-gray-800 text-white p-3 rounded-lg shadow-md flex justify-between items-center"
      >
        📖 القائمة
        <span className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ⬇️
        </span>
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute w-64 mt-2 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden z-50">
          <ul className="space-y-2 p-3">
            <li>
              <button
                onClick={() => handleNavigation("book")}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  currentPage === "book" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
                } flex items-center gap-2`}
              >
                📜 <span>المصحف برواية ورش</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("")}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  currentPage === "" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
                } flex items-center gap-2`}
              >
                🎯 <span>اختيار ثمن عشوائي</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
