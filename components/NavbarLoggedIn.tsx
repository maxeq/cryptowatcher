import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "./Button";
import ButtonGray from "./Button-gray";
import AuthModal from './AuthModal';
import { useUser } from '../context/UserContext';

const header_navigation = [
    { name: "Home", href: "/" },
    { name: "Cryptocurrencies", href: "/cryptocurrencies" },
    { name: "Trade", href: "/trade" },
];

const NavbarModuleLoggedIn = () => {
    //logOut button
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, logout] = useState('logout');

    const { setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
      };
      

    //mobile menu
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        setButtonColor(isOpen ? '' : 'bg-lime-500');
    };
    const [buttonColor, setButtonColor] = useState('');

    //router
    const { pathname } = useRouter();

    return (
        <nav className="bg-gray-900 text-cyan-50 flex shadow lg:px-4 py-4 h-14">
            <nav className="hidden md:flex w-1/2 justify-between items-center mx-auto">
                <div className="flex-1">
                    <ul className="flex list-none space-x-14 items-center">
                        {header_navigation.map(({ name, href }) => (
                            <Link key={name} href={href} className="text-lg font-bold hover:text-lime-400">
                                <p className={pathname === href ? `text-lime-500 shadow-lg text-lg` : ''}>{name}</p>
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
                        <div className="flex justify-evenly w-full">
                        <ButtonGray text="Log Out" className="" onClick={handleLogout} />
                        </div>
                    </ul>
                </div>
            </nav>

            <div className="md:hidden flex items-center ml-auto">
                <div className="relative pr-3">
                    <button className={`${buttonColor} rounded`} onClick={toggle}>
                        <div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 22 22"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8 pr-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                    <div className={`absolute right-5 w-48 bg-lime-500 shadow-lg z-10 ${isOpen ? '' : 'hidden'}`}>
                        <div className="py-1 flex-auto bg-gray-900 text-cyan-50">
                            {header_navigation.map(({ name, href }) => (
                                <Link key={name} href={href} className="block px-4 bg-gray-900 shadow lg:px-4 py-4 h-14" onClick={toggle}>
                                    <p className={pathname === href ? `text-lime-500 shadow-lg font-bold` : ''}>{name}</p>
                                </Link>
                            ))}
                            <ul className="items-center">
                            <div className="space-y-4">
                            <ButtonGray text="Log Out" className="" onClick={handleLogout} />
                                </div>
                            </ul>
                            {/* <input
                type="search"
                className="w-full md:px-0 px-4 py-2 bg-gray-800 text-white placeholder-gray-300"
                placeholder="Search"
              /> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarModuleLoggedIn;