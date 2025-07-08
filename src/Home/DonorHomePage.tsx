// DonorHome.jsx (Enhanced UI with Lucide Icons, Background, Motion)
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    IndianRupee,
    Calendar,
    HeartHandshake
} from "lucide-react";
import ParticlesBackground from "../Components/UI/TsParticle";
import Header from "../Components/UI/Headers";
import AnimatedCard from "./DonorAnimatedCards";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import Loader from "../Components/UI/Loader";
import moment from "moment";
import BrideCard from "./BrideCard";


const COLORS = {
    primary: "#c98c64",
    secondary: "#8b5c3d",
    background: "#000000e6",
    textLight: "#fef9f6",
    textDark: "#1a1a1a",
};


const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const getUrgencyLevel = (weddingDate: string, collected: number, sanctioned: number) => {
    const today = new Date();
    const wedding = new Date(weddingDate);
    const diffDays = Math.ceil((wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (sanctioned > 0 && collected >= sanctioned) return "Completed";
    if (diffDays <= 40) return "High";
    if (diffDays <= 50) return "Medium";
    return "Low";
};



export default function DonorHome() {
    const [maxCollectedAmount, setMaxCollectedAmount] = useState(30000);
    const [selectedState, setSelectedState] = useState("");
    const [search, setSearch] = useState("");
    const [brides, setBrides] = useState([])
    const maxPossibleSanctioned: any = 30000



    const { data, isLoading } = useQueryApi({

        key: ["bridelist"],
        url: `${endpoints.GET_VERIFIED_BRIDES.endpoint}`,

    });

    if (isLoading) (<Loader />)

    useEffect(() => {
        setBrides(data?.data?.data)
    }, [data])

    console.log(data, "dd")

    return (
        <>
            <Header />
            <div className="min-h-screen w-screen bg-black text-white relative overflow-hidden mt-14 ml-10 ">
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
                                Amount up to: <span className="text-[#c98c64] font-bold">₹{maxCollectedAmount || 0}</span>
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
                    {brides?.length > 0 ? (
                        brides?.map((bride:any, index) => {
                            const {
                                brideDetails,
                                amountSanctioned,
                                collectedAmount,

                            }: any = bride;
                            const urgency = getUrgencyLevel(
                                brideDetails?.weddingDate,
                                collectedAmount,
                                amountSanctioned
                            );

                            return (
                                <BrideCard
                                    key={bride._id}
                                    _id={bride._id}
                                    brideDetails={bride?.brideDetails}
                                    guardianDetails={bride?.guardianDetails}
                                    profileStatus={bride?.profileStatus}
                                    isProfileVerifiedByAdmin={bride?.isProfileVerifiedByAdmin}
                                    amountSanctioned={bride?.amountSanctioned}
                                    collectedAmount={bride?.collectedAmount}
                                    brideProfileImageUrl={bride?.brideProfileImageUrl}
                                    guardianImageUrl={bride?.guardianImageUrl}
                                    urgency={urgency} // update dynamically if available
                                    onDonate={() => alert(`Donating to ${bride?.brideDetails?.brideName}`)}
                                    index={index}
                                />



                            );
                        })
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