import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    setButtonColor(isOpen ? '' : 'bg-lime-500');
  };
  const [buttonColor, setButtonColor] = useState('');

  return (
    <header className="bg-gray-900 text-cyan-50 flex shadow lg:px-4 py-4 h-14">
      <nav className="hidden md:flex w-1/2 justify-between items-center mx-auto">
        <div className="flex-1">
          <ul className="flex list-none space-x-14 items-center">
            <li>
              <Link href="/" className="text-lg font-bold hover:text-lime-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cryptocurrencies" className="text-lg font-bold hover:text-lime-400">
                Cryptocurrencies
              </Link>
            </li>
            <li>
              <Link href="/alerts" className="text-lg font-bold hover:text-lime-400">
                Alerts
              </Link>
            </li>
          </ul>
        </div>
        <ul className="list-none ml-8">
          <li>
            <input
              type="search"
              className="px-4 py-2 max-lg:rounded-md bg-gray-800 text-white placeholder-gray-300"
              placeholder="Search"
            />
          </li>
        </ul>
      </nav>
      <div className="md:hidden flex items-center ml-auto">
        <div className="relative">
          <button className={`pr-5 ${buttonColor}`} onClick={toggle}>
            <div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className={`absolute right-5 w-48 bg-lime-500 shadow-lg z-10 ${isOpen ? '' : 'hidden'}`}>
            <div className="py-1">
              <Link href="/" className="block px-4 py-2 bg-gray-900 text-cyan-50 flex shadow lg:px-4 py-4 h-14" onClick={toggle}>

                Home

              </Link>
              <Link
                href="/cryptocurrencies"
                className="block px-4 py-2 bg-gray-900 text-cyan-50 flex shadow lg:px-4 py-4 h-14" onClick={toggle}>

                Cryptocurrencies

              </Link>
              <Link
                href="/alerts"
                className="block px-4 py-2 bg-gray-900 text-cyan-50 flex shadow lg:px-4 py-4 h-14" onClick={toggle}>

                Whale Alerts

              </Link>
              <input
                type="search"
                className="w-full md:px-0 px-4 py-2 bg-gray-800 text-white placeholder-gray-300"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
