import { useState } from "react";
import logoImage from "../assets/transparentLogo.png"
import Heading from "../Components/UI/Heading";
import Moto from "../Components/UI/Moto";
import PrimaryButton from "../Components/UI/PrimaryButton";
import SecondaryButton from "../Components/UI/SecondaryButton";
import RoleSelectButton from "../Components/UI/RoleSelectionButtons";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SubHeading from "../Components/UI/SubHeading";
import toast from "react-hot-toast";
import { useMutationApi } from "../customHooks/useMutationApi";
import { endpoints } from "../api/endpoints";



const SignUp = () => {
    const [signUp, setSignUp] = useState(false);
    const [role, setRole] = useState<"user" | "donor" | null>(null);
    const navigate = useNavigate()


    const { mutate, isPending } = useMutationApi({
        url: signUp ? endpoints.SIGN_UP.endpoint : endpoints.LOG_IN.endpoint,
        method: signUp ? endpoints.SIGN_UP.method : endpoints.LOG_IN.method,
        onSuccess: (data) => {
            console.log(data, "data")
            toast.success(data?.message);
            data?.data?.otp && toast.success(data?.data?.otp);

            const encodedId = btoa(data?.data?.userId);
            navigate(`/verify-otp?id=${encodedId}`);
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });
    const [formData, setFormData] = useState({
        // email: "", password: ""
        countryCode: "+91",
        phoneNumber: ""

    });





    const handleLogin = (e: any) => {
        console.log(formData, "form")
        e.preventDefault();
        if (!formData.phoneNumber) {
            toast.error("Please enter your phone number")
            return
        }
        mutate(formData)


    }

    const handleSignUp = (e: any) => {
        e.preventDefault()
        if (!formData.phoneNumber) {
            toast.error("Please enter your phone number")
            return
        }
        if (!role) {
            toast.error("Please choose the role")
            return
        }
        mutate({ ...formData, role })


        // navigate("/verify-otp")
    }



    return (
        // Adjusted main container for responsiveness: flex-col on mobile, flex-row on medium screens and up.
        // Added responsive padding (px, py) and gap between sections.
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full py-8 px-4 md:px-6 lg:px-12 gap-y-12 md:gap-x-20">
            {/* Left Section: Logo & Moto */}
            <div className="flex flex-col items-center text-center space-y-6 max-w-sm md:max-w-md lg:max-w-xl mx-auto">
                <div className="relative">
                    <img
                        src={logoImage}
                        alt="Logo"
                        // Responsive image sizing: smaller on mobile, larger on tablet/desktop
                        className="w-full h-auto max-w-[200px] max-h-[160px] sm:max-w-[280px] sm:max-h-[220px] md:max-w-[380px] md:max-h-[300px] object-contain drop-shadow-xl rounded-xl transition-transform duration-300 hover:scale-105"
                    />

                    {/* Glowing peach halo behind logo */}
                    <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-[#c98c64] z-[-1] mt-1"></div>
                </div>

                <Moto /> {/* Assuming Moto component is already responsive or simple text */}
            </div>


            {/* Right Section: Form */}
            {/* Added responsive max-width and padding to the form container */}
            <div className="box w-full  max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10">
                <span className="borderLine"></span>
                <form onSubmit={signUp ? handleSignUp : handleLogin}>
                    {
                        signUp ? <Heading title="Sign up" /> : <Heading title="Sign in" />
                    }

                    {
                        signUp &&
                        // Role selection buttons: stack on small, row on small-medium and up
                        <div className="flex flex-col sm:flex-row gap-4 justify-center !mt-8">
                            <RoleSelectButton
                                text="I Need Help"
                                isSelected={role === "user"}
                                onClick={() => setRole("user")}
                            />
                            <RoleSelectButton
                                text="I Want to Help"
                                onClick={() => setRole("donor")}
                                isSelected={role === "donor"}

                            />
                        </div>

                    }


                    <div className="w-full !mt-10">
                        <div className="!mb-4"> <SubHeading title="Phone Number" /></div>

                        <PhoneInput
                            country={'in'}
                            value={formData.countryCode + formData.phoneNumber}
                            onChange={(value, data: any) => {
                                const dialCode = data?.dialCode // e.g. "91"
                                const phoneWithoutCode = value.replace(dialCode, '').replace(/^0+/, '');

                                setFormData({
                                    countryCode: `+${dialCode}`,
                                    phoneNumber: phoneWithoutCode,
                                });
                            }}
                            // inputClass already has !w-full, ensuring full width
                            inputClass="!w-full !bg-transparent !text-white !border !border-gray-600 !rounded-xl !py-2 !pl-12 !pr-4 focus:!outline-none focus:!ring-1 focus:!ring-[#c98c64] placeholder:text-gray-400"
                            containerClass="!w-full" // Ensures the container takes full available width
                            buttonClass="!bg-transparent !border-none !rounded-l-xl focus:!outline-none focus:!ring-1 focus:!ring-[#c98c64]" // Added rounding and focus styles
                            dropdownClass="!bg-[#191919] !text-white !rounded-lg" // Added rounding
                        />

                    </div>


                    {/* Action Buttons: Added space-y for vertical stacking on smaller screens if needed */}
                    <div className="mt-8 space-y-4">
                        {
                            signUp && <>
                                <PrimaryButton isPending={isPending} text="SignUp" type="submit" />
                                <SecondaryButton text="Login" type="button" onClick={() => setSignUp(false)} />
                            </>
                        }
                        {
                            !signUp && <>
                                <PrimaryButton isPending={isPending} text="Login" type="submit" />
                                <SecondaryButton text="SignUp" type="button" onClick={() => setSignUp(true)} />
                            </>
                        }
                    </div>


                </form>
            </div>
        </div>

    );
};

export default SignUp;
