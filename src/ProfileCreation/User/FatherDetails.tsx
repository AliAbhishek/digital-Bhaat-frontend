import { useEffect, useState } from "react";
import Heading from "../../Components/UI/Heading";
import InputBox from "../../Components/UI/InputBox";
import PrimaryButton from "../../Components/UI/PrimaryButton";
// import ImageUpload from "../../Components/UI/ImageUpload";
import { useSelector } from "react-redux";
import SelectBox from "../../Components/UI/SelctBox";
import ProfileImageUpload from "../../Components/UI/ProfileImageInput";
import Address from "./Address";
import { useMutationApi } from "../../customHooks/useMutationApi";
import { endpoints } from "../../api/endpoints";
import toast from "react-hot-toast";
import { useQueryApi } from "../../customHooks/useFetchData";
import Loader from "../../Components/UI/Loader";

const FatherDetail = ({ setCurrentStep, currentStep }: any) => {
    // const dispatch = useDispatch()
    let brideId = localStorage.getItem("brideId")
    // const { isAadharUploaded } = useMemo(() => {
    //     const params = new URLSearchParams(location.search);

    //     const aadharUpload = params.get("aadharUpload") === "true"; // convert to boolean
    //     return { isAadharUploaded: aadharUpload };
    // }, [location.search]);
    // const fatherDetails = useSelector((state: any) => state.userForm.fatherDetails);

    const [fatherFormDetails, setFatherFormDetails] = useState({
        fatherName: "",
        fatherAadharNumber: "",
        fatherPhoneNumber: "",
        fatherAadhaarImage: null,
        // fatherBackrAadhaarImage: fatherDetails?.fatherBackrAadhaarImage ?? null,
        // annualIncome:""
        guardianRelation: "",
        guardianDisability: "No",
        isSingleParent: "No",
        profileImage: null


    });

    
    const [formData, setFormData] = useState({
        street:  "",
        village: "",
        postOffice:  "",
        district: "",
        state:  "",
        pincode:  "",
        weddingVenue:  "",
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
        // fatherAadhaarImage: "",
        // annualIncome:""
        guardianRelation: "",
        // street:"",
        village: "",
        postOffice: "",
        district: "",
        state: "",
        pincode: ""

    });
    console.log(fatherFormDetails, "details")

    // const { mutate, isPending } = useMutationApi({
    //     url: endpoints.AADHAR_UPLOAD.endpoint,
    //     method: endpoints.AADHAR_UPLOAD.method,
    //     onSuccess: (data) => {
    //         console.log(data, "AADHAR_UPLOAD")
    //         if (data?.success == true) {
    //             // setFatherFormDetails(()
    //             const { name, aadhar } = data.data;
    //             setFatherFormDetails((prev) => ({
    //                 ...prev,
    //                 fatherName: name,
    //                 fatherAadharNumber: aadhar,
    //             }))

    //             navigate(`/create-profile?role=user&aadharUpload=true`, { replace: true });

    //         }
    //         // if (data?.status == 200) {
    //         //     let role = decodedToken?.role
    //         //     navigate(`/create-profile?role=${role}&aadharUpload=false`)
    //         // }


    //     },
    //     onError: (error) => {
    //         const message = error?.response?.data?.message || "Something went wrong.";
    //         toast.error(message);
    //     },
    // });

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

        // if (!fatherFormDetails.fatherAadhaarImage) newErrors.fatherAadhaarImage = "Please upload Aadhaar image";
        if (!fatherFormDetails.guardianRelation) newErrors.guardianRelation = "Guardian Relation is required.";
        if (!formData.village) newErrors.village = "Village/Town name is required.";
        if (!formData.district) newErrors.district = "District name is required.";
        if (!formData.state) newErrors.state = "State name is required.";
        if (!formData.pincode) newErrors.pincode = "Pin code is required.";
        if (!formData.postOffice) newErrors.postOffice = "PostOffice is required.";



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const { data: brideData, isLoading } = useQueryApi({
        key: ["brideDetails", brideId],
        url: `${endpoints.GET_BRIDE_PROFILE.endpoint}/${brideId}`,
        enabled: !!brideId,
    });

    useEffect(() => {
        if (brideData?.data?.guardianDetails) {
            const guardian = brideData.data.guardianDetails;

            setFatherFormDetails({
                ...guardian,
                guardianDisability: guardian.guardianDisability ? "Yes" : "No",
                isSingleParent: guardian.isSingleParent ? "Yes" : "No",
                fatherAadharNumber:brideData.data?.fatherAadharNumber,
                profileImage:brideData.data?.guardianImageUrl
            });

            setFormData((prev) => ({
                ...prev,
                street: guardian.street || "",
                village: guardian.village || "",
                postOffice: guardian.postOffice || "",
                district: guardian.district || "",
                state: guardian.state || "",
                pincode: guardian.pincode || "",
            }));
        }
    }, [brideData]);




    const { mutate: createProfileMutate, isPending: createProfilePending } = useMutationApi({
        url: brideId ? `${endpoints.UPDATE_BRIDE_PROFILE.endpoint}/${brideId}` : endpoints.CREATE_BRIDE_PROFILE.endpoint,
        method:brideId? endpoints.UPDATE_BRIDE_PROFILE.method : endpoints.CREATE_BRIDE_PROFILE.method,
        onSuccess: (data) => {
            console.log(data, "creasteProfile")
            if (data?.status == 200) {
                localStorage.setItem("brideId", data?.data?.data?._id)
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
            console.log(data, "data")
            const dataToUpload = {
                profileImage: data?.data?.url,
                fatherName: fatherFormDetails.fatherName,

                fatherPhoneNumber: fatherFormDetails.fatherPhoneNumber,
                guardianRelation: fatherFormDetails.guardianRelation,
                guardianDisability: fatherFormDetails.guardianDisability == "No" ? false : true,
                isSingleParent: fatherFormDetails.isSingleParent == "No" ? false : true,
                street: formData.street,
                village: formData.village,
                postOffice: formData.postOffice,
                district: formData.district,
                state: formData.state,
                pincode: formData.pincode
            }
            createProfileMutate({ guardianDetails: dataToUpload, fatherAadharNumber: fatherFormDetails.fatherAadharNumber, })
            // updateProfileMutate({ fullName: formData.name, email: formData.email, profileImage: data?.data?.url })
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });


    const handleSubmit = () => {
        if (validate()) {
            // console.log("✅ Valid form submitted:", fatherFormDetails);
            // dispatch(setFatherDetails(fatherFormDetails))
            // dispatch(setFatherAddreddDetails(formData))
            const formDataToUpload = new FormData()
            if (fatherFormDetails.profileImage == null || typeof fatherFormDetails.profileImage=="string") {
                const dataToUpload = {
                    profileImage: fatherFormDetails.profileImage,
                    fatherName: fatherFormDetails.fatherName,

                    fatherPhoneNumber: fatherFormDetails.fatherPhoneNumber,
                    guardianRelation: fatherFormDetails.guardianRelation,
                    guardianDisability: fatherFormDetails.guardianDisability == "No" ? false : true,
                    isSingleParent: fatherFormDetails.isSingleParent == "No" ? false : true,
                    street: formData.street,
                    village: formData.village,
                    postOffice: formData.postOffice,
                    district: formData.district,
                    state: formData.state,
                    pincode: formData.pincode
                }
               
                createProfileMutate({ guardianDetails: dataToUpload, fatherAadharNumber: fatherFormDetails.fatherAadharNumber, })
            } else {
                formDataToUpload.append("file", fatherFormDetails.profileImage)
                mutate(formDataToUpload)
            }

            // setCurrentStep(currentStep + 1)
            // Continue to next step
        }
    };

    if (isLoading) return <Loader />;


    return (
        <div className="max-w-4xl mx-auto px-4 py-10 rounded-2xl shadow-md mt-8 space-y-6">

            <>
                <div className="text-center !mb-3">
                    <Heading title="Guardian Details" />
                </div>

                <ProfileImageUpload
                    image={fatherFormDetails?.profileImage}
                    setImage={(file: any) => {
                        setFatherFormDetails({ ...fatherFormDetails, profileImage: file })

                    }}
                />

                {/* Row 1: Name + Phone */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <InputBox
                            value={fatherFormDetails?.fatherName}
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
                            value={fatherFormDetails?.fatherPhoneNumber}
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
                            value={fatherFormDetails?.fatherAadharNumber}
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
                            value={fatherFormDetails?.guardianRelation}
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
                        value={fatherFormDetails?.guardianDisability}
                        handleChange={handleChange}
                        options={disabilityOptions}
                        isRequired={true}
                    />


                    {/* </div> */}

                    {/* <div className="w-full md:w-1/2 relative"> */}
                    <SelectBox
                        label="Single Parental"
                        name="isSingleParent"
                        value={fatherFormDetails?.isSingleParent}
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
            </>

            {/* <><div className="!mt-5 w-100">
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
            </> */}
            {
                brideId ? <div className="pt-4 flex justify-center !mb-10 !mt-3 gap-2">
                    <div className="w-[7.5rem]">
                        <PrimaryButton text="Submit" type="button" onClick={handleSubmit} isPending={isPending || createProfilePending} />
                    </div>
                    <div className="w-[7.5rem]">
                        <PrimaryButton text="Next" type="button" onClick={() => setCurrentStep(currentStep + 1)}  />
                    </div>
                </div> : <div className="pt-4 flex justify-center !mb-10 !mt-3">
                    <div className="w-[7.5rem]">
                        <PrimaryButton text="Continue" type="button" onClick={handleSubmit} isPending={isPending || createProfilePending} />
                    </div>
                </div>
            }







        </div>
    )
};

export default FatherDetail;
