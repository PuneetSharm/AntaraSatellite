import React, { useState } from "react";

const SelectComponent = ({ label, options, handleChange, selectedValue }) => {
  return (
    <div className="flex items-center space-x-3">
      <label className="text-base font-medium text-gray-700">{label}:</label>

      <div className="relative inline-block w-64">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="appearance-none w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-base text-gray-800 focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt.actualValue} value={opt.actualValue}>
              {opt.labelValue}
            </option>
          ))}
        </select>

        {/* Caret Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectComponent;
