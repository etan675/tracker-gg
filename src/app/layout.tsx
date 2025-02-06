import type { Metadata } from "next";
import "./globals.css";
import TopBanner from "@/components/TopBanner";

export const metadata: Metadata = {
  title: "Tracker.GG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='w-screen h-screen bg-[#212121] text-white antialiased'
      >
        <div className="flex flex-col w-full h-full">
          <TopBanner />
          <main className="flex-grow overflow-y-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
