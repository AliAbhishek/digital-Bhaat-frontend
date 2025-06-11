interface SelectBoxProps {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isRequired?: boolean;
  error?: string;
}

const SelectBox = ({
  label,
  name,
  value,
  options,
  handleChange,
  isRequired = false,
  error,
}: SelectBoxProps) => {
  return (
    <div className="flex flex-col w-1/2 !mt-5">
      <span className="text-sm !text-[#8b5c3d]">{label}</span>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='bg-[#8b5c3d] h-10 !mt-2 text-white px-3 py-2 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-[#c98c64] transition duration-200 '
      >
        {/* <option value="" className="text-[#fef9f6]">Select {label}</option> */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-white">
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectBox;
