import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Browse collected stays",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-page font-sans text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
