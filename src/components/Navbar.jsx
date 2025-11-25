import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

  return (
    <nav className="sticky top-2 sm:top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-6xl transition-all duration-300 ease-out ${
          isCompact ? 'h-14 rounded-xl' : 'h-16 rounded-2xl'
        } border border-white/40 bg-white/30 backdrop-blur-sm shadow-header px-4 sm:px-6`}
      >
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-glass text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-clinic-blue-dark">HealthClinic</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm lg:text-base">
            {['Home', 'Services', 'Find a Doctor', 'About Us'].map((item) => (
              <a
                key={item}
                href="#"
                className={`text-slate-700/90 hover:text-clinic-blue transition-colors font-medium ${focusRing}`}
              >
                {item}
              </a>
            ))}
            <button
              className={`bg-primary-600/90 text-white px-4 py-2 rounded-xl shadow-glass hover:bg-primary-600 transition-colors font-semibold ${focusRing}`}
              aria-label="Book an appointment"
            >
              Book Appointment
            </button>
          </div>

          {/* User Avatar */}
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full border border-white/70 bg-white/60 backdrop-blur-xs flex items-center justify-center text-slate-600 ${focusRing}`}
              aria-label="User menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

