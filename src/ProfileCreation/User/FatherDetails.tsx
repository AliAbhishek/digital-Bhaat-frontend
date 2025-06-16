import { useState } from "react";
import Heading from "../../Components/UI/Heading";
import InputBox from "../../Components/UI/InputBox";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import ImageUpload from "../../Components/UI/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { setFatherAddreddDetails, setFatherDetails } from "../../redux/Slices/UserFormSlice";
import SelectBox from "../../Components/UI/SelctBox";
import ProfileImageUpload from "../../Components/UI/ProfileImageInput";
import Address from "./Address";

const FatherDetail = ({ setCurrentStep, currentStep }: any) => {
    const dispatch = useDispatch()
    const fatherDetails = useSelector((state: any) => state.userForm.fatherDetails);
    const [fatherFormDetails, setFatherFormDetails] = useState({
        fatherName: fatherDetails?.fatherName ?? "",
        fatherAadharNumber: fatherDetails?.fatherAadharNumber ?? "",
        fatherPhoneNumber: fatherDetails?.fatherPhoneNumber ?? "",
        fatherAadhaarImage: fatherDetails?.fatherAadhaarImage ?? null,
        // annualIncome:""
        guardianRelation: fatherDetails?.guardianRelation ?? "",
        guardianDisability: fatherDetails?.guardianDisability ?? "No",
        isSingleParent: fatherDetails?.isSingleParent ?? "No",
        profileImage: fatherDetails?.profileImage ?? null


    });

    const addressDetails = useSelector((state: any) => state.userForm.fatherAddressDetails);
    const [formData, setFormData] = useState({
        street: addressDetails?.street ?? "",
        village: addressDetails?.village ?? "",
        postOffice: addressDetails?.postOffice ?? "",
        district: addressDetails?.district ?? "",
        state: addressDetails?.state ?? "",
        pincode: addressDetails?.pincode ?? "",
        weddingVenue: addressDetails?.weddingVenue ?? "",
    });

    const disabilityOptions = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },

    ];

    // const [isVerifying, setIsVerifying] = useState(false);

    const [errors, setErrors] = useState({
        fatherName: "",

        fatherAadharNumber: "",
        fatherPhoneNumber: "",
        fatherAadhaarImage: "",
        // annualIncome:""
        guardianRelation: "",
        // street:"",
        village: "",
        postOffice: "",
        district: "",
        state: "",
        pincode: ""

    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;



        setFatherFormDetails({ ...fatherFormDetails, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors: any = {};

        // Name
        if (!fatherFormDetails.fatherName.trim()) {
            newErrors.fatherName = "Full name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(fatherFormDetails.fatherName)) {
            newErrors.brideName = "Name must contain only letters.";
        }



        // Aadhaar

        if (!fatherFormDetails.fatherAadharNumber) {
            newErrors.fatherAadharNumber = "Aadhaar is required.";
        } else if (!/^\d{12}$/.test(fatherFormDetails.fatherAadharNumber)) {
            newErrors.fatherAadharNumber = "Must be 12 digits.";
        }

        // Phone (optional)
        if (!fatherFormDetails.fatherPhoneNumber) {
            newErrors.fatherPhoneNumber = "Phone number is required.";
        } else if (!/^\d{10}$/.test(fatherFormDetails.fatherPhoneNumber)) {
            newErrors.fatherPhoneNumber = "Phone number must be 10 digits."
        }

        if (!fatherFormDetails.fatherAadhaarImage) newErrors.fatherAadhaarImage = "Please upload Aadhaar image";
        if (!fatherFormDetails.guardianRelation) newErrors.guardianRelation = "Guardian Relation is required.";
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
            // console.log("✅ Valid form submitted:", fatherFormDetails);
            dispatch(setFatherDetails(fatherFormDetails))
            dispatch(setFatherAddreddDetails(formData))
            setCurrentStep(currentStep + 1)
            // Continue to next step
        }
    };


    return (
        <div className="max-w-4xl mx-auto px-4 py-10 rounded-2xl shadow-md mt-8 space-y-6">
            <div className="text-center !mb-3">
                <Heading title="Guardian Details" />
            </div>

            <ProfileImageUpload
                image={fatherFormDetails.profileImage}
                setImage={(file: any) => {
                    setFatherFormDetails({ ...fatherFormDetails, profileImage: file })

                }}
            />

            {/* Row 1: Name + Phone */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <InputBox
                        value={fatherFormDetails.fatherName}
                        handleChange={handleChange}
                        name="fatherName"
                        label="Full Name (as per Aadhaar)"
                        type="text"
                        isRequired={true}
                        error={errors.fatherName}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <InputBox
                        value={fatherFormDetails.fatherPhoneNumber}
                        handleChange={handleChange}
                        name="fatherPhoneNumber"
                        label="Phone Number"
                        type="text"
                        isRequired={true}
                        error={errors.fatherPhoneNumber}
                    />
                </div>
            </div>

            {/* Row 2: DOB + Aadhaar */}
            <div className="flex flex-col md:flex-row gap-6">

                <div className="w-full md:w-1/2 relative">
                    <InputBox
                        value={fatherFormDetails.fatherAadharNumber}
                        handleChange={handleChange}
                        name="fatherAadharNumber"
                        label="Aadhaar Number"
                        type="text"
                        isRequired={true}
                        error={errors.fatherAadharNumber}
                    />


                </div>

                <div className="w-full md:w-1/2 relative">
                    <InputBox
                        value={fatherFormDetails.guardianRelation}
                        handleChange={handleChange}
                        name="guardianRelation"
                        label="Guardian Relation"
                        type="text"
                        isRequired={true}
                        error={errors.guardianRelation}
                    />


                </div>



            </div>

            <div className="flex flex-col md:flex-row gap-6">

                {/* <div className="w-full md:w-1/2 relative"> */}
                <SelectBox
                    label="Guardian with disabality"
                    name="guardianDisability"
                    value={fatherFormDetails.guardianDisability}
                    handleChange={handleChange}
                    options={disabilityOptions}
                    isRequired={true}
                />


                {/* </div> */}

                {/* <div className="w-full md:w-1/2 relative"> */}
                <SelectBox
                    label="Single Parental"
                    name="isSingleParent"
                    value={fatherFormDetails.isSingleParent}
                    handleChange={handleChange}
                    options={disabilityOptions}
                    isRequired={true}
                />


                {/* </div> */}



            </div>

            {/* <div className="w-full md:w-1/2 relative">
                    <InputBox
                        value={fatherFormDetails.annualIncome}
                        handleChange={handleChange}
                        name="annualIncome"
                        label="Annual Income (as per family Id)"
                        type="text"
                        isRequired={true}
                        error={errors.annualIncome}
                    />


                </div> */}

            <Address setFormData={setFormData} formData={formData} errors={errors} />
            <div className="!mt-5">
                <ImageUpload
                    label="Upload Aadhaar Card (Front)"
                    onFileSelect={(file: any) => {
                        // Save the file in your state if needed
                        setFatherFormDetails((prev) => ({
                            ...prev,
                            fatherAadhaarImage: file
                        }));
                    }}
                    error={errors.fatherAadhaarImage}
                    imageData={fatherFormDetails?.fatherAadhaarImage || ""}
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

export default FatherDetail;
