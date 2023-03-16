import { RegistrationData } from '../types/registration';
import { User } from '../types/user';

export async function registerUser(registrationData: RegistrationData) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.error || 'Registration failed';
    throw new Error(errorMessage);
  }

  return data.user;
}


export async function loginUser(email: string, password: string): Promise<User> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.error || 'Login failed';
    throw new Error(errorMessage);
  }

  return data.user;
}
