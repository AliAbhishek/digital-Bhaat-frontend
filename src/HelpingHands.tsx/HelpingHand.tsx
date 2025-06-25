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
        <div className="min-h-screen w-screen bg-[#000000e6] px-4 py-8 text-[#fef9f6]">
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center flex-wrap gap-4 mb-10 ml-10">
                    <div>
                        <PageHeading title="Helping Hand" />
                        <div className="mt-2">
                            <Heading title="A warm log of families you’ve extended support to 🤝" />
                        </div>
                    </div>
                    <div className="mr-4">
                        <PrimaryButton
                            text="Help Another Family"
                            type="button"
                            onClick={() => navigate("/create-profile")}
                        />
                    </div>
                </div>

                <div className="relative">
                    {/* Vertical thread line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#8b5c3d]/50 z-0" />

                    <div className="space-y-20" >
                        {bridesData?.data?.map((log: any, index: any) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={log.id + "_" + index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`cursor-pointer relative z-10 w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                                    onClick={() => {
                                        const encodedId = btoa(log?._id);
                                        navigate(`/bride-details?id=${encodedId}`)
                                    }}
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0px 0px 20px rgba(200, 140, 100, 0.4)",
                                            backgroundColor: "#1e1e1e",
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className={`bg-[#1a1a1a] border border-[#8b5c3d]/40 rounded-2xl p-6 shadow-md w-[90%] sm:w-[360px] ${isLeft ? "ml-30" : "mr-30"
                                            } group relative overflow-hidden`}
                                    >
                                        {/* Floating Ribbon */}
                                        <motion.div
                                            initial={{ y: 0 }}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                            className="absolute flex gap-1 justify-center items-center top-0 right-0 bg-[#c98c64] text-[#1a1a1a] text-xs px-3 py-0 rounded-bl-2xl font-semibold shadow-sm"
                                        >
                                            <div className="mt-2">❤️</div> <div ><SimpleText textColor="black" title="You helped" /></div>
                                        </motion.div>

                                        <CardHeading title={log?.brideDetails?.brideName} />
                                        <h3 className="text- text-[#c98c64] mt-1 flex gap-1">
                                            <p className="font-bold"><SubHeading title="Guardian" /></p>  :  <SubHeading title={log?.guardianDetails?.fatherName} />
                                        </h3>
                                        <SubHeading title={log?.brideDetails?.village + ", " + log?.brideDetails?.district + ", " + log?.brideDetails?.state + ", " + log?.brideDetails?.pincode} />
                                        <div onClick={(e) => {
                                            e.stopPropagation();
                                            if (log?.saveAsDraft) {
                                                localStorage.setItem("brideId", log?._id)
                                                navigate("/create-profile")
                                            }
                                        }} className={ `flex gap-2 ${log?.saveAsDraft && "cursor-pointer"}`}><StatusButtons title={log?.profileStatus} /> {log?.saveAsDraft && <StatusButtons title="Draft" />}
                                            {/* <div className="cursor-pointer" onClick={()=>navigate("/create-profile?role=user&edit=true")} ><StatusButtons title="Edit" /></div> */}
                                        </div>


                                    </motion.div>

                                    {/* Glowing Dot */}
                                    <motion.span
                                        animate={{
                                            boxShadow: "0 0 12px #c98c64",
                                        }}
                                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                                        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#c98c64] border-2 border-white shadow-md"
                                    />
                                </motion.div>

                            );
                        })}
                    </div>
                </div>

                {bridesData?.data.length === 0 && (
                    <NoDataFound emoji="🤝" title="No Families Found" tagLine="You haven’t helped any families yet. Let’s make a difference together!" button={<PrimaryButton text="Start Helping" type="button" onClick={() => navigate("/create-profile")} />} />

                )}

            </div>
        </div>
    );
};

export default HelpingHand;
