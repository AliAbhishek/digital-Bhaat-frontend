import { useEffect, useState } from 'react';
import { useQueryApi } from '../../customHooks/useFetchData';
import { endpoints } from '../../api/endpoints';
import Loader from '../../Components/UI/Loader';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import { useMutationApi } from '../../customHooks/useMutationApi';
import toast from 'react-hot-toast';
import FinalSuccessMessage from '../../utils/FinalSuccessMessage';
import { useNavigate } from 'react-router-dom';
import SubHeading from '../../Components/UI/SubHeading';

export default function ProfileSummary({ setFormComplete, setCurrentStep }: any) {
    const [profileData, setProfileData] = useState<any>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [isDraft, setIsDraft] = useState(false)
    const navigate = useNavigate()

    const brideId = localStorage.getItem('brideId');

    const { data: brideData, isLoading } = useQueryApi({
        key: ['brideDetails', brideId],
        url: `${endpoints.GET_BRIDE_PROFILE.endpoint}/${brideId}`,
        enabled: !!brideId,
    });

    useEffect(() => {
        if (brideData?.data) {
            const {
                guardianDetails,
                brideDetails,
                profileStatus,
                maskedBrideAadhar,
                maskedGuardianAadhar,
                familyIdImageUrl,
                rationCardImageUrl,
                brideProfileImageUrl,
                guardianImageUrl,
            } = brideData.data;

            setProfileData({
                guardianDetails,
                brideDetails,
                profileStatus,
                maskedBrideAadhar,
                maskedGuardianAadhar,
                familyIdImageUrl,
                rationCardImageUrl,
                brideProfileImageUrl,
                guardianImageUrl,
            });
        }
    }, [brideData]);

    const { mutate: updateProfileMutate, isPending: updateProfilePending } = useMutationApi({
        url: `${endpoints.UPDATE_BRIDE_PROFILE.endpoint}/${brideId}`,
        method: endpoints.UPDATE_BRIDE_PROFILE.method,
        onSuccess: (data) => {
            console.log(data, "creasteProfile")
            if (data?.status == 200) {
                setFormComplete(true);
                if (!isDraft) {
                    triggerFireworks()
                } else {
                    navigate("/helping-hand")
                }
                localStorage.removeItem("brideId")


                // setCurrentStep(currentStep+1)
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

    const handleFinalSubmit = (type: string) => {
        let data
        if (type == "draft") {
            data = { saveAsDraft: true, step: 4 }
        } else {
            data = { step: 4 }
        }
        updateProfileMutate(data)

    };

    const triggerFireworks = () => {
        setShowSuccessMessage(true);

    };

    if (isLoading || !profileData || updateProfilePending) return <Loader />;

    const {
        guardianDetails,
        brideDetails,
        maskedBrideAadhar,
        maskedGuardianAadhar,
        familyIdImageUrl,
        rationCardImageUrl,
        brideProfileImageUrl,
        guardianImageUrl,
    } = profileData;

    return (
        <>
            {
                showSuccessMessage ?
                    <>

                        <FinalSuccessMessage />
                    </> :
                    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 bg-[#fef9f6] rounded-xl shadow-inner">
                        <h2 className="text-3xl font-bold text-center text-[#8b5c3d]">👩‍❤️‍👨 Profile Summary</h2>

                        {/* Bride Details */}
                        <section className="border border-[#c98c64] rounded-lg p-4 bg-white shadow-sm">
                            <h3 className="text-xl font-semibold text-[#8b5c3d] mb-4">Bride Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p><strong>Name:</strong> {brideDetails?.brideName}</p>
                                    <p><strong>DOB:</strong> {brideDetails?.brideDOB}</p>
                                    <p><strong>Phone:</strong> {brideDetails?.bridePhoneNumber}</p>
                                    <p><strong>Disability:</strong> {brideDetails?.brideDisability ? 'Yes' : 'No'}</p>
                                    <p><strong>Wedding Date:</strong> {brideDetails?.weddingDate}</p>
                                    <p><strong>Aadhar:</strong> {maskedBrideAadhar}</p>
                                </div>
                                {
                                    brideProfileImageUrl && <div className="flex justify-center">
                                        <img
                                            src={brideProfileImageUrl}
                                            alt="Bride"
                                            className="h-56 w-56 object-cover rounded-xl border border-[#c98c64] shadow"
                                        />
                                    </div>
                                }

                            </div>
                        </section>

                        {/* Guardian Details */}
                        <section className="border border-[#c98c64] rounded-lg p-4 bg-white shadow-sm">
                            <h3 className="text-xl font-semibold text-[#8b5c3d] mb-4">Guardian Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p><strong>Name:</strong> {guardianDetails?.fatherName}</p>
                                    <p><strong>Phone:</strong> {guardianDetails?.fatherPhoneNumber}</p>
                                    <p><strong>Relation:</strong> {guardianDetails?.guardianRelation}</p>
                                    <p><strong>Disability:</strong> {guardianDetails?.guardianDisability ? 'Yes' : 'No'}</p>
                                    <p><strong>Single Parent:</strong> {guardianDetails?.isSingleParent ? 'Yes' : 'No'}</p>
                                    <p><strong>Aadhar:</strong> {maskedGuardianAadhar}</p>
                                </div>
                                {
                                    guardianImageUrl && <div className="flex justify-center">
                                        <img
                                            src={guardianImageUrl}
                                            alt="Guardian"
                                            className="h-56 w-56 object-cover rounded-xl border border-[#c98c64] shadow"
                                        />
                                    </div>
                                }

                            </div>
                        </section>

                        {/* Address Details */}
                        <section className="border border-[#c98c64] rounded-lg p-4 bg-white shadow-sm">
                            <h3 className="text-xl font-semibold text-[#8b5c3d] mb-4">📍 Address Details</h3>

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Address Column */}
                                <div className="flex-1 space-y-6">
                                    {/* Guardian Address */}
                                    <div>
                                        <h4 className="text-md font-semibold text-[#c98c64] mb-2">👨 Guardian Address</h4>
                                        <p>{guardianDetails?.street}, {guardianDetails?.village}</p>
                                        <p>{guardianDetails?.postOffice}, {guardianDetails?.district}</p>
                                        <p>{guardianDetails?.state} - {guardianDetails?.pincode}</p>
                                    </div>

                                    {/* Bride Address */}
                                    <div>
                                        <h4 className="text-md font-semibold text-[#c98c64] mb-2">👰 Bride Address</h4>
                                        <p>{brideDetails?.street}, {brideDetails?.village}</p>
                                        <p>{brideDetails?.postOffice}, {brideDetails?.district}</p>
                                        <p>{brideDetails?.state} - {brideDetails?.pincode}</p>
                                    </div>
                                </div>

                                {/* Family ID Image */}
                                <div className="flex-shrink-0 w-full md:w-60 text-center">
                                    {/* <h4 className="text-md font-semibold text-[#c98c64] mb-2">🆔 Family ID</h4> */}
                                    <img
                                        src={familyIdImageUrl || rationCardImageUrl}
                                        alt="Family ID"
                                        className="h-56 w-auto rounded-lg border border-[#c98c64] shadow"
                                    />
                                </div>
                            </div>
                        </section>

                        <p className="text-sm text-[#8b5c3d] bg-[#fef9f6] border border-[#c98c64] rounded-md px-4 py-2 text-center mt-4 font-medium shadow-sm flex">
                            ⚠️ <strong className="text-[#8b5c3d]"><SubHeading title="Once submitted, the form cannot be edited." /></strong><SubHeading title=' Please review carefully before final submission.' />
                        </p>

                        {/* Buttons */}

                        <>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <PrimaryButton text="Save as Draft" type="button" onClick={() => {
                                    handleFinalSubmit("draft")
                                    setIsDraft(true)
                                }} />
                                <PrimaryButton text="Edit" type="button" onClick={() => setCurrentStep(1)} />
                                <PrimaryButton text="Submit" type="button" onClick={() => handleFinalSubmit("submit")} />
                            </div>



                        </>

                    </div>
            }
        </>

    );
}
