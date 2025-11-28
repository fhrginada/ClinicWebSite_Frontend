import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import LeadPractitioner from './components/LeadPractitioner';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Services />
      <LeadPractitioner />
      <Footer />
    </main>
  );
}
