import React from "react";

const Input = ({ label, type, name, value, onChange, className, placeholder }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="5"
          className={`${className} w-full mt-2 p-3 border rounded-lg focus:ring-none outline-0 resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`${className} w-full mt-2 p-3 border rounded-lg focus:ring-none outline-0`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
