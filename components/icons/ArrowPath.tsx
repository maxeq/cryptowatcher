import React, { useState } from 'react';
import { SVGAttributes } from 'react';

interface ArrowPathIconProps extends SVGAttributes<SVGElement> {
  className?: string;
  strokeColor?: string;
  strokeWidth?: string;
  text?: string;
}

export function ArrowPathIcon({
  className,
  strokeColor = 'currentColor',
  strokeWidth = '1.5',
  ...props
}: ArrowPathIconProps) {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  const rotationAnimation = isRotating
    ? {
        animationName: 'spin',
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 1,
      }
    : {};

  return (
    <div className="flex justify-between" onClick={handleClick}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <svg
        className={`${className} mt-1`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={rotationAnimation}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        ></path>
      </svg>
      <span className="ml-1">{props.text}</span>
    </div>
  );
}
