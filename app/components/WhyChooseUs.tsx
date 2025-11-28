'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Microscope, Heart } from 'lucide-react';
import { Card } from './ui/Card';
import { fadeInUp, staggerContainer } from '../lib/animations';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Expert Care',
      description: 'Our team consists of highly experienced and board-certified professionals.',
    },
    {
      icon: Microscope,
      title: 'Modern Technology',
      description: 'We utilize state-of-the-art equipment to ensure accurate diagnoses and treatments.',
    },
    {
      icon: Heart,
      title: 'Patient-Centric Approach',
      description: 'Your health and comfort are our top priorities at every step of your journey with us.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing the best possible care, combining years of experience with a patient-first approach and the latest in medical technology.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="h-full"
              >
                <Card
                  with3D
                  className="p-8 h-full flex flex-col items-center text-center hover:shadow-2xl"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

