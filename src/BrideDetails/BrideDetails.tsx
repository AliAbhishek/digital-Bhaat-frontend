import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import Loader from "../Components/UI/Loader";
import Logo from "../assets/transparentLogo.png";
import { getUserIdFromToken } from "../utils/decodeToken";

// FadeIn animation variants for motion components
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// SlideIn animation variants for sections
const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// InfoItem functional component with hover animation
const InfoItem = ({ label, value }: any) => (
    <motion.p
        className="mb-1 text-[#1a1a1a] hover:bg-gray-100 px-2 rounded-md transition-colors duration-200 cursor-default"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        <span className="font-semibold text-[#1a1a1a]">{label}:</span>{" "}
        {value || <span className="italic text-gray-400">N/A</span>}
    </motion.p>
);

// BadgeItem functional component with initial animation
const BadgeItem = ({ label, value }: any) => (
    <motion.div
        className="bg-white/70 backdrop-blur border border-gray-200 rounded-md p-4 shadow-sm text-sm overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(201, 140, 100, 0.4)" }}
    >
        <p className="text-gray-500">{label}</p>
        <p className="text-[#c98c64] font-semibold mt-1">{value}</p>
        {/* Animated sparkle effect on hover */}
        <motion.span
            className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ x: "-100%", rotate: -45 }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "linear" }}
        />
    </motion.div>
);

