
import { useEffect, useState } from "react";
import { SettingsContentWrapper } from "./SettingsContentWrapper ";
import { Loader } from "lucide-react";
import { endpoints } from "../api/endpoints";
import { useQueryApi } from "../customHooks/useFetchData";

interface Transaction {
  _id: string;
  amount: number;
  transactionType: string;
  type: string;
  createdAt: string;
  transactionDoneTo: {
    brideDetails: {
      brideName: string;
    };
  };
  adsOrganisationId?: {
    name: string;
    website: string
  };
}

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { data, isLoading } = useQueryApi({
    key: ["transactions"],
    url: `${endpoints.DONOR_TRANSACTIONS.endpoint}`,
    // enabled: !!brideId,
  });


  useEffect(() => {
    if (data) {
      setTransactions(data?.data?.userTransactions)
    }

  }, [data])


  console.log(transactions, "tttt")

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader />
      </div>
    );


  return (
    <SettingsContentWrapper title="Transaction History">
      <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-[#c98c64]">No transactions yet.</p>
        ) : (
          transactions?.map((txn) => (
            <div
              key={txn._id}
              className="bg-[#1a1a1a] rounded-xl p-4 shadow-md border border-[#c98c64] transition hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-[#c98c64]">
                  ₹{txn.amount} {txn.transactionType === "credit" ? "Donated" : "Debited"}
                </h4>
                <span className="text-xs text-[#aaa]">
                  {new Date(txn.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-white">
                👰 For Bride:{" "}
                <span className="font-medium text-[#c98c64]">
                  {txn.transactionDoneTo?.brideDetails?.brideName || "Unknown"}
                </span>
              </p>
              {txn.type === "ads" && txn.adsOrganisationId?.name && (
                <p className="text-sm text-white">
                  💼 Powered by:{" "}
                  <span className="font-medium text-[#c98c64]">
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
              {/* <p className="text-xs mt-1 text-[#aaa]">Type: {txn.type}</p> */}
            </div>
          ))
        )}
      </div>
    </SettingsContentWrapper>
  );
};
