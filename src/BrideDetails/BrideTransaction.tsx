import { useParams } from "react-router-dom"
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import { useEffect, useState } from "react";

import ParticlesBackground from "../Components/UI/TsParticle";
import Loader from "../Components/UI/Loader";


const BrideTransaction = () => {
    const id = useParams()
    const brideId = id?.id ? atob(id?.id) : null;
    const [transactions, setTransactions] = useState<any>([])
    const [wallet, setWallet] = useState<any>(null)

    const { data, isLoading } = useQueryApi({
        key: ["bride-Transactions", brideId],
        url: `${endpoints.BRIDE_TRANSACTIONS.endpoint}/${brideId}`,
        enabled: !!brideId,
    });

    useEffect(() => {
        if (data) {
            setTransactions(data?.data?.userTransactions)
            setWallet(data?.data?.userWallet)
        }

    }, [data])



    if (isLoading) return <Loader />;
    return (
        <>
            <ParticlesBackground />

            <div className="relative z-10 min-h-screen w-screen text-white px-4 py-10">
                <div className="max-w-4xl mx-auto">

                    <h1 className="text-3xl font-bold text-center text-[#c98c64] mb-10">
                        💼 Wallet & Transactions
                    </h1>

                    {/* Wallet Summary */}
                    <div className="bg-[#2c2c2c]/60 border border-[#c98c64] rounded-2xl p-6 text-center shadow-xl backdrop-blur-lg mb-6">
                        <p className="text-lg text-gray-300 mb-2">Your Wallet Balance</p>
                        <p className="text-4xl font-bold text-[#c98c64]">₹{wallet?.balance || 0}</p>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {transactions.length === 0 ? (
                            <p className="text-center text-sm text-[#c98c64]">No transactions yet.</p>
                        ) : (
                            transactions.map((txn: any) => (
                                <div
                                    key={txn._id}
                                    className="bg-[#1a1a1a]/70 backdrop-blur rounded-xl p-4 border-l-4 border-[#c98c64] shadow-md hover:scale-[1.01] transition"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-lg font-semibold text-[#c98c64]">
                                                ₹{txn.amount} {txn.transactionType === "credit" ? "Credited" : "Debited"}
                                            </h4>
                                            <p className="text-sm text-gray-300 mt-1">
  💖 Donor:{" "}
  <span className="font-medium text-white">
    {txn.transactionDoneBy?.fullName || "Unknown"}
  </span>
</p>

                                            {txn.type === "ads" && txn.adsOrganisationId?.name && (
                                                <p className="text-sm text-gray-300 mt-1">
                                                    💼 Powered by:{" "}
                                                    <span className="font-medium text-white">
                                                        {txn.adsOrganisationId.name}
                                                    </span>
                                                    {txn.adsOrganisationId.website && (
                                                        <>
                                                            {" "}
                                                            —{" "}
                                                            <a
                                                                href={txn.adsOrganisationId.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[#c98c64] underline hover:text-[#e1a880] transition"
                                                            >
                                                                Visit Site
                                                            </a>
                                                        </>
                                                    )}
                                                </p>
                                            )}

                                             {txn.type === "csr" && txn.csrOrganisationId?.name && (
                                                <p className="text-sm text-gray-300 mt-1">
                                                    💼 Powered by:{" "}
                                                    <span className="font-medium text-white">
                                                        {txn.csrOrganisationId.name}
                                                    </span>
                                                    {txn.csrOrganisationId.website && (
                                                        <>
                                                            {" "}
                                                            —{" "}
                                                            <a
                                                                href={txn.csrOrganisationId.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[#c98c64] underline hover:text-[#e1a880] transition"
                                                            >
                                                                Visit Site
                                                            </a>
                                                        </>
                                                    )}
                                                </p>
                                            )}

                                        </div>
                                        <span className="text-xs text-[#999] ml-4 whitespace-nowrap">
                                            {new Date(txn.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>


    );

}

export default BrideTransaction