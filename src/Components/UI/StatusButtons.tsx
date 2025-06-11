

const StatusButtons = ({title}:any) => {
    return (
        <span
            className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${title === "Approved"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
                }`}
        >
            {title}
        </span>
    )
}

export default StatusButtons