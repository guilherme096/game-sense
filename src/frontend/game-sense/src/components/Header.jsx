import React, { useState, useRef, useEffect, Fragment, memo, useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../public/icon-logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from '@headlessui/react';
import PremiumModal from './PremiumModal';
import axios from 'axios';
import { UserContext } from './UserProvider.jsx';
import SearchBar from './SearchBar';

function Header() {
    const { isPremium, setIsPremium, isLoading } = useContext(UserContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null); 

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
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

    const handleConfirmCancel = async () => {
        try {
            const response = await axios.post('/api/v1/management/cancel-premium', {}, { withCredentials: true });
            if (response.status === 200) {
                console.log(response.data.message);
                setIsPremium(false);
                closeModal();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error canceling premium:', error);
        }
    };

    const handleUpgrade = async () => {
        try {
            const response = await axios.post('/api/v1/management/become-premium', {}, { withCredentials: true });
            if (response.status === 200) {
                console.log(response.data.message);
                setIsPremium(true);
                closeModal();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error upgrading to premium:', error);
        }
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

            <div className="flex items-center relative" ref={containerRef}>
                {/* Search Box */}
                <SearchBar 
                    isOpen={isSearchOpen} 
                    onClose={() => setIsSearchOpen(false)} 
                />
                <button
                    className="btn btn-ghost btn-circle z-96 relative"
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

            {/* Premium Section */}
            {!isLoading && (
                <>
                    {!isPremium ? (
                        <div className="flex items-center relative">
                            <div
                                tabIndex={0}
                                className="btn btn-sm btn-warning btn-circle avatar mr-1 ml-1"
                                title="Upgrade to Premium"
                                onClick={openModal}
                            >
                                <FontAwesomeIcon icon={faCrown} className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    ) : (
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
                                                                onClick={openModal}
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
                    )}
                </>
            )}

            {/* Premium Modal */}
            <PremiumModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title={isPremium ? "Cancel Premium Subscription" : "Upgrade to Premium"}
                message={
                    isPremium
                        ? "Are you sure you want to cancel your Premium Subscription?"
                        : "Upgrade to access premium features."
                }
                onConfirm={isPremium ? handleConfirmCancel : handleUpgrade}
                confirmText={isPremium ? "Yes, Cancel" : "Upgrade Now"}
                cancelText="No, Thanks"
            />
        </div>
    );
}

export default memo(Header);
