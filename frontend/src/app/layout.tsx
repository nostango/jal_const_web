import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAL Construction",
  description: "JAL Construction, LLC provides professional remodeling services to commercial and residential customers in Bridgeport, CT and the surrounding area. We are a bilingual, local business, offering an end-to-end client experience that includes estimating, communication, prompt scheduling, on-site organization, and quality work. Our services include kitchen and bathroom remodeling, painting, windows & doors, and concrete. Whether it's your vision, or the idea of an architects or designer, we're here to produce beautiful, functional structures. We are willing to share our expertise with customers to recommend options and guide them through the process of designing and building their project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}