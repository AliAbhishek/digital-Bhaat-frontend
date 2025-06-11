import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react18-otp-input";
import Moto from "../Components/UI/Moto";
import Heading from "../Components/UI/Heading";
import PrimaryButton from "../Components/UI/PrimaryButton";
import logoImage from "../assets/transparentLogo.png";
import { SimpleText } from "../Components/UI/SimpleText";
import SubHeading from "../Components/UI/SubHeading";

const VerifyOtp = () => {
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

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit OTP.");
            return;
        }
        setError("");
        // console.log("OTP Verified:", otp);
        // navigate("/create-profile");
        navigate("/your-info")
    };

    const handleResend = () => {
        setOtp("");
        setTimer(60);
        setResendDisabled(true);
        // console.log("Resending OTP...");
        // Call your resend API here
    };

    return (
        <div className="flex justify-center items-center min-h-screen gap-30 w-full">
            <div className="flex flex-col items-center text-center space-y-6 max-w-xl mx-auto px-4">
                <div className="relative">
                    <img
                        src={logoImage}
                        alt="Logo"
                        className="max-w-[380px] max-h-[300px] object-contain drop-shadow-xl rounded-xl transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-[#c98c64] z-[-1] mt-1"></div>
                </div>
                <Moto />
            </div>

            <div className="box">
                <span className="borderLine"></span>
                <form onSubmit={handleVerify} className="space-y-6">
                    <Heading title="Verify OTP" />
                    <div className="text-center"> <SubHeading title="Please verify the OTP sent to your " /></div>
                    
                    <div className="text-center"> <SubHeading title="registered phone number"/></div>
                   

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        shouldAutoFocus
                        containerStyle="flex justify-center gap-6"
                        inputStyle={{
                            width: "4rem",
                            height: "4rem",
                            color: "white",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            border: "2px solid #c98c64",
                            borderRadius: "1rem",
                            outline: "none",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            marginTop: "30px",
                            backgroundColor: "#1a1a1a",
                        }}
                        focusStyle={{
                            borderColor: "#8b5c3d",
                            boxShadow: "0 0 0 2px #8b5c3d",
                        }}
                    />

                    {error && <p className="text-red-500 text-sm !mt-4">{error}</p>}

                    <PrimaryButton text="Verify" type="submit" />

                    <div className="text-center text-sm mt-5">
                        {resendDisabled ? (
                            <div className="flex justify-center items-center gap-1 text-white">
                                <SimpleText title="Resend OTP in" />
                                <span className="font-semibold !mt-3">{timer}s</span>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-[#c98c64] font-medium hover:underline transition !mt-3"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
