import { Route,BrowserRouter as Router, Routes } from "react-router-dom"
import SignUp from "./Auth/SignUp"
import VerifyOtp from "./Auth/VerifyOtp"
import Progress from "./ProfileCreation/User/ProgressBar"
import YourInfo from "./Auth/YourInfo"
import Home from "./Home/Home"
import HelpingHand from "./HelpingHands.tsx/HelpingHand"
import BrideProfileDetails from "./BrideDetails/BrideDetails"
import DonorHome from "./Home/DonorHomePage"
import GameList from "./games/GameListing"
import Settings from "./settings"



function App() {
  return (
    <div>
      
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/verify-otp" element={<VerifyOtp/>}/>
          <Route path="/your-info" element={<YourInfo/>}/>
          <Route path="/create-profile" element={<Progress/>}/>
          {/* <Route path="/profile" element={<Profile/>}/> */}
          <Route path="/helping-hand" element={<HelpingHand/>}/>
          <Route path="/bride-details" element={<BrideProfileDetails/>}/>
          <Route path="/donor-home" element={<DonorHome/>}/>
          <Route path="/games" element={<GameList/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App