import { useState } from "react";
import Heading from "../../Components/UI/Heading";
import InputBox from "../../Components/UI/InputBox";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import ImageUpload from "../../Components/UI/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { setGirlAddreddDetails, setGirlDetails } from "../../redux/Slices/UserFormSlice";
import ProfileImageUpload from "../../Components/UI/ProfileImageInput";
import SelectBox from "../../Components/UI/SelctBox";
import Address from "./Address";

const GirlDetail = ({ setCurrentStep, currentStep }: any) => {
    const dispatch = useDispatch()
    const girlDetails = useSelector((state: any) => state.userForm.girlDetails);

    console.log(girlDetails, "irlDetails")
    const [girlFormDetails, setGirlFormDetails] = useState({
        brideName: girlDetails?.brideName ?? "",
        brideDOB: girlDetails?.brideDOB ?? "",
        brideAadharNumber: girlDetails?.brideAadharNumber ?? "",
        bridePhoneNumber: girlDetails?.bridePhoneNumber ?? "",
        brideAadhaarImage: girlDetails?.brideAadhaarImage ?? null,
        weddingDate: girlDetails?.weddingDate ?? "",
        profileImage: girlDetails?.profileImage ?? null,
        brideDisability: girlDetails?.brideDisability ?? "No"
    });

    const addressDetails = useSelector((state: any) => state.userForm.girlAddressDetails);
    const [formData, setFormData] = useState({
        street: addressDetails?.street ?? "",
        village: addressDetails?.village ?? "",
        postOffice: addressDetails?.postOffice ?? "",
        district: addressDetails?.district ?? "",
        state: addressDetails?.state ?? "",
        pincode: addressDetails?.pincode ?? "",
        weddingVenue: addressDetails?.weddingVenue ?? "",
    });

    // const [isVerifying, setIsVerifying] = useState(false);

    const [errors, setErrors] = useState({
        brideName: "",
        brideDOB: "",
        brideAadharNumber: "",
        bridePhoneNumber: "",
        brideAadhaarImage: "",
        weddingDate: "",
        village: "",
        postOffice: "",
        district: "",
        state: "",
        pincode: ""
    });

    const disabilityOptions = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },

    ];

    const handleChange = (e: any) => {
        const { name, value } = e.target;



        setGirlFormDetails({ ...girlFormDetails, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors: any = {};

        // Name
        if (!girlFormDetails.brideName.trim()) {
            newErrors.brideName = "Full name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(girlFormDetails.brideName)) {
            newErrors.brideName = "Name must contain only letters.";
        }

        // DOB
        if (!girlFormDetails.brideDOB) {
            newErrors.brideDOB = "Date of birth is required.";
        } else if (new Date(girlFormDetails.brideDOB) > new Date()) {
            newErrors.brideDOB = "Date of birth cannot be in the future.";
        }

        // Aadhaar

        if (!girlFormDetails.brideAadharNumber) {
            newErrors.brideAadharNumber = "Aadhaar is required.";
        } else if (!/^\d{12}$/.test(girlFormDetails.brideAadharNumber)) {
            newErrors.brideAadharNumber = "Must be 12 digits.";
        }

        // Phone (optional)
        if (girlFormDetails.bridePhoneNumber && !/^\d{10}$/.test(girlFormDetails.bridePhoneNumber)) {
            newErrors.bridePhoneNumber = "Phone number must be 10 digits.";
        }

        if (!girlFormDetails.brideAadhaarImage) newErrors.brideAadhaarImage = "Please upload Aadhaar image.";
        if (!girlFormDetails.weddingDate) {
            newErrors.weddingDate = "Wedding date is required."
        } else if (new Date(girlFormDetails.weddingDate) < new Date()) {
            newErrors.weddingDate = "Wedding date cannot be in the past.";

        }
        if (!formData.village) newErrors.village = "Village name is required.";
        if (!formData.district) newErrors.district = "District name is required.";
        if (!formData.state) newErrors.state = "State name is required.";
        if (!formData.pincode) newErrors.pincode = "Pin code is required.";
        if (!formData.postOffice) newErrors.postOffice = "PostOffice is required.";
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = () => {
        if (validate()) {
            dispatch(setGirlDetails(girlFormDetails))
            dispatch(setGirlAddreddDetails(formData))
            // console.log("✅ Valid form submitted:", girlFormDetails);
            setCurrentStep(currentStep + 1)
            // Continue to next step
        }
    };

    // console.log(errors, "er")

    return (
        <div className="max-w-4xl mx-auto px-4 rounded-2xl shadow-md space-y-6">
            <div className="text-center !mb-3">
                <Heading title="👧 Bride Details" />
            </div>

            <ProfileImageUpload
                image={girlFormDetails.profileImage}
                setImage={(file: any) => {
                    setGirlFormDetails({ ...girlFormDetails, profileImage: file })

                }}
            //   error={imageError}
            />


            {/* Row 1: Name + Phone */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <InputBox
                        value={girlFormDetails.brideName}
                        handleChange={handleChange}
                        name="brideName"
                        label="Full Name (as per Aadhaar)"
                        type="text"
                        isRequired={true}
                        error={errors.brideName}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <InputBox
                        value={girlFormDetails.bridePhoneNumber}
                        handleChange={handleChange}
                        name="bridePhoneNumber"
                        label="Phone Number (Optional)"
                        type="text"
                        isRequired={false}
                        error={errors.bridePhoneNumber}
                    />
                </div>
            </div>

            {/* Row 2: DOB + Aadhaar */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <InputBox
                        value={girlFormDetails.brideDOB}
                        handleChange={handleChange}
                        name="brideDOB"
                        label="Date of Birth"
                        type="date"
                        isRequired={true}
                        error={errors.brideDOB}
                    />
                </div>

                <div className="w-full md:w-1/2 relative">
                    <InputBox
                        value={girlFormDetails.brideAadharNumber}
                        handleChange={handleChange}
                        name="brideAadharNumber"
                        label="Aadhaar Number"
                        type="text"
                        isRequired={true}
                        error={errors.brideAadharNumber}
                    />


                </div>



            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div><InputBox
                    value={girlFormDetails.weddingDate}
                    handleChange={handleChange}
                    name="weddingDate"
                    label="Wedding Date"
                    type="date"
                    isRequired={true}
                // error={errors.weddingDate}
                />
                    {errors.weddingDate && <p className="text-red-500 text-sm !mt-2">{errors.weddingDate}</p>}
                </div>

                <SelectBox
                    label="Bride with disabality"
                    name="brideDisability"
                    value={girlFormDetails.brideDisability}
                    handleChange={handleChange}
                    options={disabilityOptions}
                    isRequired={true}
                />
            </div>
            <Address setFormData={setFormData} formData={formData} errors={errors} />
            <div className="!mt-5">
                <ImageUpload
                    label="Upload Aadhaar Card (Front)"
                    onFileSelect={(file: any) => {
                        // Save the file in your state if needed
                        setGirlFormDetails((prev) => ({
                            ...prev,
                            brideAadhaarImage: file
                        }));

                    }}
                    error={errors.brideAadhaarImage}
                    imageData={girlFormDetails?.brideAadhaarImage || ""}
                />

            </div>

            <div className="pt-4 flex justify-center !mb-10 !mt-3">
                <div className="w-[7.5rem]">
                    <PrimaryButton text="Continue" type="button" onClick={handleSubmit} />
                </div>
            </div>

        </div>
    );
};

export default GirlDetail;
