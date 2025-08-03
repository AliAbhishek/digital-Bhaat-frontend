import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import Loader from "../Components/UI/Loader";
import Logo from "../assets/transparentLogo.png";
import { getUserIdFromToken } from "../utils/decodeToken";
import PrimaryButton from "../Components/UI/PrimaryButton";
import ParticlesBackground from "../Components/UI/TsParticle";

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
        className="mb-1 px-2 py-1 rounded-md transition-colors duration-200 cursor-default bg-transparent hover:bg-[#ffffff0d]"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        <span className="font-semibold text-[#c98c64]">{label}:</span>{" "}
        <span className="text-white">{value || <span className="italic text-gray-400">N/A</span>}</span>
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
    <section className="px-4 py-8 md:py-10 max-w-5xl mx-auto ">
        <motion.div
            className="!bg-[000000e6] backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg overflow-hidden" // Added overflow-hidden for better animation
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
    brideWallet?: number | string
}

const BrideDetail: React.FC = () => {
    const decodedToken: any = getUserIdFromToken();
    let role = decodedToken.role
    console.log(role, "role")
    const query = new URLSearchParams(useLocation().search);
    const encodedId = query.get("id");
    const navigate = useNavigate()
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
        brideWallet,
    } = profile;

    return (
        <div className="bg-gradient-to-br w-screen min-h-screen font-inter bg-black text-[#fef9f6]">
            <ParticlesBackground />
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
            <Section className="relative z-30 py-14 px-6 sm:px-10 md:py-20 max-w-5xl  ">

                {/* <ParticlesBackground/> */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative bg-transparent backdrop-blur-xl rounded-3xl border border-[#c98c64]/30 shadow-[0_10px_30px_rgba(201,140,100,0.3)] px-6 py-10 md:px-10 text-center"
                >

                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#c98c64] text-black px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                        You're making a girl's dream come true 💫
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#c98c64] mb-6 drop-shadow-lg">
                        🌟 Profile Summary
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left text-[#1a1a1a] font-medium">
                        <BadgeItem label="Profile Status" value={profileStatus || "-"} />
                        <BadgeItem label="Admin Verified" value={isProfileVerifiedByAdmin ? "Yes ✅" : "No ❌"} />
                        <BadgeItem label="Profile Completed" value={isProfileCompleted ? "Yes ✅" : "No ❌"} />
                        <BadgeItem label="Wallet Balance" value={brideWallet} />
                    </div>

                    <div className="mt-8 text-base sm:text-lg md:text-xl font-semibold text-[#1a1a1a]">
                        💰 <span className="text-[#8b5c3d]">Amount Sanctioned:</span> <span className="text-green-600">₹{amountSanctioned || 0}</span>
                        <br />
                        ❤️ <span className="text-[#8b5c3d]">Collected So Far:</span> <span className="text-blue-600">₹{collectedAmount || 0}</span>
                    </div>

                    <div className="mt-6">
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#c98c64] to-[#8b5c3d]"
                                style={{ width: `${Math.min((collectedAmount! / (amountSanctioned || 1)) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-sm mt-2 text-gray-500">
                            {collectedAmount! < amountSanctioned!
                                ? `₹${amountSanctioned! - collectedAmount!} still needed to fully fund her wedding 💍`
                                : "Fully Funded 🎉"}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                        {role === "donor" && (
                            <>
                                <PrimaryButton
                                    text="💝 Donate Now"
                                    type="button"
                                    onClick={() => { }}
                                    className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#f7c59f] to-[#c98c64] text-[#1a1a1a] rounded-xl shadow-lg hover:from-[#c98c64] hover:to-[#8b5c3d] transition-all duration-300 hover:scale-105"
                                />
                                <PrimaryButton
                                    text="🎮 Play Game"
                                    type="button"
                                    onClick={() => navigate("/games")}
                                    className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#c98c64] to-[#f7c59f] text-[#1a1a1a] rounded-xl shadow-lg hover:from-[#8b5c3d] hover:to-[#c98c64] transition-all duration-300 hover:scale-105"
                                />
                            </>
                        )}

                        {role === "user" && (
                            <>
                                <PrimaryButton
                                    text="👛 View Wallet"
                                    type="button"
                                    onClick={() => navigate(`/bride-transactions/${encodedId}`)}
                                    className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#c98c64] to-[#f7c59f] text-[#1a1a1a] rounded-xl shadow-lg hover:from-[#8b5c3d] hover:to-[#c98c64] transition-all duration-300 hover:scale-105"
                                />
                                <PrimaryButton
                                    text="📜 My Transactions"
                                    type="button"
                                    onClick={() => navigate(`/bride-transactions/${encodedId}`)}
                                    className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#f7c59f] to-[#c98c64] text-[#1a1a1a] rounded-xl shadow-lg hover:from-[#c98c64] hover:to-[#8b5c3d] transition-all duration-300 hover:scale-105"
                                />
                            </>
                        )}
                    </div>


                    {/* Emotional Quote */}
                    <div className="mt-8 text-sm italic text-gray-600">
                        "Your kindness today helps a daughter walk into her new life with dignity tomorrow."
                    </div>
                </motion.div>
            </Section>


        </div>
    );
};

export default BrideDetail;