// Section functional component with unique entrance animation
const Section = ({ title, children, animationVariants = fadeIn }: any) => (
    <section className="px-4 py-8 md:py-10 max-w-5xl mx-auto">
        <motion.div
            className="bg-white/70 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg overflow-hidden" // Added overflow-hidden for better animation
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of section is visible
            variants={animationVariants}
        >
            <h2 className="text-xl md:text-2xl font-bold text-[#c98c64] mb-4 md:mb-6">{title}</h2>
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

const BrideDetail: React.FC =() => {
   const decodedToken: any = getUserIdFromToken();
   let role =decodedToken.role
    const query = new URLSearchParams(useLocation().search);
    const encodedId = query.get("id");
    const navigate=useNavigate()
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
        // familyIdImageUrl,
        // rationCardImageUrl,
        profileStatus,
        saveAsDraft,
        amountSanctioned,
        collectedAmount,
        isProfileCompleted,
        isProfileVerifiedByAdmin,
        stepCompleted,
    } = profile;

    return (
        <div className="bg-gradient-to-br w-screen min-h-screen font-inter bg-[#000000e6] text-[#fef9f6]">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-screen flex flex-col justify-center items-center text-center overflow-hidden p-4">
                {brideProfileImageUrl && (
                    <motion.img
                        src={brideProfileImageUrl || Logo}
                        alt="Bride Background"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 blur-sm"
                        initial={{ scale: 1.1, opacity: 0.1 }} // Initial larger scale and lower opacity for subtle zoom-in
                        animate={{ scale: 1, opacity: 0.2 }}
                        transition={{ duration: 2, ease: "easeOut" }} // Slower, subtle animation
                        // onError={(e) => {
                        //     e.currentTarget.src = LogoPlaceholder;
                        //     e.currentTarget.onerror = null;
                        // }}
                    />
                )}

                {/* Animated Overlay for Hero Section */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#000000e6] via-[#000000a0] to-transparent z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Edit Button if Draft */}
                {saveAsDraft && (
                    <motion.div
                        className="absolute top-4 right-4 z-20"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <button
                            onClick={() => {
                                localStorage.setItem("brideId", brideId || "");
                                navigate("/create-profile");
                            }}
                            className="bg-[#c98c64] hover:bg-[#8b5c3d] text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1"
                        >
                            ✏️ <span className="hidden sm:inline">Complete Profile</span>
                        </button>
                    </motion.div>
                )}

                <motion.div className="relative z-10 px-4 max-w-3xl" initial="hidden" animate="show" variants={fadeIn}>
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#c98c64] leading-tight drop-shadow-lg"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    >
                        Support {brideDetails.brideName || 'a Bride'}'s Journey
                    </motion.h1>
                    <motion.p
                        className="italic text-lg md:text-xl max-w-xl mx-auto text-[#fef9f6]/90"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                    >
                        “Every daughter deserves a beautiful beginning.”
                    </motion.p>
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#c98c64] text-xl animate-bounce"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, repeat: Infinity, duration: 1.5 }}
                >
                    &#x2B07; Scroll
                </motion.div>
            </section>

            {/* Bride Details Section */}
            <Section title="👰 Bride Details" animationVariants={slideInLeft}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    {(brideProfileImageUrl || Logo) && (
                        <motion.img
                            src={brideProfileImageUrl}
                            alt="Bride"
                            className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full border-4 border-pink-400 shadow-xl flex-shrink-0" // Increased size, round shape, thicker border
                            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/144x144/fbcfe8/000000?text=No+Image`;
                                e.currentTarget.onerror = null;
                            }}
                        />
                    )}
                    <div className="text-center md:text-left w-full">
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

            {/* Guardian Details Section */}
            <Section title="👨‍👧 Guardian Details" animationVariants={slideInRight}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    {guardianImageUrl && (
                        <motion.img
                            src={guardianImageUrl}
                            alt="Guardian"
                            className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full border-4 border-green-400 shadow-xl flex-shrink-0" // Increased size, round shape, thicker border
                            initial={{ scale: 0.8, rotate: 10, opacity: 0 }}
                            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/144x144/d1fae5/000000?text=No+Image`;
                                e.currentTarget.onerror = null;
                            }}
                        />
                    )}
                    <div className="text-center md:text-left w-full">
                        <InfoItem label="Name" value={guardianDetails.fatherName} />
                        <InfoItem label="Phone" value={guardianDetails.fatherPhoneNumber} />
                        <InfoItem label="Relation" value={guardianDetails.guardianRelation} />
                        <InfoItem label="Disability" value={guardianDetails.guardianDisability ? "Yes" : "No"} />
                        <InfoItem label="Single Parent" value={guardianDetails.isSingleParent ? "Yes" : "No"} />
                        <InfoItem label="Guardian Aadhar" value={maskedGuardianAadhar} />
                    </div>
                </div>
            </Section>

            {/* Bride's Address Section */}
            <Section title="📍 Bride's Address" animationVariants={slideInLeft}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    <InfoItem label="Street" value={brideDetails.street} />
                    <InfoItem label="Village" value={brideDetails.village} />
                    <InfoItem label="Post Office" value={brideDetails.postOffice} />
                    <InfoItem label="District" value={brideDetails.district} />
                    <InfoItem label="State" value={brideDetails.state} />
                    <InfoItem label="Pincode" value={brideDetails.pincode} />
                </div>
            </Section>

            {/* Guardian's Address Section */}
            <Section title="📍 Guardian's Address" animationVariants={slideInRight}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    <InfoItem label="Street" value={guardianDetails.street} />
                    <InfoItem label="Village" value={guardianDetails.village} />
                    <InfoItem label="Post Office" value={guardianDetails.postOffice} />
                    <InfoItem label="District" value={guardianDetails.district} />
                    <InfoItem label="State" value={guardianDetails.state} />
                    <InfoItem label="Pincode" value={guardianDetails.pincode} />
                </div>
            </Section>

            {/* Profile Summary Section */}
            <section className="py-8 md:py-12 text-center bg-[#fef9f6]">
                <motion.div
                    className="max-w-2xl mx-auto px-4"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[#c98c64] mb-4 md:mb-6">
                        🌟 Profile Summary
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        <BadgeItem label="Profile Status" value={profileStatus || "-"} />
                        <BadgeItem label="Admin Verified" value={isProfileVerifiedByAdmin ? "Yes ✅" : "No ❌"} />
                        <BadgeItem label="Profile Completed" value={isProfileCompleted ? "Yes ✅" : "No ❌"} />
                        <BadgeItem label="Steps Completed" value={`${stepCompleted}/4`} />
                    </div>

                    <div className="mt-6 mb-4 text-[#1a1a1a] text-lg md:text-xl font-medium">
                        💰 Amount Sanctioned: <span className="text-green-600">₹{amountSanctioned || 0}</span> &nbsp;|
                        &nbsp; Collected: <span className="text-blue-600">₹{collectedAmount || 0}</span>
                    </div>

                    {
                        role=="donor" && <motion.button
                        className="mt-4 bg-gradient-to-r from-[#8b5c3d] to-[#c98c64] hover:brightness-110 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.07, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🏱 Start Donation
                    </motion.button>
                    }

                    
                </motion.div>
            </section>
        </div>
    );
};

export default BrideDetail;
