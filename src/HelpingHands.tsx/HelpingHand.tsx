import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeading from "../Components/UI/PageHeading";
import Heading from "../Components/UI/Heading";
import PrimaryButton from "../Components/UI/PrimaryButton";
import CardHeading from "../Components/UI/CardHeading";
import SubHeading from "../Components/UI/SubHeading";
import StatusButtons from "../Components/UI/StatusButtons";
import { SimpleText } from "../Components/UI/SimpleText";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import { Loader } from "lucide-react";
import NoDataFound from "../Components/UI/NoDataFound";



const HelpingHand = () => {
    const navigate = useNavigate();

    const { data: bridesData, isLoading } = useQueryApi({
        key: ['brideDetails'],
        url: `${endpoints.GET_BRIDE_PROFILES.endpoint}`,

    });

    console.log(bridesData, "data")

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen w-screen bg-black px-4 py-8 text-[#fef9f6]">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 px-4">
                    <div>
                        <PageHeading title="Helping Hand" />
                        <div className="mt-2">
                            <Heading title="A warm log of families you’ve extended support to 🤝" />
                        </div>
                    </div>
                    <div>
                        <PrimaryButton
                            text="Help Another Family"
                            type="button"
                            onClick={() => navigate("/create-profile")}
                        />
                    </div>
                </div>

                {/* Timeline Layout */}
                <div className="relative">
                    {/* Vertical Center Line */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-[#8b5c3d]/50 z-0" />

                    {/* Timeline Cards */}
                    <div className="space-y-20">
                        {bridesData?.data?.map((log: any, index: number) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={log.id + "_" + index}
                                    className={` cursor-pointer relative flex w-full ${isLeft ? "lg:justify-start lg:pr-10" : "lg:justify-end lg:pl-10"} justify-center`}
                                    onClick={() => {
                                        const encodedId = btoa(log?._id);
                                        navigate(`/bride-details?id=${encodedId}`);
                                    }}
                                >
                                    {/* Glowing Dot (Always Centered) */}
                                    <span className="hidden lg:block absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#c98c64] border-2 border-white shadow-md z-10" />

                                    {/* Card */}
                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0px 0px 20px rgba(200, 140, 100, 0.4)",
                                            backgroundColor: "#1e1e1e",
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="mx-10 w-full max-w-md bg-[#1a1a1a] border border-[#8b5c3d]/40 rounded-2xl p-6 shadow-md group relative overflow-hidden"
                                    >
                                        {/* Floating Ribbon */}
                                        <motion.div
                                            initial={{ y: 0 }}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                            className="absolute flex gap-1 justify-center items-center top-0 right-0 bg-[#c98c64] text-[#1a1a1a] text-xs px-3 py-0 rounded-bl-2xl font-semibold shadow-sm"
                                        >
                                            <div className="mt-2">❤️</div>
                                            <div><SimpleText textColor="black" title="You helped" /></div>
                                        </motion.div>

                                        {/* Content */}
                                        <CardHeading title={log?.brideDetails?.brideName} />
                                        <h3 className="text-[#c98c64] mt-1 flex flex-wrap gap-1">
                                            <p className="font-bold"><SubHeading title="Guardian" /></p> : <SubHeading title={log?.guardianDetails?.fatherName} />
                                        </h3>
                                        <SubHeading
                                            title={`${log?.brideDetails?.village}, ${log?.brideDetails?.district}, ${log?.brideDetails?.state}, ${log?.brideDetails?.pincode}`}
                                        />
                                        <div

                                            className={`flex flex-wrap gap-2 mt-2`}
                                        >
                                            {!log?.saveAsDraft && <StatusButtons title={log?.profileStatus} />}
                                            {log?.saveAsDraft && <PrimaryButton text="Incomplete Profile" type="button" onClick={(e) => {
                                                e.stopPropagation()
                                                if (log?.saveAsDraft) {
                                                    localStorage.setItem("brideId", log?._id);
                                                    navigate("/create-profile");
                                                }
                                            }} />}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* No Data Found */}
                {bridesData?.data.length === 0 && (
                    <NoDataFound
                        emoji="🤝"
                        title="No Families Found"
                        tagLine="You haven’t helped any families yet. Let’s make a difference together!"
                        button={
                            <PrimaryButton
                                text="Start Helping"
                                type="button"
                                onClick={() => navigate("/create-profile")}
                            />
                        }
                    />
                )}
            </div>
        </div>

    );
};

export default HelpingHand;
