// App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import VerifyOtp from "./Auth/VerifyOtp";
import Progress from "./ProfileCreation/User/ProgressBar";
import YourInfo from "./Auth/YourInfo";
import Home from "./Home/Home";
import HelpingHand from "./HelpingHands.tsx/HelpingHand";
import BrideProfileDetails from "./BrideDetails/BrideDetails";
import DonorHome from "./Home/DonorHomePage";
import GameList from "./games/GameListing";
import Settings from "./settings";
import Layout from "./Layout";
import BrideTransaction from "./BrideDetails/BrideTransaction";


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without header (e.g. auth flow) */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/your-info" element={<YourInfo />} />
        <Route path="/create-profile" element={<Progress />} />

        {/* Routes with header */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/helping-hand" element={<HelpingHand />} />
          <Route path="/bride-details" element={<BrideProfileDetails />} />
          <Route path="/donor-home" element={<DonorHome />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bride-transactions/:id" element={<BrideTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
