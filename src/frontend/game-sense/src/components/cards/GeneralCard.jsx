import React from 'react';

export default function GeneralCard({ title, button, children }) {
    return (
        <div className="bg-white shadow-lg rounded-t-lg rounded-b-none">
            {/* Card Header */}
            <div
                className="text-white bg-gray-700 flex justify-between items-center p-2 rounded-t-2xl"
            >
                <div className='text-white font-bold text-base'>
                    {title}
                </div>
                {button}
            </div>

            {/* Card Content */}
            {children}
        </div>
    );
}
