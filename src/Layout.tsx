// App.tsx

import { Outlet } from "react-router-dom"; // if using react-router
import Header from "./Components/UI/Headers";

function Layout() {
  return (
    <div>
      <Header />
      <div className="mt-10">
         <Outlet /> {/* This renders the routed page like SettingsLayout */}
      </div>
     
    </div>
  );
}

export default Layout;
