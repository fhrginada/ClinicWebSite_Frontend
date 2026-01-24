'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">IC</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden md:block">IntellClinic</span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/about" className="text-gray-800 hover:text-blue-600 font-medium">About Us</Link>
            <Link href="/services" className="text-gray-800 hover:text-blue-600 font-medium">Services</Link>
            <Link href="/contact" className="text-gray-800 hover:text-blue-600 font-medium">Contact</Link>
          </nav>

          {/* Book Appointment Button & Login Icon */}
          <div className="flex items-center space-x-4">
            <Link
              href="/appointment"
              className="bg-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              <span className="text-white">Book Appointment</span>
            </Link>

            {/* Login Icon */}
            <Link
              href="/login"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group"
              aria-label="Login"
            >
              <FaUser className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-colors" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 bg-white border-t border-gray-300">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link href="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/about" className="text-gray-800 hover:text-blue-600 font-medium">About Us</Link>
              <Link href="/services" className="text-gray-800 hover:text-blue-600 font-medium">Services</Link>
              <Link href="/contact" className="text-gray-800 hover:text-blue-600 font-medium">Contact</Link>
              <Link href="/appointment" className="bg-blue-600 px-6 py-3 rounded-full font-bold text-center block">
                <span className="text-white">Book Appointment</span>
              </Link>
              <Link href="/login" className="flex items-center justify-center space-x-2 text-gray-800 hover:text-blue-600 font-medium">
                <FaUser className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
