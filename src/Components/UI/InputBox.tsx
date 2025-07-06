

const InputBox = ({value, handleChange,name,label,type,isRequired,error}:{value:any, handleChange:any,name:any,label:any,type:any,isRequired?:boolean,error?:string    }) => {
  return (
  <>
    <div className="inputBox relative">
    <input
        type={type}
        name={name}
        value={value}
        {...(isRequired && {required:true})}
        onChange={handleChange}
        
        
    />
    <span>{label}</span>
    <i></i>
    

</div>

{error && <p className="text-red-500 text-sm !mt-2">{error}</p>}
</>
  )
}

export default InputBox