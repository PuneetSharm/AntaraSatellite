import { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({ options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLabelFromValue = (value) => {
    const found = options.find((opt) => opt.actualValue === value);
    return found ? found.labelValue : value;
  };

  return (
    <div className="relative w-72" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center justify-between"
      >
        <span className="truncate">
          {selectedValues.length > 0
            ? selectedValues.map(getLabelFromValue).join(",")
            : "Select types"}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 text-gray-500 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map(({ actualValue, labelValue }) => (
            <label
              key={actualValue}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="text-gray-700">{labelValue}</span>
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={selectedValues.includes(actualValue)}
                onChange={() => handleCheckboxChange(actualValue)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
export default MultiSelectDropdown;
