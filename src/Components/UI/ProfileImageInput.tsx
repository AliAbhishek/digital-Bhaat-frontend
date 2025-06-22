import { useRef } from "react";
import { CameraIcon } from "lucide-react";
// import PrimaryButton from "./PrimaryButton";

const ProfileImageUpload = ({ image, setImage, error }: {
  image: File | null,
  setImage: (file: File) => void,
  error?: string
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };




  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Image preview */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className=" !mt-2 cursor-pointer w-24 h-24 rounded-full border-4 border-[#c98c64] overflow-hidden shadow hover:shadow-lg transition"
      >
        {image ? (
          typeof image == "string" ? <>

            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />

          </> :
            <>

              <img
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-full h-full object-cover"
              />

            </>
        ) : (
          <>
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              <CameraIcon className="text-white w-4 h-4" />
            </div>


          </>
        )}
      </div>

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      {/* {
        image && <div>
          <PrimaryButton onClick={handleUpload} text="Upload" type="button" isPending={isPending} />
        </div>
      } */}

      {/* Error message */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ProfileImageUpload;
