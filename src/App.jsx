// src/App.js
import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    date: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/generate-pdf', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'offer-letter.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="container">
      <h1>Offer Letter Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Role:
          <select className='input' name="role" value={formData.role} onChange={handleChange} required>
            <option value="" disabled>
              Select Role
            </option>
            <option value="web-developer">Web Developer</option>
            <option value="app-developer">App Developer</option>
          </select>
        </label>
        <label>
          Date of Joining:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">Generate PDF</button>
      </form>
    </div>
  );
};

export default App;
