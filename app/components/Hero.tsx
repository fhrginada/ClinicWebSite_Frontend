'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { fadeInUp, fadeIn } from '../lib/animations';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 sm:-mt-24 pt-20 sm:pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2070')`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Gradient Edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Compassionate & Comprehensive Healthcare For You
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Our mission is to provide personalized, high-quality care with a focus on your well-being.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <Link href="/appointment">
              <Button variant="primary" size="lg" with3D>
                Book an Appointment
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

