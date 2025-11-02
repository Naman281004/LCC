export default function AboutUs() {
  return (
    <div id="about" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: '#BF092F' }}></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              About LCC Sahibganj
            </h3>
            <p className="text-gray-600 mb-4">
              Established in 1996, LCC Computer Center is Sahibganj's premier computer education institute. 
              We pride ourselves on providing quality education with modern facilities including air-conditioned 
              classrooms and labs, a well-equipped library, and state-of-the-art computer labs.
            </p>
            <p className="text-gray-600">
              Our expert faculty members use innovative teaching techniques to help students excel in 
              programming (C, C++, Java), web technologies, accounting (Tally, DFA, ADFA), hardware & networking, 
              and diploma courses (DCA, ADCA). Each certificate issued comes with a unique verification ID for instant validation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'rgba(59, 151, 151, 0.1)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>1996</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'rgba(59, 151, 151, 0.1)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>AC</div>
              <div className="text-gray-600">Classrooms</div>
            </div>
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'rgba(59, 151, 151, 0.1)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>Library</div>
              <div className="text-gray-600">& Computer Lab</div>
            </div>
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: 'rgba(59, 151, 151, 0.1)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#3B9797' }}>Expert</div>
              <div className="text-gray-600">Faculty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

