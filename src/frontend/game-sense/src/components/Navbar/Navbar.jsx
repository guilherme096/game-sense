import "./Navbar.css";

import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/home", description: "Home", icon: faHouse },
    { path: "/leaguePage", description: "League", icon: faTrophy },
    { path: "/profile", description: "Profile", icon: faUser },
  ];

  // Determine active index based on the current path
  const activeIndex = links.findIndex((link) => link.path === location.pathname);

  return (
    <div className="floating-navbar">
      {links.map((link, index) => (
        <CustomLink
          key={index}
          to={link.path}
          isActive={activeIndex === index}
          description={link.description}
        >
          <FontAwesomeIcon icon={link.icon} className="h-7" />
        </CustomLink>
      ))}
    </div>
  );
}

function CustomLink({ to, children, isActive, description }) {
  const color = isActive ? "text-green-600" : "text-gray-500";

  return (
    <li
      className={`flex flex-col justify-center items-center cursor-pointer ${color}`}
      style={{ width: "100%" }}
    >
      <Link to={to} className="flex flex-col justify-center items-center">
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
      </Link>
    </li>
  );
}
