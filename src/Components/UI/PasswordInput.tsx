import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";


const PasswordInput = ({value, handleChange,name,label,isRequired}:{value:any, handleChange:any,name:any,label:any,isRequired:boolean  }) => {

    const [showPassword, setShowPassword] = useState(false);



  return (
    <div className="inputBox    ">
    <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        {...(isRequired && {required:true})}
        onChange={handleChange}
    />
    <span>{label}</span>
    <i></i>

    {/* Eye icon */}
    <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black z-20"
    >
        {showPassword ? (
            <Eye />
        ) : (
            <EyeClosed />
        )}
    </button>
</div>
  )
}

export default PasswordInput