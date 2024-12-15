import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../public/icon-logo.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faBars } from "@fortawesome/free-solid-svg-icons";

import { Menu, Transition } from '@headlessui/react';

import PremiumModal from './PremiumModal';

import axios from 'axios';

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const refreshPage = () => {
        window.location.reload();
    };

    const handleConfirmCancel = () => {
        const response = axios.post('/api/v1/management/cancel-premium', {}, { withCredentials: true });
        if (response.status === 200) {
            console.log(response.data.message);
            setIsPremium(false);
            closeModal();
        }
        refreshPage();        
    };

    return (
        <div className="navbar bg-base-100 px-4">
            <div className="flex-1 flex items-center">
                <Link to="/home">
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
                        style={{ borderRadius: "1.25rem" }}
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
                    className="btn btn-sm btn-warning btn-circle avatar mr-1 ml-1"
                >
                    <FontAwesomeIcon icon={faCrown} className="h-5 w-5 text-white" />
                </div>
            </div>

            {/* Right Section: Bars Icon with Dropdown */}
            <div className="flex items-center">
                <Menu as="div" className="relative">
                    {({ open }) => (
                        <>
                            <Menu.Button
                                className="btn btn-ghost btn-circle focus:outline-none"
                                aria-label="Settings"
                            >
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className={`h-6 w-6 transform transition-transform duration-300 ${
                                        open ? 'rotate-90' : 'rotate-0'
                                    }`}
                                />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                show={open}
                                enter="transition ease-out duration-100 delay-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg origin-top-right z-20"
                                >
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? 'bg-gray-100' : ''
                                                    } w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                    onClick={openModal} // Open modal on click
                                                >
                                                    Cancel Premium
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>

            {/* Premium Modal */}
            <PremiumModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title="Cancel Premium Subscription"
                message="Are you sure you want to cancel your Premium Subscription?"
                onConfirm={handleConfirmCancel}
                confirmText="Yes, Cancel"
                cancelText="No, Keep It"
            />
        </div>
    );
}

export default Header;
