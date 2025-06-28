import { Loader2 } from 'lucide-react'; // clean spinner icon

const PrimaryButton = ({
  text,
  type,
  onClick,
  isPending = false,
}: {
  text: string;
  type: any;
  onClick?: (e?:any) => void;
  isPending?: boolean;
}) => {
  return (
    <button
      type={type}
      id="submit"
      disabled={isPending}
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-white flex items-center justify-center gap-2 transition-all
        ${isPending ? 'bg-[#8b5c3d]/60 cursor-not-allowed' : 'bg-[#8b5c3d] hover:bg-[#c98c64]'}`}
    >
      {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
      {isPending ? 'Processing...' : text}
    </button>
  );
};

export default PrimaryButton;
