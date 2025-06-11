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



const SignUp = () => {
    const [formData, setFormData] = useState({
        // email: "", password: ""
        countryCode: "+91",
        phoneNumber: ""

    });
    const [signUp, setSignUp] = useState(false);
    const [role, setRole] = useState<"needHelp" | "giveHelp" | null>(null);
    const navigate = useNavigate()



    const handleLogin = (e: any) => {

        e.preventDefault();
        if (!formData.phoneNumber) {
            toast.error("Please enter your phone number")
            return
        }

        // console.log(formData);
        navigate("/verify-otp")
    }

    const handleSignUp = (e: any) => {
        e.preventDefault()
        navigate("/verify-otp")
    }

    return (
        <div className="flex justify-center items-center min-h-screen gap-30 w-full">
            <div className="flex flex-col items-center text-center space-y-6 max-w-xl mx-auto px-4">
                <div className="relative">
                    <img
                        src={logoImage}
                        alt="Logo"
                        className="max-w-[380px] max-h-[300px] object-contain drop-shadow-xl rounded-xl transition-transform duration-300 hover:scale-105"
                    />

                    {/* Glowing peach halo behind logo */}
                    <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-[#c98c64] z-[-1] mt-1"></div>
                </div>

                <Moto />
            </div>


            <div className="box ">
                <span className="borderLine"></span>
                <form onSubmit={signUp ? handleSignUp : handleLogin}>
                    {
                        signUp ? <Heading title="Sign up" /> : <Heading title="Sign in" />
                    }

                    {
                        signUp && <div className="flex gap-4 justify-center !mt-8">
                            <RoleSelectButton
                                text="I Need Help"
                                isSelected={role === "needHelp"}
                                onClick={() => setRole("needHelp")}
                            />
                            <RoleSelectButton
                                text="I Want to Help"
                                onClick={() => setRole("giveHelp")}
                                isSelected={role === "giveHelp"}

                            />
                        </div>

                    }


                    <div className="w-full !mt-10">
                        {/* <label className="block text-sm font-medium text-white mb-2">
                            Phone Number
                        </label> */}
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
                            inputClass="!w-full !bg-transparent !text-white !border !border-gray-600 !rounded-xl !py-2 !pl-12 !pr-4 focus:!outline-none focus:!ring-1 focus:!ring-[#c98c64] placeholder:text-gray-400"
                            containerClass="!w-full"
                            buttonClass="!bg-transparent !border-none"
                            dropdownClass="!bg-[#191919] !text-white"
                        />

                    </div>




                    {/* <InputBox
                        value={formData.email}
                        handleChange={handleChange}
                        name="email"
                        label="Email"
                        type="email"
                        isRequired={true}
                    /> */}

                    {/* <PasswordInput
                        value={formData.password}
                        handleChange={handleChange}
                        name="password"
                        label="Password"
                        isRequired={true}
                    /> */}


                    {/* <div className="links">
                        <a href="#">Forgot Password</a>
                       
                    </div> */}
                    {/* {
                        !signUp &&
                        <SimpleText title="Forgot Password" />
                    } */}




                    {/* <input type="submit" id="submit" value="Login" /> */}
                    {
                        signUp && <><PrimaryButton text="SignUp" type="submit" />
                            <SecondaryButton text="Login" type="button" onClick={() => setSignUp(false)} />
                        </>
                    }
                    {
                        !signUp && <><PrimaryButton text="Login" type="submit" />
                            <SecondaryButton text="SignUp" type="button" onClick={() => setSignUp(true)} />
                        </>
                    }



                </form>
            </div>
        </div>

    );
};

export default SignUp;
