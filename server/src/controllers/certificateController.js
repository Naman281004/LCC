import prisma from '../config/prismaClient.js';

// Get single certificate by ID (Public)
export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    // Support lookup by internal id OR by registrationNumber (public-facing)
    const certificate = await prisma.certificate.findFirst({
      where: {
        OR: [
          { id },
          { registrationNumber: { equals: id, mode: 'insensitive' } }
        ]
      }
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all certificates (Admin only)
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(certificates);
  } catch (error) {
    console.error('Get all certificates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new certificate (Admin only)
export const createCertificate = async (req, res) => {
  try {
    const { 
      registrationNumber, 
      studentName, 
      course, 
      duration, 
      startDate, 
      endDate, 
      issueDate, 
      status 
    } = req.body;

    if (!registrationNumber || !studentName || !course || !duration || !startDate || !endDate || !issueDate) {
      return res.status(400).json({ 
        error: 'Registration number, student name, course, duration, start date, end date, and issue date are required' 
      });
    }

    const certificate = await prisma.certificate.create({
      data: {
        registrationNumber,
        studentName,
        course,
        duration,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        issueDate: new Date(issueDate),
        status: status || 'VERIFIED'
      }
    });

    res.status(201).json(certificate);
  } catch (error) {
    console.error('Create certificate error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Registration number already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update certificate (Admin only)
export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      registrationNumber, 
      studentName, 
      course, 
      duration, 
      startDate, 
      endDate, 
      issueDate, 
      status 
    } = req.body;

    // Build update data object
    const updateData = {};
    if (registrationNumber !== undefined) updateData.registrationNumber = registrationNumber;
    if (studentName !== undefined) updateData.studentName = studentName;
    if (course !== undefined) updateData.course = course;
    if (duration !== undefined) updateData.duration = duration;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);
    if (issueDate !== undefined) updateData.issueDate = new Date(issueDate);
    if (status !== undefined) updateData.status = status;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: updateData
    });

    res.json(certificate);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Registration number already exists' });
    }
    console.error('Update certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete certificate (Admin only)
export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.certificate.delete({
      where: { id }
    });

    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    console.error('Delete certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

