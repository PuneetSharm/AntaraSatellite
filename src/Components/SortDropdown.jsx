import { useState } from "react";

const SelectComponent = ({ label, options, handleChange, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.actualValue === selectedValue)?.labelValue || "";

  return (
    <div className="flex items-center mx-2 relative">
      <label className="text-base font-medium text-gray-700">{label}:</label>

      <div className="relative inline-block w-64 mx-2 my-2">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left text-base text-gray-800 focus:outline-none cursor-pointer relative"
        >
          {selectedLabel || "Select..."}
          {/* Caret Icon */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((opt) => (
              <div
                key={opt.actualValue}
                onClick={() => {
                  handleChange({ target: { value: opt.actualValue } });
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                  opt.actualValue === selectedValue ? "font-medium" : ""
                }`}
              >
                {opt.labelValue}
                {opt.actualValue === selectedValue && (
                  <span className="text-green-500 text-sm">✓</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectComponent;
