import React, { useState } from 'react';
import { registerUser, loginUser } from '../lib/user';
import { useUser } from '../context/UserContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
  onLoginButtonClick?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode: initialMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signup' | 'login'>(initialMode);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user, setUser } = useUser();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    if (authMode === 'signup') {
      try {
        const user = await registerUser({ email, password });
        console.log('User registered successfully:', user);
        setSuccessMessage('User registered successfully');

        // Log in the user after successful registration
        const loggedInUser = await loginUser(email, password);
        console.log('User logged in successfully:', loggedInUser);
        setUser(loggedInUser); // Update the user state on successful login
        onClose(); // Close the login modal
      } catch (error) {
        console.error('Registration failed:', error);
        setErrorMessage((error as Error).message);
      }
    } else {
      try {
        const user = await loginUser(email, password);
        console.log('User logged in successfully:', user);
        setSuccessMessage('User logged in successfully');
        setUser(user); // Update the user state on successful login
        onClose(); // Close the login modal
      } catch (error) {
        console.error('Registration failed:', error);
        setErrorMessage((error as Error).message);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 p-8 rounded-md w-full max-w-md relative shadow-lg shadow-purple-400">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-2xl mb-6">
          {authMode === 'signup' ? 'Sign Up' : 'Log In'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="placeholder-gray-600 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-900 focus:border-lime-400 focus:outline-none text-gray-200"
              value={email}
              onChange={handleEmailChange}
              required
              title="Enter your email address"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="placeholder-gray-600 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-900 focus:border-lime-400 focus:outline-none text-gray-200"
              value={password}
              onChange={handlePasswordChange}
              required
              title="Enter your password"
              placeholder="Enter your password"
            />
          </div>
          {/* Success message */}
          {successMessage && (
            <div className="text-green-500 my-2">{successMessage}</div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="text-red-500 my-2">{errorMessage}</div>
          )}
          <button
            className="px-4 bg-lime-600 text-center hover:bg-lime-500 shadow-lg transition duration-300 ease-in-out shadow-lime-500/50 py-2 mx:px-0 text-white font-bold rounded whitespace-nowrap"
            type="submit"
          >
            {authMode === 'signup' ? 'Create an Account' : 'Log In'}
          </button>
        </form>
        <div className="text-gray-400 mt-4">
          {authMode === 'signup'
            ? 'Already have an account?'
            : "Don't have an account? "}
          <button
            onClick={() =>
              setAuthMode(authMode === 'signup' ? 'login' : 'signup')
            }
            className="ml-1 font-medium text-lime-500 hover:text-lime-400 focus:outline-none"
          >
            {authMode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
