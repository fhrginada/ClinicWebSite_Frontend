'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'General Check-ups',
      description: 'Comprehensive health assessments to keep you and your family healthy.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070',
    },
    {
      title: 'Pediatric Care',
      description: 'Dedicated care for infants, children, and adolescents in a friendly environment.',
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=2070',
    },
    {
      title: 'Specialized Treatments',
      description: 'Advanced care for specific health conditions with personalized treatment plans.',
      image: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=2069',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="h-full"
            >
              <Card
                with3D
                className="p-0 overflow-hidden h-full flex flex-col hover:shadow-2xl"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

