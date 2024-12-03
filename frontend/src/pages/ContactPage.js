import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/login.css';  // Import your CSS file

function ContactForm() {
  const [formData, setFormData] = useState({
    message: '',
    email: '',
    phone: '',
    method: 'email',
  });
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ success: true, message: response.data.message || 'Message sent successfully!' });
      setFormData({ message: '', email: '', phone: '', method: 'email' });
    } catch (error) {
      // Uses optional chaining to make error message
      const errorMessage = error.response?.data?.error || 'Failed to send message.';
      setStatus({ success: false, message: errorMessage });
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>Contact Us</h1>
            <div className="input-group">
              <label htmlFor="method">Preferred Contact Method</label>
              <select
                id="method"
                name="method"
                value={formData.method}
                onChange={handleChange}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>

            {formData.method === 'email' && (
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {formData.method === 'sms' && (
              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Send</button>
            {status.message && (
              <p className={status.success ? 'success' : 'error'}>{status.message}</p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
