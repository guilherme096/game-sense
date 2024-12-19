import React from 'react';

// PremiumModal Component
const PremiumModal = ({ isOpen, closeModal, title, message, onConfirm, confirmText, cancelText }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-40 z-50`} 
                onClick={closeModal}
            ></div>

            <dialog open className="modal modal-open z-60 fixed inset-0 flex justify-center items-center">
                <div className="modal-box bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <p className="text-gray-700">{message}</p>
                    <div className="modal-action flex justify-between -pt-2">
                        <button
                            onClick={onConfirm}
                            className="btn bg-yellow-500 text-white px-6 rounded-md font-semibold hover:bg-yellow-600 transition"
                        >
                            {confirmText || 'Yes, Upgrade'}
                        </button>
                        <button
                            onClick={closeModal}
                            className="btn bg-gray-300 text-gray-700 px-6 rounded-md font-semibold hover:bg-gray-400 transition"
                        >
                            {cancelText || 'Cancel'}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default PremiumModal;
