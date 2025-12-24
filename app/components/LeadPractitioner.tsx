'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { fadeInUp, staggerContainer } from '../lib/animations';

const LeadPractitioner = () => {
  const doctors = [
  {
    name: 'Dr. Evelyn Reed',
    specialty: 'Family Medicine',
    description: 'Over 15 years of experience in comprehensive healthcare and preventive care.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070',
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    description: 'Specialized in heart health and cardiovascular disease prevention.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070',
  },
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Pediatrics',
    description: 'Dedicated to providing compassionate care for children and adolescents.',
    image: 'https://media.istockphoto.com/id/688085878/photo/cheerful-pediatrician-with-adorable-baby-girl.jpg?s=612x612&w=0&k=20&c=LZUZpgsrPnuudFl9UCNKLPBKona4vUg2wiHAnxH9Cg8=', // جديدة حلوة جدًا!
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Internal Medicine',
    description: 'Expert in diagnosing and treating complex medical conditions.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2070',
  },
];
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Doctors
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="h-full"
            >
              <Card
                withHover
                className="p-0 overflow-hidden h-full flex flex-col"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {doctor.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadPractitioner;
