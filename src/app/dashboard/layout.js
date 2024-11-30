import { Josefin_Sans } from "next/font/google";

// app/dashboard/layout.js
import { Josefin_Sans } from "next/font/google";
import NavbarMinimal from "../Components/NavbarMinimal";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
  weight: ["300", "400", "500", "600", "700"],
});

export default function DashboardLayout({ children }) {
  return (
    <div className={`min-h-screen bg-[#f5f5f5] ${josefinSans.variable}`}>
      {/* Navbar */}
      <NavbarMinimal />

      {/* Main Content */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        {/* Content Container */}
        <div className="w-full h-full">{children}</div>
      </main>

      {/* Optional: Footer */}
      <footer className="mt-auto py-4 text-center text-[#1b5e2f]">
        <p className="text-sm">&copy; 2024 Culteau. All rights reserved.</p>
      </footer>
    </div>
  );
}
