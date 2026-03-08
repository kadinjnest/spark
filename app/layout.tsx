import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memora — Relive Your Favorite Memories",
  description:
    "Upload a photo or describe a memory and watch it come to life as a beautiful short video.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
