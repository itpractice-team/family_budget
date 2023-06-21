import { useState } from 'react';

const useDropdown = (initialValue, options) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [dropdownOptions, setDropdownOptions] = useState(options);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return {
    isDropdownOpen,
    toggleDropdown,
    selectedOption,
    handleOptionChange,
    dropdownOptions,
    setDropdownOptions,
  };
};

export default useDropdown;
