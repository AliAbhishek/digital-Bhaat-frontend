

export const SimpleText = ({textColor,title}:any) => {
  return (
    <p className={`links text-${textColor ? textColor:"[#8b5c3d]"} text-xs`}>{title}</p>
  )
}
