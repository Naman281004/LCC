import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/public/HeroSection';
import AboutUs from '../components/public/AboutUs';
import Courses from '../components/public/Courses';
import ContactInfo from '../components/public/ContactInfo';
import CertificateSearch from '../components/public/CertificateSearch';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CertificateSearch />
        <AboutUs />
        <Courses />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
}

