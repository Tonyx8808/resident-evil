import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Navbar } from "@/components/sections/Navbar";

export const metadata: Metadata = {
  title: "Umbrella Corporation",
  description:
    "Obedience. Sacrifice. Loyalty. — The future belongs to Umbrella.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
