import localFont from "next/font/local";
import "./globals.css";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend-deca",
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "terraForma",
  description: "built overnight during Hack Knights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexendDeca.variable}`}>
      <body className="font-lexend-deca">{children}</body>
    </html>
  );
}
