import Logo from '../../public/icon-logo.png';

import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            searchRef.current &&
            !searchRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1 flex items-center">
                    <Link to="/">
                    <div className="w-16">
                        <img src={Logo} alt="Logo" className="h-full w-full object-contain" />
                    </div>
                    </Link>
                </div>

                <div className="flex items-center relative">
                    {/* Search Box */}
                    <div
                        ref={searchRef}
                        className={`absolute right-0 transform transition-all duration-500 ease-in-out ${isSearchOpen
                            ? 'w-56 opacity-100'
                            : 'w-0 opacity-0'
                            }`}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input input-bordered w-full -m-1"
                            style={{ borderRadius: "1.25rem"}} 

                        />
                    </div>
                    {/* Search Icon */}
                    <button
                        ref={buttonRef}
                        className="btn btn-ghost btn-circle z-10 relative"
                        onClick={toggleSearch}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                </div>

                <div className="flex items-center relative">
                    {/* Premium Icon */}
                    <div
                        tabIndex={0}
                        className="btn btn-sm btn-warning btn-circle avatar mr-3 ml-1"
                    >
                        <FontAwesomeIcon icon={faCrown} className="h-5 w-5 text-white" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
