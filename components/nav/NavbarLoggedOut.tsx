import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../buttons/Button';
import ButtonGray from '../buttons/ButtonGray';
import AuthModal from '../AuthModal';
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from '../icons/LogoNew';
import { GrClose } from "react-icons/gr";

const header_navigation = [
  { name: 'Cryptocurrencies', href: '/' },
  { name: 'Trade', href: '/trade' },
];

const NavbarModuleLoggedOut = () => {
  //login modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  //mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //router
  const { pathname } = useRouter();

  return (
    <nav className="bg-gray-900 text-cyan-50 flex shadow lg:px-4 py-4 h-14">
      <nav className="hidden md:flex w-1/2 justify-between items-center mx-auto">
        <div className="flex-1">
          <ul className="flex list-none space-x-14 items-center">
            {header_navigation.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="text-lg font-bold hover:text-lime-400"
              >
                <p
                  className={
                    pathname === href ? `text-lime-500 shadow-lg text-lg` : ''
                  }
                >
                  {name}
                </p>
              </Link>
            ))}
            <ul className="list-none ml-8">
              <li>
                <input
                  type="search"
                  className="px-4 py-2 bg-gray-800 text-white placeholder-gray-300"
                  placeholder="Search"
                />
              </li>
            </ul>
            <div className="flex justify-end w-full">
              <ButtonGray
                text="Login"
                className="mx-10"
                onClick={() => {
                  setAuthMode('login');
                  setIsModalOpen(true);
                }}
              />
              <Button
                text="Sign Up"
                onClick={() => {
                  setAuthMode('signup');
                  setIsModalOpen(true);
                }}
              />
              <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={authMode}
              />
            </div>
          </ul>
        </div>
      </nav>

      <div className="md:hidden flex items-center ml-auto">
        <div className="relative pr-3">
          <button
            className={`rounded md:hidden`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <RxHamburgerMenu size={32} className="mx-4 text-slate-300" />
          </button>

          <div
            className={`fixed inset-0 z-50 bg-gray-900 text-cyan-50 md:hidden transition-all duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <div className="flex justify-between items-center py-0 px-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <Logo size={46} />
                <span className="ml-5">CryptoWatcher</span>
              </h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold"
              >
                <span className="text-5xl mr-3 text-slate-300">&times;</span>
              </button>
            </div>
            <div className="px-4 py-6">
              <div className="text-2xl flex flex-col w-full text-white bg-gradient-table divide-y divide-gray-400/20">
                {header_navigation.map(({ name, href }) => (
                  <Link key={name} href={href}>
                    <div
                      className={`px-4 py-5 ${pathname === href ? "text-lime-200" : ""
                        } hover:bg-gray-700 cursor-pointer`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {name}
                    </div>
                  </Link>
                ))}
              </div>

            </div>
            <div className="px-4 pb-4">
              <ButtonGray
                text="Log In"
                className="w-full mb-4 text-xl"
                onClick={() => {
                  setAuthMode('login');
                  setIsModalOpen(true);
                }}
              />
              <Button
                text="Create an account"
                className="w-full text-xl"
                onClick={() => {
                  setAuthMode('signup');
                  setIsModalOpen(true);
                }}
              />
              <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={authMode}
              />
            </div>
          </div>

        </div>
      </div>
    </nav >
  );
};

export default NavbarModuleLoggedOut;
