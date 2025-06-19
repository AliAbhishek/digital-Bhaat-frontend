import { useMemo, useState } from "react";
import logoImage from "../assets/transparentLogo.png"
import Heading from "../Components/UI/Heading";
import Moto from "../Components/UI/Moto";
import PrimaryButton from "../Components/UI/PrimaryButton";
import { useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import InputBox from "../Components/UI/InputBox";
import ProfileImageUpload from "../Components/UI/ProfileImageInput";
import { getUserIdFromToken } from "../utils/decodeToken";



const YourInfo = ({ setCurrentStep, currentStep, edit }: any) => {

    const decodedToken = getUserIdFromToken();

    const { isEditMode } = useMemo(() => {
        const params = new URLSearchParams(location.search);

        const editParam = params.get("edit") === "true"; // convert to boolean
        return { isEditMode: editParam };
    }, [location.search]);

    const [formData, setFormData] = useState({
        name: '',
        email: "",
        profileImage: null

    });


    const navigate = useNavigate()


    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e: any) => {

        e.preventDefault();
        if (edit) {
            setCurrentStep(currentStep + 1)
        } else {
            // console.log(formData);
            if (isEditMode) {
                navigate("/")
            } else {

                let role = "donor"
                navigate(`/create-profile?role=${role}`)
            }

        }



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
                <form onSubmit={handleSubmit}>

                    <Heading title="Your Details" />


                    <ProfileImageUpload
                        image={formData.profileImage}
                        setImage={(file: any) => {
                            setFormData({ ...formData, profileImage: file })

                        }}
                    //   error={imageError}
                    />


                    <InputBox
                        value={formData.name}
                        handleChange={handleChange}
                        name="name"
                        label="Full Name"
                        type="text"
                        isRequired={true}
                    />
                    <InputBox
                        value={formData.email}
                        handleChange={handleChange}
                        name="email"
                        label="Email"
                        type="email"
                        isRequired={true}
                    />











                    <PrimaryButton text="Submit" type="submit" />






                </form>
            </div>
        </div>

    );
};

export default YourInfo;
