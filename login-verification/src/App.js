import React, { useState } from 'react';
import PhoneEmailForm from './components/PhoneEmailForm';
import OTPForm from './components/OTPForm';
import './App.css';

function App() {
  const [showOTP, setShowOTP] = useState(false);

  return (
    <div className="app-container">
      {!showOTP && <PhoneEmailForm onSend={() => setShowOTP(true)} />}
      {showOTP && <OTPForm />}
    </div>
  );
}

export default App;