

const SecondaryButton = ({text,type,onClick}:{text:string,type:any,onClick:any}) => {
  return (
    <button type={type}  id="black-submit" onClick={onClick} >{text}</button>
  )
}

export default SecondaryButton