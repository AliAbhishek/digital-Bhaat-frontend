import toast from "react-hot-toast";
import { endpoints } from "../api/endpoints";
import { useMutationApi } from "../customHooks/useMutationApi";
import Loader from "../Components/UI/Loader";
import { useQueryApi } from "../customHooks/useFetchData";


const GameCard = ({ game, idx, setActiveGame,setGameId }: any) => {

    const { data, refetch } = useQueryApi({
        key: ["favGames"], // Include searchTerm in cache key
        url: `${endpoints.GET_FAV_GAMES.endpoint}`,
    });

   

    const { mutate, isPending } = useMutationApi({
        url: endpoints.ADD_GAME_FAV.endpoint,
        method: endpoints.ADD_GAME_FAV.method,
        onSuccess: (data) => {
            console.log(data, "data")
            refetch()
            toast.success(data?.message);
            // data?.data?.otp && toast.success(data?.data?.otp);
            // setTimer(60); // Reset timer on successful resend
            // setResendDisabled(true); // Disable resend button
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    if (isPending) return <Loader />
    const isFav = data?.data?.some((fav: any) => fav.gameId === game._id);


    return (
        <div
            key={idx}
            className="relative bg-[#1e1e1e] rounded-3xl overflow-hidden border-2 border-[#c98c64] hover:scale-105 hover:shadow-[0_0_20px_#c98c64aa] transition-all duration-300 group"
        >
            {/* Game Image */}
            <img
                src={game.thumb}
                alt={game.title}
                className="w-full h-48 object-cover group-hover:brightness-110 transition duration-200"
            />

            {/* Favorite Icon (Always Visible, Hover Animation) */}
            <div
                onClick={() => {
                    if (isFav) {
                        mutate({ gameId: game?._id, type: "remove" })
                    } else {
                        mutate({ gameId: game?._id })
                    }
                }}
                className={`absolute top-3 right-3 text-2xl cursor-pointer z-10 transition-transform duration-200 group-hover:scale-110`}
            >
                {isFav ? "❤️" : "🤍"}
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col items-center justify-center gap-2">
                <h3 className="text-xl font-bold text-[#fef9f6] text-center">{game.title}</h3>
                <button
                    onClick={() => 
                        {setActiveGame(game.url) 
                        setGameId(game?.gameId)}
                    }
                    className="mt-2 bg-[#c98c64] text-black px-5 py-2 rounded-xl font-semibold hover:bg-[#8b5c3d] hover:text-white transition-all shadow-md hover:shadow-[0_0_10px_#c98c64aa]"
                >
                    🎁 Play & Donate ₹1
                </button>
            </div>
        </div>

    )
}

export default GameCard