import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: true, message: result.message || 'Message sent successfully!' });
        setFormData({ message: '', email: '', phone: '', method: 'email' });
      } else {
        setStatus({ success: false, message: result.error || 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ success: false, message: 'Network error. Please try again.' });
    }
  };

  // (currently doesn't work)
  /* Fetches user data if we want to use the currently logged in user's email/stored phone number
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            email: data.email || '',
            phone: data.phone || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  */

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h1>Contact Us</h1>
          <div style={fieldStyle}>
            <label htmlFor="method">Preferred Contact Method</label>
            <select
              id="method"
              name="method"
              value={formData.method}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </div>
  
          {formData.method === 'email' && (
            <div style={fieldStyle}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          )}
  
          {formData.method === 'sms' && (
            <div style={fieldStyle}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          )}
  
          <div style={fieldStyle}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
              style={textareaStyle}
            />
          </div>
  
          <button type="submit" style={buttonStyle}>Send</button>
          {status.message && (
            <p style={{ color: status.success ? 'green' : 'red', marginTop: '10px' }}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

// Same styles as before
const formStyle = { maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' };
const fieldStyle = { marginBottom: '15px' };
const inputStyle = { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const textareaStyle = { ...inputStyle, height: '100px', resize: 'vertical', maxHeight: '300px' };
const selectStyle = { ...inputStyle };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const containerStyle = { marginTop: '85px', padding: '20px' };

export default ContactForm;
