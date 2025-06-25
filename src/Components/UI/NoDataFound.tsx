
import Heading from './Heading'
import SubHeading from './SubHeading'


const NoDataFound = ({ emoji, title, tagLine, button }: any) => {
    return (
        <div className="mt-20 flex flex-col items-center justify-center text-center space-y-6 px-4">
            <div className="bg-[#fef9f6] border border-[#c98c64] rounded-xl p-6 max-w-md w-full shadow-md">
                <div className="text-5xl mb-2">{emoji}</div>

                <h1><strong><Heading title={title} /></strong> </h1>
                <SubHeading title={tagLine} />

                {
                    button && button
                }

            </div>
        </div>
    )
}

export default NoDataFound