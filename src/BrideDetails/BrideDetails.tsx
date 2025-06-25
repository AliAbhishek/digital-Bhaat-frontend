import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import Loader from "../Components/UI/Loader";
import Logo from "../assets/transparentLogo.png";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const InfoItem: React.FC<{ label: string; value: string | number | boolean | null | undefined }> = ({ label, value }) => (
    <p className="mb-1">
        <span className="font-semibold text-black">{label}:</span>{" "}
        {value || <span className="italic text-gray-400">N/A</span>}
    </p>
);

const BadgeItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-white/70 backdrop-blur border rounded-md p-4 shadow text-sm">
        <p className="text-gray-500">{label}</p>
        <p className="text-[#c98c64] font-semibold mt-1">{value}</p>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="px-6 py-10 max-w-5xl mx-auto">
        <motion.div
            className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
        >
            <h2 className="text-xl font-bold text-[#c98c64] mb-4">{title}</h2>
            {children}
        </motion.div>
    </section>
);

interface Address {
    street?: string;
    village?: string;
    postOffice?: string;
    district?: string;
    state?: string;
    pincode?: number;
}

interface GuardianDetails extends Address {
    fatherName?: string;
    fatherPhoneNumber?: string;
    guardianRelation?: string;
    guardianDisability?: boolean;
    isSingleParent?: boolean;
    profileImage?: string;
}

interface BrideDetails extends Address {
    brideDOB?: string;
    brideName?: string;
    age?: string;
    bridePhoneNumber?: string;
    brideDisability?: boolean;
    weddingDate?: string;
    profileImage?: string;
}

interface Profile {
    brideDetails: BrideDetails;
    guardianDetails: GuardianDetails;
    maskedBrideAadhar?: string;
    maskedGuardianAadhar?: string;
    brideProfileImageUrl?: string;
    guardianImageUrl?: string;
    familyIdImageUrl?: string;
    rationCardImageUrl?: string;
    profileStatus?: string;
    amountSanctioned?: number;
    collectedAmount?: number;
    createdAt?: string;
    saveAsDraft?: boolean;
    isProfileCompleted?: boolean;
    isProfileVerifiedByAdmin?: boolean;
    stepCompleted?: number;
}

