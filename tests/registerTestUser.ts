// registerTestUser.ts
import fetch from 'node-fetch';

interface ApiResponse {
  user?: object;
  message?: string;
  error?: string;
}

async function registerTestUser(): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword',
        confirmPassword: 'testpassword', // if you need to confirm the password
      }),
    });

    const data: ApiResponse = await response.json() as ApiResponse;

    if (!response.ok) {
      throw new Error(`API error: ${data.error}`);
    }

    console.log('User created successfully:', data);
  } catch (error) {
    console.error('Error registering test user:', (error as Error).message);
  }
}

registerTestUser();
