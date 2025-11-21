import { EmployeeData, FormErrors } from '../types';

export const validateField = (name: keyof EmployeeData, value: any, formData: EmployeeData): string | undefined => {
  switch (name) {
    case 'fullName':
      if (!value || value.trim().length < 3) return 'Name must be at least 3 characters.';
      if (!/^[A-Za-z\s]+$/.test(value)) return 'Name must contain only alphabets.';
      break;
    
    case 'email':
      if (!value) return 'Email is required.';
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) return 'Email must be a valid @gmail.com address.';
      break;

    case 'contactNumber':
      if (!value) return 'Contact number is required.';
      if (!/^\d{10}$/.test(value)) return 'Contact number must be exactly 10 digits.';
      break;

    case 'gender':
      if (!value) return 'Please select a gender.';
      break;

    case 'skills':
      if (!value || value.length === 0) return 'Please select at least one skill.';
      break;

    case 'department':
      if (!value) return 'Please select a department.';
      break;

    case 'joiningDate':
      if (!value) return 'Joining date is required.';
      break;

    case 'hobbies':
      // Hobbies might be optional based on user prompt interpretation, but let's enforce checking one for completeness or leave optional. 
      // User requirement: "Show selected hobbies", implicit requirement usually means at least one if "Hobbies - checkbox group" is a main control.
      // Let's make it optional but validate if checked to be safe, or just pass.
      // User said "No field should accept invalid data". Empty might be valid for hobbies. 
      // Let's require at least one for stricter validation as per "Required Form Controls" implication.
      if (!value || value.length === 0) return 'Please select at least one hobby.';
      break;

    case 'address':
      if (!value || value.trim().length < 10) return 'Address must be at least 10 characters.';
      break;

    case 'profilePhoto':
      if (!value) return 'Profile photo is required.';
      if (value instanceof File) {
        if (!value.type.startsWith('image/')) return 'File must be an image.';
        if (value.size > 5 * 1024 * 1024) return 'Image size must be less than 5MB.';
      }
      break;
  }
  return undefined;
};

export const validateForm = (data: EmployeeData): FormErrors => {
  const errors: FormErrors = {};
  (Object.keys(data) as Array<keyof EmployeeData>).forEach((key) => {
    const error = validateField(key, data[key], data);
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};