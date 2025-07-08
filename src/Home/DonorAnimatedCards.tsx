export const getInitial = (name = "") => {
  return name?.charAt(0)?.toUpperCase() || "B";
};


const AnimatedCard = ({
  cover,
  character,
  fallbackName = "",
  fallbackCharacterName = "",
  className = "",
  urgency = "",
  isVerified = false,
}) => {
  const urgencyColorMap = {
    High: "bg-red-600",
    Medium: "bg-yellow-600",
    Low: "bg-green-600",
    Completed: "bg-blue-600",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ perspective: "1000px", height: "300px" }}
    >
      {/* Urgency Badge */}
      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white z-20 ${urgencyColorMap[urgency] || "bg-gray-500"}`}>
        {urgency || "N/A"}
      </div>

      {/* Verified Badge */}
      {isVerified && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full z-20 shadow">
          Verified
        </div>
      )}

      <div className="relative w-full h-full transform transition-transform duration-500 hover:rotate-x-6">
        {/* Cover */}
        {cover ? (
          <img
            src={cover}
            alt="Bride Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-[#c98c64] text-[#1a1a1a] text-5xl font-bold">
            {getInitial(fallbackName)}
          </div>
        )}

        {/* Guardian */}
        <div className="absolute inset-0 flex items-end justify-end p-3">
          {character ? (
            <img
              src={character}
              alt="Guardian"
              className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#8b5c3d] text-white font-semibold text-xl shadow-md border-2 border-white">
              {getInitial(fallbackCharacterName)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




export default AnimatedCard;
