import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import SliderMask from "@/components/hero/SliderMask";
import bg1 from "@/assets/images/bg1.jpg";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Rapidito",
  description: "La app de comidas rápidas más completa",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={oswald.variable}>
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
          <div className="home-textured-sections">
            <div
              className="texture-layer"
              aria-hidden="true"
              style={{ backgroundImage: `url(${bg1.src})` }}
            />
            <div className="relative z-2">
              <SliderMask />
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
