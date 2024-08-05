import { LoginUserForm } from './../models/login.model';


export type ValidationLoginErrors = Partial<Record<keyof LoginUserForm, string>>;

  export const validateForm = (formState: LoginUserForm): ValidationLoginErrors => {
    let errors: ValidationLoginErrors = {};

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

  return errors;
  };