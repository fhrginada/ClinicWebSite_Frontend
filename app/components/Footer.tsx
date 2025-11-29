'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations';

const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Our Team' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Column 1: HealthClinic Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl font-semibold">HealthClinic</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner in health, providing compassionate care for a better life.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Health St, Wellness City, 12345</li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@healthclinic.com"
                  className="hover:text-white transition-colors"
                >
                  contact@healthclinic.com
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
        >
          <p>© 2024 HealthClinic. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

