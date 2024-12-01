const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: process.env.COMPANY_EMAIL,
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
      // Send email to the company email
      await transporter.sendMail({
        from: `"Support" <${process.env.COMPANY_EMAIL}>`, // The user's email as the sender
        to: process.env.COMPANY_EMAIL, // Company's email
        replyTo: email,
        subject: 'New Customer Inquiry',
        text: `Message from: ${email}

               ${message}`,
      });
      res.status(200).json({ message: 'Email sent successfully to the company' });
    } else if (method === 'sms') {
      // Send SMS to the company phone number
      await twilioClient.messages.create({
        body: `New message from ${phone || 'unknown phone'}:
               ${message}`,
        from: process.env.TWILIO_PHONE_NUMBER, // Twilio's phone number
        to: process.env.COMPANY_PHONE_NUMBER, // Company's phone number
      });
      res.status(200).json({ message: 'SMS sent successfully to the company' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
