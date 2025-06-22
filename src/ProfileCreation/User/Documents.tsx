
import { useEffect, useState } from 'react';
import Heading from '../../Components/UI/Heading'
import ImageUpload from '../../Components/UI/ImageUpload';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import FinalSuccessMessage from '../../utils/FinalSuccessMessage';
import SubHeading from '../../Components/UI/SubHeading';
import Checkbox from '../../Components/UI/CheckBox';
// import { useNavigate } from 'react-router-dom';
import { useMutationApi } from '../../customHooks/useMutationApi';
import { endpoints } from '../../api/endpoints';
import toast from 'react-hot-toast';
import { useQueryApi } from '../../customHooks/useFetchData';
import { Loader } from 'lucide-react';

const Documents = ({ setCurrentStep, currentStep }: any) => {

    let brideId = localStorage.getItem("brideId")
    // const navigate = useNavigate()


    const [formData, setFormData] = useState({

        familyIdImage: null,
        consentGiven: false,
        isTermAndConditionAccepted: false
    })



    const [error, setErrors] = useState({
        familyIdImage: "",
        consentGiven: "",
        isTermAndConditionAccepted: ""
    })

    const validate = () => {
        const newErrors: any = {};

        if (!formData.familyIdImage) {
            newErrors.familyIdImage = "Family id is required."
        }

        if (!formData.consentGiven) {
            newErrors.consentGiven = "Please give your consent."
        }

        if (!formData.isTermAndConditionAccepted) {
            newErrors.isTermAndConditionAccepted = "Please accept the term and conditions."
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const { mutate: updateProfileMutate, isPending: updateProfilePending } = useMutationApi({
        url: `${endpoints.UPDATE_BRIDE_PROFILE.endpoint}/${brideId}`,
        method: endpoints.UPDATE_BRIDE_PROFILE.method,
        onSuccess: (data) => {
            console.log(data, "creasteProfile")
            if (data?.status == 200) {
                setCurrentStep(currentStep + 1)
                // localStorage.setItem("brideId", data?.data?.data?._id)
                // setCurrentStep(currentStep + 1)
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
            updateProfileMutate({ familyIdImage: data?.data?.url, step: 3 })
            // updateProfileMutate({ fullName: formData.name, email: formData.email, profileImage: data?.data?.url })
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    const { data: brideData, isLoading } = useQueryApi({
        key: ["brideDetails", brideId],
        url: `${endpoints.GET_BRIDE_PROFILE.endpoint}/${brideId}`,
        enabled: !!brideId,
    });

    useEffect(() => {

        if (brideData?.data?.guardianDetails) {


            setFormData({
                ...formData,
                familyIdImage: brideData?.data?.familyIdImageUrl

            });


        }
    }, [brideData]);


    const handleSubmit = () => {
        if (validate()) {
            // console.log("✅ Valid form submitted:", fatherFormDetails);

            if (formData?.familyIdImage == null || typeof formData.familyIdImage == "string") {
                setCurrentStep(currentStep + 1)
            } else {
                let formDataToUpload = new FormData()
                formDataToUpload.append("file", formData.familyIdImage)
                mutate(formDataToUpload)

            }





            // setFormComplete(true)
            // {
            //     edit == "true" ? navigate("/") : triggerFireworks()
            // }

            // setCurrentStep(currentStep + 1)
            // Continue to next step
        }
    };



    if (isLoading) return <Loader />;

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-10 rounded-2xl shadow-md mt-8 space-y-6">  <div className="text-center !mb-3">
                <Heading title="Documents" />
            </div>

                {/* <div className="!mt-5 ">
                            <ImageUpload
                                label="Upload Ration Card (Front) (Optional)"
                                onFileSelect={(file: any) => {
                                    // Save the file in your state if needed
                                    setFormData((prev) => ({
                                        ...prev,
                                        rationCardImage: file
                                    }));
                                }}

                                imageData={formData?.rationCardImage || ""}
                            />

                        </div> */}

                <div className="!mt-5 ">
                    <ImageUpload
                        label="Upload Family Id (Front)"
                        onFileSelect={(file: any) => {
                            // Save the file in your state if needed
                            setFormData((prev) => ({
                                ...prev,
                                familyIdImage: file
                            }));
                        }}
                        // error={errors.fatherAadhaarImage}
                        error={error?.familyIdImage}
                        imageData={formData?.familyIdImage || ""}
                    />



                </div>
                <div className='ml-10'> <div className='!ml-2'>
                    <SubHeading title='By uploading your identification documents (Aadhaar, Ration Card, Family ID), you agree to the following:' />
                    <div className='mt-2'>  <SubHeading title='- The documents will be processed securely to extract necessary information for eligibility verification.' />
                        <SubHeading title='- We DO NOT store or share your documents. They are deleted immediately after processing.' />
                        <SubHeading title='- Only essential details such as name, age, address, and income slab are retained in a secure, encrypted format.' />
                        <SubHeading title='- Your information will only be used to determine funding eligibility and will not be shared with third parties without your consent.' /></div>




                </div>
                    <div className='!mt-8 flex w-full '>

                        <div className='!mt-1'> <Checkbox
                            checked={formData?.consentGiven}
                            isRequired={true}
                            onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}

                        />

                        </div>

                        <div className='ml-2'>  <SubHeading title='I agree to the processing of my documents under the above conditions.' /></div>








                    </div>
                    {error?.consentGiven && <p className="text-red-500 text-xs mt-1 ml-6">{error?.consentGiven}</p>}
                </div>


                <div className='!mt-8 flex w-full ml-10 '>
                    <div className='!mt-1'> <Checkbox
                        checked={formData?.isTermAndConditionAccepted}
                        isRequired={true}
                        onChange={(e) => setFormData({ ...formData, isTermAndConditionAccepted: e.target.checked })}

                    /></div>

                    <div className='!ml-2'>
                        <SubHeading title="I agree to the privacy policy and terms & conditions of the platform." />


                        {error?.isTermAndConditionAccepted && <p className="text-red-500 text-xs mt-1">{error?.isTermAndConditionAccepted}</p>}
                    </div>


                </div>




                <div className="pt-4 flex justify-center !mb-10 !mt-3">
                    <div className="w-[7.5rem]">
                        <PrimaryButton text="Continue" type="button" onClick={handleSubmit} isPending={isPending || updateProfilePending} />
                    </div>
                </div>   </div>


        </>
    )
}

export default Documents