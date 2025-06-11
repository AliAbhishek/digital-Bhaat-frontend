import { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";

const ImageUpload = ({ label, onFileSelect,error,imageData  }:any) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  useEffect(()=>{
    if(imageData){
      setPreview(URL.createObjectURL(imageData));
      setFileName(imageData.name);
    }
    
    // onFileSelect?.(file);
  },[imageData])

  const removeImage = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onFileSelect?.(null);
  };

  // console.log(error)

  return (
    <div className="w-full max-w-md mx-auto ">
      <label className="block  text-sm font-semibold text-[#8b5c3d] !mb-4 ">{label}</label>

      <div
        className="border-2 h-52 border-dashed border-[#c98c64] rounded-2xl p-5 bg-[#fef9f6] text-center cursor-pointer hover:bg-[#fff7f3] transition"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-44 object-cover rounded-xl border border-[#c98c64]"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 bg-white text-red-600 p-1 rounded-full shadow hover:bg-red-100"
            >
              <X size={18} />
            </button>
            <p className="mt-2 text-xs text-[#8b5c3d] font-medium">{fileName}</p>
          </div>
        ) : (
          <div className="flex  flex-col items-center h-full  justify-center text-[#c98c64]">
            <ImagePlus className="w-8 h-8 " />
            <p className="text-sm">Click or drag & drop to upload image</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, or JPEG only</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs !mt-4">{error}</p>}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
