import React from "react";

export default function HealthClinicPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="w-full bg-white fixed top-0 left-0 z-50 border-b">
        <div className="max-w-6xl mx-auto w-full flex items-center px-10 py-3 relative">
          <div className="flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-blue-500">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#2563EB" />
            </svg>
            <span className="text-sm font-semibold">HealthClinic</span>
          </div>

          <ul className="absolute left-1/2 transform -translate-x-1/2 flex gap-12 text-sm items-center">
            <li className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">Home</li>
            <li className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">Services</li>
            <li className="cursor-pointer text-blue-600 font-semibold">About Us</li>
            <li className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">Contact</li>
          </ul>

          <div className="ml-auto">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="h-[500px] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579154204601-01588f351e95?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="mt-20">
          <h1 className="text-4xl font-bold mb-2">Our Commitment to Your Health</h1>
          <p className="max-w-2xl text-lg">
            Dedicated to providing compassionate, comprehensive, and patient-centric care for
            every member of our community.
          </p>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="px-10 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">A Legacy of Care</h2>
        <div className="max-w-5xl mx-auto text-left px-4">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex flex-col items-center"> 
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 7V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-px bg-gray-200 h-full mt-3" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Clinic Founded</h4>
                <p className="text-sm text-gray-400 font-light mb-2">2005</p>
                <p className="text-gray-600">HealthClinic was established with a mission to provide accessible, high-quality healthcare to the local community.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center"> 
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11V7a3 3 0 0 1 6 0v4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h18" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-px bg-gray-200 h-full mt-3" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Expanded Services</h4>
                <p className="text-sm text-gray-400 font-light mb-2">2012</p>
                <p className="text-gray-600">We expanded our facilities to include specialized departments for cardiology and pediatrics, welcoming new experts to our team.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center"> 
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l2.09 4.26L19 7.27l-3.5 3.41L16.18 17 12 14.56 7.82 17 9 10.68 5.5 7.27l4.91-.99L12 2z" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Community Health Award</h4>
                <p className="text-sm text-gray-400 font-light mb-2">2021</p>
                <p className="text-gray-600">Recognized for innovative patient care and dedication to community wellness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Doctors */}
      <section className="px-10 py-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">Meet Our Expert Doctors</h2>
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[{
            name: "Dr. Evelyn Reed",
            role: "Cardiologist",
            img: "https://randomuser.me/api/portraits/women/44.jpg", imgClass: "w-20 h-20",
            text: "With over 15 years of experience, Dr. Reed is a leading expert in cardiovascular health and preventative care.",
          },{
            name: "Dr. Ben Carter",
            role: "Pediatrician",
            img: "https://randomuser.me/api/portraits/men/32.jpg", imgClass: "w-20 h-20",
            text: "Dr. Carter provides compassionate care for children from infancy through adolescence.",
          },{
            name: "Dr. Olivia Chen",
            role: "Dermatologist",
            img: "https://randomuser.me/api/portraits/women/68.jpg", imgClass: "w-20 h-20",
            text: "Dr. Chen helps patients achieve healthy, confident skin using advanced dermatology techniques.",
          }].map((doc)=> (
            <div key={doc.name} className="shadow-lg p-6 rounded-2xl bg-white">
              <div className="w-10 h-10 mx-auto rounded-full bg-gray-100 mb-4 flex items-center justify-center shadow-sm" aria-hidden>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
                  <path d="M4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1H4v-1z" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
              <h3 className="font-bold text-xl">{doc.name}</h3>
              <p className="text-blue-600 text-sm mb-2">{doc.role}</p>
              <p className="text-sm mb-4">{doc.text}</p>
              <button className="text-blue-600 font-medium text-sm">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Caring Team */}
      <section className="px-10 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Caring Team</h2>
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[{
            name: "Maria Rodriguez",
            role: "Head Nurse",
            img: "https://i.pravatar.cc/150?img=47",
          },{
            name: "David Kim",
            role: "Lab Technician",
            img: "https://i.pravatar.cc/150?img=12",
          },{
            name: "Jessica Williams",
            role: "Patient Coordinator",
            img: "https://i.pravatar.cc/150?img=5",
          },{
            name: "Tom Chen",
            role: "Physical Therapist",
            img: "https://i.pravatar.cc/150?img=20",
          }].map((team)=>(
            <div key={team.name} className="text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-4 bg-gray-100 shadow-sm flex items-center justify-center" aria-hidden>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
                  <path d="M4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1H4v-1z" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
              <h4 className="font-bold">{team.name}</h4>
              <p className="text-sm text-gray-500">{team.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-400 px-10 py-16 text-center rounded-2xl max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold mb-4">Ready to Meet Us?</h2>
        <p className="mb-6 text-sm">
          Schedule your appointment today and take the first step toward better health with a team
          that cares.
        </p>
        <button className="px-6 py-3 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100">
          Schedule Your Appointment
        </button>
      </section>

      {/* Footer */}
      <footer className="px-10 py-10 text-sm text-gray-600 border-t">
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          <div>
            <h3 className="font-bold mb-2">HealthClinic</h3>
            <p>Your Health, Our Priority.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <p>123 Wellness Ave, Medville</p>
            <p>(123) 456-7890</p>
            <p>contact@healthclinic.com</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Follow Us</h3>
            <p>Facebook · Twitter · Instagram</p>
          </div>
        </div>
        <p className="text-center mt-10 text-xs">
          © 2024 HealthClinic. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
