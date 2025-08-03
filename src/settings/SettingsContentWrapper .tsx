// SettingsContentWrapper.tsx
export const SettingsContentWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#000000e6] text-[#c98c64] p-6 md:p-8 rounded-2xl shadow-md">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="text-[#c98c64] leading-relaxed">{children}</div>
  </div>
);
