import React, { useMemo, useState } from "react";
import GirlDetail from "./GirlDetail";
import FatherDetail from "./FatherDetails";
import Documents from "./Documents";
import { useLocation } from "react-router-dom";
import DonorProfileCreation from "../Donor/ProfileCreation";
import YourInfo from "../../Auth/YourInfo";
import ProfileSummary from "./Summary";

interface StepProgressBarProps {
    steps: string[];
    currentStep: number; // starts from 1
    setCurrentStep: any
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ steps, currentStep, setCurrentStep }) => {
    const getProgressWidth = () => ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className=" !m-10 !h-2">
            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-300 rounded-full">
                <div
                    className="absolute top-0 left-0 h-2 bg-[#c98c64] rounded-full transition-all duration-300"
                    style={{ width: `${getProgressWidth()}%` }}
                />
            </div>

            {/* Step Labels */}
            <div className="flex justify-between !-mt-5">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep === stepNumber;
                    const isCompleted = currentStep > stepNumber;

                    return (
                        <div className="flex flex-col items-center text-xs  z-10" key={label}>
                            <div
                                onClick={() => {
                                    if (isCompleted) {
                                        setCurrentStep(stepNumber)
                                    }
                                }}
                                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${isCompleted
                                    ? "bg-[#c98c64] text-black border-[#c98c64]"
                                    : isActive
                                        ? "border-[#8b5c3d] text-[#8b5c3d] cursor-pointer"
                                        : "border-gray-300 text-[#8b5c3d]"
                                    }`}
                            >
                                {/* {stepNumber} */}
                            </div>
                            <span
                                className={`!mt-3 text-center w-[70px] ${isActive
                                    ? "text-[#8b5c3d] font-semibold"
                                    : isCompleted
                                        ? "text-[#c98c64]"
                                        : "text-gray-400"
                                    }`}
                            >
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// export default StepProgressBar;

const Progress = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formComplete, setFormComplete] = useState(false);
    const location = useLocation();

    const { role, isEditMode } = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const roleParam = params.get("role"); // e.g. donor, receiver
        const editParam = params.get("edit") === "true"; // convert to boolean
        return { role: roleParam, isEditMode: editParam };
    }, [location.search]);

    const steps = [ "Guardian Details","Girl Details", "Documents","Summary"];
    // const editSteps = ["Your Information", ...steps];
    // const displayedSteps = isEditMode ? editSteps : steps;
    const displayedSteps=steps

    // Render Donor Flow
    if (role === "donor") {
        if (isEditMode) {
            return (
                <>
                    <div className="fixed top-0 left-0 w-full bg-[#191919e6] z-50 py-4">
                        <StepProgressBar
                            steps={["Your Information ", "Profile Details"]}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />

                    </div>
                    <div className="mt-28 px-4">
                        {isEditMode && currentStep === 1 && (
                            <YourInfo setCurrentStep={setCurrentStep} currentStep={currentStep} edit="true" />
                        )}

                        {isEditMode && currentStep === 2 && (
                            <DonorProfileCreation edit="true" />
                        )}

                    </div>
                </>

            )
        } else {
            return <DonorProfileCreation />

        }


    }



    return (
        <>
            {!formComplete && (
                <div className="fixed top-0 left-0 w-full bg-[#191919e6] z-50 py-4">
                    <StepProgressBar
                        steps={displayedSteps}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
                </div>
            )}

            <div className="mt-30 px-4">
                {/* {isEditMode && currentStep === 1 && (
                    <YourInfo setCurrentStep={setCurrentStep} currentStep={currentStep} edit="true" />
                )} */}

                 {( currentStep === 1) && (
                    <FatherDetail setCurrentStep={setCurrentStep} currentStep={currentStep} />
                )}

                {( currentStep === 2) && (
                    <GirlDetail setCurrentStep={setCurrentStep} currentStep={currentStep} />
                )}

               

                {/* {( currentStep === 3) && (
                    <Address setCurrentStep={setCurrentStep} currentStep={currentStep} />
                )} */}

                {( currentStep === 3) && (
                    <Documents  
                    setCurrentStep={setCurrentStep} currentStep={currentStep}
                     />
                )}

                {( currentStep === 4) && (
                    <ProfileSummary setFormComplete={setFormComplete}  setCurrentStep={setCurrentStep}  />
                )}
            </div>
        </>
    );
};

export default Progress;


