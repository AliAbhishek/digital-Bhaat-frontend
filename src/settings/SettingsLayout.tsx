import { useState } from "react";
import { TermsOfUse } from "./TermsOfUse";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TransactionHistory } from "./TransactionHistory";
import { SettingNavItem } from "./SettingNavItem";
import ParticlesBackground from "../Components/UI/TsParticle";
import { getUserIdFromToken } from "../utils/decodeToken";



export default function SettingsLayout() {
  const decodedToken: any = getUserIdFromToken();
  let role=decodedToken?.role
 
  const pages = [
  { label: "Terms of Use", component: <TermsOfUse /> },
  { label: "Privacy Policy", component: <PrivacyPolicy /> },
   ...(role === "donor"
      ? [{ label: "Transaction History", component: <TransactionHistory /> }]
      : []),
];

 const [activePage, setActivePage] = useState(pages[0].label);
  const ActiveComponent = pages.find((p) => p.label === activePage)?.component;

  

  return (
    <div className="relative bg-[#1e1e1e] min-h-screen text-[#c98c64]">
      <ParticlesBackground />

      <div className="relative z-10 flex flex-col md:flex-row px-4 py-10 mt-20 w-full max-w-6xl mx-auto gap-6">
        {/* Left Navigation */}
        <div className="w-full md:w-1/4 space-y-3">
          {pages.map((page) => (
            <SettingNavItem
              key={page.label}
              label={page.label}
              active={page.label === activePage}
              onClick={() => setActivePage(page.label)}
            />
          ))}
        </div>

        {/* Right Content */}
        <div className="w-160 flex-1">
          {ActiveComponent}
        </div>
      </div>
    </div>
  );
}
