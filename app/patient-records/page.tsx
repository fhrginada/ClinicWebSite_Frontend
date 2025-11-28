'use client';

import { Bell, Calendar, MessageSquare, FileText, Download, Search, Mic, Home, Clock, User } from "lucide-react";

export default function PatientPortal() {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex</h1>
          </div>
          <button className="relative p-3 hover:bg-gray-100 rounded-xl transition">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search reports, doctors, etc..."
                className="w-full pl-16 pr-16 py-5 bg-white border border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-blue-400 shadow-sm"
              />
              <Mic className="absolute right-6 зан top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 cursor-pointer hover:text-blue-600" />
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Calendar, label: "Book Appointment", color: "bg-blue-50 text-blue-600" },
              { icon: FileText, label: "View Results", color: "bg-indigo-50 text-indigo-600" },
              { icon: MessageSquare, label: "Message Doctor", color: "bg-purple-50 text-purple-600" },
              { icon: Home, label: "My Chart", color: "bg-pink-50 text-pink-600" },
            ].map((item, i) => (
              <button
                key={i}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-9 h-9" />
                </div>
                <p className="text-lg font-semibold text-gray-800 text-center">{item.label}</p>
              </button>
            ))}
          </div>

          {/* Upcoming Visit */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Visit</h2>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-14 h-14 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900">Dr. Anya Sharma</h3>
                  <p className="text-lg text-gray-600">Cardiology</p>
                  <p className="text-3xl font-bold text-gray-900 mt-3">Annual Check-up</p>
                  <p className="text-xl text-gray-600 flex items-center gap-2 justify-center md:justify-start mt-2">
                    <Clock className="w-5 h-5" /> Today, 2:00 PM
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
                    Reschedule
                  </button>
                  <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Reports */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Recent Reports</h2>
              <a href="#" className="text-blue-600 font-semibold hover:underline">View All →</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Blood Panel", date: "Aug 15, 2024" },
                { title: "X-Ray Results", date: "Jul 21, 2024" },
                { title: "ECG Report", date: "Jun 10, 2024" },
                { title: "Lab Results", date: "May 28, 2024" },
              ].map((report, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-7 h-7 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">{report.title}</h4>
                  <p className="text-gray-600 mt-2">{report.date}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}