// components/WalletSummary.tsx
export const WalletSummary = ({ balance }: { balance: number }) => (
  <div className="bg-[#2c2c2c] border border-[#c98c64] rounded-2xl p-6 mb-6 shadow-xl text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#c98c64]">Your Wallet Balance</h2>
    <p className="text-white text-4xl sm:text-5xl mt-4 font-extrabold tracking-wide">
      ₹{balance?.toFixed(2)}
    </p>
  </div>
);
