'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import ServicesFooter from '../components/ServicesFooter';

const services = [
  {
    id: 1,
    title: 'General Check-up',
    description: 'Comprehensive health assessments for adults to monitor and maintain wellness.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop',
    category: 'Preventive Care',
  },
  {
    id: 2,
    title: 'Pediatric Care',
    description: 'Specialized medical care for infants, children, and adolescents, ensuring their healthy development.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
    category: 'Specialized',
  },
  {
    id: 3,
    title: 'Cardiology Consultation',
    description: 'Expert evaluation and treatment for heart-related conditions, from diagnosis to management.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    category: 'Specialized',
  },
  {
    id: 4,
    title: 'Dermatology Services',
    description: 'Diagnosis and treatment for a wide range of skin conditions and concerns.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
    category: 'Specialized',
  },
  {
    id: 5,
    title: 'Vaccinations & Immunizations',
    description: 'Protect yourself and your loved ones with essential vaccinations for all ages.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop',
    category: 'Preventive Care',
  },
  {
    id: 6,
    title: 'Nutritional Counseling',
    description: 'Personalized dietary advice to help you achieve your health and wellness goals.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    category: 'Wellness',
  },
];

const filterCategories = ['All', 'Preventive Care', 'Specialized', 'Wellness'];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || service.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop"
            alt="Hospital reception"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/25"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Medical Services
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl">
              Providing comprehensive and compassionate care tailored to your health needs. We're dedicated to your well-being, offering a wide range of services from preventive care to specialized treatments.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a specific treatment"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-2xl p-12 mb-16 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to schedule your visit?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to provide you with the best care possible. Book an appointment online or contact us if you have any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                  Book an Appointment
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ServicesFooter />
    </div>
  );
}

