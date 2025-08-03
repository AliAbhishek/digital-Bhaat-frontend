// SettingNavItem.tsx
import React from "react";
// import { cn } from "@/lib/utils"; // utility for class merging

interface SettingNavItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SettingNavItem: React.FC<SettingNavItemProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        `text-left w-full px-4 py-2 rounded-lg font-medium transition,
        ${active} ? "bg-[#c98c64] text-white shadow" : "text-[#c98c64] hover:bg-[#fceee7]`
      }
    >
      {label}
    </button>
  );
};