import React from "react";

interface OtpInputProps {
  type?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
  name: string;
  autoFocus?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  type = "text",
  value,
  handleChange,
  maxLength = 1,
  placeholder = "",
  name,
  autoFocus = false,
}) => {
  return (
    <div className="relative w-12 h-14">
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
        autoFocus={autoFocus}
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="OTP Digit"
        className="
          w-full h-full
          text-center
          text-2xl font-semibold
          tracking-widest
          border-2 border-[#c98c64]
          rounded-lg
          focus:outline-none focus:ring-2 focus:ring-[#8b5c3d] focus:border-[#8b5c3d]
          transition-shadow duration-200
          shadow-sm
          placeholder:text-gray-300
          "
      />
    </div>
  );
};

export default OtpInput;
