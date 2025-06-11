interface TextAreaProps {
    label: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isRequired?: boolean;
    error?: string;
}

const TextAreaBox = ({
    label,
    name,
    value,
    handleChange,
    isRequired = false,
    error,
}: TextAreaProps) => {
    return (
        <div className="flex flex-col w-150 !mt-5">
            <span className="text-sm !text-[#8b5c3d]">{label}</span>
            <textarea
                name={name}
                value={value}
                onChange={handleChange}
                rows={4}
                className={`bg-transparent  !mt-2 border-b-2 border-[#c98c64] focus:outline-none focus:border-[#8b5c3d] text-white placeholder:text-[#aaa] p-2 rounded-md resize-none ${error ? "border-red-500" : ""
                    }`}
                placeholder="Enter address"
            />
            {error && <p className="text-red-500 text-sm !mt-2">{error}</p>}
        </div>
    );
};

export default TextAreaBox;
