'use client';

import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're here to help. Reach out to us with any questions or to schedule an appointment.
          </p>
        </div>
      </section>

      {/* Contact Info & Hours & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Icons Row */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-20 text-lg">
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-gray-800 font-medium">123 Health St, Wellness City, 45678</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-blue-600" />
              <span className="text-gray-800 font-medium">(123) 456-7890</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-blue-600" />
              <span className="text-gray-800 font-medium">contact@clinicname.com</span>
            </div>
          </div>

          {/* Hours + Map */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Business Hours */}
            <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Business Hours</h3>
              <ul className="space-y-5 text-lg">
                <li className="flex justify-between"><span className="text-gray-700">Monday</span><span className="font-semibold text-gray-900">9:00 AM - 5:00 PM</span></li>
                <li className="flex justify-between"><span className="text-gray-700">Tuesday</span><span className="font-semibold text-gray-900">9:00 AM - 5:00 PM</span></li>
                <li className="flex justify-between"><span className="text-gray-700">Wednesday</span><span className="font-semibold text-gray-900">9:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between"><span className="text-gray-700">Thursday</span><span className="font-semibold text-gray-900">9:00 AM - 5:00 PM</span></li>
                <li className="flex justify-between"><span className="text-gray-700">Friday</span><span className="font-semibold text-gray-900">9:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between"><span className="text-gray-700">Saturday</span><span className="text-blue-600 font-bold">By Appointment Only</span></li>
                <li className="flex justify-between"><span className="text-gray-700">Sunday</span><span className="text-red-600 font-bold">Closed</span></li>
              </ul>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.486295106849!2d31.2001!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzACsDAyJzQwLjIiTiAzMcKwMTInMDAuNCJF!5e0!3m2!1sen!2seg!4v1734312345678!5m2!1sen!2seg"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Send Us a Message</h2>
          
          <form className="bg-white p-10 md:p-12 rounded-2xl shadow-2xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 placeholder-gray-600 text-gray-900 text-lg"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 placeholder-gray-600 text-gray-900 text-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 placeholder-gray-600 text-gray-900 text-lg"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 placeholder-gray-600 text-gray-900 text-lg"
              />
            </div>

            <textarea
              rows={6}
              placeholder="Your Message"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 placeholder-gray-600 text-gray-900 text-lg resize-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>

          <p className="text-gray-700 mt-8 text-lg font-medium">
            We'll get back to you within 24 hours. Your data is protected.
          </p>
        </div>
      </section>
    </>
  );
}