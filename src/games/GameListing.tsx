import { useEffect, useRef, useState } from "react";
import ParticlesBackground from "../Components/UI/TsParticle";
import { useQueryApi } from "../customHooks/useFetchData";
import { endpoints } from "../api/endpoints";
import Loader from "../Components/UI/Loader";
import { useDebounce } from "../customHooks/useDebounce";
import GameCard from "./GameCard";
import GameContainer from "./GameLogic";
// import { makePostRequest } from "../utils/api";

export default function GameList() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameId,setGameId] = useState<string | null>(null)
  const [selectedBrideId, setSelectedBrideId] = useState<string | null>(null);
  const [showDonationMsg, setShowDonationMsg] = useState(false);
  const [gameList, setGameList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 500);

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
    setShowDonationMsg(false);
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
            <h1 className="text-5xl font-extrabold text-[#c98c64] drop-shadow-[0_0_15px_rgba(201,140,100,0.7)] font-mono">
              🎮 Play Games & Support a Bride
            </h1>
            <p className="mt-4 text-[#fef9f6] text-lg font-light">
              Every play donates ₹1 to a bride’s future. Let’s make a difference through fun!
            </p>
          </div>

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
            {gameList?.map((game: any, idx: any) => (
              <GameCard
                key={game._id}
                game={game}
                idx={idx}
                setGameId={setGameId}
                setActiveGame={(url: string) => {
                  setActiveGame(url);
                  
                  // setSelectedBrideId(game?.brideId); // Ensure brideId exists
                  

                }}
              />
            ))}
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
            <GameContainer iframeRef={iframeRef} activeGame={activeGame} gameId={gameId} onBack={handleBack}/>
          </div>

          {showDonationMsg && (
            <p className="mt-4 text-[#c98c64] text-lg font-semibold italic bg-[#1e1e1e] px-6 py-2 rounded-full shadow shadow-[#c98c64aa]">
              🎉 ₹1 has been added to the selected bride’s wallet!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
