import React, { useState } from 'react';
import { registerUser } from '../lib/user';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentMode, setMode] = useState(mode);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


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

    try {
      const user = await registerUser({ email, password });
      console.log('User registered successfully:', user);
      setSuccessMessage('User registered successfully');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed');
    }
  };

  const handleModeToggle = () => {
    currentMode === 'signup' ? setMode('login') : setMode('signup');
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-2xl mb-6">
          {currentMode === 'signup' ? 'Sign Up' : 'Log In'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-900 focus:border-lime-400 focus:outline-none text-gray-200"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-400 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-900 focus:border-lime-400 focus:outline-none text-gray-200"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {/* Success message */}
          {successMessage && (
            <div className="text-green-500 my-2">
              {successMessage}
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="text-red-500 my-2">
              {errorMessage}
            </div>
          )}
          <button
            className="px-4 bg-lime-600 text-center hover:bg-lime-500 shadow-lg transition duration-300 ease-in-out shadow-lime-500/50 py-2 mx:px-0 text-white font-bold rounded whitespace-nowrap"
            type="submit"
          >
            {currentMode === 'signup' ? 'Create an Account' : 'Log In'}
          </button>
        </form>
        <div className="text-gray-400 mt-4">
          {currentMode === 'signup' ? 'Already have an account?' : "Don't have an account? "}
          <button
            onClick={handleModeToggle}
            className="ml-1 font-medium text-lime-500 hover:text-lime-400 focus:outline-none"
          >
            {currentMode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 focus:outline-none bg-transparent border-none">
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
