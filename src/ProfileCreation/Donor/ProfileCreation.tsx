import { useEffect, useState } from "react";
import FinalSuccessMessage from "../../utils/FinalSuccessMessage";
import Heading from "../../Components/UI/Heading";
import InputBox from "../../Components/UI/InputBox";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import Checkbox from "../../Components/UI/CheckBox";
import SubHeading from "../../Components/UI/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DonorProfileCreation = ({edit}:any) => {
    const navigate=useNavigate()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        street: "",
        village: "",
        city: "",
        district: "",
        state: "",
        pinCode: "",
        country: "",
        consentGiven: false,
        isAnonymousDonation:false
    });

    const [errors, setErrors] = useState({
        city: "",
        district: "",
        state: "",
        pinCode: "",
        country: "",
        consentGiven: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors: any = {};

        // if (!formData.city) newErrors.city = "City name is required.";
        // if (!formData.district) newErrors.district = "District name is required.";
        // if (!formData.state) newErrors.state = "State name is required.";
        // if (!formData.pinCode) newErrors.pinCode = "Pin code is required.";
        // if (!formData.country) newErrors.country = "Country name is required.";
        // if (!formData.consentGiven) newErrors.consentGiven = "Please accept the term and conditions."

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const triggerFireworks = () => {
        setShowSuccessMessage(true);
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log("✅ Valid form submitted:", formData);
            if(edit){
                navigate("/")
            }else{
                triggerFireworks();

            }
        }
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axios.get("https://ipapi.co/json/");
                const country = res?.data?.country_name;
                setFormData((prev) => ({ ...prev, country :country || "" }));
            } catch (error) {
                console.error("Could not fetch location:", error);
            }
        };

        fetchLocation();
    }, []);

    return (
        <>
            {showSuccessMessage ? <FinalSuccessMessage role="donor" /> : <div className=" !mt-10 max-w-4xl mx-auto px-4 py-10 rounded-2xl shadow-md space-y-6">
                <div className="text-center !mb-3">
                    <Heading title="Profile Creation" />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="Street / Locality"
                            name="street"
                            value={formData.street}
                            handleChange={handleChange}
                            isRequired={true}
                            type="text"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="Village / Town"
                            name="village"
                            value={formData.village}
                            handleChange={handleChange}
                            isRequired={true}
                            type="text"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="City"
                            name="city"
                            value={formData.city}
                            handleChange={handleChange}
                            isRequired={true}
                            type="text"
                            error={errors.city}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="District"
                            name="district"
                            value={formData.district}
                            handleChange={handleChange}
                            isRequired={true}
                            type="text"
                            error={errors.district}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="State"
                            name="state"
                            value={formData.state}
                            handleChange={handleChange}
                            isRequired={true}
                            type="text"
                            error={errors.state}
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="Pin Code"
                            name="pinCode"
                            value={formData.pinCode}
                            handleChange={handleChange}
                            isRequired={true}
                            error={errors.pinCode}
                            type="number"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <InputBox
                            label="Country"
                            name="country"
                            value={formData.country}
                            handleChange={handleChange}
                            isRequired={true}
                            error={errors.country}
                            type="text"
                        />
                    </div>
                </div>

                <div className='!mt-8 flex w-full '>
                    <div className='!mt-1'> <Checkbox
                        checked={formData?.isAnonymousDonation}
                        isRequired={true}
                        onChange={(e) => setFormData({ ...formData, isAnonymousDonation: e.target.checked })}

                    /></div>

                    <div className='!ml-2'>
                        <SubHeading title="I want to donate anonymously." />


                        {errors?.consentGiven && <p className="text-red-500 text-xs mt-1">{errors?.consentGiven}</p>}
                    </div>


                </div>

                <div className='!mt-8 flex w-full '>
                    <div className='!mt-1'> <Checkbox
                        checked={formData?.consentGiven}
                        isRequired={true}
                        onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}

                    /></div>

                    <div className='!ml-2'>
                        <SubHeading title="I agree to the privacy policy and terms & conditions of the platform." />


                        {errors?.consentGiven && <p className="text-red-500 text-xs mt-1">{errors?.consentGiven}</p>}
                    </div>


                </div>

                <div className="pt-4 flex justify-center !mb-10 !mt-3">
                    <div className="w-[7.5rem]">
                        <PrimaryButton text="Continue" type="button" onClick={handleSubmit} />
                    </div>
                </div>
            </div>}


        </>
    );
};

export default DonorProfileCreation;
