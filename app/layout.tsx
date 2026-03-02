import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerProvider } from "../components/ServiceWorkerProvider";

export const metadata: Metadata = {
  title: "BREATH//BREAK",
  description: "Punk-rock Tonglen courage training.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-neutral-100">
      <body className="min-h-screen bg-black text-neutral-100">
        <ServiceWorkerProvider>
          <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-md px-4 py-6">
              {children}
            </div>
          </div>
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}