const BrideDetail: React.FC = () => {
    const query = new URLSearchParams(useLocation().search);
    const encodedId = query.get("id");
    const brideId = encodedId ? atob(encodedId) : null;
    const [profile, setProfile] = useState<Profile | null>(null);

    const { data: brideData, isLoading } = useQueryApi({
        key: ["brideDetails", brideId],
        url: `${endpoints.GET_BRIDE_PROFILE.endpoint}/${brideId}`,
        enabled: !!brideId,
    });

    useEffect(() => {
        if (brideData?.data) setProfile(brideData.data);
    }, [brideData]);

    if (isLoading || !profile) return <Loader />;

    const {
        brideDetails = {},
        guardianDetails = {},
        maskedBrideAadhar,
        maskedGuardianAadhar,
        brideProfileImageUrl,
        guardianImageUrl,
        familyIdImageUrl,
        rationCardImageUrl,
        profileStatus,
        saveAsDraft,
        amountSanctioned,
        collectedAmount,
        isProfileCompleted,
        isProfileVerifiedByAdmin,
        stepCompleted,
    } = profile;

    return (
        <div className="bg-gradient-to-br w-screen min-h-screen font-sans bg-[#000000e6]">
            <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
                {brideProfileImageUrl && (
                    <motion.img
                        src={brideProfileImageUrl || Logo}
                        alt="Bride Background"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 blur-sm"
                        initial="hidden"
                        animate="show"
                        variants={fadeIn}
                    />
                )}

                {/* ✨ Edit Button if Draft */}
                {saveAsDraft && (
                    <div className="absolute top-4 right-4 z-20">
                        <button
                            onClick={() => {
                                localStorage.setItem("brideId", brideId || "");
                                window.location.href = "/create-profile"; // or use `navigate()` if using `react-router-dom`
                            }}
                            className="bg-[#c98c64] hover:bg-[#8b5c3d] text-white px-4 py-2 rounded-full shadow-md transition"
                        >
                            ✏️ Edit Profile
                        </button>
                    </div>
                )}

                <motion.div className="relative z-10 px-4" initial="hidden" animate="show" variants={fadeIn}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#c98c64]">
                        Support {brideDetails.brideName}'s Journey
                    </h1>
                    <p className="italic text-xl max-w-xl mx-auto text-[#c98c64]">
                        “Every daughter deserves a beautiful beginning.”
                    </p>
                </motion.div>
            </section>

            <Section title="👰 Bride Details">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {brideProfileImageUrl && (
                        <img
                            src={brideProfileImageUrl}
                            alt="Bride"
                            className="w-32 h-32 object-cover rounded-xl border border-pink-400"
                        />
                    )}
                    <div>
                        <InfoItem label="Name" value={brideDetails.brideName} />
                        <InfoItem label="Date of Birth" value={brideDetails.brideDOB} />
                        <InfoItem label="Age" value={brideDetails.age} />
                        <InfoItem label="Phone Number" value={brideDetails.bridePhoneNumber} />
                        <InfoItem label="Disability" value={brideDetails.brideDisability ? "Yes" : "No"} />
                        <InfoItem label="Wedding Date" value={brideDetails.weddingDate} />
                        <InfoItem label="Bride Aadhar" value={maskedBrideAadhar} />
                    </div>
                </div>
            </Section>

            <Section title="👨‍👧 Guardian Details">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {guardianImageUrl && (
                        <img
                            src={guardianImageUrl}
                            alt="Guardian"
                            className="w-32 h-32 object-cover rounded-xl border border-green-400"
                        />
                    )}
                    <div>
                        <InfoItem label="Name" value={guardianDetails.fatherName} />
                        <InfoItem label="Phone" value={guardianDetails.fatherPhoneNumber} />
                        <InfoItem label="Relation" value={guardianDetails.guardianRelation} />
                        <InfoItem label="Disability" value={guardianDetails.guardianDisability ? "Yes" : "No"} />
                        <InfoItem label="Single Parent" value={guardianDetails.isSingleParent ? "Yes" : "No"} />
                        <InfoItem label="Guardian Aadhar" value={maskedGuardianAadhar} />
                    </div>
                </div>
            </Section>

            <Section title="📍 Bride's Address">
                <InfoItem label="Street" value={brideDetails.street} />
                <InfoItem label="Village" value={brideDetails.village} />
                <InfoItem label="Post Office" value={brideDetails.postOffice} />
                <InfoItem label="District" value={brideDetails.district} />
                <InfoItem label="State" value={brideDetails.state} />
                <InfoItem label="Pincode" value={brideDetails.pincode} />
            </Section>

            <Section title="📍 Guardian's Address">
                <InfoItem label="Street" value={guardianDetails.street} />
                <InfoItem label="Village" value={guardianDetails.village} />
                <InfoItem label="Post Office" value={guardianDetails.postOffice} />
                <InfoItem label="District" value={guardianDetails.district} />
                <InfoItem label="State" value={guardianDetails.state} />
                <InfoItem label="Pincode" value={guardianDetails.pincode} />
            </Section>

            <section className="py-12 text-center bg-[#fef9f6]">
                <motion.div
                    className="max-w-2xl mx-auto px-4"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="text-2xl font-bold text-[#c98c64] mb-6">
                        🌟 Profile Summary
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        <BadgeItem label="Profile Status" value={profileStatus || "-"} />
                        <BadgeItem label="Admin Verified" value={isProfileVerifiedByAdmin ? "Yes ✅" : "No ❌"} />
                        <BadgeItem label="Profile Completed" value={isProfileCompleted ? "Yes ✅" : "No ❌"} />
                        <BadgeItem label="Steps Completed" value={`${stepCompleted}/4`} />
                    </div>

                    <div className="mt-6 mb-4 text-gray-800 text-lg font-medium">
                        💰 Amount Sanctioned: <span className="text-green-600">₹{amountSanctioned}</span> &nbsp;|
                        &nbsp; Collected: <span className="text-blue-600">₹{collectedAmount}</span>
                    </div>

                    <button className="mt-4 bg-gradient-to-r from-[#8b5c3d] to-[#c98c64] hover:brightness-110 text-white px-8 py-3 rounded-full shadow-xl transition">
                        🏱 Sponsor a Milestone
                    </button>
                </motion.div>
            </section>
        </div>
    );
};

export default BrideDetail;
