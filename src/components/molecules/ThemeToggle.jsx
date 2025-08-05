import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/slices/themeSlice";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ThemeToggle = ({ className }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={className}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <ApperIcon name="Sun" className="w-5 h-5" />
      ) : (
        <ApperIcon name="Moon" className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;