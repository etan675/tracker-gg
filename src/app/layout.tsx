import type { Metadata } from "next";
import "./globals.css";
import TopBanner from "@/components/TopBanner";
import Content from "@/components/Content";

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
        className='w-screen h-screen overflow-hidden bg-[#212121] text-white box-border antialiased'
      >
        <div className="w-full h-full flex flex-col">
          <TopBanner />
          <Content className="flex-grow">
            {children}
          </Content>
        </div>
      </body>
    </html>
  );
}
