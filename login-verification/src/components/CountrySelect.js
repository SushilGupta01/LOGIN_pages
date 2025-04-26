import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Form.css';

const CountrySelect = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="country-select">
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={phone => setPhone(phone)}
        enableSearch={true}
        disableCountryCode={false}
        disableDropdown={false}
        countryCodeEditable={true}
      />
    </div>
  );
};

export default CountrySelect;
