import React, { useState } from 'react';

interface ArrowPathIconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  strokeColor?: string;
  strokeWidth?: string;
}

const ChevronDownIcon: React.FC<ArrowPathIconProps> = ({
  className,
  strokeColor = 'currentColor',
  strokeWidth = '1.5',
  ...props
}) => {
  return (
    <svg
      className={`${className} w-5 h-5`}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      ></path>
    </svg>
  );
};

interface DropdownMenuProps {
  items: string[];
  onItemSelected?: (item: string) => void;
  iconProps?: ArrowPathIconProps;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  onItemSelected,
  iconProps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('All posts');

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onItemSelected && onItemSelected(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center justify-between px-4 py-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem || 'All posts'}</span>
        <ChevronDownIcon {...iconProps} />
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-gray-800 border border-slate-600 rounded shadow-lg">
          {items.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 ${
                item === selectedItem ? 'text-white' : 'text-gray-400'
              } ${
                item === selectedItem
                  ? 'hover:text-white'
                  : 'hover:text-gray-200'
              } hover:bg-white/5 hover:bg-opacity-10 cursor-pointer transition duration-300 ease-in-out`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
