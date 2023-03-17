import { RegistrationData } from '../types/user/registration';
import { User } from '../types/user/user';

export async function registerUser(registrationData: RegistrationData) {
  const response = await fetch('/api/user/register', {
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
  const response = await fetch('/api/user/login', {
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
