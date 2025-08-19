import Loader from "./Loader";


const PrimaryButton = ({
  text,
  type,
  onClick,
  isPending = false,
  className
}: {
  text: string;
  type: any;
  onClick?: (e?:any) => void;
  isPending?: boolean;
  className?:any
}) => {
  return (
    <button
      type={type}
      id="submit"
      disabled={isPending}
      onClick={onClick}
     className={`px-6 py-2 rounded-full text-white flex items-center justify-center gap-2 transition-all ${isPending ? 'bg-[#8b5c3d]/60 cursor-not-allowed' : 'bg-[#8b5c3d] hover:bg-[#c98c64]'} ${className || ''}`}

    >
      {isPending && <Loader  />}
      {isPending ? 'Processing...' : text}
    </button>
  );
};

export default PrimaryButton;
