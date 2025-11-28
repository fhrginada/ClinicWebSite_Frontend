/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'clinic-ice': '#f6fbff',
        'clinic-sky': '#d8edff',
        'clinic-sky-light': '#e7f2ff',
        'clinic-pearl': '#eef5ff',
        'clinic-blue': '#2b5be3',
        'clinic-blue-dark': '#1f3c88',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '40px',
      },
      boxShadow: {
        glass: '0 30px 60px rgba(15, 23, 42, 0.18)',
        header: '0 20px 40px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'hero-soft':
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.75), rgba(255,255,255,0) 52%), radial-gradient(circle at 80% 0%, rgba(82,147,255,0.25), rgba(82,147,255,0)), linear-gradient(135deg, #f7fbff 0%, #e0f0ff 50%, #d6ecff 100%)',
        'clinic-radial':
          'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 85% 15%, rgba(104,153,255,0.28) 0%, rgba(255,255,255,0) 55%), linear-gradient(180deg, #f4f8ff 0%, #e5efff 55%, #dce8ff 100%)',
      },
    },
  },
  plugins: [],
}

