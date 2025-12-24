import { sendCallbackEmail } from '../services/emailService.js';

export const submitCallback = async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }

    // Send callback email
    await sendCallbackEmail({
      name,
      email,
      phone,
      course,
      message
    });

    res.status(200).json({ message: 'Callback request submitted successfully' });
  } catch (error) {
    console.error('Callback submission error:', error);
    res.status(500).json({ error: 'Failed to submit callback request' });
  }
};
