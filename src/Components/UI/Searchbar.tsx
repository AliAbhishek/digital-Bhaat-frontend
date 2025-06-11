import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
    const placeholders = [
        "Search by bride name",
        "Search by father name",
        "Search by country",
        "Search by state",
        "Search by city",
        "Search by district",
        "Search by pincode",
    ];

    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-1 h-14 justify-center px-4 py-2">
            <div className="flex items-center bg-[#c98c64] rounded-full shadow px-3 py-2 text-sm text-white w-full max-w-md cursor-pointer hover:shadow-md transition
                      sm:px-4 sm:py-2
                      ">
                <input
                    type="search"
                    placeholder={placeholders[placeholderIndex]}
                    className="flex-grow outline-none text-white bg-transparent placeholder-white text-sm
                     sm:text-base"
                    aria-label="Search"
                />
                {/* <button
          className="ml-2 h-3 w-3 bg-[#c98c64] p-2 rounded-full text-white hover:bg-[#ad7a52] transition
                     sm:p-3"
          aria-label="Search button"
        > */}
                <Search className="w-4 h-4 sm:w-5 sm:h-5 t" />
                {/* </button> */}
            </div>
        </div>
    );
};

export default SearchBar;
