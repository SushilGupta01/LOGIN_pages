import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Form.css';
import phoneIcon from '../assets/phone.png';
import emailIcon from '../assets/email.png';
import { validatePhoneNumber } from '../utils/validation';

const RESEND_OTP_TIME_LIMIT = 30; // 30 seconds countdown timer

const PhoneEmailForm = ({ onSend }) => {
  const [isPhone, setIsPhone] = useState(true);
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('in');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleTabSwitch = (phoneSelected) => {
    setIsPhone(phoneSelected);
    setError('');
  };
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prevTimer => {
          if (prevTimer <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSend = () => {
    setError('');
    console.log('Phone input value:', phone);
    console.log('Selected country:', country);
    // Remove country code prefix based on selected country before validation
    let localPhone = phone;
    if (country === 'in' && phone.startsWith('91')) {
      localPhone = phone.slice(2);
    }
    const phoneError = validatePhoneNumber(localPhone, country);
    console.log('Phone validation error:', phoneError);
    if (isPhone) {
      if (phoneError) {
        setError('Please enter correct mobile number and number must be exactly of required digits.');
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setError('Please enter correct email address.');
        return;
      }
    }
    onSend();

  };

  return (
    <div className="form-card">
      <div className="form-header">
        <img
          src={isPhone ? phoneIcon : emailIcon}
          alt={isPhone ? "Phone Icon" : "Email Icon"}
        />
      </div>

      <div className="tab-toggle">
        <button className={isPhone ? 'active' : ''} onClick={() => handleTabSwitch(true)}>Phone</button>
        <button className={!isPhone ? 'active' : ''} onClick={() => handleTabSwitch(false)}>Email</button>
      </div>

      <h3>Enter {isPhone ? 'Phone Number' : 'Email'}</h3>
      <p className="error-message">{error}</p>

      {isPhone ? (
        <div className="input-group">
          <PhoneInput
            country={'in'}
            value={phone}
            onChange={phone => setPhone(phone)}
            enableSearch={true}
            disableCountryCode={false}
            disableDropdown={false}
            countryCodeEditable={true}
            inputClass="phone-input"
          />
        </div>
      ) : (
        <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="email-input"
      />

      )}

      <button className="submit-btn" onClick={handleSend}>Send Code</button>

    </div>
  );
};

export default PhoneEmailForm;
