// DonorHome.jsx (Enhanced UI with Lucide Icons, Background, Motion)
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    IndianRupee,
    Calendar,
    HeartHandshake
} from "lucide-react";
import heroImg from "../assets/homeBg1.png";
import ParticlesBackground from "../Components/UI/TsParticle";
import Header from "../Components/UI/Headers";
import AnimatedCard from "./DonorAnimatedCards";

const COLORS = {
    primary: "#c98c64",
    secondary: "#8b5c3d",
    background: "#000000e6",
    textLight: "#fef9f6",
    textDark: "#1a1a1a",
};

const sampleBrides = [
    { _id: "1", brideName: "Anjali Verma", district: "Varanasi", state: "Uttar Pradesh", profileImage: "https://placehold.co/400x300/c98c64/000000?text=Anjali", sanctioned: 25000, collected: 18000, urgency: "High", weddingDate: "2025-08-15" },
    { _id: "2", brideName: "Pooja Sharma", district: "Jaipur", state: "Rajasthan", profileImage: "https://placehold.co/400x300/8b5c3d/FFFFFF?text=Pooja", sanctioned: 20000, collected: 20000, urgency: "Completed", weddingDate: "2025-09-01" },
    { _id: "3", brideName: "Kavya Reddy", district: "Hyderabad", state: "Telangana", profileImage: "https://placehold.co/400x300/c98c64/000000?text=Kavya", sanctioned: 30000, collected: 5000, urgency: "Medium", weddingDate: "2025-10-20" },
    { _id: "4", brideName: "Sneha Singh", district: "Patna", state: "Bihar", profileImage: "https://placehold.co/400x300/8b5c3d/FFFFFF?text=Sneha", sanctioned: 15000, collected: 10000, urgency: "Low", weddingDate: "2025-11-05" },
    { _id: "5", brideName: "Ritu Kumari", district: "Bhopal", state: "Madhya Pradesh", profileImage: "https://placehold.co/400x300/c98c64/000000?text=Ritu", sanctioned: 28000, collected: 2000, urgency: "High", weddingDate: "2025-12-01" },
    { _id: "6", brideName: "Deepa Devi", district: "Ranchi", state: "Jharkhand", profileImage: "https://placehold.co/400x300/8b5c3d/FFFFFF?text=Deepa", sanctioned: 22000, collected: 12000, urgency: "Medium", weddingDate: "2026-01-10" },
];

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const UrgencyBadge = ({ urgency }: any) => {
    const map = {
        High: "bg-red-600",
        Medium: "bg-yellow-600",
        Low: "bg-green-600",
        Completed: "bg-blue-600"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${map[urgency] || "bg-gray-600"}`}>
            {urgency} Urgency
        </span>
    );
};

const ProgressCircle = ({ collected, sanctioned }: any) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const progress = (collected / sanctioned) * 100;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return (
        <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
                <circle strokeWidth="4" stroke="gray" fill="transparent" r={radius} cx="25" cy="25" />
                <motion.circle
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    stroke={COLORS.primary}
                    fill="transparent"
                    r={radius}
                    cx="25"
                    cy="25"
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <span className="absolute text-xs font-bold text-white">{Math.round(progress)}%</span>
        </div>
    );
};

export default function DonorHome() {
    const [maxCollectedAmount, setMaxCollectedAmount] = useState(30000);
    const [selectedState, setSelectedState] = useState("");
    const [search, setSearch] = useState("");
    const maxPossibleSanctioned = Math.max(...sampleBrides.map(b => b.sanctioned));

    const filteredBrides = sampleBrides.filter((b) => {
        const matchesSearch = b.brideName.toLowerCase().includes(search.toLowerCase()) || b.district.toLowerCase().includes(search.toLowerCase());
        const matchesState = selectedState === "" || b.state === selectedState;
        const matchesAmount = b.collected <= maxCollectedAmount;
        return matchesSearch && matchesState && matchesAmount;
    });

    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white relative overflow-hidden mt-14">
                <ParticlesBackground />
                <div className="relative rounded-3xl p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent z-0" />




                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8 mt-8 relative z-10"
                    >
                        <h1 className="text-5xl font-extrabold text-[#c98c64] drop-shadow-lg">
                            Empowering Dreams, Together
                        </h1>
                        <p className="text-xl font-light text-white mt-2 italic">
                            Your Impact, Our Bride's Future
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-2xl relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or district"
                                className="w-full pl-10 p-3 rounded-xl bg-[#c98c64] border border-black placeholder-black"
                            />
                            <Search className="absolute top-3 left-3 w-5 h-5 text-black" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative">
                            <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="w-full p-3 pr-10 rounded-xl bg-[#c98c64] border border-black text-black"
                            >
                                <option value="">All States</option>
                                {states.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <MapPin className="absolute top-3 right-5 w-5 h-5 text-black" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <p className="text-sm mb-2">
                                Amount up to: <span className="text-[#c98c64] font-bold">₹{maxCollectedAmount}</span>
                            </p>
                            <div className="flex items-center gap-3">
                                <IndianRupee className="text-[#c98c64] w-4 h-4" />
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPossibleSanctioned}
                                    step="1000"
                                    value={maxCollectedAmount}
                                    onChange={(e) => setMaxCollectedAmount(parseInt(e.target.value))}
                                    className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-gray-600 to-[#c98c64] focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c98c64] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                                />
                                <span className="text-white font-medium">₹{maxPossibleSanctioned}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 py-10 px-6">
                    {filteredBrides.length > 0 ? (
                        filteredBrides.map((bride, index) => (
                            <>

                                <motion.div
                                    key={bride._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(201, 140, 100, 0.2)" }}
                                    className="bg-[#c98c64]/10 border border-[#c98c64]/30 rounded-2xl shadow-sm backdrop-blur-sm"
                                >
                                   
                                   <div className="pt-3">
                                     <AnimatedCard
                                        cover="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg"
                                        title="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png"
                                        character="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp"
                                    />
                                    </div> {/* <img src={bride.profileImage} alt={bride.brideName} className="rounded-lg w-full h-48 object-cover mb-3" /> */}
                                   <div className="p-5">
                                    <h3 className="text-xl font-semibold text-[#c98c64]">{bride.brideName}</h3>
                                    <p className="text-sm text-gray-300">{bride.district}, {bride.state}</p>
                                    <p className="text-sm text-gray-400 flex items-center gap-1"><Calendar className="w-4 h-4" /> {bride.weddingDate}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <ProgressCircle collected={bride.collected} sanctioned={bride.sanctioned} />
                                        <div className="text-right">
                                            <span className="text-green-400 font-bold">₹{bride.collected}</span>
                                            <span className="text-sm text-gray-400"> / ₹{bride.sanctioned}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <UrgencyBadge urgency={bride.urgency} />
                                        <motion.button
                                            onClick={() => alert(`Donating to ${bride.brideName}`)}
                                            className="bg-[#c98c64] hover:bg-[#8b5c3d] text-[#1a1a1a] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <HeartHandshake className="w-4 h-4" /> Donate
                                        </motion.button>
                                    </div>
                                    </div>
                                </motion.div>

                            </>
                        ))
                    ) : (
                        <div className="col-span-full text-center mt-10 text-gray-400">
                            <p className="text-lg">No brides match your filter. Try changing search or state.</p>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
}