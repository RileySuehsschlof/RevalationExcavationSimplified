import React, { useState, useEffect } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    message: '',
    email: '',
    phone: '',
    method: 'email', // Default to email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message || 'Message sent successfully!');
    } catch (error) {
      alert('Failed to send message.');
    }
  };

  useEffect(() => {
    // Fetch user data if logged in --------------------------------------------------------------------------
    const fetchUserData = async () => {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setFormData((prev) => ({ ...prev, email: data.email, phone: data.phone }));
    };
  
    fetchUserData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="message"
        placeholder="Enter your message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your phone number"
        value={formData.phone}
        onChange={handleChange}
      />
      <select name="method" value={formData.method} onChange={handleChange}>
        <option value="email">Email</option>
        <option value="sms">SMS</option>
      </select>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
