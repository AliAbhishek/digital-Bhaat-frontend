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
import { useMutationApi } from "../customHooks/useMutationApi";
import { endpoints } from "../api/endpoints";
import toast from "react-hot-toast";



const YourInfo = ({ setCurrentStep, currentStep, edit }: any) => {

    const decodedToken: any = getUserIdFromToken();

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

    const { mutate: updateProfileMutate, isPending: UpdateProfilePending } = useMutationApi({
        url: endpoints.UPDATE_PROFILE.endpoint,
        method: endpoints.UPDATE_PROFILE.method,
        onSuccess: (data) => {
            console.log(data, "updateProfile")
            if (data?.status == 200) {
                let role = decodedToken?.role
                navigate(`/create-profile?role=${role}&aadharUpload=false`)
            }


        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    const { mutate, isPending } = useMutationApi({
        url: endpoints.UPLOAD_TO_S3.endpoint,
        method: endpoints.UPLOAD_TO_S3.method,
        onSuccess: (data) => {
            console.log(data, "data")
            updateProfileMutate({ fullName: formData.name, email: formData.email, profileImage: data?.data?.url })
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });





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
                let formdataToSend = new FormData()
                if (formData.profileImage == null) return
                formdataToSend.append("file", formData.profileImage)
                mutate(formdataToSend)

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

                    <PrimaryButton text="Submit" type="submit" isPending={isPending || UpdateProfilePending} />

                </form>
            </div>
        </div>

    );
};

export default YourInfo;
