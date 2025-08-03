// components/BrideCard.jsx

import { motion } from "framer-motion";
import { Calendar, HeartHandshake } from "lucide-react";
import AnimatedCard from "./DonorAnimatedCards";
import { DateFormat } from "../utils/DateFormat";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#c98c64",
  secondary: "#8b5c3d",
  dark: "#1a1a1a",
};

const BrideCard = ({
  brideDetails = {},
  guardianDetails = {},
  profileStatus,
  isProfileVerifiedByAdmin,
  amountSanctioned = 0,
  collectedAmount = 0,
  brideProfileImageUrl = "",
  guardianImageUrl = "",
  urgency = "High",
  onDonate = () => { },
  index = 0,
  _id
}: any) => {

  // const weddingDateFormatted = moment(brideDetails?.weddingDate).format("Do MMM, YYYY");
  const weddingDateFormatted = DateFormat(brideDetails?.weddingDate)
  const navigate = useNavigate()

  return (
    <motion.div
      key={_id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl overflow-hidden relative shadow-xl bg-[#c98c64]/10 border border-[#c98c64]/30 backdrop-blur-md cursor-pointer"
      onClick={() => {
        const encodedId = btoa(_id);
        navigate(`/bride-details?id=${encodedId}`)
      }}
    >
      {/* Image Section */}
      {/* <div className="relative h-52 w-full bg-black">
        {brideProfileImageUrl ? (
          <img
            src={brideProfileImageUrl}
            alt={brideDetails?.brideName}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-[#c98c64] text-[#1a1a1a] text-4xl font-bold">
            {getInitial(brideDetails?.brideName)}
          </div>
        )}

        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {urgency}
        </span>

        <span className="absolute bottom-3 left-3 text-xs text-white bg-green-600 px-2 py-1 rounded-full">
          {isProfileVerifiedByAdmin ? "Verified" : "Not Verified"}
        </span>
      </div> */}
      <AnimatedCard
        cover={brideProfileImageUrl}
        character={guardianImageUrl}
        fallbackName={brideDetails?.brideName}
        fallbackCharacterName={guardianDetails?.fatherName}
        className="w-full h-[300px]" // ensures fixed height and width like original image
        urgency={urgency}
        isVerified={isProfileVerifiedByAdmin}

      />


      {/* Details */}
      <div className="p-4 space-y-2 text-white">
        <h3 className="text-xl font-bold text-[#c98c64]">{brideDetails?.brideName || "Unknown"}</h3>

        <p className="text-sm text-gray-300">
          Father: <span className="font-semibold">{guardianDetails?.fatherName || "Not Provided"}</span>
        </p>

        <p className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-1" /> {weddingDateFormatted}
        </p>

        <p className="text-sm text-gray-400">
          Status: <span className="font-semibold text-green-300">{profileStatus}</span>
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
              <circle
                strokeWidth="4"
                stroke="gray"
                fill="transparent"
                r="20"
                cx="25"
                cy="25"
              />
              <motion.circle
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 - ((collectedAmount / amountSanctioned || 0) * 2 * Math.PI * 20)}
                strokeLinecap="round"
                stroke={COLORS.primary}
                fill="transparent"
                r="20"
                cx="25"
                cy="25"
                animate={{ strokeDashoffset: 2 * Math.PI * 20 - ((collectedAmount / amountSanctioned || 0) * 2 * Math.PI * 20) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-xs font-bold text-white">
              {Math.round((collectedAmount / amountSanctioned || 0) * 100)}%
            </span>
          </div>

          <div className="text-right">
            <p className="text-green-400 font-semibold">₹{collectedAmount}</p>
            <p className="text-sm text-gray-400">of ₹{amountSanctioned}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <motion.button
            onClick={onDonate}
            className="bg-[#c98c64] hover:bg-[#8b5c3d] text-[#1a1a1a] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <HeartHandshake className="w-4 h-4" /> Donate
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              const encodedId = btoa(_id);
            // navigate(`/verify-otp?id=${encodedId}`);
              navigate(`/games?id=${encodedId}`)
            }} // <-- define this in your props or locally
            className="bg-[#c98c64] hover:bg-[#8b5c3d] text-[#1a1a1a] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            🎮 Play
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default BrideCard;
