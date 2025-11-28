import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClinicName",
  description: "Your trusted healthcare provider",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isDoctorRoute = pathname.startsWith("/doctor");

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isDoctorRoute && (
          <>
            {/* Navbar */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                      ClinicName
                    </Link>
                  </div>

                  <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
                      Home
                    </Link>
                    <Link href="/services" className="text-gray-600 hover:text-blue-600 font-medium transition">
                      Services
                    </Link>
                    <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">
                      About
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition">
                      Contact
                    </Link>

                    {/* الصفحة الجديدة بتاعتنا */}
                    <Link
                      href="/patient-records"
                      className="text-blue-600 font-bold hover:text-blue-800 transition underline decoration-2 underline-offset-4"
                    >
                      Patient Records
                    </Link>
                  </nav>

                  <div>
                    <Link
                      href="/appointment"
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </header>
          </>
        )}

        <main>{children}</main>

        {!isDoctorRoute && (
          <>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p>© 2025 ClinicName. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                  <a href="#" className="hover:text-blue-400">Facebook</a>
                  <a href="#" className="hover:text-blue-400">Twitter</a>
                  <a href="#" className="hover:text-blue-400">Instagram</a>
                </div>
              </div>
            </footer>
          </>
        )}
      </body>
    </html>
  );
}