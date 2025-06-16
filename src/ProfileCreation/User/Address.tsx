
import Heading from "../../Components/UI/Heading";
import InputBox from "../../Components/UI/InputBox";
import TextAreaBox from "../../Components/UI/TextArea";

const Address = ({ isBride, setFormData, formData, errors }: any) => {
    // const dispatch = useDispatch()

    console.log(errors, "err")



    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };

    // const validate = () => {
    //     const newErrors: any = {};

    //     if (!formData.weddingVenue) {
    //         newErrors.weddingVenue = "Wedding avenue is required."
    //     }
    //     setErrors(newErrors);

    //     return Object.keys(newErrors).length === 0;
    // }

    // const handleSubmit = () => {
    //     if (validate()) {
    //     // console.log("✅ Valid form submitted:", fatherFormDetails);
    //     dispatch(setAddreddDetails(formData))
    //     setCurrentStep(currentStep + 1)
    //     // Continue to next step
    //     }
    // };


    return (
        <div className="max-w-4xl mx-auto px-4 py-10 rounded-2xl shadow-md mt-8 space-y-6">
            <div className="text-center !mb-3">
                <Heading title="Address" />
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
                    // error={errors.street}
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
                        error={errors.village}
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <InputBox
                        label="Post Office"
                        name="postOffice"
                        value={formData.postOffice}
                        handleChange={handleChange}
                        isRequired={true}
                        type="text"
                        error={errors.postOffice}
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

                <div className="w-full md:w-1/2 relative">
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

                <div className="w-full md:w-1/2 relative">
                    <InputBox
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        handleChange={handleChange}
                        isRequired={true}
                        error={errors.pincode}
                        type="number"
                    />



                </div>



            </div>
            {isBride && <div className="flex flex-col md:flex-row gap-6">

                <div className="w-full md:w-1/2">
                    <TextAreaBox
                        label="Full Wedding Avenue Address"
                        name="weddingVenue"
                        value={formData.weddingVenue}
                        handleChange={handleChange}
                        isRequired={true}
                        error={errors.weddingVenue}
                    />
                </div>
            </div>}



            {/* <div className="pt-4 flex justify-center !mb-10 !mt-3">
                <div className="w-[7.5rem]">
                    <PrimaryButton text="Continue" type="button" onClick={handleSubmit} />
                </div>
            </div> */}
        </div>
    );
};

export default Address;
