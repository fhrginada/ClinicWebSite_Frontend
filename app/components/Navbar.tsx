'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl bg-white shadow-sm rounded-b-lg px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-xl font-semibold text-gray-800">HealthClinic</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-medium ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side - Book Appointment Button & User Icon */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <Link href="/appointment">
              <button className="bg-blue-600 text-white rounded-xl px-6 py-3 shadow-md font-semibold hover:bg-blue-700 transition-colors">
                Book Appointment
              </button>
            </Link>
            <div className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mx-auto max-w-7xl mt-2 rounded-2xl bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2 transition-colors font-medium ${
                      isActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link 
                href="/appointment" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <button className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 shadow-md font-semibold hover:bg-blue-700 transition-colors mt-2">
                  Book Appointment
                </button>
              </Link>
              <div className="flex items-center justify-center pt-2">
                <div className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

