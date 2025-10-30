export default function Courses() {
  const courses = [
    {
      name: "Hindi & English Typing",
      icon: "⌨️",
      description: "Master Hindi and English typing skills",
      duration: "3 Months"
    },
    {
      name: "Diploma in Computer Application (DCA)",
      icon: "💻",
      description: "Comprehensive computer fundamentals and applications",
      duration: "6 Months"
    },
    {
      name: "DCA + TALLY",
      icon: "📊",
      description: "Computer applications with accounting software",
      duration: "8 Months"
    },
    {
      name: "Advanced Diploma in Computer Application (ADCA)",
      icon: "🎓",
      description: "Advanced computer applications and programming",
      duration: "12 Months"
    },
    {
      name: "Diploma in Financial Accounting (DFA)",
      icon: "💰",
      description: "Comprehensive financial accounting training",
      duration: "6 Months"
    },
    {
      name: "Advanced Diploma in Financial Accounting (ADFA)",
      icon: "📈",
      description: "Advanced accounting and financial management",
      duration: "12 Months"
    },
    {
      name: "10+2 Computer Science",
      icon: "📚",
      description: "Complete computer science curriculum for higher secondary",
      duration: "Varies"
    },
    {
      name: "C & C++",
      icon: "⚙️",
      description: "Master C and C++ programming languages",
      duration: "As per syllabus"
    },
    {
      name: "JAVA",
      icon: "☕",
      description: "Learn Java programming and development",
      duration: "As per syllabus"
    },
    {
      name: "Web Technology (HTML, CSS)",
      icon: "🌐",
      description: "Build modern websites with HTML and CSS",
      duration: "As per syllabus"
    },
    {
      name: "MS Office (Word, Excel, PowerPoint)",
      icon: "📄",
      description: "Master Microsoft Office suite applications",
      duration: "As per syllabus"
    },
    {
      name: "TALLY",
      icon: "🧮",
      description: "Accounting software for business management",
      duration: "As per syllabus"
    },
    {
      name: "Computer Hardware & Maintenance (DCHM)",
      icon: "🔧",
      description: "Diploma in computer hardware and maintenance",
      duration: "6 Months"
    },
    {
      name: "Computer Hardware & Network Engineering (DCHNE)",
      icon: "🖥️",
      description: "Hardware and network engineering diploma",
      duration: "12 Months"
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

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            All courses include hands-on practice in our AC classrooms and labs with expert faculty guidance
          </p>
          <button
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

