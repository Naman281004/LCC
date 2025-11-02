import { useState, useEffect, Fragment, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import axiosInstance from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth.jsx';

// Memoized table component to prevent unnecessary re-renders
const CertificatesTable = memo(function CertificatesTable({ 
  certificates, 
  isLoading, 
  formatDate, 
  handleToggleStatus, 
  openEditModal, 
  openDeleteModal 
}) {
  if (isLoading) {
    return (
      <div className="px-6 py-12 text-center text-gray-500">
        Loading certificates...
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-gray-500">
        No certificates found. Add your first certificate!
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Reg. No.
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Student Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Course
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Duration
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Start Date
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            End Date
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Issue Date
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Status
          </th>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {certificates.map((cert) => (
          <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-3 py-3 whitespace-nowrap text-sm font-mono font-medium text-gray-900">
              {cert.registrationNumber}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">
              {cert.studentName}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 max-w-[200px]">
              <div className="truncate" title={cert.course}>
                {cert.course}
              </div>
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
              {cert.duration}
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
              {formatDate(cert.startDate)}
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
              {formatDate(cert.endDate)}
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
              {formatDate(cert.issueDate)}
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-sm">
              <button
                onClick={() => handleToggleStatus(cert)}
                className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                  cert.status === 'VERIFIED'
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                } transition cursor-pointer`}
              >
                {cert.status}
              </button>
            </td>
            <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openEditModal(cert)}
                  className="hover:opacity-75 font-semibold"
                  style={{ color: '#3B9797' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(cert)}
                  className="hover:opacity-75 font-semibold"
                  style={{ color: '#BF092F' }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default function AdminDashboard() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountForm, setAccountForm] = useState({ email: '', currentPassword: '', newPassword: '' });
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    studentName: '',
    course: '',
    duration: '',
    startDate: '',
    endDate: '',
    issueDate: '',
    status: 'VERIFIED'
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/certificate');
      setCertificates(response.data);
    } catch (error) {
      toast.error('Failed to fetch certificates');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.registrationNumber || !formData.studentName || !formData.course || 
        !formData.duration || !formData.startDate || !formData.endDate || !formData.issueDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      console.log('Sending data:', formData); // Debug log
      await axiosInstance.post('/certificate', formData);
      toast.success('Certificate added successfully');
      setShowAddModal(false);
      resetForm();
      fetchCertificates();
    } catch (error) {
      console.error('Add error details:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Failed to add certificate');
    }
  };

  const handleEditCertificate = async (e) => {
    e.preventDefault();
    
    try {
      await axiosInstance.put(`/certificate/${selectedCertificate.id}`, formData);
      toast.success('Certificate updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchCertificates();
    } catch (error) {
      toast.error('Failed to update certificate');
      console.error('Update error:', error);
    }
  };

  const handleDeleteCertificate = async () => {
    try {
      await axiosInstance.delete(`/certificate/${selectedCertificate.id}`);
      toast.success('Certificate deleted successfully');
      setShowDeleteModal(false);
      fetchCertificates();
    } catch (error) {
      toast.error('Failed to delete certificate');
      console.error('Delete error:', error);
    }
  };

  const handleToggleStatus = useCallback(async (certificate) => {
    try {
      const newStatus = certificate.status === 'VERIFIED' ? 'UNVERIFIED' : 'VERIFIED';
      await axiosInstance.put(`/certificate/${certificate.id}`, { status: newStatus });
      toast.success(`Certificate ${newStatus.toLowerCase()}`);
      fetchCertificates();
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Toggle error:', error);
    }
  }, []);

  const openAddModal = useCallback(() => {
    resetForm();
    setShowAddModal(true);
  }, []);

  const openEditModal = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    setFormData({
      registrationNumber: certificate.registrationNumber,
      studentName: certificate.studentName,
      course: certificate.course,
      duration: certificate.duration,
      startDate: certificate.startDate ? certificate.startDate.split('T')[0] : '',
      endDate: certificate.endDate ? certificate.endDate.split('T')[0] : '',
      issueDate: certificate.issueDate ? certificate.issueDate.split('T')[0] : '',
      status: certificate.status
    });
    setShowEditModal(true);
  }, []);

  const openDeleteModal = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    setShowDeleteModal(true);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      registrationNumber: '',
      studentName: '',
      course: '',
      duration: '',
      startDate: '',
      endDate: '',
      issueDate: '',
      status: 'VERIFIED'
    });
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const openAccountModal = useCallback(() => {
    setAccountForm({ email: '', currentPassword: '', newPassword: '' });
    setShowAccountModal(true);
  }, []);

  const handleUpdateAccount = useCallback(async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (accountForm.email) payload.email = accountForm.email;
      if (accountForm.newPassword) {
        if (!accountForm.currentPassword) {
          toast.error('Current password is required to set a new password');
          return;
        }
        payload.currentPassword = accountForm.currentPassword;
        payload.newPassword = accountForm.newPassword;
      }
      if (Object.keys(payload).length === 0) {
        toast.error('Nothing to update');
        return;
      }
      await axiosInstance.put('/auth/admin', payload);
      toast.success('Account updated');
      setShowAccountModal(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update account');
    }
  }, [accountForm]);

  // Excel export function
  const exportToExcel = useCallback(() => {
    if (certificates.length === 0) {
      toast.error('No certificates to export');
      return;
    }

    try {
      // Prepare data for Excel
      const excelData = certificates.map(cert => ({
        'Registration Number': cert.registrationNumber,
        'Student Name': cert.studentName,
        'Course': cert.course,
        'Duration': cert.duration,
        'Start Date': formatDate(cert.startDate),
        'End Date': formatDate(cert.endDate),
        'Issue Date': formatDate(cert.issueDate),
        'Status': cert.status,
        'Created At': formatDate(cert.createdAt)
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Set column widths
      const colWidths = [
        { wch: 20 }, // Registration Number
        { wch: 25 }, // Student Name
        { wch: 30 }, // Course
        { wch: 15 }, // Duration
        { wch: 12 }, // Start Date
        { wch: 12 }, // End Date
        { wch: 12 }, // Issue Date
        { wch: 12 }, // Status
        { wch: 12 }  // Created At
      ];
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Certificates');

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `LCC_Certificates_${currentDate}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);
      
      toast.success(`Exported ${certificates.length} certificates to ${filename}`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export certificates');
    }
  }, [certificates, formatDate]);

  // Memoize table props to prevent unnecessary re-renders
  const tableProps = useMemo(() => ({
    certificates,
    isLoading,
    formatDate,
    handleToggleStatus,
    openEditModal,
    openDeleteModal
  }), [certificates, isLoading, formatDate, handleToggleStatus, openEditModal, openDeleteModal]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/lcc-logo.png"
                alt="LCC Sahibganj"
                className="h-8 w-auto cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <span className="ml-3 text-xl font-bold text-gray-900">
                LCC Computer Center
              </span>
            </div>
            <div className="flex items-center space-x-4">
                <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center px-4 py-2 text-gray-700 transition hover:text-[#3B9797]"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Public Site
              </a>
                <button
                  onClick={openAccountModal}
                  className="hidden sm:flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 min-h-screen">
        <div className="bg-white rounded-lg shadow h-[calc(100vh-120px)] flex flex-col">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-900">Certificates</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToExcel}
                disabled={certificates.length === 0}
                className="flex items-center px-4 py-2 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#10B981' }}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#059669')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#10B981')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Excel
              </button>
              <button
                onClick={openAddModal}
                className="px-4 py-2 text-white rounded-lg transition"
                style={{ backgroundColor: '#3B9797' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2d7575'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3B9797'}
              >
                Add New Certificate
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto flex-1">
            <CertificatesTable {...tableProps} />
          </div>
        </div>
      </div>

      {/* Add Certificate Modal */}
      <Transition appear show={showAddModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowAddModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    Add New Certificate
                  </Dialog.Title>

                  <form onSubmit={handleAddCertificate}>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Registration Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., LCC2024001"
                          value={formData.registrationNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course *
                        </label>
                        <select
                          required
                          value={formData.course}
                          onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        >
                          <option value="">Select Course</option>
                          <option value="Hindi & English Typing">Hindi & English Typing</option>
                          <option value="DCA">Diploma in Computer Application (DCA)</option>
                          <option value="DCA + TALLY">DCA + TALLY</option>
                          <option value="ADCA">Advanced Diploma in Computer Application (ADCA)</option>
                          <option value="DFA">Diploma in Financial Accounting (DFA)</option>
                          <option value="ADFA">Advanced Diploma in Financial Accounting (ADFA)</option>
                          <option value="10+2 Computer Science">10+2 Computer Science</option>
                          <option value="C & C++">C & C++</option>
                          <option value="JAVA">JAVA</option>
                          <option value="Web Technology">Web Technology (HTML, CSS)</option>
                          <option value="MS Office">MS Office (Word, Excel, PowerPoint)</option>
                          <option value="TALLY">TALLY</option>
                          <option value="DCHM">Computer Hardware & Maintenance (DCHM)</option>
                          <option value="DCHNE">Computer Hardware & Network Engineering (DCHNE)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., 3 Months, 6 Months, 12 Months"
                          value={formData.duration}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.issueDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status *
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        >
                          <option value="VERIFIED">VERIFIED</option>
                          <option value="UNVERIFIED">UNVERIFIED</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 text-white px-4 py-2 rounded-lg transition"
                        style={{ backgroundColor: '#3B9797' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2d7575'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3B9797'}
                      >
                        Add Certificate
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Certificate Modal */}
      <Transition appear show={showEditModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowEditModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    Edit Certificate
                  </Dialog.Title>

                  <form onSubmit={handleEditCertificate}>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Registration Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., LCC2024001"
                          value={formData.registrationNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course *
                        </label>
                        <select
                          required
                          value={formData.course}
                          onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        >
                          <option value="">Select Course</option>
                          <option value="Hindi & English Typing">Hindi & English Typing</option>
                          <option value="DCA">Diploma in Computer Application (DCA)</option>
                          <option value="DCA + TALLY">DCA + TALLY</option>
                          <option value="ADCA">Advanced Diploma in Computer Application (ADCA)</option>
                          <option value="DFA">Diploma in Financial Accounting (DFA)</option>
                          <option value="ADFA">Advanced Diploma in Financial Accounting (ADFA)</option>
                          <option value="10+2 Computer Science">10+2 Computer Science</option>
                          <option value="C & C++">C & C++</option>
                          <option value="JAVA">JAVA</option>
                          <option value="Web Technology">Web Technology (HTML, CSS)</option>
                          <option value="MS Office">MS Office (Word, Excel, PowerPoint)</option>
                          <option value="TALLY">TALLY</option>
                          <option value="DCHM">Computer Hardware & Maintenance (DCHM)</option>
                          <option value="DCHNE">Computer Hardware & Network Engineering (DCHNE)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., 3 Months, 6 Months, 12 Months"
                          value={formData.duration}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.issueDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status *
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none"
                        >
                          <option value="VERIFIED">VERIFIED</option>
                          <option value="UNVERIFIED">UNVERIFIED</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 text-white px-4 py-2 rounded-lg transition"
                        style={{ backgroundColor: '#3B9797' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2d7575'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3B9797'}
                      >
                        Update Certificate
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Certificate Modal */}
      <Transition appear show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowDeleteModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    Confirm Delete
                  </Dialog.Title>

                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the certificate for{' '}
                    <span className="font-semibold">{selectedCertificate?.studentName}</span>? 
                    This action cannot be undone.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDeleteCertificate}
                      className="flex-1 text-white px-4 py-2 rounded-lg transition"
                      style={{ backgroundColor: '#BF092F' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#8a0723'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#BF092F'}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Account Settings Modal */}
      <Transition appear show={showAccountModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowAccountModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">Account Settings</Dialog.Title>
                  <form onSubmit={handleUpdateAccount}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
                        <input type="email" value={accountForm.email} onChange={(e)=>setAccountForm(prev=>({...prev,email:e.target.value}))} placeholder="Enter new email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input type="password" value={accountForm.currentPassword} onChange={(e)=>setAccountForm(prev=>({...prev,currentPassword:e.target.value}))} placeholder="Required to change password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input type="password" value={accountForm.newPassword} onChange={(e)=>setAccountForm(prev=>({...prev,newPassword:e.target.value}))} placeholder="At least 8 characters" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B9797] focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button type="submit" className="flex-1 text-white px-4 py-2 rounded-lg transition" style={{ backgroundColor: '#3B9797' }} onMouseEnter={(e)=>e.target.style.backgroundColor='#2d7575'} onMouseLeave={(e)=>e.target.style.backgroundColor='#3B9797'}>Save Changes</button>
                      <button type="button" onClick={()=>setShowAccountModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}