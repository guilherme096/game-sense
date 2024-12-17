import { motion } from "framer-motion";
import logo from "../../public/icon-logo.png";
import React from 'react';

const LoadingLogo = () => {
  const dotStyle = {
    position: 'relative',
    animation: 'blink 3s infinite',
    width: '24px'
  };

  return (
    // center in the middle of the screen
    <div className="flex flex-col justify-center items-center h-screen -mt-[75px]">
      <motion.img
        src={logo}
        alt="Logo"
        initial={{ filter: "grayscale(100%)", scale: 0.3 }}
        animate={{ filter: "grayscale(0%)", scale: 0.325 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
        className="max-w-xs max-h-xs"
      />
      <p className="text-2xl -mt-10 font-medium text-gray-700">
        Loading
        <span style={dotStyle}>
          <span style={{ ...dotStyle, animationDelay: '0s' }}>.</span>
          <span style={{ ...dotStyle, animationDelay: '0.333s' }}>.</span>
          <span style={{ ...dotStyle, animationDelay: '0.666s' }}>.</span>
        </span>
      </p>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default LoadingLogo;
