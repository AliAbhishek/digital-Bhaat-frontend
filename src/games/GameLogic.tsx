import React, { useEffect, useRef, useState } from "react";

type Props = {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  activeGame: string;
  onBack: () => void;
};

export default function GameContainer({ iframeRef, activeGame, onBack }: Props) {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsPlayedRef = useRef(0);
  const isPopupShownRef = useRef(false); // to prevent showing multiple times

  const handleStart = () => {
    setHasStarted(true);
    console.log("[Start] Game started");

    // Show popup after 90 seconds
    setTimeout(() => {
      if (!isPopupShownRef.current) {
        setShowPopup(true);
        isPopupShownRef.current = true;
        console.log("[Popup] Showing congratulation popup");

        // Stop timers when popup shows
        if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
        if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      }
    }, 90000);

    // Start game time logging
    gameTimerRef.current = setInterval(() => {
      secondsPlayedRef.current += 1;
      console.log(`[Game Time] ${secondsPlayedRef.current}s`);
    }, 1000);

    // setupInactivityTracking();
  };

  // const setupInactivityTracking = () => {
  //   const resetInactivityTimer = () => {
  //     if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
  //     inactivityTimeoutRef.current = setTimeout(() => {
  //       console.log("[Inactivity] 40s of no interaction → onBack()");
  //       onBack();
  //     }, 40000);
  //   };

  //   const events = ["mousemove", "click", "keydown", "touchstart"];
  //   events.forEach(event => window.addEventListener(event, resetInactivityTimer));
  //   resetInactivityTimer();

  //   // Tab switch handler
  //   document.addEventListener("visibilitychange", () => {
  //     if (document.hidden) {
  //       console.log("[Tab Switch] Tab hidden → onBack()");
  //       onBack();
  //     }
  //   });
  // };

  useEffect(() => {
    return () => {
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, []);

  const handlePopupAcknowledge = () => {
    setShowPopup(false);
    console.log("[Popup] User acknowledged donation popup. Timers stopped. Game continues freely.");
  };

  return (
    <div className="relative w-full h-full">
      {/* Overlay Start Button */}
      {!hasStarted && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <button
            onClick={handleStart}
            className="relative px-8 py-4 rounded-full text-white text-2xl font-bold z-50 animate-pulse hover:scale-105 transition"
            style={{
              backgroundImage: "url('/90bfb7db-ce96-47c5-96cb-fe283108df31.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.6)",
            }}
          >
            🚀 Start Game
          </button>
        </div>
      )}

      {/* Donation Popup Modal */}
      {showPopup && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          {/* Confetti Layer */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="animate-confetti opacity-70"></div>
          </div>

          {/* Popup Box */}
          <div className="bg-[#fff7f2] border-4 border-[#c98c64] p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full z-10 animate-bounce-in">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-2xl font-extrabold text-[#c98c64] mb-2 drop-shadow-sm">
              ₹1 Donated!
            </h2>
            <p className="text-[#1e1e1e] font-medium mb-6">
              A warm thank you from <strong>XYZ Foundation</strong> ❤️
            </p>
            <button
              onClick={handlePopupAcknowledge}
              className="px-6 py-2 bg-[#c98c64] text-white font-semibold rounded-full shadow hover:bg-[#8b5c3d] transition hover:scale-105"
            >
              Got it! 🙌
            </button>
          </div>
        </div>
      )}


      {/* Game Iframe */}
      <iframe
        ref={iframeRef}
        src={activeGame}
        width="100%"
        height="100%"
        className={`rounded-lg border-none w-full h-full ${!hasStarted ? "pointer-events-none blur-sm" : ""
          }`}
        title="GameMonetize Game"
        allow="autoplay; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
