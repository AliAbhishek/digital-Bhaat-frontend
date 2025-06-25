import { Route,BrowserRouter as Router, Routes } from "react-router-dom"
import SignUp from "./Auth/SignUp"
import VerifyOtp from "./Auth/VerifyOtp"
import Progress from "./ProfileCreation/User/ProgressBar"
import YourInfo from "./Auth/YourInfo"
import Home from "./Home/Home"
import Profile from "./Profile/Profile"
import HelpingHand from "./HelpingHands.tsx/HelpingHand"
import BrideProfileDetails from "./BrideDetails/BrideDetails"

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
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/helping-hand" element={<HelpingHand/>}/>
          <Route path="/bride-details" element={<BrideProfileDetails/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App