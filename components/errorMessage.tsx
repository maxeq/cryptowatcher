import React from 'react';

interface ErrorMessageProps {
  error: Error;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="error-message">
      <p>Oops! Something went wrong:</p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorMessage;
