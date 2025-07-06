import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react18-otp-input";
import Moto from "../Components/UI/Moto";
import Heading from "../Components/UI/Heading";
import PrimaryButton from "../Components/UI/PrimaryButton";
import logoImage from "../assets/transparentLogo.png";
import { SimpleText } from "../Components/UI/SimpleText";
import SubHeading from "../Components/UI/SubHeading";
import { useMutationApi } from "../customHooks/useMutationApi";
import { endpoints } from "../api/endpoints";
import toast from "react-hot-toast";

const VerifyOtp = () => {
    const query = new URLSearchParams(useLocation().search);
    const encodedId = query.get("id");
    const id = encodedId ? atob(encodedId) : null; // Decrypt

    console.log("Decrypted ID:", id);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    const { mutate: resendMutate, isPending: resendIsPending } = useMutationApi({
        url: endpoints.RESEND_OTP.endpoint,
        method: endpoints.RESEND_OTP.method,
        onSuccess: (data) => {
            console.log(data, "data")
            toast.success(data?.message);
            data?.data?.otp && toast.success(data?.data?.otp);
            setTimer(60); // Reset timer on successful resend
            setResendDisabled(true); // Disable resend button
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    const { mutate: verifyMutate, isPending: verifyIsPending } = useMutationApi({
        url: endpoints.VERIFY_OTP.endpoint,
        method: endpoints.VERIFY_OTP.method,
        onSuccess: (data) => {
            console.log(data, "data")
            toast.success(data?.message);
            localStorage.setItem("token", data?.data?.token)
            if (data?.status == 200) {
                if (data?.data?.isProfileCompleted) {
                    if (data?.data?.role == "donor") {
                        navigate("/donor-home")
                    } else {
                        navigate("/")
                    }

                } else {
                    navigate("/your-info")
                }
            }
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit OTP.");
            return;
        }
        setError(""); // Clear error message
        verifyMutate({ otp, userId: id })
    };

    const handleResend = () => {
        setOtp(""); // Clear OTP input
        setTimer(60); // Reset timer
        setResendDisabled(true); // Disable resend button
        resendMutate({ userId: id })
    };

    return (
        // Main container: Changed to flex-col on small screens and flex-row on medium screens and up.
        // Added responsive padding (px, py) and appropriate gap.
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full py-8 px-4 md:px-6 lg:px-12 gap-y-12 md:gap-x-20">
            {/* Left Section: Logo & Moto */}
            <div className="flex flex-col items-center text-center space-y-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto">
                <div className="relative">
                    <img
                        src={logoImage}
                        alt="Digital Bhaat Logo"
                        // Responsive image sizing: scales down for smaller viewports
                        className="w-full h-auto max-w-[180px] max-h-[140px] sm:max-w-[250px] sm:max-h-[200px] md:max-w-[380px] md:max-h-[300px] object-contain drop-shadow-xl rounded-xl transition-transform duration-300 hover:scale-105"
                    />
                    {/* Glowing peach halo behind logo */}
                    <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-[#c98c64] z-[-1] mt-1"></div>
                </div>
                <Moto />
            </div>

            {/* Right Section: OTP Verification Form */}
            {/* Form container: Added responsive width and padding. The 'box' class's original
                CSS styles are kept untouched. */}
            <div className="box w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10">
                <span className="borderLine"></span> {/* Original borderLine element */}
                <form onSubmit={handleVerify} className="space-y-6">
                    <Heading title="Verify OTP" />
                    <div>
                        <div className="text-center"> <SubHeading title="Please verify the OTP sent to your " /></div>
                        <div className="text-center "> <SubHeading title="registered phone number" /></div>
                    </div>

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        shouldAutoFocus
                        // Container style: responsive gap between input fields
                        containerStyle="flex justify-center gap-2 sm:gap-4 md:gap-6 mt-6"
                        inputStyle={{
                            // Responsive width, height, and font size for individual OTP inputs
                            width: "2.8rem", // Base width for very small screens
                            height: "2.8rem", // Base height for very small screens
                            fontSize: "1.1rem", // Base font size
                            "@media (min-width: 400px)": { // Custom breakpoint for slightly larger phones
                                width: "3.2rem",
                                height: "3.2rem",
                                fontSize: "1.3rem",
                            },
                            "@media (min-width: 640px)": { // Tailwind 'sm' breakpoint
                                width: "3.8rem",
                                height: "3.8rem",
                                fontSize: "1.4rem",
                            },
                            "@media (min-width: 768px)": { // Tailwind 'md' breakpoint
                                width: "4rem",
                                height: "4rem",
                                fontSize: "1.5rem",
                            },
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                            border: "2px solid #c98c64",
                            borderRadius: "1rem",
                            outline: "none",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            backgroundColor: "#1a1a1a",
                            transition: "all 0.2s ease-in-out", // Smooth transition for focus
                        }}
                        focusStyle={{
                            borderColor: "#8b5c3d",
                            boxShadow: "0 0 0 2px #8b5c3d",
                        }}
                    />

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                    <PrimaryButton isPending={verifyIsPending} text="Verify" type="submit" />

                    <div className="text-center text-sm mt-5">
                        {
                            resendIsPending ? <button
                                type="button"
                                className="text-[#c98c64] font-medium transition !mt-3 cursor-not-allowed"
                                disabled
                            >
                                Sending...
                            </button> : resendDisabled ? (
                                <div className="flex justify-center items-center gap-1 text-white">
                                    <SimpleText title="Resend OTP in" />
                                    <span className="font-semibold">{timer}s</span>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="text-[#c98c64] font-medium hover:underline transition !mt-3"
                                >
                                    Resend OTP
                                </button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
