import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Fixed: Remove unused headers import
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HealthClinic",
    template: "%s | HealthClinic",
  },
  description: "Compassionate & Comprehensive Healthcare For You",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fixed: Remove unused isDoctorRoute variable
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}