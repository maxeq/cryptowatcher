import React, { useState } from 'react';
import { SVGAttributes } from 'react';

interface ArrowPathIconProps extends SVGAttributes<SVGElement> {
  className?: string;
  strokeColor?: string;
  strokeWidth?: string;
  text?: string;
}

export function ChevronDownIcon({
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
      animationDuration: '0.5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 1,
    }
    : {};

  return (
    <div className="flex justify-between" onClick={handleClick}>
      <span className="mr-1">{props.text}</span>
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
        {...props}>
        <path strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
      </svg>
    </div>
  );
}
