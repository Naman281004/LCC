export default function Courses() {
  const courses = [
    {
      name: "ADCA+TALLY+COMPUTER TYPING HINDI+ENGLISH",
      icon: "🎓",
      description: "Complete advanced computer education package",
      duration: "15 Months"
    },
    {
      name: "ADVANCED DIPLOMA IN COMPUTER APPLICATION (ADCA)",
      icon: "💻",
      description: "Advanced computer applications and programming",
      duration: "12 Months"
    },
    {
      name: "DIPLOMA IN FINANCIAL ACCOUNTING--TALLY (DFA)",
      icon: "📊",
      description: "Financial accounting with TALLY software",
      duration: "6 Months"
    },
    {
      name: "COMPUTER TYPING COURSE HINDI+ENGLISH",
      icon: "⌨️",
      description: "Master Hindi and English typing skills",
      duration: "6+6 Months"
    },
    {
      name: "DIPLOMA IN COMPUTER APPLICATION (DCA)",
      icon: "💼",
      description: "Comprehensive computer fundamentals and applications",
      duration: "6 Months"
    },
    {
      name: "DIPLOMA IN COMPUTER APPLICATION (DCA+TALLY)",
      icon: "📈",
      description: "Computer applications with accounting software",
      duration: "10 Months"
    },
    {
      name: "DIPLOMA IN COMPUTER APPLICATION (DCA)+TYPING (ENGLISH+HINDI)",
      icon: "🖥️",
      description: "Computer applications with typing training",
      duration: "10 Months"
    }
  ];

  return (
    <div id="courses" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Courses</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: '#BF092F' }}></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive computer education programs designed to boost your skills and career prospects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
            >
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span 
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(59, 151, 151, 0.1)', color: '#3B9797' }}
                >
                  {course.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Aisect University Admission Section */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border-2 border-teal-200">
          <div className="text-center mb-8">
            <button 
              onClick={() => document.getElementById('callback-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 hover:bg-teal-700 transition cursor-pointer"
            >
              🎓 Aisect University Admission Open!!!
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">University Programs</h2>
            <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#3B9797' }}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Polytechnic */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-teal-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2">🔧</span>
                POLYTECHNIC
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-semibold">3 Years - 6 Semester</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>DIPLOMA IN COMPUTER ENGINEERING</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>DIPLOMA IN ELECTRICAL ENGINEERING</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>DIPLOMA IN CIVIL ENGINEERING</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>DIPLOMA IN MINING ENGINEERING</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>DIPLOMA IN MECHANICAL ENGINEERING</span>
                </li>
              </ul>
            </div>

            {/* Graduations */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2">🎓</span>
                GRADUATIONS
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-semibold">3 Years - 6 Semester</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>BCA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>BBA (ALL)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>BSC-IT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>BA - (PUBLIC ADMINISTRATION, HISTORY, POLITICAL SCIENCE, ECONOMICS, PSYCHOLOGY, HINDI, ENGLISH ETC.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>B.COM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>B.SC. (PHYSICS, CHEMISTRY, MATH, IT ETC.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>B.LIB. SC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>M.LIB. SC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>BA-JOUR.& MASS COMM.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>BA-FINE ARTS, BA SOCIAL WORK (BSW)</span>
                </li>
              </ul>
            </div>

            {/* Master's Degree */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                MASTER DEGREE & POST GRADUATION
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-semibold">1/2/3 Year</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>MCA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>MBA (HR, IT, FM, MKT)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>MSC-IT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>MA - (HISTORY, POLITICAL SCIENCE, ECONOMICS, PSYCHOLOGY, HINDI, ENGLISH ETC.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>M.COM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>M.SC. (PHYSICS, CHEMISTRY, MATH, IT ETC.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>PGDCA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>PGDRD</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* University Achievement Images */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <img 
              src="/aisect-rating.png" 
              alt="Aisect University AAA+ Rating - Careers360 Rankings 2025" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <img 
              src="/aisect-ranking.png" 
              alt="Aisect University Rankings - 2nd in Jharkhand, 75th in India" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            All courses include hands-on practice in our AC classrooms and labs with expert faculty guidance
          </p>
          <button
            onClick={() => document.getElementById('callback-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 text-white font-semibold rounded-lg transition"
            style={{ backgroundColor: '#3B9797' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2d7575'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3B9797'}
          >
            Contact Us for Admission
          </button>
        </div>
      </div>
    </div>
  );
}

