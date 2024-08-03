import { RegisterUserForm } from './../models/register.model';


export type ValidationRegisterErrors= Partial<Record<keyof RegisterUserForm, string>>;

  export const validateForm = (formState: RegisterUserForm): ValidationRegisterErrors => {
    let errors: ValidationRegisterErrors = {};

  if (!formState.name) {
    errors.name = 'Name is required';
  }

  if (!formState.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!formState.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!formState.password) {
    errors.password = 'Password is required';
  } else if (formState.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!formState.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (formState.confirmPassword !== formState.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!formState.matricula) {
    errors.matricula = 'Matricula is required';
  }

  if (!formState.photo) {
    errors.photo = 'Photo is required';
  }

  return errors;
  };