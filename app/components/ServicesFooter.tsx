'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServicesFooter = () => {
  return (
    <footer className="bg-[#F7F7F8] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Left Column - Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl font-semibold text-gray-800">HealthClinic</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your health, our priority.
            </p>
          </div>

          {/* Center Left - Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
              CONTACT
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>123 Health St, Wellness City</li>
              <li>
                <a href="mailto:contact@healthclinic.com" className="hover:text-blue-600 transition-colors">
                  contact@healthclinic.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>

          {/* Center Right - Hours */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
              HOURS
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Mon - Fri: 8am - 6pm</li>
              <li>Sat: 9am - 1pm</li>
              <li>Sun: Closed</li>
            </ul>
          </div>

          {/* Right - Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
              LEGAL
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 HealthClinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ServicesFooter;

