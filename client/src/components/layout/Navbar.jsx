import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
            >
              <img 
                src="/lcc-logo.png" 
                alt="LCC Sahibganj Logo" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-xl font-bold text-gray-900">LCC Sahibganj</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 transition font-medium hover:text-[#3B9797]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('verify')}
              className="text-gray-700 transition font-medium hover:text-[#3B9797]"
            >
              Verify Certificate
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 transition font-medium hover:text-[#3B9797]"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-gray-700 transition font-medium hover:text-[#3B9797]"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 transition font-medium hover:text-[#3B9797]"
            >
              Contact
            </button>
            
            {/* Auth-aware button */}
            {isAuthenticated() ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 text-white rounded-lg transition flex items-center space-x-2"
                  style={{ backgroundColor: '#3B9797' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d7575'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B9797'}
                >
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="px-4 py-2 text-white rounded-lg transition flex items-center space-x-2"
                style={{ backgroundColor: '#3B9797' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d7575'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B9797'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none hover:text-[#3B9797]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 transition font-medium text-left px-4 py-2 hover:bg-gray-50 rounded hover:text-[#3B9797]"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('verify')}
                className="text-gray-700 transition font-medium text-left px-4 py-2 hover:bg-gray-50 rounded hover:text-[#3B9797]"
              >
                Verify Certificate
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 transition font-medium text-left px-4 py-2 hover:bg-gray-50 rounded hover:text-[#3B9797]"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="text-gray-700 transition font-medium text-left px-4 py-2 hover:bg-gray-50 rounded hover:text-[#3B9797]"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 transition font-medium text-left px-4 py-2 hover:bg-gray-50 rounded hover:text-[#3B9797]"
              >
                Contact
              </button>
              {isAuthenticated() ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="mx-4 px-4 py-2 text-white rounded-lg transition text-center"
                    style={{ backgroundColor: '#3B9797' }}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }}
                    className="mx-4 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  className="mx-4 px-4 py-2 text-white rounded-lg transition text-center"
                  style={{ backgroundColor: '#3B9797' }}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

