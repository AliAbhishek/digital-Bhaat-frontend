
import { useState } from 'react';
import Heading from '../../Components/UI/Heading'
import ImageUpload from '../../Components/UI/ImageUpload';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentDetails } from '../../redux/Slices/UserFormSlice';
import FinalSuccessMessage from '../../utils/FinalSuccessMessage';
import SubHeading from '../../Components/UI/SubHeading';
import Checkbox from '../../Components/UI/CheckBox';
import { useNavigate } from 'react-router-dom';

const Documents = ({ setFormComplete,edit }: any) => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const documentDetails = useSelector((state: any) => state.userForm.documentDetails);
    const girlDetails = useSelector((state: any) => state.userForm.girlDetails);
    const fatherDetails = useSelector((state: any) => state.userForm.fatherDetails);
    const addressDetails = useSelector((state: any) => state.userForm.addressDetails);
    const [formData, setFormData] = useState({
        rationCardImage: documentDetails?.rationCardImage ?? null,
        familyIdImage: documentDetails?.familyIdImage ?? null,
        consentGiven: documentDetails?.consentGiven ?? false,
        isTermAndConditionAccepted :documentDetails?.isTermAndConditionAccepted ?? false
    })

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [error, setErrors] = useState({
        familyIdImage: "",
        consentGiven: "",
        isTermAndConditionAccepted:""
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

    const handleSubmit = () => {
        if (validate()) {
            // console.log("✅ Valid form submitted:", fatherFormDetails);
            dispatch(setDocumentDetails(formData))
            console.log(documentDetails, girlDetails, fatherDetails, addressDetails)

            setFormComplete(true)
            {
                edit=="true" ? navigate("/") : triggerFireworks()
            }
            
            // setCurrentStep(currentStep + 1)
            // Continue to next step
        }
    };

    const triggerFireworks = () => {
        setShowSuccessMessage(true);

    };

    console.log(documentDetails)

    return (
        <>
            {
                showSuccessMessage ?
                    <>

                        <FinalSuccessMessage />
                    </> : <>  <div className="max-w-4xl mx-auto px-4 py-10 rounded-2xl shadow-md mt-8 space-y-6">  <div className="text-center !mb-3">
                        <Heading title="Documents" />
                    </div>

                        <div className="!mt-5 ">
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

                        </div>

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
                        <div className='!mt-8 flex w-full '>
                            <div className='!mt-1'> <Checkbox
                                checked={formData?.consentGiven}
                                isRequired={true}
                                onChange={(e) => setFormData({ ...documentDetails, consentGiven: e.target.checked })}

                            /></div>

                            <div className='!ml-2'>
                                <SubHeading title='I agree to the upload and secure storage of my documents ' />
                                <SubHeading title='for identity and verification purposes as part of the marriage' />
                                <SubHeading title='assistance process.' />

                                {error?.consentGiven && <p className="text-red-500 text-xs mt-1">{error?.consentGiven}</p>}
                            </div>


                        </div>

                        <div className='!mt-8 flex w-full '>
                            <div className='!mt-1'> <Checkbox 
                            checked={formData?.isTermAndConditionAccepted} 
                            isRequired={true} 
                            onChange={(e) => setFormData({ ...formData, isTermAndConditionAccepted:e.target.checked})}
                           
                             /></div>
                           
                            <div className='!ml-2'>
                            <SubHeading title="I agree to the privacy policy and terms & conditions of the platform." />
                               

                                {error?.isTermAndConditionAccepted && <p className="text-red-500 text-xs mt-1">{error?.isTermAndConditionAccepted}</p>}
                            </div>


                        </div>




                        <div className="pt-4 flex justify-center !mb-10 !mt-3">
                            <div className="w-[7.5rem]">
                                <PrimaryButton text="Continue" type="button" onClick={handleSubmit} />
                            </div>
                        </div>   </div></>
            }

        </>
    )
}

export default Documents