const express = require('express');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
require('dotenv').config();

const router = express.Router();

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      await sgMail.send({
        to: process.env.COMPANY_EMAIL,
        from: process.env.COMPANY_EMAIL,
        subject: 'New Customer Inquiry',
        text: `Message from: ${email || 'Unknown email'}

          ${message}`,
      });
      res.status(200).json({ message: 'Email sent successfully to the company' });
    } else if (method === 'sms') {
      // Send SMS to the company phone number
      await twilioClient.messages.create({
        body: `New message from ${phone || 'unknown phone'}:
               ${message}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.COMPANY_PHONE_NUMBER,
      });
      res.status(200).json({ message: 'SMS sent successfully to the company' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
