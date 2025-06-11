

const PrimaryButton = ({text,type,onClick}:{text:string,type:any,onClick?:any}) => {
  return (
    <button type={type} id="submit" onClick={onClick} >{text}</button>
  )
}

export default PrimaryButton