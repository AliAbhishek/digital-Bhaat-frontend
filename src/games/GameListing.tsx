import { useEffect, useRef, useState } from "react";
import ParticlesBackground from "../Components/UI/TsParticle";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import Loader from "../Components/UI/Loader";
import { useDebounce } from "../customHooks/useDebounce";
import GameCard from "./GameCard";
import GameContainer from "./GameLogic";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
// import StatusButtons from "../Components/UI/StatusButtons";
// import { makePostRequest } from "../utils/api";

export default function GameList() {
  const query = new URLSearchParams(useLocation().search);
 const encodedId = query.get("id");
//  console.log(encodedId,"encodedId")
    
// const selectedBrideId = encodedId ? atob(encodedId) : null;
// console.log(selectedBrideId,"selectedBride")
const [selectedBrideId,setSelectedBrideId] = useState<any>(null)

  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null)
  // const [selectedBrideId, setSelectedBrideId] = useState<string | null>(null);
  const [viewFavorites, setViewFavorites] = useState(false);
  // const [showDonationMsg, setShowDonationMsg] = useState(false);
  const [gameList, setGameList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(()=>{
    if(encodedId){
      setSelectedBrideId(atob(encodedId))
    }

  },[encodedId])

  // console.log(selectedBrideId,"sss")

  const { data: favGames, refetch: favGamesRefetch } = useQueryApi({
    key: ["favGames"], // Include searchTerm in cache key
    url: `${endpoints.GET_FAV_GAMES.endpoint}`,
  });

  const { data, isLoading } = useQueryApi({
    key: ["userDetails", debouncedSearch],
    url: `${endpoints.GET_GAMES.endpoint}?search=${encodeURIComponent(debouncedSearch)}`,
  });

  useEffect(() => {
    setGameList(data?.data || []);
  }, [data]);

  // Go fullscreen when game is active
  useEffect(() => {
    const goFullscreen = async () => {
      if (activeGame && iframeRef.current) {
        const iframeContainer = iframeRef.current.parentElement;
        if (iframeContainer?.requestFullscreen) {
          await iframeContainer.requestFullscreen();
        }
      }
    };
    goFullscreen();
  }, [activeGame]);



  const handleBack = () => {
    setActiveGame(null);
    // setShowDonationMsg(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen w-screen bg-black text-white pt-10 relative overflow-hidden">
      <ParticlesBackground />

      {!activeGame ? (
        <div>
          <div className="text-center ">
            <div className="relative text-center ">
              {/* Heart Icon at Top-Right */}
              <div title="Favorite Games" className="fixed top-22 right-6 z-50 cursor-pointer" onClick={() => setViewFavorites(!viewFavorites)}>
                <Heart fill="red" className="w-8 h-8 drop-shadow-[0_0_15px_rgba(201,140,100,0.7)]" />
              </div>


              {/* Centered Heading */}
              <h1 className="text-5xl font-extrabold text-[#c98c64] drop-shadow-[0_0_15px_rgba(201,140,100,0.7)] font-mono">
                🎮 Play Games & Support a Bride
              </h1>
            </div>

            <p className="mt-4 text-[#fef9f6] text-lg font-light max-w-xl mx-auto px-4 drop-shadow-[0_0_15px_rgba(201,140,100,0.7)] font-mono mb-2">
              Every play donates ₹1 to a bride’s future. Let’s make a difference through fun!
            </p>
          </div>




          {/* kjdhfkjsb */}

          {/* 🔍 Search Input */}
          <div className="max-w-md mx-auto mb-5">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-[#c98c64] focus:outline-none focus:ring-2 focus:ring-[#c98c64] placeholder-gray-400 relative"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 relative">
            {(viewFavorites ? favGames?.data : gameList)?.map((game: any, idx: any) => {
              // console.log(game,"games")
              game=viewFavorites ? game?.gameId : game
              return (
                <GameCard
                  key={game._id}
                  game={game}
                  idx={idx}
                  setGameId={setGameId}
                  setActiveGame={(url: string) => {
                    setActiveGame(url);

                    // setSelectedBrideId(game?.brideId); // Ensure brideId exists


                  }}
                  favoriteGames={favGames}
                  refetch={favGamesRefetch}
                  // selectedBrideId={selectedBrideId}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 px-4">
          <div className="absolute top-5 left-5 z-[100]">
            <button
              onClick={handleBack}
              className="bg-[#c98c64] text-black px-4 py-2 rounded-lg font-bold shadow hover:bg-[#8b5c3d] hover:text-white transition"
            >
              ← Back to Games
            </button>
          </div>

          <div className="w-full h-[90vh] border-4 border-[#c98c64] rounded-2xl overflow-hidden shadow-xl shadow-[#c98c64aa]">
            {/* <iframe
              ref={iframeRef}
              src={activeGame}
              allowFullScreen
              className="w-full h-full rounded-xl"
              title="Game Frame"
            /> */}
            <GameContainer iframeRef={iframeRef} activeGame={activeGame} gameId={gameId} onBack={handleBack} selectedBrideId={selectedBrideId} />
          </div>

          {/* {showDonationMsg && (
            <p className="mt-4 text-[#c98c64] text-lg font-semibold italic bg-[#1e1e1e] px-6 py-2 rounded-full shadow shadow-[#c98c64aa]">
              🎉 ₹1 has been added to the selected bride’s wallet!
            </p>
          )} */}
        </div>
      )}
    </div>
  );
}
