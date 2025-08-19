// components/BrideCard.jsx

import { motion } from "framer-motion";
import { Calendar, HeartHandshake } from "lucide-react";
import AnimatedCard from "./DonorAnimatedCards";
import { DateFormat } from "../utils/DateFormat";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputBox from "../Components/UI/InputBox";
import { useMutationApi } from "../customHooks/useMutationApi";
import { endpoints } from "../api/endpoints";
import toast from "react-hot-toast";
import { useQueryApi } from "../customHooks/useFetchData";
import Loader from "../Components/UI/Loader";

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
  // onDonate = () => { },
  index = 0,
  _id
}: any) => {

  // const weddingDateFormatted = moment(brideDetails?.weddingDate).format("Do MMM, YYYY");
  const weddingDateFormatted = DateFormat(brideDetails?.weddingDate)
  const navigate = useNavigate()
  const [showPopup, setShowPopUp] = useState(false)
  const [amount, setAmount] = useState(0)

  const { data: userData, refetch: fetchUser } = useQueryApi({
    key: ["userDetails"],
    url: `${endpoints.GET_USER_PROFILE.endpoint}`,
    enabled: false, // fetch only when required
  });

  const { mutate, isPending } = useMutationApi({
    url: endpoints.CREATE_RAZORPAY_ORDER.endpoint,
    method: endpoints.CREATE_RAZORPAY_ORDER.method,
    onSuccess: async (data) => {
      const res = await fetchUser();
      const donor = res?.data;
      const orderData = data?.data;
      setAmount(0)
      setShowPopUp(false)

      // Initialize Razorpay Checkout
      const options = {
        key: "rzp_test_R6GqaezzmG6qGv", // from Razorpay Dashboard
        amount: orderData.amount * 100, // amount in paise
        currency: orderData.currency,
        name: "Digital Bhaat",
        description: "Bride Donation",
        order_id: orderData.id, // 👈 important
        // handler: function (response: any) {
        //   // response contains payment_id, order_id, signature
        //   console.log("Payment success:", response);

        //   // here you should call backend API to verify payment
        //   verifyPayment(response, orderData);
        // },
        prefill: {
          name: donor?.fullName,
          email: donor?.email,
          contact: donor?.countryCode + donor?.phoneNumber,
        },
        theme: {
          color: "#c98c64",
        },
        method: {
          upi: true, // ✅ enable UPI in test
        },
      };

      // console.log(options, "op")

      const rzp = new (window as any).Razorpay(options);
      // console.log(rzp, "rzp")
      rzp.open();

    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(message);
    },
  });

  const handleDonation = () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    // console.log("Donation initiated:", amount);
    // here call Razorpay/Stripe API
    mutate({ amount, currency: "INR" })


    // setShowPopUp(false);
  };



  if (isPending) return <Loader />;

  return (
    <>
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
              onClick={(e) => {
                e.stopPropagation()
                setShowPopUp(true)
              }}
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

      {showPopup && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          {/* Confetti Layer */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="animate-confetti opacity-70"></div>
          </div>

          {/* Popup Box */}
          <div className="bg-[#fff7f2] border-4 border-[#c98c64] p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full z-10 animate-bounce-in">
            <div className="text-4xl mb-3">💝</div>

            <h2 className="text-2xl font-extrabold text-[#c98c64] mb-2 drop-shadow-sm">
              Make a Donation
            </h2>

            <p className="text-[#1e1e1e] font-medium mb-6 text-center leading-relaxed">
              Every contribution brings a bride closer to her dream.
              Enter the amount you’d like to donate ✨
            </p>


            {/* Amount Input */}
            <InputBox
              value={amount}
              handleChange={(e: any) => setAmount(e.target.value)}
              name="amount"
              label="Enter Amount"
              type="text"
              isRequired={true}
            // error={errors.fatherName}
            />

            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={handleDonation}
                className="px-3 py-2 bg-[#c98c64] text-white font-semibold rounded-full shadow hover:bg-[#8b5c3d] transition hover:scale-105"
              >
                Donate ❤️
              </button>

              <button
                onClick={() => setShowPopUp(false)}
                className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-full shadow hover:bg-gray-600 transition hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default BrideCard;
