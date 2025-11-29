'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="about-page">
        {/* Hero Section */}
        <section className="hero relative bg-gradient-to-b from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
          <div className="overlay absolute inset-0 bg-black opacity-20"></div>
          <div className="hero-content relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Commitment to Your Health</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Dedicated to providing compassionate, comprehensive, and patient-centric
              care for every member of our community.
            </p>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="legacy py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">A Legacy of Care</h2>

            <div className="timeline grid md:grid-cols-3 gap-8">
              <div className="item bg-blue-50 p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Clinic Founded</h4>
                <span className="text-blue-600 font-semibold text-lg block mb-4">2005</span>
                <p className="text-gray-700 leading-relaxed">
                  HealthClinic was established with a mission to provide accessible,
                  high-quality healthcare to the local community.
                </p>
              </div>

              <div className="item bg-blue-50 p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Expanded Services</h4>
                <span className="text-blue-600 font-semibold text-lg block mb-4">2012</span>
                <p className="text-gray-700 leading-relaxed">
                  We expanded our facilities to specialized departments for cardiology
                  and pediatrics, welcoming new experts to our team.
                </p>
              </div>

              <div className="item bg-blue-50 p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Community Health Award</h4>
                <span className="text-blue-600 font-semibold text-lg block mb-4">2021</span>
                <p className="text-gray-700 leading-relaxed">
                  Recognized for our dedication to community wellness and innovative care programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="doctors py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Meet Our Expert Doctors</h2>

            <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070" 
                    alt="Dr. Evelyn Reed" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Evelyn Reed</h3>
                  <p className="role text-blue-600 font-semibold mb-4">Family Medicine</p>
                  <p className="text-gray-700 mb-6">Over 15 years of experience in comprehensive healthcare and preventive care.</p>
                  <button className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070" 
                    alt="Dr. Michael Chen" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Michael Chen</h3>
                  <p className="role text-blue-600 font-semibold mb-4">Cardiology</p>
                  <p className="text-gray-700 mb-6">Specialized in heart health and cardiovascular disease prevention.</p>
                  <button className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1594824476968-48dfc9d126d3?q=80&w=2070" 
                    alt="Dr. Sarah Johnson" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
                  <p className="role text-blue-600 font-semibold mb-4">Pediatrics</p>
                  <p className="text-gray-700 mb-6">Dedicated to providing compassionate care for children and adolescents.</p>
                  <button className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2070" 
                    alt="Dr. James Wilson" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. James Wilson</h3>
                  <p className="role text-blue-600 font-semibold mb-4">Internal Medicine</p>
                  <p className="text-gray-700 mb-6">Expert in diagnosing and treating complex medical conditions.</p>
                  <button className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Meet Us?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Schedule your appointment today and take the first step towards better health.
            </p>
            <Link href="/appointment">
              <button className="bg-white text-blue-600 rounded-xl px-8 py-4 text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Schedule Your Appointment
              </button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
