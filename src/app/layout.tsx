import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";

import ReduxProvider from "@/redux/ReduxProvider";
import { constructMetadata } from "@/lib/utils";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body className={lato.className}>
        <ReduxProvider>
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
