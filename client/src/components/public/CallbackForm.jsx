import { useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../../lib/axios';

export default function CallbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await axiosInstance.post('/callback', formData);
      toast.success('Your inquiry has been submitted! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    } catch (error) {
      console.error('Callback error:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="callback-form" className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request a Callback</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: '#3B9797' }}></div>
          <p className="text-gray-600">
            Fill out the form below and our team will get back to you shortly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Interested In
              </label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
              >
                <option value="">Select a course</option>
                <option value="ADCA+TALLY+COMPUTER TYPING HINDI+ENGLISH">ADCA+TALLY+COMPUTER TYPING HINDI+ENGLISH</option>
                <option value="ADVANCED DIPLOMA IN COMPUTER APPLICATION (ADCA)">ADVANCED DIPLOMA IN COMPUTER APPLICATION (ADCA)</option>
                <option value="DIPLOMA IN FINANCIAL ACCOUNTING--TALLY (DFA)">DIPLOMA IN FINANCIAL ACCOUNTING--TALLY (DFA)</option>
                <option value="COMPUTER TYPING COURSE HINDI+ENGLISH">COMPUTER TYPING COURSE HINDI+ENGLISH</option>
                <option value="DIPLOMA IN COMPUTER APPLICATION (DCA)">DIPLOMA IN COMPUTER APPLICATION (DCA)</option>
                <option value="DIPLOMA IN COMPUTER APPLICATION (DCA+TALLY)">DIPLOMA IN COMPUTER APPLICATION (DCA+TALLY)</option>
                <option value="DIPLOMA IN COMPUTER APPLICATION (DCA)+TYPING (ENGLISH+HINDI)">DIPLOMA IN COMPUTER APPLICATION (DCA)+TYPING (ENGLISH+HINDI)</option>
                <option value="University Programs">Aisect University Programs</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
              placeholder="Any additional information..."
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#3B9797' }}
              onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#2d7575')}
              onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#3B9797')}
            >
              {isSubmitting ? 'Submitting...' : 'Request Callback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
