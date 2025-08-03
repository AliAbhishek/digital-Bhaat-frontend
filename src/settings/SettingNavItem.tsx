type SettingNavItemProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

export function SettingNavItem({ label, active, onClick }: SettingNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
        active
          ? "bg-[#c98c64] text-[#1e1e1e] shadow-md"
          : "text-[#c98c64] hover:bg-[#2d2d2d] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
