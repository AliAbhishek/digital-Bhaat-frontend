import { useNavigate } from "react-router-dom"
import PrimaryButton from "../Components/UI/PrimaryButton"
import Fireworks from "./FireWorks"



function FinalSuccessMessage({ role }: any) {
    const navigate = useNavigate()
    return (
        <div className="text-center py-10 px-4  rounded-2xl shadow-lg relative">
            {/* Fireworks Animation */}
            <div className="absolute inset-0 z-0">
                <Fireworks />
            </div>

            {/* Message Content */}

            {
                role == "donor" ? <div className="relative  z-10 ">
                    <h2 className="text-3xl font-bold text-[#c98c64] mb-4">
                        Welcome to our family 🤝
                    </h2>
                    <p className="text-lg text-white mb-6 max-w-xl mx-auto !mt-3">
                        Your profile has been successfully created. Thank you for stepping forward — your presence here means the world to families dreaming of a dignified wedding for their daughters.
                    </p>
                    <p className="text-md text-white mb-6 max-w-xl mx-auto">
                        While you haven’t made a donation yet, your next step could change a life. Every contribution, big or small, helps make someone's special day possible with respect and joy.
                    </p>
                    <p className="text-sm text-gray-400 italic mb-6">
                        Ready to be a part of someone's wedding story? Explore donation options at your own pace 
                    </p>
                    <p className="text-sm text-gray-400 italic mb-6">— no obligations, just impact.</p>
                    <PrimaryButton text="Make a Donation" type="button" onClick={() => navigate("/")} />
                </div>
                    : <div className="relative z-10 ">
                        <h2 className="text-3xl font-bold text-[#c98c64] mb-4">Your application has been submitted 🎉</h2>
                        <p className="text-lg text-white mb-6 max-w-xl mx-auto !mt-3">
                            Thank you for trusting us. You’re not asking for charity — you’re giving your daughter the wedding she deserves. We’re here to stand with you, with dignity and respect.
                        </p>
                        <p className="text-sm text-gray-400 italic">
                            Our team will now carefully review your submission and get in touch shortly.
                        </p>
                        <PrimaryButton text="Back to home page" type="button" onClick={() => navigate("/")} />
                    </div>
            }



        </div>

    )
}

export default FinalSuccessMessage