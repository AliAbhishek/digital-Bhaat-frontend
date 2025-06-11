import React from "react";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  errors?: string;
}

const Checkbox: React.FC<ConsentCheckboxProps> = ({

  checked,
  onChange,
  isRequired = false,
 
}) => {
  return (
    <div className="mb-4">
      <label className="flex items-start space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={isRequired}
           className="h-4 w-4 accent-[#8b5c3d] rounded border-gray-300 focus:ring-[#8b5c3d]"
          
        />
        {/* <span className="text-sm text-gray-700 leading-snug">{label}</span> */}
      </label>
     
    </div>
  );
};

export default Checkbox;
