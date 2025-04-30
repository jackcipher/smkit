import './header.css'
import {useEffect, useRef, useState} from "react";
function Header({userInfo, onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        console.log("userInfo.home")
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
        <div className="header">
            <div className="user-menu" ref={menuRef}>
                <div className="user-summary" onClick={toggleMenu}>
                    <span className="username">{userInfo?.name || 'User'}</span>
                </div>
                {menuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={onLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );


}

export default Header;