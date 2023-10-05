import React, { SetStateAction, useState } from 'react';

interface Props {
  label: string;
  options: { value: any ; label: string }[];
  onChange: (value: string) => void;
}

function NormalForm({ label, options }: Props) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event: { target: { value: SetStateAction<any>; }; }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <select value={selectedOption} onChange={handleDropdownChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NormalForm;