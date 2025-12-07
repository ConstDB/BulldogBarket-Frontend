import { NU_CAMPUSES, NU_COURSES, NU_YEAR_LEVELS } from '../constants/nuConstants';

const signupSchema = {
  studentNumber: { required: true, minLength: 5 },
  password: { required: true, minLength: 6 },
  fullName: { required: true },
  course: { required: true, enum: NU_COURSES },
  year: { required: true, enum: NU_YEAR_LEVELS },
  campus: { required: true, enum: NU_CAMPUSES },
  agree: { required: true }
};

export function validateSignup(formData) {
  const errors = {};

  // Check required fields
  if (!formData.studentNumber?.trim()) {
    errors.studentNumber = 'Student number is required';
  } else if (formData.studentNumber.length < 5) {
    errors.studentNumber = 'Student number must be at least 5 characters';
  }

  if (!formData.password?.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!formData.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!formData.course) {
    errors.course = 'Please select a course';
  }

  if (!formData.year) {
    errors.year = 'Please select a year level';
  }

  if (!formData.campus) {
    errors.campus = 'Please select a campus';
  }

  if (!formData.agree) {
    errors.agree = 'You must agree to the terms';
  }

  return errors;
}