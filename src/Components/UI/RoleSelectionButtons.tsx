import { Sparkles } from "lucide-react";

const RoleSelectButton = ({
  text,
  isSelected,
  onClick,
}: {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-[160px] h-[80px] flex flex-col items-center justify-center gap-2 rounded-2xl border 
        transition-all duration-300 ease-in-out backdrop-blur-md 
        shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02]
        ${
          isSelected
            ? "bg-[#8b5c3d] text-white border-[#8b5c3d]"
            : "bg-[#fef9f6]/10 text-[#8b5c3d] border-[#c98c64] hover:bg-[#c98c64]/20"
        }
      `}
    >
      <Sparkles className="w-6 h-6" />
      <span className="font-semibold text-lg">{text}</span>
    </button>
  );
};

export default RoleSelectButton;
