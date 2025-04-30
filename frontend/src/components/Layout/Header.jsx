import {useEffect, useRef, useState} from "react";
function Header({userInfo, onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        console.log("userInfo.home");
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full bg-white shadow-sm px-6 flex justify-end items-center">
            <div className="relative" ref={menuRef}>
                <div
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md py-2 px-3 transition-colors duration-200"
                    onClick={toggleMenu}
                >
                    <img src={"data:image/png;base64," + userInfo.avatar}
                         className="w-6 h-6 rounded-full object-cover mr-2" alt="User avatar"/>
                    <span className="text-gray-800 font-medium">{userInfo?.name || 'User'}</span>
                    <svg
                        className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${menuOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                {menuOpen && (
                    <div
                        className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <button
                            onClick={onLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;