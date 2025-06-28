import { useEffect, useState } from "react";
import Heading from "../../Components/UI/Heading";
import InputBox from "../../Components/UI/InputBox";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import { useSelector } from "react-redux";
import ProfileImageUpload from "../../Components/UI/ProfileImageInput";
import SelectBox from "../../Components/UI/SelctBox";
import Address from "./Address";
import { useMutationApi } from "../../customHooks/useMutationApi";
import { endpoints } from "../../api/endpoints";
import toast from "react-hot-toast";
import { useQueryApi } from "../../customHooks/useFetchData";
import Loader from "../../Components/UI/Loader";

const GirlDetail = ({ setCurrentStep, currentStep }: any) => {
    let brideId = localStorage.getItem("brideId")
    const [girlFormDetails, setGirlFormDetails] = useState({
        brideName: "",
        brideDOB: "",
        brideAadharNumber: "",
        bridePhoneNumber: "",
        brideAadhaarImage: null,
        weddingDate: "",
        profileImage: null,
        brideDisability: "No"
    });

    const [formData, setFormData] = useState({
        street: "",
        village: "",
        postOffice: "",
        district: "",
        state: "",
        pincode: "",
        weddingVenue: "",
    });

    // const [isVerifying, setIsVerifying] = useState(false);

    const [errors, setErrors] = useState({
        profileImage:"",
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

    const { data: brideData, isLoading } = useQueryApi({
        key: ["brideDetails", brideId],
        url: `${endpoints.GET_BRIDE_PROFILE.endpoint}/${brideId}`,
        enabled: !!brideId,
    });

    useEffect(() => {
        if (brideData?.data?.guardianDetails) {
            const bride = brideData?.data?.brideDetails;

            setGirlFormDetails({
                ...bride,
                guardianDisability: bride?.brideDisability ? "Yes" : "No",

                brideAadharNumber: brideData?.data?.brideAadharNumber,
                profileImage: brideData?.data?.brideProfileImageUrl
            });

            setFormData((prev) => ({
                ...prev,
                street: bride?.street || "",
                village: bride?.village || "",
                postOffice: bride?.postOffice || "",
                district: bride?.district || "",
                state: bride?.state || "",
                pincode: bride?.pincode || "",
            }));
        }
    }, [brideData]);

    const validate = () => {
        const newErrors: any = {};
        if(!girlFormDetails.profileImage){
            newErrors.profileImage="Please upload a image."
        }

        // Name
        if (!girlFormDetails.brideName?.trim()) {
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

        // if (!girlFormDetails.brideAadhaarImage) newErrors.brideAadhaarImage = "Please upload Aadhaar image.";
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



    const { mutate: updateProfileMutate, isPending: updateProfilePending } = useMutationApi({
        url: `${endpoints.UPDATE_BRIDE_PROFILE.endpoint}/${brideId}`,
        method: endpoints.UPDATE_BRIDE_PROFILE.method,
        onSuccess: (data) => {
            console.log(data, "creasteProfile")
            if (data?.status == 200) {
                // localStorage.setItem("brideId", data?.data?.data?._id)
                setCurrentStep(currentStep + 1)
                // let role = decodedToken?.role
                // navigate(`/create-profile?role=${role}`)
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

            const dataToUpload = {
                // step: currentStep,
                // ...(typeof girlFormDetails.profileImage === "string" && {
                //     profileImage: girlFormDetails.profileImage,
                // }),
                profileImage: data?.data?.url,
                brideDOB: girlFormDetails.brideDOB,
                brideName: girlFormDetails.brideName,
                age: calculateExactAge(girlFormDetails.brideDOB),
                bridePhoneNumber: girlFormDetails.bridePhoneNumber,

                brideDisability: girlFormDetails.brideDisability == "No" ? false : true,
                weddingDate: girlFormDetails.weddingDate,

                street: formData.street,
                village: formData.village,
                postOffice: formData.postOffice,
                district: formData.district,
                state: formData.state,
                pincode: formData.pincode
            }
            updateProfileMutate({ brideDetails: dataToUpload, brideAadharNumber: girlFormDetails.brideAadharNumber, step: currentStep })
            // updateProfileMutate({ fullName: formData.name, email: formData.email, profileImage: data?.data?.url })
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    function calculateExactAge(dobStr: string): string {
        const dob = new Date(dobStr);
        const today = new Date();

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        // Adjust days if negative
        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        // Adjust months if negative
        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`;
    }




    const handleSubmit = () => {
        if (validate()) {
            // console.log("✅ Valid form submitted:", fatherFormDetails);
            // dispatch(setFatherDetails(fatherFormDetails))
            // dispatch(setFatherAddreddDetails(formData))
            
            const today = new Date();
            const sixtyDaysFromNow = new Date();
            // const ninetyDaysFromNow = new Date();

            sixtyDaysFromNow.setDate(today.getDate() + 60);
            // ninetyDaysFromNow.setDate(today.getDate() + 90);
            const selectedDate = new Date(girlFormDetails.weddingDate);
            if (selectedDate < sixtyDaysFromNow ) {
                return toast.error("⚠️ Wedding date must be 60 days from today.If you want to help get in touch with out support.We will help you.");
            }
        
            const formDataToUpload = new FormData()
            if (girlFormDetails.profileImage == null || typeof girlFormDetails.profileImage == "string") {
                const dataToUpload = {

                    profileImage: girlFormDetails.profileImage,
                    brideDOB: girlFormDetails.brideDOB,
                    brideName: girlFormDetails.brideName,
                    age: calculateExactAge(girlFormDetails.brideDOB),
                    bridePhoneNumber: girlFormDetails.bridePhoneNumber,

                    brideDisability: girlFormDetails.brideDisability == "No" ? false : true,
                    weddingDate: girlFormDetails.weddingDate,

                    street: formData.street,
                    village: formData.village,
                    postOffice: formData.postOffice,
                    district: formData.district,
                    state: formData.state,
                    pincode: formData.pincode
                }

                updateProfileMutate({ brideDetails: dataToUpload, brideAadharNumber: girlFormDetails.brideAadharNumber, step: currentStep })
            } else {
                formDataToUpload.append("file", girlFormDetails.profileImage)
                mutate(formDataToUpload)
            }

            // setCurrentStep(currentStep + 1)
            // Continue to next step
        }
    };

    if (isLoading) return <Loader />;



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
              error={errors.profileImage}
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
                        label="Date of Birth (as per Aadhaar)"
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
                <div className="w-full md:w-1/2"><InputBox
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
            {/* <div className="!mt-5">
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

            </div> */}


            <div className="pt-4 flex justify-center !mb-10 !mt-3">
                <div className="w-[7.5rem]">
                    <PrimaryButton text="Continue" type="button" onClick={handleSubmit} isPending={isPending || updateProfilePending} />
                </div>
            </div>


        </div>
    );
};

export default GirlDetail;
