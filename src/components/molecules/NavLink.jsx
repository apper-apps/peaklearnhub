import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/utils/cn";

const NavLink = ({ children, className, activeClassName, ...props }) => {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        cn(
          "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive
            ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            : "text-gray-700 dark:text-gray-300",
          className,
          isActive && activeClassName
        )
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;