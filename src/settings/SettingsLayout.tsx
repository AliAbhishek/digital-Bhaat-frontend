// SettingsLayout.tsx
import { useState } from "react";
import { TermsOfUse } from "./TermsOfUse";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TransactionHistory } from "./TransactionHistory";
import { SettingNavItem } from "./SettingNavItem";
import ParticlesBackground from "../Components/UI/TsParticle";

const pages = [
  { label: "Terms of Use", component: <TermsOfUse /> },
  { label: "Privacy Policy", component: <PrivacyPolicy /> },
  { label: "Transaction History", component: <TransactionHistory /> },
];

export default function SettingsLayout() {
  const [activePage, setActivePage] = useState(pages[0].label);

  const ActiveComponent = pages.find((p) => p.label === activePage)?.component;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 md:p-10 bg-[#fff7f2] min-h-screen relative">
        <ParticlesBackground />
      <div className="md:w-1/4 space-y-2 relative">
        {pages.map((page) => (
          <SettingNavItem
            key={page.label}
            label={page.label}
            active={page.label === activePage}
            onClick={() => setActivePage(page.label)}
          />
        ))}
      </div>

      <div className="md:w-3/4">
        {ActiveComponent}
      </div>
    </div>
  );
}
