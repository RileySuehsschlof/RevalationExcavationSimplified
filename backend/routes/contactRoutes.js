const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/', async (req, res) => {
  const { message, email, phone, method } = req.body;

  if (!message || (!email && method === 'email') || (!phone && method === 'sms')) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    if (method === 'email') {
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Customer Inquiry',
        text: message,
      });
      res.status(200).json({ message: 'Email sent successfully' });
    } else if (method === 'sms') {
      // Send SMS
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      res.status(200).json({ message: 'SMS sent successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
