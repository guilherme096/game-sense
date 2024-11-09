import "./Navbar.css";

import { motion } from "framer-motion";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  const descriptions = ["Home", "League", "Simulation"];

  return (
    <div className="floating-navbar">
      {/* Home Icon */}
      <CustomLink
        index={0}
        isActive={activeIndex === 0}
        description={descriptions[0]}
        onClick={() => handleIconClick(0)}
      >
        <FontAwesomeIcon icon={faHouse} className="h-7" />
      </CustomLink>

      {/* League Icon */}
      <CustomLink
        index={1}
        isActive={activeIndex === 1}
        description={descriptions[1]}
        onClick={() => handleIconClick(1)}
      >
        <FontAwesomeIcon icon={faTrophy} className="h-7" />
      </CustomLink>

      {/* Simulation Icon */}
      <CustomLink
        index={2}
        isActive={activeIndex === 2}
        description={descriptions[2]}
        onClick={() => handleIconClick(2)}
      >
        <FontAwesomeIcon icon={faFutbol} className="h-7" />
      </CustomLink>
    </div>
  );
}

function CustomLink({ children, isActive, onClick, description }) {
  const color = isActive ? "text-green-600" : "text-gray-500";

  return (
    <li
      className={`flex flex-col justify-center items-center cursor-pointer ${color}`}
      style={{ width: "100%" }}
      onClick={onClick}
    >
      {/* Icon with scale effect */}
      <motion.div
        className="h-6"
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.05 : 1 }}
      >
        {children}
      </motion.div>

      {/* Description text */}
      {isActive && (
        <motion.span
          className="text-xs"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.span>
      )}
    </li>
  );
}
