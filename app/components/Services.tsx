'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'General Check-ups',
      description: 'Comprehensive health assessments to keep you and your family healthy.',
      image: 'https://media.istockphoto.com/id/1990943278/photo/empty-doctors-office-in-a-large-hospital-no-people.jpg?s=612x612&w=0&k=20&c=bLn2LceMjarkNlT0IB6BD4NpTfA7kB_9hr_EZZ-yYCY=', // غرفة فحص نظيفة مع معدات
    },
    {
      title: 'Pediatric Care',
      description: 'Dedicated care for infants, children, and adolescents in a friendly environment.',
      image: 'https://images.stockcake.com/public/5/7/5/575283f5-c55f-41be-b76b-e81993564c8b_large/colorful-pediatric-ward-stockcake.jpg', // غرفة أطفال ملونة مع ألعاب
    },
    {
      title: 'Specialized Treatments',
      description: 'Advanced care for specific health conditions with personalized treatment plans.',
      image: 'https://media.istockphoto.com/id/1015935018/photo/establishing-shot-of-technologically-advanced-operating-room-with-no-people-ready-for-surgery.jpg?s=612x612&w=0&k=20&c=Qlhxi_J-5xUmPWHs4qxKISF__Qf4T5yrpa_XEnkJAQE=', // غرفة عمليات حديثة مع معدات
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
                className="p-0 overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    unoptimized // مهم للصور الخارجية
                    priority={index === 0} // الأولى تحمل سريع
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