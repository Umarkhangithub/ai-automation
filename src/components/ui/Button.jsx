import React from "react";

const Button = ({ 
  children, 
  className = "", 
  type = "button", 
  disabled = false, 
  onClick 
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={`px-5 py-2 rounded-lg font-medium transition duration-150 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
