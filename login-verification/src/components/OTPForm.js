import React, { useRef, useState } from 'react';
import './Form.css';
import secureIcon from '../assets/secure.png';

const OTPForm = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [resendCount, setResendCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) {
      e.target.value = '';
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    setResendCount(resendCount + 1);
    setOtp(new Array(6).fill(''));
    inputsRef.current[0].focus();
    setMessage('Please re-enter the code sent to your phone/email.');
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <img src={secureIcon} alt="Lock Icon" />
      </div>

      <h3>Enter OTP Code</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      {message && <p className="info-message">{message}</p>}

      <div className="otp-inputs">
        {otp.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            ref={el => inputsRef.current[i] = el}
            value={digit}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      <a href="#" className="resend" onClick={handleResend}>Resend Code</a>

      <button className="submit-btn">Verify Code</button>
    </div>
  );
};

export default OTPForm;
