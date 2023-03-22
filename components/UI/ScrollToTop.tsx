import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTopArrow = () => {
    const [visible, setVisible] = useState(false);
    const [clicked, setClicked] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 500);
    };

    return (
        <div
            className={`${clicked ? 'bg-lime-400' : 'bg-gray-500'} fixed bottom-6 right-6 cursor-pointer z-50 p-2 rounded-full bg-gray-500 text-white ${visible ? 'opacity-80 hover:opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
            onClick={scrollToTop}
        >
            <FiArrowUp size={40} />
        </div>
    );
};

export default ScrollToTopArrow;
