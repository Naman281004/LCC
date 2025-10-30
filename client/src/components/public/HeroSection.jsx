export default function HeroSection() {
  const scrollToVerify = () => {
    const element = document.getElementById('verify');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #132440 0%, #16476A 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full mb-8 backdrop-blur-sm border transition-all duration-300 cursor-default hover:scale-110 hover:shadow-lg" 
            style={{ backgroundColor: 'rgba(191, 9, 47, 0.15)', borderColor: 'rgba(191, 9, 47, 0.3)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(191, 9, 47, 0.35)';
              e.currentTarget.style.borderColor = 'rgba(191, 9, 47, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(191, 9, 47, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(191, 9, 47, 0.3)';
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold">Trusted Since 1996</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="inline-block transition-all duration-300 cursor-default hover:scale-105 hover:text-shadow-lg" 
              style={{ textShadow: '0 0 0 transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = '0 0 20px rgba(59, 151, 151, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 0 transparent'}
            >
              LCC Computer Center
            </span>
            <span 
              className="block text-3xl md:text-4xl mt-4 transition-all duration-300 cursor-default hover:scale-105" 
              style={{ color: 'white', textShadow: '0 0 0 transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 0 20px rgba(191, 9, 47, 0.6)';
                e.currentTarget.style.color = '#BF092F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = '0 0 0 transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Certificate Verification Portal
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-xl md:text-2xl mb-6 text-gray-300 max-w-3xl mx-auto transition-all duration-300 cursor-default rounded-lg p-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.15)';
              e.currentTarget.style.color = '#3B9797';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#d1d5db';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Sahibganj's Premier Computer Education Institute Since 1996
          </p>
          
          <p 
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 transition-all duration-300 cursor-default rounded-lg p-3"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            Offering 14+ comprehensive courses including DCA, ADCA, Tally, Hardware & Networking, Programming, and more. 
            Verify the authenticity of certificates with your unique certificate ID.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToVerify}
              className="px-8 py-4 text-white rounded-lg font-semibold text-lg transition transform hover:scale-105 shadow-xl"
              style={{ backgroundColor: '#3B9797' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2d7575'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3B9797'}
            >
              Verify Certificate Now
            </button>
            <button
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 text-gray-200 rounded-lg font-semibold text-lg transition"
              style={{ borderColor: '#3B9797' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(59, 151, 151, 0.1)';
                e.target.style.borderColor = '#3B9797';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#3B9797';
              }}
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div 
              className="text-center transition-all duration-300 cursor-default p-4 rounded-lg hover:scale-110 hover:shadow-2xl"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.2)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>1996</div>
              <div className="text-gray-400">Established</div>
            </div>
            <div 
              className="text-center transition-all duration-300 cursor-default p-4 rounded-lg hover:scale-110 hover:shadow-2xl"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.2)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>AC</div>
              <div className="text-gray-400">Classroom and Labs</div>
            </div>
            <div 
              className="text-center transition-all duration-300 cursor-default p-4 rounded-lg hover:scale-110 hover:shadow-2xl"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.2)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>Expert</div>
              <div className="text-gray-400">Faculty</div>
            </div>
            <div 
              className="text-center transition-all duration-300 cursor-default p-4 rounded-lg hover:scale-110 hover:shadow-2xl"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.2)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>24/7</div>
              <div className="text-gray-400">Verification</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </div>
  );
}

