import React from "react";

const StatCard = ({ stats }) => {
    const StatItem = ({ label, value }) => {
        return (
            <div className="text-center">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                <p className="text-lg font-extrabold text-gray-800">{value}</p>
            </div>
        );
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto ">
            <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <StatItem label={stat.label} value={stat.value} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatCard;
