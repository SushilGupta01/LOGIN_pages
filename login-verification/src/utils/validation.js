const countryPhoneLengths = {
  in: 10, // India
  us: 10, // United States
  gb: 10, // United Kingdom
  ca: 10, // Canada
  au: 9,  // Australia
  // Add more countries and their phone number lengths as needed
};

export function validatePhoneNumber(phone, country = 'in') {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  const requiredLength = countryPhoneLengths[country.toLowerCase()];
  if (!requiredLength) {
    return 'Unsupported country for phone validation';
  }
  if (digits.length !== requiredLength) {
    return "Phone number must be exactly " + requiredLength + " digits for country " + country.toUpperCase();
  }
  if (digits.startsWith('0')) {
    return 'Phone number should not start with 0';
  }
  return '';
}
