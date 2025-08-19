import { Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/transparentLogo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserIdFromToken } from '../../utils/decodeToken';


const Header = () => {
    const token: any = localStorage.getItem("token")
    const decodedToken: any = getUserIdFromToken();
    let role: string = decodedToken?.role
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleNav = (path: string) => {
        navigate(path);
        setMenuOpen(false); // close mobile menu
        setDropdownOpen(false); // close dropdown
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogOut = () => {
        console.log("logout")
        localStorage.clear()
        navigate("/")
    }


    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#000000e6] backdrop-blur-sm px-4 md:px-8 py-3 border-b border-[#2c2c2c]">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <div
                    className="flex items-center cursor-pointer transition-shadow duration-300 shadow-[0_0_10px_3px_rgba(201,140,100,0.7)]"
                    onClick={() => navigate('/')}
                >
                    <img
                        src={Logo}
                        alt="Logo"
                        className="!h-12 md:h-10 object-contain"
                    />
                </div>

                {/* Search Bar */}
                {/* <SearchBar /> */}
                {/* <Moto/> */}

                <div className="text-center mt-2 hidden md:block">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#c98c64] typing-text max-w-full">
                        Beti Bachao, Beti Padhao, Beti ki Shaadi mein Saath Nibhao
                    </h1>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6 ml-4">
                    {/* <button
                        className="text-[#fef9f6] text-sm hover:text-[#c98c64] transition"
                        onClick={() => handleNav('/about')}
                    >
                        About Us
                    </button> */}
                    {/* <button
                        className="text-[#fef9f6] text-sm hover:text-[#c98c64] transition"
                        onClick={() => handleNav('/impact')}
                    >
                        Our Impact
                    </button> */}
                    {
                        !token && <button
                            className="py-2 px-4 bg-[#c98c64] text-white rounded-full text-sm font-semibold shadow hover:bg-[#ad7a52] transition"
                            onClick={() => handleNav('/signUp')}
                        >
                            Login / Sign Up
                        </button>
                    }

                    {
                        token &&
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="text-[#fef9f6] hover:text-[#c98c64] transition"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-label="Profile Menu"
                            >
                                <User className="w-5 h-5" />
                            </button>

                            {dropdownOpen && (
                                
                                    
                                
                                
                                
                                <div className="absolute right-0 mt-2 w-44 bg-[#fef9f6] text-[#8b5c3d] rounded-2xl shadow-lg py-2 z-50 animate-fade-in">
                                   { role=="donor" && <button
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#c98c64]/20 transition text-left"
                                        onClick={() => {
                                            // if(role==user){
                                            handleNav("/donor-home")
                                            // }else{
                                            // handleNav('/create-profile?role=donor&&edit=true')
                                            // }


                                        }}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </button> }
                                    
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#c98c64]/20 transition text-left"
                                        onClick={() => {
                                            // if(role==user){
                                            handleNav("/your-info?edit=true")
                                            // }else{
                                            // handleNav('/create-profile?role=donor&&edit=true')
                                            // }


                                        }}
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </button>
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#c98c64]/20 transition text-left"
                                        onClick={() => {
                                            if (role == "donor") {
                                                handleNav('/donor-home')
                                            } else {
                                                handleNav('/helping-hand')
                                            }

                                        }}
                                    >
                                        🤝
                                        Helping Hand
                                    </button>
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#c98c64]/20 transition text-left"
                                        onClick={() => handleNav('/settings')}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>

                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#c98c64]/20 transition text-left"
                                        onClick={
                                            // handle logout logic here
                                            handleLogOut
                                        }
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    }



                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    {
                        token && <button
                            className="text-[#fef9f6]"
                            onClick={() => handleNav("/your-info?edit=true")}
                            aria-label="Profile"
                        >
                            <User className="w-5 h-5" />
                        </button>
                    }

                    <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        {menuOpen ? (
                            <X className="w-6 h-6 text-[#fef9f6]" />
                        ) : (
                            <Menu className="w-6 h-6 text-[#fef9f6]" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden mt-4 px-4 pb-4 text-center space-y-3"
                    >
                        {/* <button
                            className="block w-full text-[#fef9f6] text-sm py-2 hover:text-[#c98c64]"
                            onClick={() => handleNav('/about')}
                        >
                            About Us
                        </button>
                        <button
                            className="block w-full text-[#fef9f6] text-sm py-2 hover:text-[#c98c64]"
                            onClick={() => handleNav('/impact')}
                        >
                            Our Impact
                        </button> */}
                        <button
                            className="block w-full py-2 px-4 bg-[#c98c64] text-white rounded-full text-sm font-semibold shadow hover:bg-[#ad7a52] transition"
                            onClick={() => handleNav('/donate')}
                        >
                            Donate Now
                        </button>
                        {
                            !token && <button
                                className="block w-full py-2 px-4 bg-[#c98c64] text-white rounded-full text-sm font-semibold shadow hover:bg-[#ad7a52] transition"
                                onClick={() => handleNav('/signUp')}
                            >
                                Login / Sign Up
                            </button>
                        }
                        {
                            token && <button
                                className="block w-full py-2 px-4 bg-[#c98c64] text-white rounded-full text-sm font-semibold shadow hover:bg-[#ad7a52] transition"
                                onClick={handleLogOut}
                            >
                                Logout
                            </button>
                        }


                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
